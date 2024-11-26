import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:audioplayers/audioplayers.dart';

class StartRidePage extends StatefulWidget {
  @override
  _StartRidePageState createState() => _StartRidePageState();
}

class _StartRidePageState extends State<StartRidePage> {
  GoogleMapController? _mapController;
  Position? _currentPosition;
  AudioPlayer audioPlayer = AudioPlayer();
  bool alertPlayed = false;

  final List<LatLng> accidentProneAreas = [
    LatLng(6.8433, 80.0032),
    LatLng(6.844, 80.0024),
  ];

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  // Method to get continuous location updates
  Future<void> _getCurrentLocation() async {
    Geolocator.getPositionStream(
      locationSettings: LocationSettings(accuracy: LocationAccuracy.high),
    ).listen((Position position) {
      setState(() {
        _currentPosition = position;
      });
      _checkProximityToDangerZone();
    });
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

        if (distance < 500 && !alertPlayed) { // 500 meters radius
          _playAlertSound();
          setState(() {
            alertPlayed = true;
          });
        } else if (distance >= 500) {
          setState(() {
            alertPlayed = false;
          });
        }
      }
    }
  }

  // Play sound alert
  Future<void> _playAlertSound() async {
    await audioPlayer.play(AssetSource('beep.wav'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Driver Ride"),
      ),
      body: _currentPosition == null
          ? Center(child: CircularProgressIndicator())
          : GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
                zoom: 14.0,
              ),
              onMapCreated: (GoogleMapController controller) {
                _mapController = controller;
              },
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
            ),
    );
  }
}
