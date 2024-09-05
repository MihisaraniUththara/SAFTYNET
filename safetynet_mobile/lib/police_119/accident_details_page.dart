import 'package:flutter/material.dart';
import 'package:safetynet_mobile/police_119/road_accident_form/accident_report.dart';
import 'package:safetynet_mobile/police_119/map_toaccident.dart';

class AccidentDetailsPage extends StatelessWidget {
  final VoidCallback accept;

  AccidentDetailsPage({required this.accept});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Accident Details',
              style:
                  TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
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
            TabSubmitted(),
          ],
        ),
      ),
    );
  }
}

/*class TabNew extends StatelessWidget {

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
                            // Navigate to accident location view map
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => StartRidePage()),
                            );
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
}*/

class TabNew extends StatelessWidget {
  final VoidCallback accept;

  TabNew({super.key, required this.accept});

  final List<String> locations = [
    'Main Street and 1st Ave',
    'Broadway and 5th Ave',
    'Elm Street and 3rd Ave',
    'Oak Street and 7th Ave',
    'Pine Street and 2nd Ave'
  ];

  final List<String> dateTimes = [
    '2023-07-28 09:30 AM',
    '2023-07-28 10:45 PM',
    '2023-07-28 11:00 AM',
    '2023-07-29 12:15 PM',
    '2023-07-29 01:30 PM'
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: locations.length,
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 10,
          child: ListTile(
            leading: const Icon(Icons.location_on),
            title: Text('Accident at ${locations[index]}'),
            subtitle: Text('Date and Time: ${dateTimes[index]}'),
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
                        // Cancel Button
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop(); // Closes the dialog
                          },
                          child: const Text('Cancel'),
                        ),
                        // Submit Button
                        TextButton(
                          onPressed: () {
                            // Navigate to accident location view map
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => StartRidePage()),
                            );
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
  final List<String> locations = [
    '1st Ave and 2nd St',
    'Maple St and Oak Ave',
    'Sunset Blvd and Vine St',
    '5th Ave and Madison St',
    'Broadway and 10th St'
  ];

  final List<String> dateTimes = [
    '2023-07-30 08:30 PM',
    '2023-07-30 09:15 AM',
    '2023-07-30 10:00 AM',
    '2023-07-31 10:45 PM',
    '2023-07-31 11:30 AM'
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: locations.length,
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 5,
          child: ListTile(
            leading: Icon(Icons.location_on),
            title: Text('Accident at ${locations[index]}'),
            subtitle: Text('Date and Time: ${dateTimes[index]}'),
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

class TabSubmitted extends StatelessWidget {
  final List<String> locations = [
    'Central Park and 59th St',
    'Wall Street and Broadway',
    'Madison Ave and 42nd St',
    'Lexington Ave and 53rd St',
    'Park Ave and 34th St'
  ];

  final List<String> dateTimes = [
    '2023-08-01 02:30 PM',
    '2023-08-01 03:45 AM',
    '2023-08-02 04:00 AM',
    '2023-08-02 05:15 PM',
    '2023-08-03 06:30 PM'
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: locations.length,
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 5,
          child: ListTile(
            leading: Icon(Icons.location_on),
            title: Text('Accident at ${locations[index]}'),
            subtitle: Text('Date and Time: ${dateTimes[index]}'),
          ),
        );
      },
    );
  }
}
