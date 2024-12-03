import 'package:cloud_firestore/cloud_firestore.dart';

Future<String> calculateARNo() async {
  try {
    // References to Firestore collections
    final accidentDraftRef = FirebaseFirestore.instance.collection('accident_draft');
    final accidentReportRef = FirebaseFirestore.instance.collection('accident_report');

    // Get the current year
    final currentYear = DateTime.now().year;

    // Filter documents based on the current year for both collections
    final accidentDraftCount = (await accidentDraftRef
            .where('year', isEqualTo: currentYear) 
            .get())
        .docs
        .length;
    final accidentReportCount = (await accidentReportRef
            .where('year', isEqualTo: currentYear) 
            .get())
        .docs
        .length;

    // Calculate AR-no
    int arNumber = accidentDraftCount + accidentReportCount + 1;

    // Format AR-no as a 4-digit string (e.g., "0001")
    return arNumber.toString().padLeft(4, '0');
  } catch (e) {
    print('Error calculating AR-no: $e');
    // Fallback value in case of error
    return '0000';
  }
}
