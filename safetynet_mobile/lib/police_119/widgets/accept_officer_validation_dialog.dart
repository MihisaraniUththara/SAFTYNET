import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import '../models/accident_location.dart';
import '../services/unique_id_generator.dart';
import '../screens/view_accidents/map_toaccident.dart';
import '../services/police_station_provider.dart';

class OfficerValidationDialog extends StatelessWidget {
  final String accidentId;
  final AccidentLocation accidentLocation;

  const OfficerValidationDialog({
    Key? key,
    required this.accidentId,
    required this.accidentLocation,
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
      onSubmitted: (value) =>
        _validateAndNavigate(context, officerIdController.text),
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
      //final int officerIdAsNumber = int.tryParse(officerId) ?? 0;
     /* if (officerIdAsNumber == 0) {
        _showError(context, 'Invalid Officer ID format');
        return;
      }*/

      final policeStationProvider = context.read<PoliceStationProvider>();
      final station = policeStationProvider.station;

      QuerySnapshot officerQuerySnapshot = await FirebaseFirestore.instance
          .collection('traffic')
          .where('station', isEqualTo: station)
          .where('badgeNumber', isEqualTo: officerId)
          .get();

      if (officerQuerySnapshot.docs.isEmpty) {
        _showError(context, 'Invalid Officer ID');
        return;
      }

      DocumentSnapshot officerSnapshot = officerQuerySnapshot.docs.first;
      final officerData = officerSnapshot.data() as Map<String, dynamic>;

      if (officerData['day'] == true || officerData['night'] == true) {
        DocumentReference accidentDoc = FirebaseFirestore.instance
            .collection('driver_accidents')
            .doc(accidentId);

        final uniqueIdNumber = await UniqueIdGenerator.generate(context);

        accidentDoc.get().then((docSnapshot) async {
          if (docSnapshot.exists) {
            await accidentDoc.update({
              'accepted': true,
              'officer_id': officerId,
              'accepted_time': FieldValue.serverTimestamp(),
              'unique_id_number': uniqueIdNumber,
              'reported': false,
            });

            // Show popup with unique ID
            showDialog(
              context: context,
              builder: (context) {
              return AlertDialog(
                backgroundColor: const Color.fromARGB(255, 26, 210, 57),
                shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
                ),
                contentPadding: const EdgeInsets.all(20.0),
                content: Stack(
                children: [
                  Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                    "Unique ID Number : $uniqueIdNumber",
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                    "This Unique ID Number is wanted to add a report. Keep it in memory.",
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                    ),
                  ],
                  ),
                  Positioned(
                  top: -10,
                  right: -10,
                  child: IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: () {
                    Navigator.of(context).pop(); // Close dialog
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                      builder: (context) => StartRidePage(
                        accidentLocation: accidentLocation,
                      ),
                      ),
                    );
                    },
                    color: const Color.fromARGB(255, 6, 5, 5),
                  ),
                  ),
                ],
                ),
              );
              },
            );
          } else {
            _showError(context, 'Accident not found.');
          }
        });
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
