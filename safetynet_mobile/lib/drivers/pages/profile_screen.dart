import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/notification_screen.dart';

import 'home.dart'; // Import the Home Page
// Import other screens such as ActivitiesScreen and NotificationsScreen

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _nationalIdController = TextEditingController();
  final _driverLicenseController = TextEditingController();
  final _phoneNumberController = TextEditingController();
  final _emergencyNameController = TextEditingController();
  final _emergencyPhoneNumberController = TextEditingController();

  int _selectedIndex = 3; // Start at Profile tab

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      DocumentSnapshot userDoc = await FirebaseFirestore.instance
          .collection('drivers')
          .doc(user.uid)
          .get();
      if (userDoc.exists) {
        setState(() {
          _nameController.text = userDoc['fullName'];
          _emailController.text = userDoc['email'];
          _nationalIdController.text = userDoc['nationalId'];
          _driverLicenseController.text = userDoc['driverLicense'];
          _phoneNumberController.text = userDoc['phoneNumber'];
          _emergencyNameController.text = userDoc['emergencyContactName'];
          _emergencyPhoneNumberController.text =
              userDoc['emergencyContactNumber'];
        });
      }
    }
  }

  Future<void> _saveUserData() async {
    if (_formKey.currentState!.validate()) {
      User? user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        await FirebaseFirestore.instance
            .collection('drivers')
            .doc(user.uid)
            .update({
          'fullName': _nameController.text.trim(),
          'email': _emailController.text.trim(),
          'nationalId': _nationalIdController.text.trim(),
          'driverLicense': _driverLicenseController.text.trim(),
          'phoneNumber': _phoneNumberController.text.trim(),
          'emergencyContactName': _emergencyNameController.text.trim(),
          'emergencyContactNumber': _emergencyPhoneNumberController.text.trim(),
        });
        Get.snackbar(
          "Success",
          "Profile updated successfully",
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        
      }
    }
  }

  Future<void> _logout() async {
    await FirebaseAuth.instance.signOut();
    Get.off(LoginScreen()); // Redirect to login screen after logout
  }

  void _onItemTapped(int index) {
    if (_selectedIndex != index) {
      setState(() {
        _selectedIndex = index;
      });

      switch (index) {
        case 0:
          Get.to(() => DriverHomePage(fullName: _nameController.text));
          break;
        case 1:
          // Navigate to Activities Screen
          Get.to(() => ActivitiesPage());
          break;
        case 2:
          // Navigate to Notifications Screen
           Get.to(() => NotificationPage());
          break;
        case 3:
          // Stay on Profile Screen
          break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
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
        child: Form(
          key: _formKey,
          child: ListView(
           
            children: [
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _nameController,
                labelText: 'Full Name',
                validatorMessage: 'Please enter your full name',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _emailController,
                labelText: 'Email',
                validatorMessage: 'Please enter your email',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _nationalIdController,
                labelText: 'National ID',
                validatorMessage: 'Please enter your national ID',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _driverLicenseController,
                labelText: 'Driver License',
                validatorMessage: 'Please enter your driver license',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _phoneNumberController,
                labelText: 'Phone Number',
                validatorMessage: 'Please enter your phone number',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _emergencyNameController,
                labelText: 'Emergency Contact Name',
                validatorMessage: 'Please enter emergency contact name',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _emergencyPhoneNumberController,
                labelText: 'Emergency Contact Number',
                validatorMessage: 'Please enter emergency contact number',
              ),
              SizedBox(height: 24),
              ElevatedButton(
              onPressed: _saveUserData,
              child: Text('Save'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFfbbe00), // Button background color
                padding: EdgeInsets.symmetric(vertical: 16), // Padding for button
                textStyle: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                foregroundColor: Colors.white, // Explicitly set the text color
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
        selectedItemColor: Color(0xFFfbbe00),
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }

  Widget _buildTextFormField({
    required TextEditingController controller,
    required String labelText,
    required String validatorMessage,
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        border: OutlineInputBorder(),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Color(0xFFfbbe00)),
        ),
      ),
      validator: (value) => value!.isEmpty ? validatorMessage : null,
    );
  }

 
}
