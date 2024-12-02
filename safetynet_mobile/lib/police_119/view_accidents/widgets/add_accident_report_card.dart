import 'package:flutter/material.dart';
import '../../road_accident_form/accident_report.dart';

class AddAccidentReportCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            TextEditingController _officerId = TextEditingController();
            return AlertDialog(
              title: const Text('Enter Officer ID'),
              content: TextField(
                controller: _officerId,
                decoration: const InputDecoration(hintText: "Enter Officer ID"),
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(); // Closes the dialog
                  },
                  child: const Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    String officerID = _officerId.text;

                    // Navigate to the Accident Report Form
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => AccidentReportForm(
                            officerID: officerID), // Pass the Officer ID
                      ),
                    );
                  },
                  child: const Text('Submit'),
                ),
              ],
            );
          },
        );
      },
      child: SizedBox(
        height: 200,
        width: 300,
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25.0),
          ),
          elevation: 20,
          color: Color.fromARGB(255, 208, 208, 208),
          shadowColor: Colors.black,
          borderOnForeground: true,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ListTile(
                title: Text(
                  'Add New Accident Report',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 25,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
