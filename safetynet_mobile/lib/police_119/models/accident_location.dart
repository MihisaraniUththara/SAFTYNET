import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class AccidentLocation {
  final double latitude;
  final double longitude;
  final String? address;

  AccidentLocation({
    required this.latitude,
    required this.longitude,
    this.address,
  });

  LatLng toLatLng() => LatLng(latitude, longitude);

  static AccidentLocation fromGeoPoint(GeoPoint geoPoint) {
    return AccidentLocation(
      latitude: geoPoint.latitude,
      longitude: geoPoint.longitude,
    );
  }
}