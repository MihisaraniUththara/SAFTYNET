import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'screens/tab_submitted.dart';
import 'screens/tab_new.dart';
import 'screens/tab_onprogress.dart';

class AccidentDetailsPage extends StatelessWidget {

@override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Accident Details',
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          ),
          backgroundColor: const Color(0xfffbbe00),
          bottom: TabBar(
            tabs: [
              Tab(text: "New"),
              Tab(text: "On Progress"),
              Tab(text: "Submitted"),
            ],
          ),
          elevation: 10.0,
        ),
        body: TabBarView(
          children: [
            TabNew(),
            TabOnProgress(),
            TabSubmitted(),
          ],
        ),
      ),
    );
  }
}
