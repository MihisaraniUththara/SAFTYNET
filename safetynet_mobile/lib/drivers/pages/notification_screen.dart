import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/home.dart';
import 'package:safetynet_mobile/drivers/pages/profile_screen.dart';

class NotificationPage extends StatefulWidget {
  @override
  _NotificationPageState createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  int _selectedIndex = 2; // Start at Notifications tab

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
          Get.to(() => ActivitiesPage());
          break;
        case 2:
          // Stay on Notifications Screen
          break;
        case 3:
          Get.to(() => ProfileScreen());
          break;
      }
    }
  }

  Widget _buildNotificationCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required String date,
    required Color color,
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color,
          child: Icon(icon, color: Colors.white),
        ),
        title: Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: Text(date, style: TextStyle(color: Colors.grey)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifications'),
        backgroundColor: Color(0xFFfbbe00),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            SizedBox(height: 8),
            Text(
              'Today',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            _buildNotificationCard(
              title: 'Accident Prone Area',
              subtitle: 'High accident risk at Main St.',
              icon: Icons.warning,
              date: '08:09 AM',
              color: Colors.red,
            ),
            SizedBox(height: 16),
            Text(
              '28 Jul 2024',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            _buildNotificationCard(
              title: 'Ride Completed',
              subtitle: 'From Location A to Location B',
              icon: Icons.check_circle,
              date: '09:31 AM',
              color: Colors.green,
            ),
            SizedBox(height: 16),
            Text(
              '25 Jul 2024',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            _buildNotificationCard(
              title: 'Accident Prone Area',
              subtitle: 'High accident risk at Elm St.',
              icon: Icons.warning,
              date: '05:07 PM',
              color: Colors.red,
            ),
            _buildNotificationCard(
              title: 'Ride Completed',
              subtitle: 'From Location C to Location D',
              icon: Icons.check_circle,
              date: '04:00 PM',
              color: Colors.green,
            ),
            SizedBox(height: 16),
            Text(
              '24 Jul 2024',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            _buildNotificationCard(
              title: 'Accident Prone Area',
              subtitle: 'High accident risk at Pine St.',
              icon: Icons.warning,
              date: '11:05 AM',
              color: Colors.red,
            ),
            _buildNotificationCard(
              title: 'Ride Completed',
              subtitle: 'From Location E to Location F',
              icon: Icons.check_circle,
              date: '06:42 AM',
              color: Colors.green,
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
}
