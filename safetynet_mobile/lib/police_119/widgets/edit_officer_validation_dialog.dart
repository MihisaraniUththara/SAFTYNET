import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:provider/provider.dart';
import '../screens/road_accident_form/accident_report.dart';
import '../services/police_station_provider.dart';

class OfficerValidationDialog extends StatelessWidget {
  final String uniqueIdNo;

  const OfficerValidationDialog({
    Key? key,
    required this.uniqueIdNo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final TextEditingController officerIdController = TextEditingController();

    return AlertDialog(
      title: const Text('Enter Officer ID'),
      content: TextField(
        controller: officerIdController,
        decoration: const InputDecoration(
          hintText: "Enter Officer ID",
          border: OutlineInputBorder(),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: () =>
              _validateAndNavigate(context, officerIdController.text),
          child: const Text('Enter'),
        ),
      ],
    );
  }

  Future<void> _validateAndNavigate(
      BuildContext context, String officerId) async {
    if (officerId.isEmpty) {
      _showError(context, 'Officer ID is required');
      return;
    }

    try {
      final int officerIdAsNumber = int.tryParse(officerId) ?? 0;
      if (officerIdAsNumber == 0 ){
        _showError(context, 'Invalid Officer ID format');
        return;
      }

      final policeStationProvider = context.read<PoliceStationProvider>();
      final station = policeStationProvider.station;
      
      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('traffic')
          .where('station', isEqualTo: station)
          .where('badgeNumber', isEqualTo: officerIdAsNumber)
          .get();


      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      // Get draft data
      String draftId = uniqueIdNo;
      DocumentSnapshot draftSnapshot = await FirebaseFirestore.instance
          .collection('accident_draft')
          .doc(draftId)
          .get();

      if (!draftSnapshot.exists) {
        _showError(context, 'Accident draft not found');
        return;
      }

      // Check if officer ID matches
      final draftData = draftSnapshot.data() as Map<String, dynamic>;
      final savedOfficerId = draftData['officerID'];

      if (savedOfficerId != officerId) {
        _showError(context, 'Officer ID does not match the saved Officer ID');
        return;
      }

      // Navigate to accident form
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => AccidentReportForm(
            officerID: officerId,
            draftData: draftData,
            uniqueIDNo: uniqueIdNo,
          ),
        ),
      );
    } catch (e) {
      _showError(context, 'An error occurred. Please try again.');
    }
  }

  void _showError(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
