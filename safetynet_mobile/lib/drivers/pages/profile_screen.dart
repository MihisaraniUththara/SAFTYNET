import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/notification_screen.dart';
import 'package:safetynet_mobile/drivers/pages/bottom_navigation.dart'; // Import the custom BNB
import 'package:safetynet_mobile/drivers/pages/NotificationService.dart';

import 'home.dart'; // Import the Home Page

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

  int _selectedIndex = 2; // Start at Profile tab
   bool _newNotification = false;

  // @override
  // void initState() {
  //   super.initState();
  //   _fetchUserData();
  // }

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  
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
          // Navigate to Notifications Screen
          Get.to(() => NotificationPage());
          break;
        case 2:
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
                readOnly: true,
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _emailController,
                labelText: 'Email',
                validatorMessage: 'Please enter your email',
                readOnly: true, // Make this field read-only
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _nationalIdController,
                labelText: 'National ID',
                validatorMessage: 'Please enter your national ID',
                readOnly: true, // Make this field read-only
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _driverLicenseController,
                labelText: 'Driver License',
                validatorMessage: 'Please enter your driver license',
                readOnly: true, // Make this field read-only
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
       bottomNavigationBar: CustomBottomNavigationBar(
        selectedIndex: _selectedIndex,
        onItemTapped: _onItemTapped,
        showNotificationIndicator: _newNotification, 
      ),
    );
  }

  Widget _buildTextFormField({
    required TextEditingController controller,
    required String labelText,
    required String validatorMessage,
    bool readOnly = false, // Added readOnly parameter
  }) {
    return TextFormField(
      controller: controller,
      readOnly: readOnly, // Set the readOnly property
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
