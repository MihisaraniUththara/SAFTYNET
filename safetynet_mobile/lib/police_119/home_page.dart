import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../drivers/authentication/login_screen.dart';
import 'view_accidents/widgets/view_accidents_card.dart';
import 'view_accidents/widgets/add_accident_report_card.dart';
import 'services/accident_listener_service.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? divisionName = 'Loading...';
  String? divisionNumber = '';
  String? stationName = 'Loading...';
  String? stationNumber = '';
  String? userEmail;

  @override
  void initState() {
    super.initState();
    _fetchStationDetails();
  }

  Future<void> _fetchStationDetails() async {
    try {
      User? currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) return;

      userEmail = currentUser.email!;

      QuerySnapshot snapshot = await FirebaseFirestore.instance
          .collection('police_stations')
          .where('email', isEqualTo: userEmail)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        var data = snapshot.docs.first.data() as Map<String, dynamic>;
        setState(() {
          divisionName = data['division'] ?? 'Unknown Division';
          divisionNumber = data['dno'] ?? 'Unknown';
          stationName = data['station_name'] ?? 'Unknown Station';
          stationNumber = data['sno'] ?? 'Unknown';
        });
      }
    } catch (e) {
      print('Error fetching station details: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        leadingWidth: 300,
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
            Container(
              height: 15.0,
              color: const Color(0xFFfbbe00),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.black),
            onPressed: () async {
              // Access AccidentListenerService via Provider
               Provider.of<AccidentListenerService>(context, listen: false).dispose();

              // Sign out the user
              await FirebaseAuth.instance.signOut();

              // Navigate to the login screen
              Get.off(LoginScreen());
            },
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60.0),
          child: Container(
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 208, 208, 208),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(20.0),
                topRight: Radius.circular(20.0),
                bottomLeft: Radius.circular(20.0),
                bottomRight: Radius.circular(20.0),
              ),
            ),
            padding:
                const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '$divisionName Division',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      '$stationName Station',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'no : $divisionNumber',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      'no : $stationNumber',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          Container(
            color: const Color(0xFFfbbe00),
            height: 10.0,
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    userEmail == null
                        ? Center(child: CircularProgressIndicator())
                        : ViewAccidentsCard(userEmail: userEmail!),
                    const SizedBox(height: 40),
                    AddAccidentReportCard(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
