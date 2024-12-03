import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../road_accident_form/accident_report.dart';

class OfficerValidationDialog extends StatelessWidget {

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
          onPressed: () => _validateAndNavigate(
              context, officerIdController.text),
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

      // Validate Officer ID
      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('police')
          .where('badgeNumber', isEqualTo: officerIdAsNumber)
          .limit(1)
          .get();

      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      // Check duty status
      DocumentSnapshot officerSnapshot = officerQuerySnapshot.docs.first;
      final officerData = officerSnapshot.data() as Map<String, dynamic>;
      if (officerData['day'] == true || officerData['night'] == true) {

        final officerIdAsString = officerData['badgeNumber'].toString();

        // Navigate to the Accident Report Form
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => AccidentReportForm(
              officerID: officerIdAsString , // Pass Officer ID
            ),
          ),
        );
      } else {
        _showError(context, 'Officer is off duty today');
      }
    } catch (e) {
      _showError(context, 'An error occurred: ${e.toString()}');
    }
  }

  void _showError(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
