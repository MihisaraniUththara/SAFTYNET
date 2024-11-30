import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import '../drivers/authentication/login_screen.dart';
import 'view_accidents/widgets/view_accidents_card.dart';
import 'view_accidents/widgets/add_accident_report_card.dart';

class HomePage extends StatelessWidget {
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
                'images/smallLogo.png', // Add your image here
                width: 120,
                height: 60,
                fit: BoxFit.contain,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.black),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              Get.off(LoginScreen()); // Navigate back to the login screen
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ViewAccidentsCard(),
              const SizedBox(height: 40),
              AddAccidentReportCard(),
            ],
          ),
        ),
      ),
    );
  }
}
