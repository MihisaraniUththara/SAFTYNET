import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../screens/road_accident_form/accident_report.dart';

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
              _validateAndNavigate(context, officerIdController.text,uniqueIdNo),
          child: const Text('Enter'),
        ),
      ],
    );
  }

  Future<void> _validateAndNavigate(
      BuildContext context, String officerId, String uniqueIdNo) async {
    if (officerId.isEmpty) {
      _showError(context, 'Officer ID is required');
      return;
    }

    try {
      final int officerIdAsNumber = int.tryParse(officerId) ?? 0;
      if (officerIdAsNumber == 0) {
        _showError(context, 'Invalid Officer ID format');
        return;
      }


      // Validate Officer ID
      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('driver_accidents')
          .where('officer_id', isEqualTo: officerIdAsNumber)
          .where('unique_id_number', isEqualTo: uniqueIdNo)
          .limit(1)
          .get();

      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      DocumentSnapshot officerSnapshot = officerQuerySnapshot.docs.first;
      final officerData = officerSnapshot.data() as Map<String, dynamic>;
      final officerIdAsString = officerData['badgeNumber'].toString();

      // Navigate to the Accident Report Form
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => AccidentReportForm(
            officerID: officerIdAsString, // Pass Officer ID
            uniqueIDNo: uniqueIdNo,
          ),
        ),
      );
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
