import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:audioplayers/audioplayers.dart';
import 'package:get/get.dart';
import '../drivers/authentication/login_screen.dart';
import 'road_accident_form/accident_report.dart';
import 'accident_details_page.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        leadingWidth:
            150, // Increase leading width to allow the title to be on the left
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
        //elevation: 10.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: AccidentView(),
      ),
    );
  }
}

Future<void> _logout() async {
  await FirebaseAuth.instance.signOut();
  Get.off(LoginScreen()); // Redirect to login screen after logout
}

class AccidentView extends StatefulWidget {
  @override
  _AccidentViewState createState() => _AccidentViewState();
}

class _AccidentViewState extends State<AccidentView> {
  bool _newNotification = false;
  Timer? _timer;
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isAlerting = false;

  @override
  void initState() {
    super.initState();
    // Simulating new accident notification after 5 seconds
    _timer = Timer.periodic(Duration(seconds: 5), (timer) {
      if (!_isAlerting) {
        setState(() {
          _newNotification = true;
        });
        _playNotificationSound();
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
    _timer?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // First Card with blinking effect
          InkWell(
            onTap: () {
              // Handle viewing details
              setState(() {
                _newNotification = false;
                _isAlerting = true;
              });
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => AccidentDetailsPage(accept: () {
                          setState(() {
                            _isAlerting = false;
                            _stopNotificationSound();
                          });
                        })),
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
                            color:
                                _newNotification ? Colors.white : Colors.white),
                        title: Text(
                            _newNotification
                                ? 'New Accident Reported'
                                : 'View Accidents',
                            style: TextStyle(
                                color: _newNotification
                                    ? Colors.white
                                    : Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 25)),
                        subtitle: Text(
                            _newNotification ? 'Click to view details' : '',
                            style: TextStyle(
                                color: _newNotification
                                    ? Colors.white
                                    : Colors.black,
                                fontSize: 15)),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          SizedBox(height: 40), // Space between the cards
          // Second Card as a regular button
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
                          //navigate to the accident form
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
                      title: Text('Add New Accident Report',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          )),
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
