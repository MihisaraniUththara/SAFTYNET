import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';

Future<void> identifyAccidentProneAreas() async {
  final now = Timestamp.now();
  final oneMonthAgo = Timestamp.fromDate(DateTime.now().subtract(Duration(days: 30)));
  final double radius = 500; // in meters
  final int threshold = 3;

  FirebaseFirestore firestore = FirebaseFirestore.instance;

  // Fetch recent accidents
  QuerySnapshot accidentsSnapshot = await firestore
      .collection('driver_accidents')
      .where('date_time', isGreaterThan: oneMonthAgo)
      .get();

  List<Map<String, dynamic>> accidents = accidentsSnapshot.docs.map((doc) {
    return {
      'location': doc['location'], // GeoPoint
      'date_time': doc['date_time'], // Timestamp
    };
  }).toList();

  // Helper to calculate distances
  double calculateDistance(GeoPoint point1, GeoPoint point2) {
    return Geolocator.distanceBetween(
      point1.latitude,
      point1.longitude,
      point2.latitude,
      point2.longitude,
    );
  }

  // Clustering logic
  List<Map<String, dynamic>> clusters = [];

  for (int i = 0; i < accidents.length; i++) {
    GeoPoint currentLocation = accidents[i]['location'];
    List<Map<String, dynamic>> cluster = accidents
        .where((accident) =>
            calculateDistance(currentLocation, accident['location']) <= radius)
        .toList();

    if (cluster.length >= threshold) {
      clusters.add({
        'center': currentLocation,
        'accident_count': cluster.length,
      });
    }
  }

  // Save clusters to Firestore
  WriteBatch batch = firestore.batch();
  CollectionReference proneAreas = firestore.collection('accident_prone_areas');

  for (var cluster in clusters) {
    batch.set(proneAreas.doc(), {
      'center': cluster['center'],
      'accident_count': cluster['accident_count'],
      'radius': radius,
      'last_updated': now,
    });
  }

  await batch.commit();
}
