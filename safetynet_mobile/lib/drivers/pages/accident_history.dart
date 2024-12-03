import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:geocoding/geocoding.dart';


class AccidentHistoryPage extends StatefulWidget {
  @override
  _AccidentHistoryPageState createState() => _AccidentHistoryPageState();
}

class _AccidentHistoryPageState extends State<AccidentHistoryPage> {
  // To store the human-readable location
  String humanReadableLocation = "Loading...";

  // Fetch accident data for the logged-in driver
  Stream<QuerySnapshot> getAccidentHistory() {
    String userId = FirebaseAuth.instance.currentUser!.uid;
    return FirebaseFirestore.instance
        .collection('driver_accidents')
        .where('driver_id', isEqualTo: userId) 
        .snapshots();
  }

  Future<void> _logout() async {
    await FirebaseAuth.instance.signOut();
    Get.off(LoginScreen()); // Redirect to login screen after logout
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Driver Accident History'),
        backgroundColor: Color(0xFFfbbe00),
        actions: [
          TextButton(
            onPressed: _logout,
            child: Icon(
              Icons.logout,
              color: Colors.black,
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: getAccidentHistory(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  }
                  if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                    return Center(
                      child: Text(
                        'No accident history found.',
                        style: TextStyle(fontSize: 16),
                      ),
                    );
                  }

                  // Fetch and sort accidents by date_time descending
                  final accidents = snapshot.data!.docs;
                  accidents.sort((a, b) {
                    Timestamp timeA = a['date_time'];
                    Timestamp timeB = b['date_time'];
                    return timeB.compareTo(timeA); // Sort descending
                  });

                  return ListView.builder(
                    itemCount: accidents.length,
                    itemBuilder: (context, index) {
                      final accident = accidents[index];
                      return _buildAccidentCard(
                        dateTime: accident['date_time'],
                        location: accident['location'] as GeoPoint,
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Update the location fetching logic to use FutureBuilder
  Widget _buildAccidentCard({required Timestamp dateTime, required GeoPoint location}) {
    final DateTime date = dateTime.toDate();

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Date: ${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              'Time: ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}',
              style: TextStyle(fontSize: 14),
            ),
            SizedBox(height: 8),
            // Use FutureBuilder to fetch the human-readable location
            FutureBuilder<String>(
              future: _getHumanReadableLocation(location.latitude, location.longitude),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Text("Loading location...");
                }
                if (snapshot.hasError) {
                  return Text("Error fetching location");
                }
                return Text(
                  'Location: ${snapshot.data}',
                  style: TextStyle(fontSize: 14),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<String> _getHumanReadableLocation(double latitude, double longitude) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(latitude, longitude);
      Placemark place = placemarks.first;

      // Construct the address string
      return "${place.street}, ${place.locality}, ${place.administrativeArea}, ${place.country}";
    } catch (e) {
      return "Unknown location";
    }
  }
}
