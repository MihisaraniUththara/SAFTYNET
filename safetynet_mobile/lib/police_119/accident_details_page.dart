import 'package:flutter/material.dart';
import 'package:safetynet_mobile/police_119/accident_report.dart';

class AccidentDetailsPage extends StatelessWidget {
  final VoidCallback accept;

  AccidentDetailsPage({required this.accept});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Accident Details', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
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
            TabNew(accept: accept),
            TabOnProgress(),
            TabSubmited(),
          ],
        ),
      ),
    );
  }
}

class TabNew extends StatelessWidget {
  final VoidCallback accept;

const TabNew({super.key, required this.accept});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 5,
     // Assume there are 5 new accidents for example
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 10,
          child: ListTile(
            leading: const Icon(Icons.location_on),
            title: Text('Accident at Location $index'),
            subtitle: Text('Time: ${DateTime.now()}'),
            trailing: ElevatedButton(
              autofocus: true,
  
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    TextEditingController _controller = TextEditingController();
                    return AlertDialog(
                      title: const Text('Enter Officer ID'),
                      content: TextField(
                        controller: _controller,
                        decoration:
                            const InputDecoration(hintText: "Enter Officer ID"),
                      ),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                            accept();
                          },
                          child: const Text('Submit'),
                        ),
                      ],
                    );
                  },
                );
              },
              child: const Text('Accept'),
            ),
          ),
        );
      },
    );
  }
}

class TabOnProgress extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 5, // Assume there are 5 accidents in progress for example
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 5,
          child: ListTile(
            leading: Icon(Icons.location_on),
            title: Text('Accident at Location $index'),
            subtitle: Text('Time: ${DateTime.now()}'),
            trailing: ElevatedButton(
              onPressed: () {
                // Navigate to accident report page for editing
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AccidentReportForm()),
                );
              },
              child: Text('Edit'),
            ),
          ),
        );
      },
    );
  }
}

class TabSubmited extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 5, // Assume there are 5 submitted accidents for example
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 5,
          child: ListTile(
            leading: Icon(Icons.location_on),
            title: Text('Accident at Location $index'),
            subtitle: Text('Time: ${DateTime.now()}'),
          ),
        );
      },
    );
  }
}
