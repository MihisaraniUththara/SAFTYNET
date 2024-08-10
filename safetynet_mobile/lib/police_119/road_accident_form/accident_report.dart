//import 'dart:io';

//import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:flutter/widgets.dart';
//import 'package:get/get_connect/http/src/utils/utils.dart';

import 'tab_accident.dart';
import 'tab_element.dart';
import 'tab_casualty.dart';

class AccidentReportForm extends StatefulWidget {
  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
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
                    Tab(text: 'ACCIDENT DETAILS'),
                    Tab(text: 'ELEMENT DETAILS'),
                    Tab(text: 'CASUALTY DETAILS'),
                    //Tab(text: 'OTHER DETAILS'),
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
            TabAccident(),
            const TabElement(),
            const TabCasualty(),
            //const TabOther(),
          ],
        ),
      ),
    );
  }
}

/*
          SingleChoiceCheckboxInput(
                  topic: 'C1 Casualty details',
                  labels: ['1 Fatal', '2 Grievous', '3 Non grievous'],
                  onSaved: (value) =>
                      _saveSingleChoice('casualty_details', value),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C3 Category',
                  labels: [
                    '1 Driver/Rider',
                    '2 Pedestrian',
                    '3 Passenger/Pillion rider',
                    '4 Passenger/Pillion rider falling off vehicle',
                    '5 Passenger entering or leaving bus',
                    '6 Not known'
                  ],
                  onSaved: (value) => _saveSingleChoice('category', value),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C4 Sex',
                  labels: ['1 Male', '2 Female', '3 Not known'],
                  onSaved: (value) => _saveSingleChoice('sex_c4', value),
                ),
                MultipleChoiceCheckboxInput(
                  topic: 'C6 Protection',
                  labels: [
                    '1 Safety belt, worn',
                    '2 Safety belt, not worn',
                    '3 Helmet, worn',
                    '4 Helmet, not worn',
                    '5 Child restraint seat used',
                    '6 Not known/NA'
                  ],
                  onSaved: (values) =>
                      _saveMultipleChoice('protection', values),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C7 Hospitalized',
                  labels: [
                    '1 Injured and admitted to hospital at least 1 day',
                    '2 Injured but not admitted to hospital or admitted less than 1 day'
                  ],
                  onSaved: (value) => _saveSingleChoice('hospitalized', value),
                ),
              */





