import 'dart:async';

import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:audioplayers/audioplayers.dart';
import '../accident_details_page.dart';

class ViewAccidentsCard extends StatefulWidget {
  @override
  _ViewAccidentsCardState createState() => _ViewAccidentsCardState();
}

class _ViewAccidentsCardState extends State<ViewAccidentsCard> {
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
    return InkWell(
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
                    _newNotification ? 'New Accident Reported' : 'View Accidents',
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
    );
  }
}
