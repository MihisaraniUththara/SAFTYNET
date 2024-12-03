import 'package:cloud_firestore/cloud_firestore.dart';

class NotificationService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String currentUserId;  // Assuming you have the current user's ID available

  NotificationService({required this.currentUserId});

  // Stream to listen for updates where 'accepted' field is true and 'read' is false
  Stream<bool> listenForNewNotifications() {
  return _firestore
      .collection('driver_accidents')
      .where('driver_id', isEqualTo: currentUserId)  // Match current user
      .where('accepted', isEqualTo: true)             // Accepted field is true
      .where('read', isEqualTo: false)                 // Read field is false
      .snapshots()
      .map((snapshot) {
        // If there is at least one document with the above conditions
        return snapshot.docs.isNotEmpty;
      });
}

}
