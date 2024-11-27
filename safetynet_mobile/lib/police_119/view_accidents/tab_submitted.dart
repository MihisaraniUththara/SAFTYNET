import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class TabSubmitted extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseFirestore.instance
          .collection('accident_report')
          .where('submittedAt', isGreaterThanOrEqualTo: DateTime.now().subtract(Duration(days: 14)))
          .orderBy('submittedAt', descending: true)
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
              style: TextStyle(fontSize: 18, color: Colors.grey),
            ),
          );
        }

        final reports = snapshot.data!.docs;

        return ListView.builder(
          itemCount: reports.length,
          itemBuilder: (context, index) {
            final report = reports[index];

            // Extract data safely
            final accidentNo = report.data().containsKey('A5') ? report['A5'] : 'N/A';
            final oicApp = report.data().containsKey('oicApp') ? report['oicApp'] : 'N/A';
            final submittedAt = report.data().containsKey('submittedAt')
                ? (report['submittedAt'] as Timestamp).toDate()
                : null;
            final officerID = report.data().containsKey('officerID') ? report['officerID'] : 'N/A';

            final a3 = report.data().containsKey('A3') ? report['A3'] : 'N/A';
            final a4 = report.data().containsKey('A4') ? report['A4'] : 'N/A';

            // Combine A3 and A4 as the date-time
            final DateTime = '$a3 $a4';

            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              elevation: 5,
              child: ListTile(
                leading: const Icon(Icons.report),
                title: Text('Accident No: $accidentNo'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('OIC App: $oicApp'),
                    Text('Submitted At: ${submittedAt != null ? submittedAt.toString() : 'N/A'}'),
                    Text('Officer ID: $officerID'),
                    Text('Date and Time: $DateTime'),
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