import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import '../home_page.dart';
import '../../models/accident_location.dart';

class StartRidePage extends StatefulWidget {
  final AccidentLocation accidentLocation;

  const StartRidePage({
    Key? key,
    required this.accidentLocation,
  }) : super(key: key);

  @override
  _StartRidePageState createState() => _StartRidePageState();
}

class _StartRidePageState extends State<StartRidePage> {
  GoogleMapController? _mapController;

  Future<void> _openGoogleMaps() async {
    final latitude = widget.accidentLocation.latitude;
    final longitude = widget.accidentLocation.longitude;
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
    final location = widget.accidentLocation.toLatLng();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFfbbe00),
        title: const Text(
          'Accident Location',
          style: TextStyle(
            color: Colors.black,
            fontSize: 25.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: location,
              zoom: 15.0,
            ),
            markers: {
              Marker(
                markerId: const MarkerId('accidentLocation'),
                position: location,
                infoWindow: InfoWindow(
                  title: 'Accident Location',
                  snippet: widget.accidentLocation.address,
                ),
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
              child: Text(
                'Location: ${widget.accidentLocation.address ?? "UCSC Building Complex,Colombo"}',
                style: const TextStyle(
                    color: Colors.red, fontWeight: FontWeight.bold),
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
                mainAxisSize: MainAxisSize.min,
                children: [
                  ElevatedButton.icon(
                    onPressed: _openGoogleMaps,
                    icon: const Icon(Icons.navigation),
                    label: const Text(
                      "Open in Google Maps",
                      style: TextStyle(color: Colors.black),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor:  const Color(0xFFfbbe00),
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 10),
                    ),
                  ),
                  const SizedBox(height: 10),
                  FloatingActionButton(
                    onPressed: () => _showConfirmationDialog(context),
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
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () => Get.offAll(HomePage()),
              child: const Text('Yes'),
            ),
          ],
        );
      },
    );
  }
}
