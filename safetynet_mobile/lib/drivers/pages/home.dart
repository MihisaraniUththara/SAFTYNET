import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:safetynet_mobile/drivers/pages/accident_history.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/inform_police.dart';
import 'package:safetynet_mobile/drivers/pages/notification_screen.dart';
import 'package:safetynet_mobile/drivers/pages/start_ride.dart';
import 'profile_screen.dart';
import 'register_vehicle.dart';
import 'package:safetynet_mobile/drivers/pages/bottom_navigation.dart'; // Import the custom BNB
import 'package:safetynet_mobile/drivers/pages/NotificationService.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class DriverHomePage extends StatefulWidget {
  final String fullName;

  DriverHomePage({required this.fullName});

  @override
  _DriverHomePageState createState() => _DriverHomePageState();
}

class _DriverHomePageState extends State<DriverHomePage> {
  int _selectedIndex = 0;
  bool _newNotification = false;

  @override
  void initState() {
    super.initState();
  
    String currentUserId = FirebaseAuth.instance.currentUser?.uid ?? ''; // Get user ID from Firebase Auth
    // Get this dynamically from Firebase or a local source
    NotificationService(currentUserId: currentUserId)
      .listenForNewNotifications()
      .listen((hasNewNotification) {
        setState(() {
          _newNotification = hasNewNotification;  // Update the state when a new notification is detected
        });
      });
  }

  Future<void> markNotificationsAsRead(String currentUserId) async {
    try {
      // Get all driver accidents where the current user is the driver
      QuerySnapshot snapshot = await FirebaseFirestore.instance
          .collection('driver_accidents')
          .where('driver_id', isEqualTo: currentUserId)
          .where('read', isEqualTo: false) // Only update unread notifications
          .get();

      // Loop through all documents and update the 'read' field to true
      for (var doc in snapshot.docs) {
        await FirebaseFirestore.instance
            .collection('driver_accidents')
            .doc(doc.id)
            .update({'read': true});
      }
    } catch (e) {
      print("Error updating notifications: $e");
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    // If the Notifications tab is selected, reset the notification indicator
    if (index == 1) {
      setState(() {
        _newNotification = false; // Hide the indicator when navigating to the notifications page
      });

      // Mark notifications as read when navigating to the notifications page
      String currentUserId = FirebaseAuth.instance.currentUser?.uid ?? '';
      if (currentUserId.isNotEmpty) {
        markNotificationsAsRead(currentUserId); // Call the function to mark notifications as read
      }
    }

    switch (index) {
      case 0:
        // Ensure the home page is pushed to the top of the stack
        Get.offAll(() => DriverHomePage(fullName: widget.fullName));
        break;
      case 1:
        Get.to(() => NotificationPage());
        break;
      case 2:
        Get.to(() => ProfileScreen());
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        leadingWidth: 150,
        titleSpacing: 0,
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Image.asset(
                'images/smallLogo.png',
                width: 120,
                height: 60,
                fit: BoxFit.contain,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: _logout,
            child: const Icon(
              Icons.logout,
              color: Colors.black,
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Hello, ${widget.fullName}',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 30),
              GridView.count(
                crossAxisCount: 4,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                mainAxisSpacing: 16,
                crossAxisSpacing: 4,
                childAspectRatio: 0.7,
                children: [
                  _buildCard(Icons.directions_car, 'Start Ride', Colors.green, () {
                    Get.to(() => StartRidePage());
                  }),
                  _buildCard(Icons.minor_crash, 'Inform Police', Colors.red, () {
                    Get.to(() => ReportAccidentPage());
                  }),
                  _buildCard(Icons.car_rental, 'Register Vehicle', Colors.blue, () {
                    Get.to(() => RegisterVehiclePage());
                  }),
                  _buildCard(Icons.history, 'Accident History', Colors.purple, () {
                    Get.to(() => AccidentHistoryPage());
                  }),
                ],
              ),
              SizedBox(height: 16),
              ClipRRect(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
                child: Image.asset(
                  'images/driverhome.png',
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        selectedIndex: _selectedIndex,
        onItemTapped: _onItemTapped,
        showNotificationIndicator: _newNotification, 
      ),
    );
  }

  Future<void> _logout() async {
    await FirebaseAuth.instance.signOut();
    Get.off(LoginScreen());
  }

  Widget _buildCard(IconData icon, String title, Color color, VoidCallback onTap) {
    return Container(
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        elevation: 3,
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  size: 36,
                  color: color,
                ),
                SizedBox(height: 8),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
