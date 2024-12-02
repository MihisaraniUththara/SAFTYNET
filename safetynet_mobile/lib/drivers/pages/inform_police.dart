import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dart:math';
import 'package:geocoding/geocoding.dart';
import 'package:twilio_flutter/twilio_flutter.dart';

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
  bool _informInsuranceAgent = false;
  String? nearestPoliceStationId;
  String? nearestPoliceStationEmail;
  String? nearestPoliceStationName;
  List<Map<String, dynamic>> _vehicles = [];
  String? _selectedVehicleId;

//late TwilioFlutter twilioFlutter;

final TwilioFlutter twilioFlutter = TwilioFlutter(
    accountSid: 'ACf6f9c962abe12e079d4e38ac7d4f9efb', 
    authToken: '3bf39f0bb6a87276a6287b9fad632ec8',   
    twilioNumber: '+12183664378' 
  );

  @override
  void initState() {
    super.initState();
    _getLocation();
    _fetchVehicles();
    //  twilioFlutter = TwilioFlutter(
    //   accountSid: 'ACf6f9c962abe12e079d4e38ac7d4f9efb',
    //   authToken: '3bf39f0bb6a87276a6287b9fad632ec8',
    //   twilioNumber: '+12183664378',
    // );
  }
   
  

  Future<void> _fetchVehicles() async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) return;

    QuerySnapshot vehicleSnapshot = await FirebaseFirestore.instance
        .collection('vehicles')
        .where('driverId', isEqualTo: user.uid)
        .get();

    setState(() {
      _vehicles = vehicleSnapshot.docs
          .map((doc) => {
                'id': doc.id,
                'licensePlate': doc['licensePlate'],
                'agentContactNumber': doc['agentContactNumber'],
              })
          .toList();
    });
  }

 Future<void> _getLocation() async {
  try {
    // Fetch the user's current position
    Position position = await _determinePosition();

    // Fetch the address from coordinates
    List<Placemark> placemarks = await placemarkFromCoordinates(
      position.latitude,
      position.longitude,
    );

    Placemark place = placemarks[0];
    String address = "${place.street}, ${place.locality}, ${place.administrativeArea}, ${place.country}";

    // Update the state to display the human-readable address
    setState(() {
      _driverPosition = position;
      _location = address; // Display the address
    });
  } catch (e) {
    setState(() {
      _location = 'Failed to fetch location: ';
    });
  }
}


  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied.');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    try {
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.best,
        timeLimit: const Duration(seconds: 100),
        forceAndroidLocationManager: true,
      );
    } catch (e) {
      return Future.error('Failed to get location: ');
    }
  }

  double _calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    const double p = 0.017453292519943295;
    double a = 0.5 -
        cos((lat2 - lat1) * p) / 2 +
        cos(lat1 * p) *
            cos(lat2 * p) *
            (1 - cos((lon2 - lon1) * p)) /
            2;
    return 12742 * asin(sqrt(a));
  }

  Future<void> _findNearestPoliceStation() async {
    if (_driverPosition == null) {
      return;
    }

    double minDistance = double.infinity;
    String? nearestStationId;
    String? nearestStationEmail;
    String? nearestStationName;

    QuerySnapshot policeStationsSnapshot =
        await FirebaseFirestore.instance.collection('police_stations').get();

    for (var doc in policeStationsSnapshot.docs) {
      GeoPoint stationLocation = doc['location'];
      double stationLat = stationLocation.latitude;
      double stationLon = stationLocation.longitude;

      double distance = _calculateDistance(_driverPosition!.latitude,
          _driverPosition!.longitude, stationLat, stationLon);

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

  Future<void> _sendSMS(String number, String message) async {
  try {
    TwilioResponse response = await twilioFlutter.sendSMS(
      toNumber: number,
      messageBody: message,
    );
    //print('SMS sent successfully: ${response.messageSid}');
  } catch (e) {
    print('Failed to send SMS: $e');
  }
}


  Future<void> _informContacts() async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) return;

    if (_informEmergencyContacts) {
      DocumentSnapshot driverSnapshot = await FirebaseFirestore.instance
          .collection('drivers')
          .doc(user.uid)
          .get();

      String? emergencyContact = driverSnapshot['emergencyContactNumber'];
      if (emergencyContact != null) {
        print("$emergencyContact");
        String message = 'Emergency! Accident reported at $_location.';
        await _sendSMS(emergencyContact, message);
      }
    }

    if (_informInsuranceAgent && _selectedVehicleId != null) {
      Map<String, dynamic> selectedVehicle = _vehicles.firstWhere(
          (vehicle) => vehicle['id'] == _selectedVehicleId,
          orElse: () => {});
      String? agentContact = selectedVehicle['agentContactNumber'];
      if (agentContact != null) {
        String message =
            'Accident reported for vehicle ${selectedVehicle['licensePlate']} at $_location.';
        await _sendSMS(agentContact, message);
      }
    }
  }

  void _reportAccident() async {
    await _findNearestPoliceStation();

    if (nearestPoliceStationId == null || nearestPoliceStationEmail == null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Failed to find nearest police station.'),
        backgroundColor: Colors.red,
      ));
      return;
    }

    if (_informInsuranceAgent && _selectedVehicleId == null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Please select a vehicle for insurance reporting.'),
        backgroundColor: Colors.red,
      ));
      return;
    }

    User? user = FirebaseAuth.instance.currentUser;
    String userId = user?.uid ?? 'unknown_user';

    // Retrieve the selected vehicle's licensePlate
  String? selectedLicensePlate;
  if (_selectedVehicleId != null) {
    final selectedVehicle = _vehicles.firstWhere(
      (vehicle) => vehicle['id'] == _selectedVehicleId,
      orElse: () => {},
    );
    selectedLicensePlate = selectedVehicle['licensePlate'] as String?;
  }

    CollectionReference accidents =
        FirebaseFirestore.instance.collection('driver_accidents');
    GeoPoint accidentLocation =
        GeoPoint(_driverPosition!.latitude, _driverPosition!.longitude);

    Map<String, dynamic> accidentReport = {
      'description': _descriptionController.text,
      'location': accidentLocation,
      'date_time': _dateTime,
      'inform_emergency_contacts': _informEmergencyContacts,
      'inform_insurance_agent': _informInsuranceAgent,
      'driver_id': userId,
      'police_station_id': nearestPoliceStationId,
      'police_station_email': nearestPoliceStationEmail,
      'selected_vehicle_id': _selectedVehicleId,
      'selected_vehicle_license_plate': selectedLicensePlate,
      'accepted': false,
    };

    try {
      await accidents.add(accidentReport);
       // Call _informContacts after reporting the accident
    await _informContacts();

      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(
            'Accident reported successfully to ${nearestPoliceStationName} Police station!'),
        backgroundColor: Colors.green,
      ));

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
            Text('Accident Location:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Text(_location, style: TextStyle(fontSize: 16)),
            SizedBox(height: 16),
            Text('Date and Time:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Text(DateFormat('yyyy-MM-dd – kk:mm').format(_dateTime), style: TextStyle(fontSize: 16)),
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
              value: _informInsuranceAgent,
              onChanged: (newValue) {
                setState(() {
                  _informInsuranceAgent = newValue!;
                  if (!newValue!) {
                    _selectedVehicleId = null; // Reset selected vehicle if unchecked
                  }
                });
              },
              controlAffinity: ListTileControlAffinity.leading,
              activeColor: Color(0xFFfbbe00),
            ),
            if (_informInsuranceAgent && _vehicles.isNotEmpty)
              DropdownButton<String>(
  hint: Text("Select Vehicle"),
  value: _selectedVehicleId,
  onChanged: (value) {
    setState(() {
      _selectedVehicleId = value;
    });
  },
  items: _vehicles.map<DropdownMenuItem<String>>((vehicle) {
    return DropdownMenuItem<String>(
      value: vehicle['id'] as String,
      child: Text(vehicle['licensePlate'] as String), 
    );
  }).toList(),
),


                
            SizedBox(height: 24),
            Center(
              child: ElevatedButton(
               onPressed: () async {
                // TwilioResponse response = await twilioFlutter.sendSMS(
                // toNumber: '+94774854162', // Replace with recipient's number
                // messageBody: 'Hello from Flutter!');
     
    //await _informContacts();
     _reportAccident();
  },
                child: Text('Report Accident'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFFfbbe00),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}