import 'package:flutter/material.dart';

// Temporary accident history data
final List<Map<String, String>> accidentHistory = [
  {
    'accidentClass': 'Fatal',
    'date': '2023-01-01',
    'division': 'Division A',
    'station': 'Station X',
    'arNo': 'AR12345',
  },
  {
    'accidentClass': 'Grievous',
    'date': '2022-12-15',
    'division': 'Division B',
    'station': 'Station Y',
    'arNo': 'AR54321',
  },
  {
    'accidentClass': 'Non Grievous',
    'date': '2021-11-10',
    'division': 'Division C',
    'station': 'Station Z',
    'arNo': 'AR67890',
  },
  {
    'accidentClass': 'Damage Only',
    'date': '2020-10-05',
    'division': 'Division D',
    'station': 'Station W',
    'arNo': 'AR09876',
  },
];

class DriverAccidentHistoryScreen extends StatefulWidget {
  @override
  _DriverAccidentHistoryScreenState createState() =>
      _DriverAccidentHistoryScreenState();
}

class _DriverAccidentHistoryScreenState
    extends State<DriverAccidentHistoryScreen> {
  String selectedVehicle = 'Van';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Driver Accident History')),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              color: Colors.grey[200],
              child: Row(
                children: [
                  const Text('Choose your vehicle:',
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(width: 10),
                  Expanded(
                    child: DropdownButton<String>(
                      value: selectedVehicle,
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedVehicle = newValue!;
                        });
                      },
                      items: <String>['Van', 'Bike', 'Three-Wheeler']
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: accidentHistory.length,
                itemBuilder: (context, index) {
                  final accident = accidentHistory[index];
                  final circleColor = {
                    'Fatal': Colors.red,
                    'Grievous': Colors.orange,
                    'Non Grievous': Colors.yellow,
                    'Damage Only': Colors.green,
                  };

                  return Card(
                    margin: const EdgeInsets.symmetric(
                        vertical: 10, horizontal: 10),
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                    child: Padding(
                      padding: const EdgeInsets.all(15),
                      child: Row(
                        children: [
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Date: ${accident['date']}',
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold)),
                                Text('Division: ${accident['division']}'),
                                Text('Station: ${accident['station']}'),
                                Text('AR No: ${accident['arNo']}'),
                              ],
                            ),
                          ),
                          Container(
                            width: 70,
                            height: 70,
                            decoration: BoxDecoration(
                              color: circleColor[accident['accidentClass']]!,
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: Text(
                                accident['accidentClass']!,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
