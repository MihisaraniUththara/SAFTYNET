import 'package:flutter/material.dart';
import 'tab_accident.dart';
import 'tab_element.dart';
import 'tab_casualty.dart';
import 'tab_other.dart';

class AccidentReportForm extends StatefulWidget {

  final String officerID; // Define officerID in the widget class
  final Map<String, dynamic>? draftData; // Option to pass draft data

  // Pass officerID via the constructor
  AccidentReportForm({
    required this.officerID,
    this.draftData, /*Nullable draft data*/
  });

  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {

  // Variables to store the draft data
  //Map<String, dynamic>? _formData;

 // @override
  /*void initState() {
    super.initState();

    // If draftData is provided, populate the form with it
    if (widget.draftData != null) {
      _formData = widget.draftData;
    }
  }*/

  // Add form fields and populate them with _formData if available
  //final _divisionController = TextEditingController();


  @override
  Widget build(BuildContext context) {

    // Initialize controllers with draft data if available
    //if (_formData != null) {
      ///_divisionController.text = _formData?['A']?['A1'] ?? '';
    //}

    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Road Accident Report',
            style: TextStyle(
              color: Colors.black,
              fontSize: 25.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(70.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const <Widget>[
                    Text("Station 21", style: TextStyle(fontSize: 20.0)),
                    Text("AR-no 118", style: TextStyle(fontSize: 20.0)),
                    Text('2024', style: TextStyle(fontSize: 20.0)),
                    Text("Police 297 B",
                        style: TextStyle(
                            fontSize: 20.0,
                            fontFamily: 'Roboto',
                            fontWeight: FontWeight.bold)),
                  ],
                ),
                TabBar(
                  //controller: _tabController,
                  tabs: const [
                    Tab(text: 'ACCIDENT'),
                    Tab(text: 'ELEMENTS'),
                    Tab(text: 'CASUALTY'),
                    Tab(text: 'OTHER'),
                  ],
                ),
              ],
            ),
          ),
          backgroundColor: const Color(0xfffbbe00),
        ),
        body: TabBarView(
          //controller: _tabController,
          children: [
            TabAccident(officerID: widget.officerID,draftData: widget.draftData),
            TabElement(officerID: widget.officerID),
            TabCasualty(officerID: widget.officerID),
            TabOther(officerID: widget.officerID),
          ],
        ),
      ),
    );
  }


}






