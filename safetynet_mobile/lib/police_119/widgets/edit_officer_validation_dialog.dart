import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../screens/road_accident_form/accident_report.dart';

class OfficerValidationDialog extends StatelessWidget {
  final String accidentNo;

  const OfficerValidationDialog({
    Key? key,
    required this.accidentNo,
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
          child: const Text('Submit'),
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
      final int officerIdAsNumber = int.tryParse(officerId) ?? -1;
      if (officerIdAsNumber == -1) {
        _showError(context, 'Invalid Officer ID format');
        return;
      }

      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('police')
          .where('badgeNumber', isEqualTo: officerIdAsNumber)
          .limit(1)
          .get();

      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      // Get draft data
      String draftId = "${officerId}_$accidentNo";
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
