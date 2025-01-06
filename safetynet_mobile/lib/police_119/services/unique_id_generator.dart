import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'police_station_provider.dart';
import '../models/calculate_ar_no.dart';

class UniqueIdGenerator {
  static Future<String> generate(BuildContext context) async {
    final provider = context.read<PoliceStationProvider>();
    final division = provider.divisionNumber; // Example: '01'
    final station = provider.stationNumber; // Example: '02'

    // Fetch AR No using the previously implemented method
    final arNo = await calculateARNo();

    // Fetch current year
    final year = DateTime.now().year.toString(); // Example: '2024'

    // Combine into the Unique ID format
    return '$division-$station-$arNo-$year';
  }
}
