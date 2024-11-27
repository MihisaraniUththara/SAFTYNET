import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:safetynet_mobile/police_119/road_accident_form/accident_report.dart';
import 'package:safetynet_mobile/police_119/view_accidents/map_toaccident.dart';

class AccidentDetailsPage extends StatelessWidget {
  final VoidCallback accept;

  AccidentDetailsPage({required this.accept});

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
            TabNew(accept: accept, currentAccidentId: null),
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
  final String? currentAccidentId;

  TabNew({required this.accept, required this.currentAccidentId});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseFirestore.instance
          .collection('driver_accidents')
          .where('accepted', isEqualTo: false)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text(
              'Error loading data: ${snapshot.error}',
              style: TextStyle(color: Colors.red, fontSize: 16),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return Center(
            child: const Text(
              'No new accidents reported.',
              style: TextStyle(fontSize: 18, color: Colors.grey),
            ),
          );
        }

        var accidents = snapshot.data!.docs;

        return ListView.builder(
          itemCount: accidents.length,
          itemBuilder: (context, index) {
            var accident = accidents[index];

            // Safely check if fields exist before accessing them
            final location = accident.data().containsKey('location')
                ? accident['location']
                : 'Unknown location';
            final dateTime = accident.data().containsKey('date_time')
                ? accident['date_time']
                : 'Unknown time';

            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              elevation: 10,
              child: ListTile(
                leading: const Icon(Icons.location_on),
                title: Text('Accident at $location'),
                subtitle: Text(
                  'Time: $dateTime',
                  style: const TextStyle(fontSize: 14),
                ),
                trailing: ElevatedButton(
                  onPressed: () {
                    TextEditingController officerIdController =
                        TextEditingController();

                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: const Text('Enter Officer ID'),
                          content: TextField(
                            controller: officerIdController,
                            decoration: const InputDecoration(
                              hintText: "Enter Officer ID",
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop(); // Close dialog
                              },
                              child: const Text('Cancel'),
                            ),
                            TextButton(
                              onPressed: () async {
                                final officerId = officerIdController.text;

                                if (officerId.isNotEmpty) {
                                  // Update Firestore document
                                  await FirebaseFirestore.instance
                                      .collection('driver_accidents')
                                      .doc(accident.id)
                                      .update({
                                    'accepted': true,
                                    'officer_id': officerId,
                                    'accepted_time': DateTime.now(),
                                  });

                                  accept(); // Stop notification sound
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => StartRidePage()),
                                  );
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('Officer ID is required.'),
                                    ),
                                  );
                                }
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

  Future<Map<String, dynamic>?> loadDraft(String officerID) async {
    String draftID = "${officerID}_currentAccidentID"; // Example draftID logic
    DocumentSnapshot draftSnapshot = await FirebaseFirestore.instance
        .collection('accident_draft')
        .doc(draftID)
        .get();

    if (draftSnapshot.exists) {
      return draftSnapshot.data() as Map<String, dynamic>?;
    }
    return null; // Return null if no draft is found
  }

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
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    TextEditingController _officerId = TextEditingController();
                    return AlertDialog(
                      title: const Text('Enter Officer ID'),
                      content: TextField(
                        controller: _officerId,
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
                          onPressed: () async {
                            String officerID = _officerId.text;
                            // Load draft data for the officer
                            Map<String, dynamic>? draftData =
                                await loadDraft(officerID);

                            //navigate to the accident form with the draft data
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => AccidentReportForm(
                                      officerID:
                                          officerID, // Pass the Officer ID
                                      draftData:
                                          draftData // Pass loaded draft data
                                      )),
                            );
                          },
                          child: const Text('Submit'),
                        ),
                      ],
                    );
                  },
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
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseFirestore.instance
          .collection('accident_report')
          .where('submittedAt', isGreaterThanOrEqualTo: DateTime.now().subtract(Duration(days: 14)))
          .orderBy('submittedAt', descending: true)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text(
              'Error loading data: ${snapshot.error}',
              style: const TextStyle(color: Colors.red, fontSize: 16),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return const Center(
            child: Text(
              'No submitted accident reports in the last 14 days.',
              style: TextStyle(fontSize: 18, color: Colors.grey),
            ),
          );
        }

        final reports = snapshot.data!.docs;

        return ListView.builder(
          itemCount: reports.length,
          itemBuilder: (context, index) {
            final report = reports[index];

            // Extract data safely
            final accidentNo = report.data().containsKey('A5') ? report['A5'] : 'N/A';
            final oicApp = report.data().containsKey('oicApp') ? report['oicApp'] : 'N/A';
            final submittedAt = report.data().containsKey('submittedAt')
                ? (report['submittedAt'] as Timestamp).toDate()
                : null;
            final officerID = report.data().containsKey('officerID') ? report['officerID'] : 'N/A';

            final a3 = report.data().containsKey('A3') ? report['A3'] : 'N/A';
            final a4 = report.data().containsKey('A4') ? report['A4'] : 'N/A';

            // Combine A3 and A4 as the date-time
            final DateTime = '$a3 $a4';

            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              elevation: 5,
              child: ListTile(
                leading: const Icon(Icons.report),
                title: Text('Accident No: $accidentNo'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('OIC App: $oicApp'),
                    Text('Submitted At: ${submittedAt != null ? submittedAt.toString() : 'N/A'}'),
                    Text('Officer ID: $officerID'),
                    Text('Date and Time: $DateTime'),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}