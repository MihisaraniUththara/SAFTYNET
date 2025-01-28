import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<String> calculateARNo() async {
  try {
    // Get the current user email from FirebaseAuth
    final user = FirebaseAuth.instance.currentUser;
    final userEmail = user?.email;

    if (userEmail == null) {
      throw Exception('User is not logged in or email is null.');
    }

    // References to Firestore collection
    final accidentsRef =
        FirebaseFirestore.instance.collection('driver_accidents');

    // Get the current year
    final currentYear = DateTime.now().year;

    // Query Firestore collection
    final querySnapshot = await accidentsRef
        .where('police_station_email', isEqualTo: userEmail) // Check email
        .get();

    // Filter documents based on 'date_time' field and year
    final filteredDocs = querySnapshot.docs.where((doc) {
      final data = doc.data();
      if (data.containsKey('date_time') && data['date_time'] is Timestamp) {
        final timestamp = data['date_time'] as Timestamp;
        final date = timestamp.toDate();
        return date.year == currentYear; // Check if year matches
      }
      return false;
    });

    // Calculate AR-no based on filtered document count
    final arNumber = filteredDocs.length + 1;

    // Format AR-no as a 4-digit string (e.g., "0001")
    return arNumber.toString().padLeft(4, '0');
  } catch (e) {
    print('Error calculating AR-no: $e');
    // Fallback value in case of error
    return '0000';
  }
}
