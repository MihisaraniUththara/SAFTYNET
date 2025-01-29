import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/calculate_ar_no.dart';
import '../../services/police_station_provider.dart';
import 'tab_accident.dart';
import 'tab_element.dart';
import 'tab_casualty.dart';
import 'tab_other.dart';

class AccidentReportForm extends StatefulWidget {
  final String officerID; // Define officerID
  final Map<String, dynamic>? draftData; // Option to pass draft data
  final String uniqueIDNo;

  // Pass officerID via the constructor
  AccidentReportForm({
    required this.officerID,
    required this.uniqueIDNo, // Provide a default value
    this.draftData,
  });

  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {
  // ValueNotifier for shared unique ID state
  final ValueNotifier<String?> uniqueIdNotifier = ValueNotifier(null);

  // State to hold AR-no and other fields
  String? arNo;
  String? stationNumber;
  String? year;

  @override
  void initState() {
    super.initState();
    initializeFields();
  }

  /// Fetch AR-no and initialize fields
  Future<void> initializeFields() async {
    final uniqueIdParts = widget.uniqueIDNo.split('-');
    final arNumber = uniqueIdParts.length > 3 ? uniqueIdParts[2] : null;
    final yr = uniqueIdParts.length > 3 ? uniqueIdParts[3] : null;
    final policeStationProvider = context.read<PoliceStationProvider>();

    setState(() {
      arNo = arNumber;
      stationNumber = policeStationProvider.stationNumber;
      year = yr;
    });
  }

  @override
  Widget build(BuildContext context) {
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
          centerTitle: true,
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(70.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    Text(
                      "Station $stationNumber",
                      style: const TextStyle(fontSize: 20.0),
                    ),
                    Text(
                      "AR-no $arNo",
                      style: const TextStyle(fontSize: 20.0),
                    ),
                    Text(
                      "$year",
                      style: const TextStyle(fontSize: 20.0),
                    ),
                    Text("Police 297 B",
                        style: const TextStyle(
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
                  uniqueIdNo: widget.uniqueIDNo,
                ),
                TabElement(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                  uniqueIdNo: widget.uniqueIDNo,
                ),
                TabCasualty(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                  uniqueIdNo: widget.uniqueIDNo,
                ),
                TabOther(
                  officerID: widget.officerID,
                  draftData: widget.draftData,
                  uniqueIdNotifier: uniqueIdNotifier, // Pass the notifier
                  uniqueIdNo: widget.uniqueIDNo,
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
