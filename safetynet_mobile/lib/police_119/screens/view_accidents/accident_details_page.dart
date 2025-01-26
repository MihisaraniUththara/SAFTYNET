import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'tab_submitted.dart';
import 'tab_new.dart';
import 'tab_onprogress.dart';

class AccidentDetailsPage extends StatelessWidget {

@override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Accident Details',
            style: TextStyle(color: Colors.black,fontSize: 25.0, fontWeight: FontWeight.bold),
          ),
          backgroundColor: const Color(0xfffbbe00),
          centerTitle: true,
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
