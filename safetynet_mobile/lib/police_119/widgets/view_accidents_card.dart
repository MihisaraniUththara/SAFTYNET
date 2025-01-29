import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../screens/view_accidents/accident_details_page.dart';
import '../services/accident_listener_service.dart';

class ViewAccidentsCard extends StatefulWidget {
  final String userEmail;

  ViewAccidentsCard({required this.userEmail});

  @override
  _ViewAccidentsCardState createState() => _ViewAccidentsCardState();
}

class _ViewAccidentsCardState extends State<ViewAccidentsCard> {
  @override
  Widget build(BuildContext context) {
    final accidentService = Provider.of<AccidentListenerService>(context);

    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => AccidentDetailsPage(),
          ),
        );
      },
      child: AnimatedContainer(
        duration: const Duration(seconds: 1),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25.0),
          boxShadow: accidentService.newAccidentAvailable
              ? [
                  BoxShadow(
                    color: Colors.red,
                    blurRadius: 10.0,
                    spreadRadius: 2.0,
                  ),
                ]
              : null,
        ),
        curve: Curves.easeInOut,
        child: SizedBox(
          height: 200,
          width: 300,
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(25.0),
            ),
            elevation: 20,
            color: accidentService.newAccidentAvailable
                ? Colors.red
                : Color.fromARGB(255, 208, 208, 208),
            shadowColor: accidentService.newAccidentAvailable
                ? Colors.red
                : Colors.black,
            borderOnForeground: true,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ListTile(
                  leading: Icon(
                    Icons.warning,
                    color: accidentService.newAccidentAvailable
                        ? Colors.white
                        : const Color.fromARGB(255, 208, 208, 208),
                  ),
                  title: Text(
                    accidentService.newAccidentAvailable
                        ? 'New Accident Reported'
                        : 'View Accidents',
                    style: TextStyle(
                      color: accidentService.newAccidentAvailable
                          ? Colors.white
                          : Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                  subtitle: Text(
                    accidentService.newAccidentAvailable
                        ? 'Click to view details'
                        : '',
                    style: TextStyle(
                      color: accidentService.newAccidentAvailable
                          ? Colors.white
                          : Colors.black,
                      fontSize: 15,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

