import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/pages/notification_screen.dart';

import 'home.dart';
import 'profile_screen.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'accident_history.dart'; // Import the Accident History Page

void main() {
  runApp(MaterialApp(
    home: ActivitiesPage(),
  ));
}

class ActivitiesPage extends StatefulWidget {
  @override
  _ActivitiesPageState createState() => _ActivitiesPageState();
}

class _ActivitiesPageState extends State<ActivitiesPage> {
  int _selectedIndex = 1; // Start at Activities tab

  void _onItemTapped(int index) {
    if (_selectedIndex != index) {
      setState(() {
        _selectedIndex = index;
      });

      switch (index) {
        case 0:
          Get.to(() => DriverHomePage(fullName: 'Mihirada')); // Replace with actual data
          break;
        case 1:
          // Stay on Activities Screen
          break;
        case 2:
          Get.to(() => NotificationPage());
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
        title: Text('Activities'),
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
            Text(
              'Ongoing Activity',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            _buildOngoingActivityCard(
              date: '2024-07-25',
              startLocation: 'Location A',
              endLocation: 'Location B',
              status: 'In Progress',
            ),
            SizedBox(height: 16),
            Text(
              'Recent Activities',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Expanded(
              child: ListView(
                children: [
                  _buildActivityCard(
                    date: '2024-07-24',
                    startLocation: 'Location C',
                    endLocation: 'Location D',
                    status: 'Completed',
                  ),
                  _buildActivityCard(
                    date: '2024-07-23',
                    startLocation: 'Location E',
                    endLocation: 'Location F',
                    status: 'Completed',
                  ),
                  _buildActivityCard(
                    date: '2024-07-22',
                    startLocation: 'Location G',
                    endLocation: 'Location H',
                    status: 'Completed',
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
            icon: Icon(Icons.notifications),
            label: 'Notifications',
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

  Widget _buildOngoingActivityCard({
    required String date,
    required String startLocation,
    required String endLocation,
    required String status,
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
                    'Start Location: $startLocation',
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    'End Location: $endLocation',
                    style: TextStyle(fontSize: 14),
                  ),
                ],
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.blue,
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

  Widget _buildActivityCard({
    required String date,
    required String startLocation,
    required String endLocation,
    required String status,
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
                    'Start Location: $startLocation',
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    'End Location: $endLocation',
                    style: TextStyle(fontSize: 14),
                  ),
                ],
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.green,
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
