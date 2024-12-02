import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/police_station_provider.dart';
import 'tab_accident.dart';
import 'tab_element.dart';
import 'tab_casualty.dart';
import 'tab_other.dart';

class AccidentReportForm extends StatefulWidget {
  final String officerID; // Define officerID
  final Map<String, dynamic>? draftData; // Option to pass draft data

  // Pass officerID via the constructor
  AccidentReportForm({
    required this.officerID,
    this.draftData,
    /*Nullable draft data*/
  });

  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {
  // ValueNotifier for shared unique ID state
  final ValueNotifier<String?> uniqueIdNotifier = ValueNotifier(null);

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<PoliceStationProvider>();

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
                  children: <Widget>[
                    Text("Station ${provider.stationNumber}",
                        style: TextStyle(fontSize: 20.0)),
                    Text("AR-no 118", style: TextStyle(fontSize: 20.0)),
                    Text('${DateTime.now().year}', style: TextStyle(fontSize: 20.0)),
                    Text("Police 297 B",
                        style: TextStyle(
                            fontSize: 20.0,
                            fontFamily: 'Roboto',
                            fontWeight: FontWeight.bold)),
                  ],
                ),
                const TabBar(
                  tabs: [
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
        body: ValueListenableBuilder<String?>(
          valueListenable: uniqueIdNotifier,
          builder: (context, uniqueId, child) {
            return TabBarView(
              children: [
                TabAccident(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                ),
                TabElement(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                ),
                TabCasualty(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                ),
                TabOther(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
