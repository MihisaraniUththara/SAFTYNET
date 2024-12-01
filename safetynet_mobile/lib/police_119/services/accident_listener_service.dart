import 'dart:async';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:audioplayers/audioplayers.dart';

class AccidentListenerService extends ChangeNotifier {
  bool _newAccidentAvailable = false;
  final AudioPlayer _audioPlayer = AudioPlayer();
  StreamSubscription<QuerySnapshot>? _accidentSubscription;

  bool get newAccidentAvailable => _newAccidentAvailable;
  bool _isPlaying = false;

  AccidentListenerService() {
    _startListening();
  }

  void _startListening() {
    //fetch current user email
    final userEmail = FirebaseAuth.instance.currentUser?.email;

    if (userEmail == null) return;

    _accidentSubscription = FirebaseFirestore.instance
        .collection('driver_accidents')
        .where('police_station_email', isEqualTo: userEmail)
        .snapshots()
        .listen((snapshot) {
      bool hasUnacceptedAccidents = snapshot.docs.any((doc) {
        return doc['accepted'] == false;
      });

      if (hasUnacceptedAccidents) {
        _setNewAccidentAvailable(true);
        _playNotificationSound(snapshot); // Pass the snapshot
      } else {
        _setNewAccidentAvailable(false);
        stopNotificationSound();
      }
    });
  }

  void _setNewAccidentAvailable(bool value) {
    if (_newAccidentAvailable != value) {
      _newAccidentAvailable = value;
      notifyListeners(); // Notify UI of changes
    }
  }

  void _playNotificationSound(QuerySnapshot snapshot) async {
    if (_isPlaying) return; // Prevent multiple instances of the sound
    _isPlaying = true;

    do {
      bool hasUnacceptedAccidents = snapshot.docs.any((doc) {
        return doc['accepted'] == false;
      });

      if (hasUnacceptedAccidents) {
        await _audioPlayer.play(AssetSource('sounds/beep.wav'), volume: 1.0);
        await Future.delayed(
            const Duration(seconds: 2)); // Adjust delay if needed
      } else {
        stopNotificationSound();
        break; // Exit the loop when all are accepted
      }
    } while (_isPlaying);
  }

  void stopNotificationSound() {
    if (_isPlaying) {
      _isPlaying = false;
      _audioPlayer.stop();
    }
  }

  @override
  void dispose() {
    _accidentSubscription?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }
}
