import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../map_toaccident.dart';

class OfficerValidationDialog extends StatelessWidget {
  final String accidentId;

  const OfficerValidationDialog({
    Key? key,
    required this.accidentId,
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
      // Convert officerId to an integer
      final int officerIdAsNumber = int.tryParse(officerId) ??
          -1; // Use -1 as a fallback for invalid numbers
      if (officerIdAsNumber == -1) {
        _showError(context, 'Invalid Officer ID format');
        return;
      }

      print('Officer ID entered as number: $officerIdAsNumber');

      // Validate Officer ID by checking 'badgeNumber' field
      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('police')
          .where('badgeNumber',
              isEqualTo: officerIdAsNumber) // Compare as number
          .limit(1)
          .get();

      print('Query result: ${officerQuerySnapshot.docs}');

      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      // Officer document found
      DocumentSnapshot officerSnapshot = officerQuerySnapshot.docs.first;
      final officerData = officerSnapshot.data() as Map<String, dynamic>;
      print(officerData);

      print('Officer Day: ${officerData['day']}');
      print('Officer Night: ${officerData['night']}');

      if ((officerData['day'] == true) || (officerData['night'] == true)) {
        DocumentReference accidentDoc = FirebaseFirestore.instance
            .collection('driver_accidents')
            .doc(accidentId);

        // Check if accident exists and update
        accidentDoc.get().then((docSnapshot) async {
          if (docSnapshot.exists) {
            await accidentDoc.update({
              'accepted': true,
              'officer_id': officerIdAsNumber, // Store as number
              'accepted_time': FieldValue.serverTimestamp(),
            });

            Navigator.of(context).pushReplacement(
              MaterialPageRoute(
                builder: (context) => StartRidePage(),
              ),
            );
          } else {
            _showError(context, 'Accident not found.');
          }
        });
      } else {
        _showError(context, 'Officer is off duty today');
        return;
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
