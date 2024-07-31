import 'package:flutter/material.dart';
import 'dart:async';
import 'package:audioplayers/audioplayers.dart';
import 'accident_report.dart';
import 'accident_details_page.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xfffbbe00),
        leading: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.menu, color: Colors.black),
              onPressed: () {},
            ),
            /*Image.asset(
              'images/smallLogo.png', // Path to your logo asset
              height: 100.0,
              width: 40.0,
              fit: BoxFit.contain,
            ),*/
          ],
        ),
        title: const Text(
          'SafetyNet',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.notifications, color: Colors.black),
            onPressed: () {},
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.more_vert, color: Colors.black),
          ),
        ],
        elevation: 10.0,
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
                    builder: (context) =>
                        AccidentDetailsPage(accept: () {
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
                            color: _newNotification ? Colors.white : Colors.white),
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
              // Navigate to accident report page
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => AccidentReportForm()),
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
