import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:audioplayers/audioplayers.dart';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../drivers/authentication/login_screen.dart';
import 'road_accident_form/accident_report.dart';
import 'view_accidents/accident_details_page.dart';

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
        child: AccidentView(),
      ),
    );
  }
}

class AccidentView extends StatefulWidget {
  @override
  _AccidentViewState createState() => _AccidentViewState();
}

class _AccidentViewState extends State<AccidentView> {
  bool _newNotification = false;
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isAlerting = false;
  StreamSubscription<QuerySnapshot>? _accidentSubscription;
  DateTime? _lastAccidentTime;

  @override
  void initState() {
    super.initState();
    _setupAccidentListener();
  }

  void _setupAccidentListener() {
    _accidentSubscription = FirebaseFirestore.instance
        .collection('driver_accidents')
        .orderBy('date_time', descending: true)
        .limit(1)
        .snapshots()
        .listen((snapshot) {
      if (snapshot.docs.isNotEmpty) {
        final latestAccident = snapshot.docs.first;
        final dateTime = latestAccident['date_time'] as Timestamp;
        final accidentTime = dateTime.toDate();

        if (_lastAccidentTime == null || accidentTime.isAfter(_lastAccidentTime!)) {
          _lastAccidentTime = accidentTime;
          if (!_isAlerting) {
            setState(() {
              _newNotification = true;
            });
            _playNotificationSound();
          }
        }
      }
    });
  }

  void _playNotificationSound() async {
    await _audioPlayer.play(AssetSource('sounds/beep.wav'), volume: 1.0);
  }

  void _stopNotificationSound() {
    _audioPlayer.stop();
  }

  @override
  void dispose() {
    _accidentSubscription?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Card for Viewing Accident Details
          InkWell(
            onTap: () {
              setState(() {
                _newNotification = false;
                _isAlerting = true;
              });
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => AccidentDetailsPage(
                    accept: () {
                      setState(() {
                        _isAlerting = false;
                        _stopNotificationSound();
                      });
                    },
                  ),
                ),
              );
            },
            child: AnimatedContainer(
              duration: Duration(seconds: 1),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25.0),
                boxShadow: _newNotification
                    ? [
                        BoxShadow(
                          color: Colors.red,
                          blurRadius: 10.0,
                          spreadRadius: 2.0,
                        ),
                      ]
                    : null,
              ),
              curve: Curves.easeInOut,
              child: SizedBox(
                height: 200,
                width: 300,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25.0),
                  ),
                  elevation: 20,
                  color: _newNotification ? Colors.red : Colors.white,
                  shadowColor: _newNotification ? Colors.red : Colors.black,
                  borderOnForeground: true,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ListTile(
                        leading: Icon(Icons.warning,
                            color: _newNotification ? Colors.white : Colors.white),
                        title: Text(
                          _newNotification
                              ? 'New Accident Reported'
                              : 'View Accidents',
                          style: TextStyle(
                            color: _newNotification ? Colors.white : Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                        subtitle: Text(
                          _newNotification ? 'Click to view details' : '',
                          style: TextStyle(
                            color: _newNotification ? Colors.white : Colors.black,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 40), // Spacing
          // Card for Adding New Accident Report
          InkWell(
            onTap: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  TextEditingController _officerId = TextEditingController();
                  return AlertDialog(
                    title: const Text('Enter Officer ID'),
                    content: TextField(
                      controller: _officerId,
                      decoration:
                          const InputDecoration(hintText: "Enter Officer ID"),
                    ),
                    actions: [
                      // Cancel Button
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop(); // Closes the dialog
                        },
                        child: const Text('Cancel'),
                      ),

                      // Submit Button
                      TextButton(
                        onPressed: () {
                          String officerID = _officerId.text;

                          // Navigate to the Accident Report Form
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => AccidentReportForm(
                                  officerID: officerID), // Pass the Officer ID
                            ),
                          );
                        },
                        child: const Text('Submit'),
                      ),
                    ],
                  );
                },
              );
            },
            child: SizedBox(
              height: 200,
              width: 300,
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(25.0),
                ),
                elevation: 20,
                surfaceTintColor: const Color(0xfffbbe00),
                shadowColor: Colors.black,
                borderOnForeground: true,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ListTile(
                      title: Text(
                        'Add New Accident Report',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 25,
                        ),
                      ),
                    ),
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
