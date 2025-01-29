import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/police_station_provider.dart';
import '../../widgets/edit_officer_validation_dialog.dart';
import 'package:intl/intl.dart';

class TabOnProgress extends StatelessWidget {
  const TabOnProgress({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final policeStationProvider = context.read<PoliceStationProvider>();
    final station = policeStationProvider.station;

    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
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
          padding: const EdgeInsets.all(16.0),
          itemCount: snapshot.data!.docs.length,
          itemBuilder: (context, index) {
            final DocumentSnapshot document = snapshot.data!.docs[index];
            final Map<String, dynamic> data = document.data() as Map<String, dynamic>;

            final String uniqueIdNo = data['A']?['A5']?.toString() ?? 'N/A';
            final String roadName =
                '${data['A']?['A10']?.toString() ?? ''} ${data['A']?['A11']?.toString() ?? 'unknown'}'.trim();
            final String dateTime =
                '${data['A']?['A3']?.toString() ?? ''} ${data['A']?['A4']?.toString() ?? ''}'.trim();
            final Timestamp createdAtTimestamp =
                data['createdAt'] as Timestamp? ?? Timestamp.now();
            final Timestamp updatedAtTimestamp =
                data['updatedAt'] as Timestamp? ?? Timestamp.now();
            final String createdAt = DateFormat('HH:mm | dd/MM/yyyy').format(
              DateTime.fromMillisecondsSinceEpoch(createdAtTimestamp.millisecondsSinceEpoch),
            );
            final String updatedAt = DateFormat('HH:mm | dd/MM/yyyy').format(
              DateTime.fromMillisecondsSinceEpoch(updatedAtTimestamp.millisecondsSinceEpoch),
            );

            return _buildOnProgressCard(
              context: context,
              uniqueIdNo: uniqueIdNo,
              roadName: roadName,
              dateTime: dateTime,
              createdAt: createdAt,
              updatedAt: updatedAt,
            );
          },
        );
      },
    );
  }

  Widget _buildOnProgressCard({
    required BuildContext context,
    required String uniqueIdNo,
    required String roadName,
    required String dateTime,
    required String createdAt,
    required String updatedAt,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 22,
                  backgroundColor: Colors.orange.shade100,
                  child: const Icon(Icons.incomplete_circle, size: 24, color: Colors.orange),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Unique ID: $uniqueIdNo',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Road Name: $roadName',
                        style: const TextStyle(
                          fontSize: 14,
                          color:  Color.fromARGB(255, 87, 86, 86),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Date & Time: $dateTime',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color.fromARGB(255, 87, 86, 86),
                      ),
                    ),
                    Text(
                      'Created At: $createdAt',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color.fromARGB(255, 87, 86, 86),
                      ),
                    ),
                    Text(
                      'Updated At: $updatedAt',
                      style: const TextStyle(
                        fontSize: 12,
                        color:  Color.fromARGB(255, 87, 86, 86),
                      ),
                    ),
                  ],
                ),
                ElevatedButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return OfficerValidationDialog(
                          uniqueIdNo: uniqueIdNo,
                        );
                      },
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 208, 208, 208),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Edit',
                    style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
