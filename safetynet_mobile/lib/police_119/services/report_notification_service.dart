import 'package:cloud_firestore/cloud_firestore.dart';

class ReportNotificationService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String policeStation; // Police station for 119 unit

  ReportNotificationService({required this.policeStation});

  // Stream to listen for notifications for a specific police station
  Stream<List<Map<String, String>>> listenForNotifications() {
    return _firestore
        .collection('accident_report')
        .where('A.A2', isEqualTo: policeStation) // Filter by station 
        .snapshots()
        .map((snapshot) {
      List<Map<String, String>> notifications = [];

      for (var doc in snapshot.docs) {
        final data = doc.data();

        String uniqueIdNumber = data['A']?['A5'] ?? 'Unknown ID';
        String message;
        String title = 'Road Accident Report Notification';

        if (data['submit'] == 0 && data['reject'] == true) {
          message =
              'Road accident report - $uniqueIdNumber was rejected by OIC.';
        } else if (data['submit'] == 0 && data['rejecth'] == true) {
          message =
              'Road accident report - $uniqueIdNumber was rejected by Head Office.';
        } else if (data['submit'] == 1 &&
            data['oicApp'] == 1 &&
            data['headApp'] == 0) {
          message =
              'Road accident report - $uniqueIdNumber was accepted by OIC.';
        } else if (data['submit'] == 1 &&
            data['oicApp'] == 1 &&
            data['headApp'] == 1) {
          message =
              'Road accident report - $uniqueIdNumber was accepted by Head Office.';
        } else {
          continue; // Skip records that do not meet any condition
        }

        notifications.add({
          'title': title,
          'message': message,
          'date': (data['submittedAt'] as Timestamp).toDate().toIso8601String(),
        });
      }

      // Sort notifications by date (latest first)
      notifications.sort((a, b) =>
          DateTime.parse(b['date']!).compareTo(DateTime.parse(a['date']!)));

      return notifications;
    });
  }
}
