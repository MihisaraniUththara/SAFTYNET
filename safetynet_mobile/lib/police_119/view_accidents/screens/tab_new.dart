import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import '../map_toaccident.dart';
import '../widgets/accept_officer_validation_dialog.dart';

class TabNew extends StatelessWidget {
  final VoidCallback accept;
  final String? currentAccidentId;

  TabNew({required this.accept, required this.currentAccidentId});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseFirestore.instance
          .collection('driver_accidents')
          .where('accepted', isEqualTo: false)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text(
              'Error loading data: ${snapshot.error}',
              style: TextStyle(color: Colors.red, fontSize: 16),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return Center(
            child: const Text(
              'No new accidents reported.',
              style: TextStyle(fontSize: 18, color: Colors.grey),
            ),
          );
        }

        var accidents = snapshot.data!.docs;

        return ListView.builder(
          itemCount: accidents.length,
          itemBuilder: (context, index) {
            var accident = accidents[index];

            // Safely check if fields exist before accessing them
            final location = accident.data().containsKey('location')
                ? accident['location']
                : 'Unknown location';
            final dateTime = accident.data().containsKey('date_time')
                ? accident['date_time']
                : 'Unknown time';

            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              elevation: 10,
              child: ListTile(
                leading: const Icon(Icons.location_on),
                title: Text('Accident at $location'),
                subtitle: Text(
                  'Time: $dateTime',
                  style: const TextStyle(fontSize: 14),
                ),
                trailing: ElevatedButton(
                  onPressed: () {
                    print('Opening dialog with accidentId: ${accident.id}');
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return OfficerValidationDialog(
                          accept: accept,
                          accidentId: accident.id, // Ensure this value is correct
                        );
                      },
                    );
                  },
                  child: const Text('Accept'),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
