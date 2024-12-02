import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PoliceStationProvider extends ChangeNotifier {
  String division = 'Unknown Division';
  String divisionNumber = 'Unknown';
  String station = 'Unknown Station';
  String stationNumber = 'Unknown';

  PoliceStationProvider() {
    fetchPoliceStationDetails();
  }

  Future<void> fetchPoliceStationDetails() async {
    try {
      final userEmail = FirebaseAuth.instance.currentUser?.email;

      if (userEmail == null) return;

      QuerySnapshot querySnapshot = await FirebaseFirestore.instance
          .collection('police_stations')
          .where('email', isEqualTo: userEmail)
          .limit(1)
          .get();

      if (querySnapshot.docs.isNotEmpty) {
        final data = querySnapshot.docs.first.data() as Map<String, dynamic>;

        division = data['division'] ?? 'Unknown Division';
        divisionNumber = (data['dno'] ?? 'Unknown').toString();
        station = data['station_name'] ?? 'Unknown Station';
        stationNumber = (data['sno'] ?? 'Unknown').toString();

        notifyListeners(); // Notify widgets of changes
      }
    } catch (e) {
      print('Error fetching details: $e');
    }
  }
}
