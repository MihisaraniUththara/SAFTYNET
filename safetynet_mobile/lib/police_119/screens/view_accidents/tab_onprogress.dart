import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/police_station_provider.dart';
import '../../widgets/edit_officer_validation_dialog.dart';

class TabOnProgress extends StatelessWidget {
  const TabOnProgress({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {

    final policeStationProvider = context.read<PoliceStationProvider>();
    final station = policeStationProvider.station;

    return StreamBuilder<QuerySnapshot>(
      stream:
          FirebaseFirestore.instance
          .collection('accident_draft')
          .where('A.A2', isEqualTo: station)
          .snapshots(),
      builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text(
              'Error loading data: ${snapshot.error}',
              style: const TextStyle(color: Colors.red, fontSize: 16),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return const Center(
            child: Text(
              'No on-progress accident reports available.',
              style: TextStyle(fontSize: 18, color: Color.fromARGB(255, 158, 158, 158)),
            ),
          );
        }

        return ListView.builder(
          itemCount: snapshot.data!.docs.length,
          itemBuilder: (context, index) {
            final DocumentSnapshot document = snapshot.data!.docs[index];
            final Map<String, dynamic> data =
                document.data() as Map<String, dynamic>;
            print(data);

            final String uniqueIdNo = data['A']?['A5']?.toString() ?? 'N/A';
            print(data['A']?['A5']);
            final String roadName =
                '${data['A']?['A10']?.toString() ?? ''} ${data['A']?['A11']?.toString() ?? 'unknown'}'
                    .trim();
            final String dateTime =
                '${data['A']?['A3']?.toString() ?? ''} ${data['A']?['A4']?.toString() ?? ''}'
                    .trim();
            final Timestamp createdAtTimestamp =
                data['createdAt'] as Timestamp? ?? Timestamp.now();
            final Timestamp updatedAtTimestamp =
                data['updatedAt'] as Timestamp? ?? Timestamp.now();
            final String createdAt =
                '${DateTime.fromMillisecondsSinceEpoch(createdAtTimestamp.millisecondsSinceEpoch)}'
                    .trim();
            final String updatedAt =
                '${DateTime.fromMillisecondsSinceEpoch(updatedAtTimestamp.millisecondsSinceEpoch)}'
                    .trim();

            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              elevation: 5,
              child: ListTile(
                leading: const Icon(Icons.location_on),
                title: Text('Unique ID No: $uniqueIdNo'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                        'Road Name: ${roadName.isEmpty ? 'unknown' : roadName}'),
                    Text(
                        'Date and Time: ${dateTime.isEmpty ? 'unknown' : dateTime}'),
                    Text(
                        'Created At: ${createdAt.isEmpty ? 'unknown' : createdAt}'),
                    Text(
                        'Updated At: ${updatedAt.isEmpty ? 'unknown' : updatedAt}'),
                  ],
                ),
                trailing: ElevatedButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return OfficerValidationDialog(
                          uniqueIdNo:
                              uniqueIdNo, // Pass the accident number here
                        );
                      },
                    );
                  },
                  child: const Text('Edit'),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
