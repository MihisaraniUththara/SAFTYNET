import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

import 'home.dart';
import 'profile_screen.dart';
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
  int _selectedIndex = 2; // Start at History tab

  void _onItemTapped(int index) {
    if (_selectedIndex != index) {
      setState(() {
        _selectedIndex = index;
      });

      switch (index) {
        case 0:
          Get.to(() => DriverHomePage(fullName: 'John Doe')); // Replace with actual data
          break;
        case 1:
          // Navigate to Activities Screen
          // Get.to(() => ActivitiesScreen());
          break;
        case 2:
          // Stay on Accident History Screen
          break;
        case 3:
          Get.to(() => ProfileScreen());
          break;
      }
    }
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
            // Vehicle Selection Dropdown
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Choose your vehicle:',
                  style: TextStyle(fontSize: 16),
                ),
                DropdownButton<String>(
                  value: 'Van',
                  items: <String>['Van', 'Truck', 'Car'].map((String value) {
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
                    division: 'Division A',
                    station: 'Station X',
                    arNo: 'AR12345',
                    status: 'Fatal',
                    color: Colors.red,
                  ),
                  _buildAccidentCard(
                    date: '2022-12-15',
                    division: 'Division B',
                    station: 'Station Y',
                    arNo: 'AR54321',
                    status: 'Grievous',
                    color: Colors.orange,
                  ),
                  _buildAccidentCard(
                    date: '2021-11-10',
                    division: 'Division C',
                    station: 'Station Z',
                    arNo: 'AR67890',
                    status: 'Non Grievous',
                    color:  Color(0xFFfbbe00),
                  ),
                  _buildAccidentCard(
                    date: '2020-10-05',
                    division: 'Division D',
                    station: 'Station W',
                    arNo: 'AR09876',
                    status: 'Damage Only',
                    color: Colors.green,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.directions_car),
            label: 'Activities',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history),
            label: 'History',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color(0xFFfbbe00),
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }

  Widget _buildAccidentCard({
    required String date,
    required String division,
    required String station,
    required String arNo,
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
                    'Division: $division',
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    'Station: $station',
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    'AR No: $arNo',
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
