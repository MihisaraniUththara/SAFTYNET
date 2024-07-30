import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'accident_report.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('home', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor:const Color(0xfffbbe00),
        leading :IconButton(
          icon: const Icon(Icons.menu, color: Colors.black),
          onPressed: () {},
        ),
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.notifications, color: Colors.black),
            onPressed: () {},
          ),
          IconButton(onPressed:(){}, icon: const Icon(Icons.more_vert, color: Colors.black)),

        ],
        elevation:80.0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //SizedBox(height: 50),
            ElevatedButton(
              onPressed: () {
                // Navigate to the accident_report screen
                Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                  return AccidentReportForm();
                }));
              },
              child: const Text('Go to Road Accident Report'),
            ),
          ],
        ),
      ),
    );
  }
}