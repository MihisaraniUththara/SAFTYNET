import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../services/police_station_provider.dart';

class TabSubmitted extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final policeStationProvider = context.read<PoliceStationProvider>();
    final station = policeStationProvider.station;

    return StreamBuilder(
      stream: FirebaseFirestore.instance
          .collection('accident_report')
          .where('A.A2', isEqualTo: station)
          .where('submittedAt',
              isGreaterThanOrEqualTo:
                  DateTime.now().subtract(Duration(days: 14)))
          .snapshots(),
      builder: (context, snapshot) {
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
              'No submitted accident reports in the last 14 days.',
              style: TextStyle(
                  fontSize: 18, color: Color.fromARGB(255, 49, 48, 50)),
            ),
          );
        }

        final reports = snapshot.data!.docs;

        return ListView.builder(
          padding: const EdgeInsets.all(16.0),
          itemCount: reports.length,
          itemBuilder: (context, index) {
            final report = reports[index];
            final data = report.data() as Map<String, dynamic>;

            final accidentNo = data['A']?['A5'] ?? 'N/A';
            final oicApp = data['oicApp'] ?? 'N/A';
            final headApp = data['headApp'] ?? 'N/A';
            final submittedAt = data['submittedAt'] as Timestamp?;
            final submit = data['submit'] ?? 'N/A';
            final officerID = data['officerID'] ?? 'N/A';
            final a3 = data['A']?['A3'] ?? 'N/A';
            final a4 = data['A']?['A4'] ?? 'N/A';

            String formattedDateTime = 'Unknown time';
            if (submittedAt != null) {
              formattedDateTime = DateFormat('HH:mm | dd/MM/yyyy').format(submittedAt.toDate());
            }

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
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: Colors.orange.shade100,
                          child: const Icon(Icons.assignment,
                              size: 24, color: Colors.orange),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Accident No: $accidentNo',
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black87,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                formattedDateTime,
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: Color.fromARGB(255, 87, 86, 86),
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Officer ID: $officerID',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.black87,
                                ),
                              ),
                              Text(
                                'OIC Approval: $oicApp',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.black87,
                                ),
                              ),
                              Text(
                                'Head Office Approval: $headApp',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.black87,
                                ),
                              ),
                              Text(
                                'Submit Status: $submit',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.black87,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}