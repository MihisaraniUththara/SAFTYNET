import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';

void main() {
  runApp(MaterialApp(
    home: AccidentHistoryPage(),
  ));
}

class AccidentHistoryPage extends StatefulWidget {
  @override
  _AccidentHistoryPageState createState() => _AccidentHistoryPageState();
}

class _AccidentHistoryPageState extends State<AccidentHistoryPage> {
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
        // Uncomment the following lines if you want to add a logout button
        // actions: [
        //   TextButton(
        //     onPressed: _logout,
        //     child: Icon(
        //       Icons.logout,
        //       color: Colors.black,
        //     ),
        //   ),
        // ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Vehicle Selection Dropdown
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Choose your vehicle:',
                  style: TextStyle(fontSize: 16),
                ),
                DropdownButton<String>(
                  value: 'KH9024',
                  items: <String>['KH9024', 'CAA1789', 'ND4957'].map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    // Handle vehicle selection change
                  },
                ),
              ],
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  _buildAccidentCard(
                    date: '2023-01-01',
                    time: '14:30',
                    location: '1st Lane, Kirulapone',
                    status: 'Fatal',
                    color: Colors.red,
                  ),
                  _buildAccidentCard(
                    date: '2022-12-15',
                    time: '09:15',
                    location: 'Highlevel Road, Nugegoda',
                    status: 'Grievous',
                    color: Colors.orange,
                  ),
                  _buildAccidentCard(
                    date: '2021-11-10',
                    time: '17:45',
                    location: 'Market St, Homagama',
                    status: 'Non Grievous',
                    color: Color(0xFFfbbe00),
                  ),
                  _buildAccidentCard(
                    date: '2020-10-05',
                    time: '08:00',
                    location: '5th Ave, Maharagama',
                    status: 'Damage Only',
                    color: Colors.green,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAccidentCard({
    required String date,
    required String time,
    required String location,
    required String status,
    required Color color,
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Date: $date',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Time: $time',
                    style: TextStyle(fontSize: 14),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Location: $location',
                    style: TextStyle(fontSize: 14),
                  ),
                ],
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                status,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
