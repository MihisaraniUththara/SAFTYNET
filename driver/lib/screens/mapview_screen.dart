import 'package:driver/screens/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'dart:async';
import 'package:confetti/confetti.dart';

class MapviewScreen extends StatefulWidget {
  @override
  _MapviewScreenState createState() => _MapviewScreenState();
}

class _MapviewScreenState extends State<MapviewScreen> {
  final List<String> tips = [
    "Always be aware of your surroundings",
    "Keep your belongings close",
    "Avoid poorly lit areas at night"
  ];

  final List<Map<String, String>> weathers = [
    {"condition": "Sunny", "temperature": "25°C", "iconName": "sun"},
    {
      "condition": "Partly Cloudy",
      "temperature": "22°C",
      "iconName": "cloud-sun"
    },
    {
      "condition": "Rainy",
      "temperature": "18°C",
      "iconName": "cloud-showers-heavy"
    }
  ];

  late String currentSafetyTip;
  String currentAccidentTip = "Accident-prove area is ahead";
  late Map<String, String> currentWeather;
  Timer? safetyTipTimer;
  Timer? weatherTimer;
  MapController mapController = MapController();
  final LatLng origin = LatLng(7.2906, 80.6337); // Kandy
  final LatLng destination = LatLng(6.9497, 80.7891); // Nuwara Eliya
  late LatLng cursorPosition;

  bool _dialogShown = false; // Flag to track if the dialog has been shown

  final ConfettiController _confettiController = ConfettiController();

  @override
  void initState() {
    super.initState();
    currentSafetyTip = tips[0];
    currentWeather = weathers[0];
    cursorPosition = origin;

    safetyTipTimer = Timer.periodic(Duration(seconds: 5), (timer) {
      setState(() {
        currentSafetyTip =
            tips[(tips.indexOf(currentSafetyTip) + 1) % tips.length];
      });
    });

    weatherTimer = Timer.periodic(Duration(seconds: 15), (timer) {
      setState(() {
        currentWeather =
            weathers[(weathers.indexOf(currentWeather) + 1) % weathers.length];
      });
    });

    Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        const double threshold = 0.01;

        // Check if the cursor is within the threshold of the destination
        if ((cursorPosition.latitude - destination.latitude).abs() <
                threshold &&
            (cursorPosition.longitude - destination.longitude).abs() <
                threshold) {
          if (!_dialogShown) {
            _showWellDoneDialog();
            _dialogShown =
                true; // Set the flag to true after showing the dialog
            timer.cancel(); // Stop the timer
          }
        } else {
          if (cursorPosition.latitude > destination.latitude) {
            cursorPosition = LatLng(
                cursorPosition.latitude - 0.01, cursorPosition.longitude);
          }
          if (cursorPosition.longitude < destination.longitude) {
            cursorPosition = LatLng(
                cursorPosition.latitude, cursorPosition.longitude + 0.01);
          }
        }
      });
    });
  }

  @override
  void dispose() {
    safetyTipTimer?.cancel();
    weatherTimer?.cancel();
    super.dispose();
  }

  IconData _getWeatherIcon(String condition) {
    switch (condition) {
      case 'Sunny':
        return Icons.wb_sunny;
      case 'Partly Cloudy':
        return Icons.cloud;
      case 'Rainy':
        return Icons.beach_access;
      default:
        return Icons.error;
    }
  }

  Future<void> _showWellDoneDialog() async {
    _confettiController.play(); // Start confetti animation

    await showDialog(
      context: context,
      barrierDismissible: false, // Prevent dismissing by tapping outside
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            '🎉  Well Done  🎉',
            textAlign: TextAlign.center,
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          content: Stack(
            clipBehavior: Clip.none,
            children: [
              Positioned.fill(
                child: ConfettiWidget(
                  confettiController: _confettiController,
                  blastDirection: pi / 2, // Direction to blast confetti
                  maxBlastForce: 5, // Maximum force of confetti
                  minBlastForce: 2, // Minimum force of confetti
                  emissionFrequency: 0.05, // How often to emit confetti
                  numberOfParticles: 10, // Number of particles to show
                  gravity: 0.1, // Gravity of the confetti
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset(
                    "assets/images/winners.png",
                    width: 100,
                    height: 100,
                    fit: BoxFit.cover,
                  ),
                  SizedBox(height: 8), // Add spacing between image and text
                  Text(
                    'You have reached the destination!',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ],
          ),
          actions: <Widget>[
            SizedBox(
              width: double.infinity,
              child: TextButton(
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                      builder: (context) => MainScreen(),
                    ),
                  );
                },
                child: Text('OK'),
              ),
            ),
          ],
          contentPadding:
              EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12.0),
          ),
          // constraints: BoxConstraints(maxWidth: 300),
        );
      },
    );
  }

  Future<void> _showExitConfirmationDialog() async {
    final bool? exit = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Exit Confirmation'),
          content: Text('Are you sure you want to exit this screen?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true); // User chose "Yes"
              },
              child: Text('Yes'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false); // User chose "No"
              },
              child: Text('No'),
            ),
          ],
        );
      },
    );

    if (exit == true) {
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => MainScreen()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            mapController: mapController,
            options: MapOptions(
              center: origin,
              zoom: 10.0,
            ),
            children: [
              TileLayer(
                urlTemplate:
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c'],
              ),
              MarkerLayer(
                markers: [
                  Marker(
                    width: 80.0,
                    height: 80.0,
                    point: origin,
                    builder: (ctx) => Container(
                      child:
                          Icon(Icons.location_on, color: Colors.red, size: 40),
                    ),
                  ),
                  Marker(
                    width: 80.0,
                    height: 80.0,
                    point: destination,
                    builder: (ctx) => Container(
                      child: Icon(Icons.location_on,
                          color: Colors.green, size: 40),
                    ),
                  ),
                  Marker(
                    width: 80.0,
                    height: 80.0,
                    point: cursorPosition,
                    builder: (ctx) => Container(
                      child: Icon(Icons.location_on_sharp,
                          color: Colors.blue, size: 40),
                    ),
                  ),
                ],
              ),
              PolylineLayer(
                polylines: [
                  Polyline(
                    points: [origin, destination],
                    strokeWidth: 5.0,
                    color: Colors.blue,
                  ),
                ],
              ),
            ],
          ),
          Positioned(
            top: 70,
            left: 10,
            right: 10,
            child: Column(
              children: [
                SafetyTipCard(tip: currentSafetyTip),
                if (currentSafetyTip == "Avoid poorly lit areas at night")
                  AccidentTipCard(tip: currentAccidentTip),
              ],
            ),
          ),
          Positioned(
            bottom: 10,
            left: 10,
            right: 10,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 5,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              padding: EdgeInsets.all(10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text(
                    currentWeather['condition']!,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Icon(
                    _getWeatherIcon(currentWeather['condition']!),
                    color: currentWeather['condition'] == 'Sunny'
                        ? Colors.yellow
                        : currentWeather['condition'] == 'Partly Cloudy'
                            ? Colors.cyan
                            : currentWeather['condition'] == 'Rainy'
                                ? Colors.blue
                                : Colors.black,
                  ),
                  Text(
                    currentWeather['temperature']!,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            top: 10,
            right: 10,
            child: ElevatedButton(
              style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.orange)),
              onPressed: _showExitConfirmationDialog,
              child: Text(
                'Stop',
                style: TextStyle(color: Color(0xffffffff)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class SafetyTipCard extends StatelessWidget {
  final String tip;

  SafetyTipCard({required this.tip});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 10),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.green,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Text(
        tip,
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }
}

class AccidentTipCard extends StatelessWidget {
  final String tip;

  AccidentTipCard({required this.tip});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 10),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.red,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Text(
        tip,
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }
}
