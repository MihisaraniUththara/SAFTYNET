import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:get/get.dart';
import 'package:latlong2/latlong.dart';
import 'package:safetynet_mobile/drivers/pages/home.dart';
import 'package:url_launcher/url_launcher.dart';

import '../home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: StartRidePage(),
    );
  }
}

class StartRidePage extends StatefulWidget {
  @override
  _StartRidePageState createState() => _StartRidePageState();
}

class _StartRidePageState extends State<StartRidePage> {
  static const LatLng _center = LatLng(6.9271, 79.8612); // Colombo Coordinates

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFFfbbe00),
        title: Text('Map View', style: TextStyle(color: Colors.black)),
      ),
      body: Stack(
        children: <Widget>[
          FlutterMap(
            options: MapOptions(
              initialCenter: _center,
              initialZoom: 15.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c'],
                userAgentPackageName: 'com.example.app',
              ),
              MarkerLayer(
                markers: [
                  // Marker(
                  //   point: _center,
                  //   builder: (ctx) => Icon(
                  //     Icons.location_on,
                  //     color: Colors.red,
                  //     size: 40.0,
                  //   ),
                  // ),
                ],
              ),
              RichAttributionWidget(
                attributions: [
                  TextSourceAttribution(
                    'OpenStreetMap contributors',
                    onTap: () => launchUrl(Uri.parse('https://openstreetmap.org/copyright')),
                  ),
                ],
              ),
            ],
          ),
          Positioned(
            top: 16,
            left: 16,
            right: 16,
            child: Container(
              padding: EdgeInsets.all(8.0),
              color: Colors.white,
              child: Text(
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
              child: FloatingActionButton(
                onPressed: () { _showConfirmationDialog(context);},
                backgroundColor: Colors.red,
                child: Text(
                  'STOP',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

  void _showConfirmationDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm'),
          content: Text('Are you sure you want to stop?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dismiss the dialog
              },
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                // Add stop logic here
                Get.offAll(HomePage());
              },
              child: Text('Yes'),
            ),
          ],
        );
      },
    );
  }
