import 'package:flutter/material.dart';

import 'tab_accident.dart';
import 'tab_element.dart';
import 'tab_casualty.dart';
import 'tab_other.dart';

class AccidentReportForm extends StatefulWidget {

  final String officerID; // Define officerID in the widget class

  // Pass officerID via the constructor
  AccidentReportForm({required this.officerID});

  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {

  @override
  Widget build(BuildContext context) {
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
            TabAccident(officerID: widget.officerID),
            TabElement(officerID: widget.officerID),
            TabCasualty(officerID: widget.officerID),
            TabOther(officerID: widget.officerID),
          ],
        ),
      ),
    );
  }
}






