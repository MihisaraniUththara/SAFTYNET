import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import '../map_toaccident.dart';

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
                    TextEditingController officerIdController =
                        TextEditingController();

                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: const Text('Enter Officer ID'),
                          content: TextField(
                            controller: officerIdController,
                            decoration: const InputDecoration(
                              hintText: "Enter Officer ID",
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop(); // Close dialog
                              },
                              child: const Text('Cancel'),
                            ),
                            TextButton(
                              onPressed: () async {
                                final officerId = officerIdController.text;

                                if (officerId.isNotEmpty) {
                                  // Update Firestore document
                                  await FirebaseFirestore.instance
                                      .collection('driver_accidents')
                                      .doc(accident.id)
                                      .update({
                                    'accepted': true,
                                    'officer_id': officerId,
                                    'accepted_time': DateTime.now(),
                                  });

                                  accept(); // Stop notification sound
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => StartRidePage()),
                                  );
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('Officer ID is required.'),
                                    ),
                                  );
                                }
                              },
                              child: const Text('Submit'),
                            ),
                          ],
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