import 'package:flutter/material.dart';
import 'package:safetynet_mobile/police_119/view_accidents/widgets/report_officer_validation_dialog.dart';


class AddAccidentReportCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return OfficerValidationDialog(); // Replace 123 with the actual accident number
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
