import 'dart:async'; // For Timer
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class StartRidePage extends StatefulWidget {
  @override
  _StartRidePageState createState() => _StartRidePageState();
}

class _StartRidePageState extends State<StartRidePage> {
  GoogleMapController? _mapController;
  Position? _currentPosition;
  AudioPlayer audioPlayer = AudioPlayer();
  bool alertPlayed = false;
  bool rideStarted = false;
  List<LatLng> accidentProneAreas = []; // List to hold dynamic accident prone areas

  late StreamSubscription<Position> positionStream;

  @override
  void initState() {
    super.initState();
    _initializeLocationServices();
    _loadAccidentProneAreas(); // Load accident-prone areas on initialization
  }

  // Initialize location services
  Future<void> _initializeLocationServices() async {
    await _checkLocationPermissions();
  }

  // Method to check and request location permissions
  Future<void> _checkLocationPermissions() async {
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      permission = await Geolocator.requestPermission();
      if (permission != LocationPermission.always &&
          permission != LocationPermission.whileInUse) {
        throw Exception("Location permissions are denied");
      }
    }
  }

  // Load accident-prone areas from Firestore
  Future<void> _loadAccidentProneAreas() async {
    FirebaseFirestore firestore = FirebaseFirestore.instance;

    try {
      QuerySnapshot snapshot = await firestore.collection('accident_prone_areas').get();
      
      if (snapshot.docs.isEmpty) {
        print("No accident-prone areas found.");
      } else {
        List<LatLng> loadedAreas = snapshot.docs.map((doc) {
          GeoPoint location = doc['center']; // 'center' should be a GeoPoint
          return LatLng(location.latitude, location.longitude);
        }).toList();

        setState(() {
          accidentProneAreas = loadedAreas; // Update accident-prone areas list
          print("Loaded accident-prone areas: $accidentProneAreas");
        });
      }
    } catch (e) {
      print("Error fetching accident-prone areas: $e");
    }
  }

  void _startRide() {
    setState(() {
      rideStarted = true;
    });
    _getCurrentLocation();
  }

  void _stopRide() {
    setState(() {
      rideStarted = false;
      alertPlayed = false; // Reset alert state
    });
    positionStream.cancel(); // Stop the location stream when the ride is stopped
    audioPlayer.stop(); // Stop the sound when the ride ends
  }

  // Method to start getting continuous location updates
  Future<void> _getCurrentLocation() async {
    if (rideStarted) {
      positionStream = Geolocator.getPositionStream(
        locationSettings: LocationSettings(accuracy: LocationAccuracy.high),
      ).listen((Position position) {
        if (rideStarted) {
          setState(() {
            _currentPosition = position;
          });
          _checkProximityToDangerZone(); // Check proximity with each location update
        }
      });
    }
  }

  // Check proximity to accident-prone areas
  void _checkProximityToDangerZone() {
    if (_currentPosition != null) {
      for (var dangerZone in accidentProneAreas) {
        double distance = Geolocator.distanceBetween(
          _currentPosition!.latitude,
          _currentPosition!.longitude,
          dangerZone.latitude,
          dangerZone.longitude,
        );

        if (distance < 500 && !alertPlayed) { // If within 500 meters
          _playAlertSound();
          setState(() {
            alertPlayed = true; // Mark the alert as played
          });
        } else if (distance >= 500 && alertPlayed) { // If out of the 500 meters
          setState(() {
            alertPlayed = false; // Reset alert state
          });
          audioPlayer.stop(); // Stop the sound when out of the danger zone
        }
      }
    }
  }

  // Play alert sound when entering the danger zone
  Future<void> _playAlertSound() async {
    try {
      await audioPlayer.setReleaseMode(ReleaseMode.loop); // Play in loop mode
      await audioPlayer.play(AssetSource('sounds/beep.wav'), volume: 1.0);
    } catch (e) {
      print("Error playing sound: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Driver Ride"),
      ),
      body: Stack(
        children: [
          _currentPosition == null
              ? Center(child: CircularProgressIndicator())
              : GoogleMap(
                  initialCameraPosition: CameraPosition(
                    target: LatLng(
                      _currentPosition!.latitude,
                      _currentPosition!.longitude,
                    ),
                    zoom: 14.0,
                  ),
                  onMapCreated: (GoogleMapController controller) {
                    _mapController = controller;
                  },
                  myLocationEnabled: true,
                  myLocationButtonEnabled: true,
                  circles: Set<Circle>.of(_createDangerZoneCircles()), // Circles based on loaded accident-prone areas
                ),
          Positioned(
            bottom: 20,
            left: 20,
            right: 20,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: rideStarted ? null : _startRide,
                  child: Text("Start Ride"),
                ),
                ElevatedButton(
                  onPressed: rideStarted ? _stopRide : null,
                  child: Text("Stop Ride"),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Create danger zone circles on the map based on accident-prone areas
  List<Circle> _createDangerZoneCircles() {
    return accidentProneAreas.map((LatLng dangerZone) {
      return Circle(
        circleId: CircleId(dangerZone.toString()),
        center: dangerZone,
        radius: 500, // 500 meters
        fillColor: Colors.red.withOpacity(0.5),
        strokeColor: Colors.red,
        strokeWidth: 2,
      );
    }).toList();
  }
}
