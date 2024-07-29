import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:safetynet_mobile/drivers/pages/accident_history.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/inform_insurance.dart';
import 'package:safetynet_mobile/drivers/pages/inform_police.dart';
import 'package:safetynet_mobile/drivers/pages/notification_screen.dart';
import 'package:safetynet_mobile/drivers/pages/start_ride.dart';
import 'profile_screen.dart';
import 'register_vehicle.dart'; // Import the register vehicle page


class DriverHomePage extends StatefulWidget {
  final String fullName;

  DriverHomePage({required this.fullName});

  @override
  _DriverHomePageState createState() => _DriverHomePageState();
}

class _DriverHomePageState extends State<DriverHomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        leadingWidth: 150, // Increase leading width to allow the title to be on the left
        titleSpacing: 0, // Reduce title spacing to align with the left
         automaticallyImplyLeading: false,
        title: Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Image.asset(
                'images/smallLogo.png', // Add your image here
                width: 120,
                height: 60,
                fit: BoxFit.contain,
              ),
            ),
            // const Text(
            //   'SafetyNET',
            //   style: TextStyle(
            //     fontSize: 24, // Set the font size
            //     fontWeight: FontWeight.bold, // Set the font weight
            //     color: Colors.black, // Set the text color
            //   ),
            // ),
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
                crossAxisCount: 3,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                mainAxisSpacing: 16, // Adjust the spacing between rows
                crossAxisSpacing: 16, // Adjust the spacing between columns
                childAspectRatio: 1, // Maintain aspect ratio of cards
                children: [
                  _buildCard(
                      Icons.directions_car, 'Start a Ride', Colors.green, () {
                        Get.to(() => StartRidePage());
                        }),
                   
                  _buildCard(Icons.minor_crash, 'Inform Police', Colors.red,
                      () {
                        Get.to(() => ReportAccidentPage());
                      }), 
                 
                  _buildCard(Icons.contact_page, 'Inform Insurance', Colors.orange,
                      () {
                        Get.to(() => ReportInsurancePage());
                      }),
                  _buildCard(Icons.car_rental, 'Register Vehicle', Colors.blue,
                      () {
                    Get.to(() => RegisterVehiclePage());
                  }),
                  _buildCard(Icons.history, 'Accidents History', Colors.purple,
                      () {
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
                  'images/homedriver.png',
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
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
        selectedItemColor: Color(0xFFfbbe00), // Custom color for selected item
        unselectedItemColor: Colors.grey, // Custom color for unselected items
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });

          switch (index) {
            case 0:
              // Navigate to Home
              Get.to(() => DriverHomePage(fullName: widget.fullName));
              break;
            case 1:
              // Navigate to Activities
               Get.to(() => ActivitiesPage());
              break;
            case 2:
              // Navigate to Notifications
               Get.to(() => NotificationPage());
              break;
            case 3:
              // Navigate to Profile
              Get.to(() => ProfileScreen());
              break;
          }
        },
        type: BottomNavigationBarType.fixed, // Ensures labels are always displayed
      ),
    );
  }

  Future<void> _logout() async {
    await FirebaseAuth.instance.signOut();
    Get.off(LoginScreen()); // Redirect to login screen after logout
  }

  Widget _buildCard(
      IconData icon, String title, Color color, VoidCallback onTap) {
    return Container(
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12), // Reduced corner radius
        ),
        elevation: 3, // Reduced shadow depth
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(8.0), // Reduced padding inside card
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  size: 36,
                  color: color,
                ),
                SizedBox(height: 8), // Reduced space between icon and text
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14, // Reduced text size
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
