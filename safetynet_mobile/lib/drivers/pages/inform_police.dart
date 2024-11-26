import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dart:math';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MaterialApp(
    home: ReportAccidentPage(),
  ));
}

class ReportAccidentPage extends StatefulWidget {
  @override
  _ReportAccidentPageState createState() => _ReportAccidentPageState();
}

class _ReportAccidentPageState extends State<ReportAccidentPage> {
  final _descriptionController = TextEditingController();
  String _location = 'Fetching location...';
  Position? _driverPosition;
  DateTime _dateTime = DateTime.now();
  bool _informEmergencyContacts = false;
  String? nearestPoliceStationId;
  String? nearestPoliceStationEmail;
  String? nearestPoliceStationName;


  @override
  void initState() {
    super.initState();
    _getLocation();
  }

  Future<void> _getLocation() async {
    Position position = await _determinePosition();
    setState(() {
      _driverPosition = position;
      _location = 'Lat: ${position.latitude}, Long: ${position.longitude}';
    });
  }

 Future<Position> _determinePosition() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Check if location services are enabled
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    return Future.error('Location services are disabled.');
  }

  // Check for location permissions
  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      return Future.error('Location permissions are denied.');
    }
  }

  // Handle case where permission is denied forever
  if (permission == LocationPermission.deniedForever) {
    return Future.error(
        'Location permissions are permanently denied, we cannot request permissions.');
  }

  try {
    // Force Android to use the Location Manager for better accuracy on certain devices
    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.best,
      timeLimit: const Duration(seconds: 20),
      forceAndroidLocationManager: true,  // Use LocationManager on Android
    );
  } catch (e) {
    // Handle exceptions (like timeout or location service errors)
    return Future.error('Failed to get location: $e');
  }
}





  double _calculateDistance(double lat1, double lon1, double lat2, double lon2) {
  const double p = 0.017453292519943295; // Pi/180 to convert degrees to radians
  double a = 0.5 - cos((lat2 - lat1) * p) / 2 + 
             cos(lat1 * p) * cos(lat2 * p) * 
             (1 - cos((lon2 - lon1) * p)) / 2;
  return 12742 * asin(sqrt(a)); // Distance in kilometers
}

  Future<void> _findNearestPoliceStation() async {
  if (_driverPosition == null) {
    return; // Exit if no driver location is available
  }

  double minDistance = double.infinity;
  String? nearestStationId;
  String? nearestStationEmail;
  String? nearestStationName;

  QuerySnapshot policeStationsSnapshot = await FirebaseFirestore.instance.collection('police_stations').get();

  for (var doc in policeStationsSnapshot.docs) {
    GeoPoint stationLocation = doc['location'];  // Fetch GeoPoint
    double stationLat = stationLocation.latitude;
    double stationLon = stationLocation.longitude;

    double distance = _calculateDistance(_driverPosition!.latitude, _driverPosition!.longitude, stationLat, stationLon);

    if (distance < minDistance) {
      minDistance = distance;
      nearestStationId = doc.id;
      nearestStationEmail = doc['email'];
      nearestStationName = doc['station_name'];
    }
  }

  if (nearestStationId != null && nearestStationEmail != null) {
    setState(() {
      nearestPoliceStationId = nearestStationId;
      nearestPoliceStationEmail = nearestStationEmail;
      nearestPoliceStationName = nearestStationName;  
    });
  }
}


 void _reportAccident() async {
  await _findNearestPoliceStation(); // Find the nearest police station

  if (nearestPoliceStationId == null || nearestPoliceStationEmail == null) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text('Failed to find nearest police station.'),
      backgroundColor: Colors.red,
    ));
    return;
  }

  User? user = FirebaseAuth.instance.currentUser;
  String userId = user?.uid ?? 'unknown_user';

  CollectionReference accidents = FirebaseFirestore.instance.collection('driver_accidents');

  Map<String, dynamic> accidentReport = {
    'description': _descriptionController.text,
    'location': _location,
    'date_time': _dateTime,
    'inform_emergency_contacts': _informEmergencyContacts,
    'driver_id': userId,
    'police_station_id': nearestPoliceStationId,
    'police_station_email': nearestPoliceStationEmail,
  };

  try {
    await accidents.add(accidentReport);

    if (_informEmergencyContacts) {
      print("Informing emergency contacts...");
    }

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text('Accident reported successfully to ${nearestPoliceStationName} Police station!'),
      backgroundColor: Colors.green,
    ));

    // Go back to the previous screen after showing the success message
    Navigator.pop(context);

  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text('Failed to report accident: $e'),
      backgroundColor: Colors.red,
    ));
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Report Accident'),
        backgroundColor: Color(0xFFfbbe00),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Accident Location:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              _location,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Text(
              'Date and Time:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              DateFormat('yyyy-MM-dd – kk:mm').format(_dateTime),
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Expanded(
              child: TextField(
                controller: _descriptionController,
                decoration: InputDecoration(
                  labelText: 'Accident Description (Optional)',
                  border: OutlineInputBorder(),
                ),
                maxLines: null,
                keyboardType: TextInputType.multiline,
              ),
            ),
            SizedBox(height: 16),
            CheckboxListTile(
              title: Text("Inform Emergency Contacts"),
              value: _informEmergencyContacts,
              onChanged: (newValue) {
                setState(() {
                  _informEmergencyContacts = newValue!;
                });
              },
              controlAffinity: ListTileControlAffinity.leading,
              activeColor: Color(0xFFfbbe00),
            ),
            SizedBox(height: 16),
            CheckboxListTile(
              title: Text("Inform Insurance Agent"),
              value: _informEmergencyContacts,
              onChanged: (newValue) {
                setState(() {
                  _informEmergencyContacts = newValue!;
                });
              },
              controlAffinity: ListTileControlAffinity.leading,
              activeColor: Color(0xFFfbbe00),
            ),
            SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: _reportAccident,
                child: Text('Report Accident'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFFfbbe00),
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(vertical: 16, horizontal: 32),
                  textStyle: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
