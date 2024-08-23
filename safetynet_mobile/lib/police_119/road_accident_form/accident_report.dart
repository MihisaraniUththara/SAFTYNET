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
            //const TabCasualty(),
            //const TabOther(),
          ],
        ),
      ),
    );
  }
}






