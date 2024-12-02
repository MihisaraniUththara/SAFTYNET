import 'package:geocoding/geocoding.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/accident_location.dart';

class LocationService {
  static Future<String> getLocationName(GeoPoint geoPoint) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(
        geoPoint.latitude,
        geoPoint.longitude,
      );
      
      if (placemarks.isNotEmpty) {
        final place = placemarks.first;
        return [
          place.street,
          place.subLocality,
          place.locality,
        ].where((e) => e != null && e.isNotEmpty).join(', ');
      }
    } catch (e) {
      print('Error in reverse geocoding: $e');
    }
    return 'Unknown location';
  }

  static Future<AccidentLocation> getAccidentLocation(GeoPoint geoPoint) async {
    final address = await getLocationName(geoPoint);
    return AccidentLocation(
      latitude: geoPoint.latitude,
      longitude: geoPoint.longitude,
      address: address,
    );
  }
}