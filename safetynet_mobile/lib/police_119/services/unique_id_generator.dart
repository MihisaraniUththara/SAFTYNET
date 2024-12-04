import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'police_station_provider.dart';

class UniqueIdGenerator {
  static Future<String> generate(BuildContext context) async {
    final provider = context.read<PoliceStationProvider>();
    final division = provider.divisionNumber; // Example: '01'
    final station = provider.stationNumber;  // Example: '02'

    // Fetch AR No using the previously implemented method
    final arNo = await _calculateARNo();

    // Fetch current year
    final year = DateTime.now().year.toString(); // Example: '2024'

    // Combine into the Unique ID format
    return '$division-$station-$arNo-$year';
  }

  static Future<String> _calculateARNo() async {
    try {
      final accidentDraftCollection =
          FirebaseFirestore.instance.collection('accident_draft');
      final accidentReportCollection =
          FirebaseFirestore.instance.collection('accident_report');

      // Get counts of documents in both collections
      final draftCount = (await accidentDraftCollection.get()).docs.length;
      final reportCount = (await accidentReportCollection.get()).docs.length;

      // Calculate AR No and ensure it's 4 digits
      final arNo = draftCount + reportCount + 1;
      return arNo.toString().padLeft(4, '0');
    } catch (e) {
      print('Error calculating AR No: $e');
      return '0001'; // Default to '0001' in case of an error
    }
  }
}
