import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import '../home_page.dart';

class StartRidePage extends StatefulWidget {
  @override
  _StartRidePageState createState() => _StartRidePageState();
}

class _StartRidePageState extends State<StartRidePage> {
  final LatLng accidentLocation = LatLng(6.9271, 79.8612); // Example location
  GoogleMapController? _mapController;

  Future<void> _openGoogleMaps(LatLng location) async {
    final latitude = location.latitude;
    final longitude = location.longitude;

    final googleMapsUrl =
        'https://www.google.com/maps/dir/?api=1&destination=$latitude,$longitude&travelmode=driving';

    if (await canLaunch(googleMapsUrl)) {
      await launch(googleMapsUrl);
    } else {
      throw 'Could not open Google Maps.';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        title: const Text('Accident Location', style: TextStyle(color: Colors.black)),
      ),
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: accidentLocation,
              zoom: 15.0,
            ),
            markers: {
              Marker(
                markerId: MarkerId('accidentLocation'),
                position: accidentLocation,
                infoWindow: const InfoWindow(title: 'Accident Location'),
              ),
            },
            onMapCreated: (controller) {
              _mapController = controller;
            },
          ),
          Positioned(
            top: 16,
            left: 16,
            right: 16,
            child: Container(
              padding: const EdgeInsets.all(8.0),
              color: Colors.white,
              child: const Text(
                'Accident Location is 500m ahead',
                style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Positioned(
            bottom: 16,
            left: 16,
            right: 16,
            child: Center(
              child: Column(
                children: [
                  ElevatedButton.icon(
                    onPressed: () => _openGoogleMaps(accidentLocation),
                    icon: const Icon(Icons.navigation),
                    label: const Text("Open in Google Maps"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    ),
                  ),
                  const SizedBox(height: 10),
                  FloatingActionButton(
                    onPressed: () {
                      _showConfirmationDialog(context);
                    },
                    backgroundColor: Colors.red,
                    child: const Text(
                      'STOP',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showConfirmationDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm'),
          content: const Text('Are you sure you want to stop?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dismiss the dialog
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                // Add stop logic here
                Get.offAll(HomePage());
              },
              child: const Text('Yes'),
            ),
          ],
        );
      },
    );
  }
}
