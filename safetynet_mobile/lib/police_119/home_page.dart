import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/police_119/view_accidents/screens/report_notification_screen.dart';
import '../drivers/authentication/login_screen.dart';
import 'view_accidents/widgets/view_accidents_card.dart';
import 'view_accidents/widgets/add_accident_report_card.dart';
import 'services/accident_listener_service.dart';
import 'package:provider/provider.dart';
import 'services/police_station_provider.dart';
import 'services/report_notification_service.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? userEmail = FirebaseAuth.instance.currentUser?.email;

  @override
  Widget build(BuildContext context) {
    final policeStationProvider = context.watch<PoliceStationProvider>();

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
            onPressed: () {
              Get.to(() => ReportNotificationScreen(policeStation: policeStationProvider.station));
            },
            icon: Icon(Icons.notifications, color: Colors.black),
          ),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.black),
            onPressed: () async {
              // Access AccidentListenerService via Provider
              Provider.of<AccidentListenerService>(context, listen: false)
                  .dispose();

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
                      '${policeStationProvider.division} Division',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      '${policeStationProvider.station} Station',
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
                      'no : ${policeStationProvider.divisionNumber}',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      'no : ${policeStationProvider.stationNumber}',
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
