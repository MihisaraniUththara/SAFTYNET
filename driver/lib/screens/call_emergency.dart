import 'package:driver/screens/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart'; // For making phone calls

class CallEmergencyScreen extends StatelessWidget {
  const CallEmergencyScreen({super.key});

  // Function to initiate a phone call
  Future<void> _makePhoneCall(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    // Function to show the confirmation dialog
    void _showConfirmationDialog() {
      showDialog(
        context: context,
        barrierDismissible: false, // Prevent dismissing by tapping outside
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Are you sure?'),
            content: const Text('Do you want to call 119 now?'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close the dialog
                  _makePhoneCall('tel:119'); // Make the phone call
                },
                child: const Text('Yes'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => MainScreen(),
                    ),
                  );
                },
                child: const Text('No'),
              ),
            ],
          );
        },
      );
    }

    // Show confirmation dialog when the screen is loaded
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _showConfirmationDialog();
    });

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              "assets/images/call.png",
              width: 400,
              height: 200,
            ),
            const SizedBox(height: 20), // Space between image and text
            const Text(
              'Please confirm your action.',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
