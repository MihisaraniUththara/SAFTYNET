import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';

import 'input_fields.dart';

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
            const TabCasualty(),
            //const TabOther(),
          ],
        ),
      ),
    );
  }
}

class TabAccident extends StatefulWidget {
  @override
  State<TabAccident> createState() => _TabAccidentState();
}

class _TabAccidentState extends State<TabAccident> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Map<String, String> formData = {};
  final List<GlobalKey<SingleChoiceCheckboxInputState>> _checkboxKeys = [];

  void saveInputValue(String key, String value) {
    formData[key] = value;
    print('Saved: $key = $value');
  }

  /*Widget _buildClassOfAccidentSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'A6. Class of Accident',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        // Checkbox for Fatal
        /*CheckboxListTile(
          title: const Text('1 Fatal'),
          value: _isFatal,
          onChanged: (bool? value) {
            setState(() {
              _isFatal = value ?? false;
              _updateClassOfAccident();
            });
          },
        ),*/
        // Checkbox for Grievous
        /*CheckboxListTile(
          title: const Text('2 Grievous'),
          value: _isGrievous,
          onChanged: (bool? value) {
            setState(() {
              _isGrievous = value ?? false;
              _updateClassOfAccident();
            });
          },
        ),*/
        // Checkbox for Non-Grievous
        /*CheckboxListTile(
          title: const Text('3 Non-Grievous'),
          value: _isNonGrievous,
          onChanged: (bool? value) {
            setState(() {
              _isNonGrievous = value ?? false;
              _updateClassOfAccident();
            });
          },
        ),*/
        // Checkbox for Damage Only
        /*CheckboxListTile(
          title: const Text('4 Damage Only'),
          value: _isDamageOnly,
          onChanged: (bool? value) {
            setState(() {
              _isDamageOnly = value ?? false;
              _updateClassOfAccident();
            });
          },
        ),*/
      ],
    );
  }*/

  /*Widget _chooseWorkdayHoliday() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'A7. Workday/Holiday',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        CheckboxListTile(
          title: const Text('1 Normal working day'),
          value: _normalWorkingday,
          onChanged: (bool? value) {
            setState(() {
              _normalWorkingday = value ?? false;
              //_updateClassOfAccident();
            });
          },
        ),
        CheckboxListTile(
          title: const Text('2 Normal Weekend'),
          value: _normalWeekend,
          onChanged: (bool? value) {
            setState(() {
              _normalWeekend = value ?? false;
              //_updateClassOfAccident();
            });
          },
        ),
        CheckboxListTile(
          title: const Text('3 Public Holiday'),
          value: _publicHoliday,
          onChanged: (bool? value) {
            setState(() {
              _publicHoliday = value ?? false;
              //_updateClassOfAccident();
            });
          },
        ),
        CheckboxListTile(
          title: const Text('4 Festive day'),
          value: _festiveday,
          onChanged: (bool? value) {
            setState(() {
              _festiveday = value ?? false;
              //_updateClassOfAccident();
            });
          },
        ),
        CheckboxListTile(
          title: const Text('5 Election day or 1st of May'),
          value: _isDamageOnly,
          onChanged: (bool? value) {
            setState(() {
              _isDamageOnly = value ?? false;
              //_updateClassOfAccident();
            });
          },
        ),
      ],
    );
  }*/

  /*Map<String, dynamic> _formData =
      {}; // Declare and initialize _formData variable

  void _saveMultipleChoice(String key, Set<String> values) {
    setState(() {
      _formData[key] = values;
    });
  }

  void _saveSingleChoice(String key, String? value) {
    setState(() {
      _formData[key] = value;
    });
  }*/

  /*final Set<String> _selectedClasses = {};
  String? _selectedClass;

  // Define the variables to store the form data
  String? _division;
  String? _station;
  DateTime? _date;
  TimeOfDay? _time;
  String? _uniqueId;
  int? _urbanOrRural;
  String? _workdayOrHoliday;
  String? _dayOfWeek;
  String? _roadNumber;
  String? _roadStreetName;
  int? _nearestLowerKmPost;
  int? _distanceFromNearestLowerKmPost;
  int? _nodeNumber;
  String? _linkNumber;
  int? _distanceFromNodeInMetres;
  int? _eastCoordinate;
  int? _northCoordinate;
  int? _collisionType;
  String? _secondCollisionOccurrence;
  int? _roadSurfaceCondition;
  int? _trafficControl;
  int? _weather;
  int? _postedSpeedLimitSigns;
  int? _gazettedSpeedLimitForLightVehicles;
  int? _gazettedSpeedLimitForHeavyVehicles;
  int? _actionTakenByPolice;
  int? _caseNumber;
  int? _bReport;
  String? _classOfAccident;
  String? _A34;
  // ignore: non_constant_identifier_names
  String? A1a;
  int? A1b;
  String? A2a;
  int? A2b;
  int? A5c;
  int? A5d;*/

  Widget _buildTextField(String label,
      {String hintText = '', required int maxchars}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.left,
        ),
        TextFormField(
          maxLength: maxchars,
          maxLines: 1,
          keyboardType: TextInputType.text,
          decoration: InputDecoration(
            //labelText: label,
            /*floatingLabelStyle: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),*/
            border: InputBorder.none,
            filled: true,
            hintText: hintText,
            //floatingLabelBehavior: FloatingLabelBehavior.auto,
          ),
          onSaved: (value) {
            saveInputValue(label, value!);
          },
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'This field cannot be empty';
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildNumericField(String label,
      {String hintText = '', required int maxchars}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.left,
        ),
        TextFormField(
          keyboardType: TextInputType.number,
          maxLength: maxchars,
          decoration: InputDecoration(
            //labelText: label,
            /*floatingLabelStyle: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),*/
            border: InputBorder.none,
            filled: true,
            hintText: hintText,
            //floatingLabelBehavior: FloatingLabelBehavior.auto,
          ),
          onSaved: (value) {
            saveInputValue(label, value!);
          },
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'This field cannot be empty';
            }
            if (double.tryParse(value!) == null) {
              return 'Please enter a valid number';
            }
            return null;
          },
        ),
      ],
    );
  }

  @override
  void initState() {
    super.initState();
    // Initialize the list of keys
    _checkboxKeys.addAll([
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
      GlobalKey<SingleChoiceCheckboxInputState>(),
    ]);
  }

  void _saveForm() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // Iterate through the checkbox keys and save their selected values
      for (var key in _checkboxKeys) {
        final state = key.currentState;
        if (state != null && state.selectedValue != null) {
          saveInputValue(
              state.widget.topic, state.selectedValue!.split(' ')[0]);
        }
      }
      print('Form saved: $formData');
    } else {
      print("Form validation failed");
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              // Add your form fields here
              Row(
                children: [
                  Expanded(
                    child: _buildTextField('A1 Division', maxchars: 30),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: _buildNumericField('no', maxchars: 2),
                  ),
                ],
              ),
              Row(
                children: [
                  Expanded(
                    child: _buildTextField('A2 Station', maxchars: 30),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: _buildNumericField('no', maxchars: 2),
                  ),
                ],
              ),
              _buildTextField('A3 Date', hintText: 'YYYY-MM-DD', maxchars: 10),
              _buildTextField('A4 Time of accident',
                  hintText: 'HH:MM', maxchars: 5),
              _buildTextField(
                'A5 Unique ID Number',
                hintText: 'Division, Station, AR no, Year',
                maxchars: 50,
              ),
              /*Row(
                children: [
                  Expanded(
                    child: _buildTextField('A5 Unique ID number', (value) => A2a = value,
                        maxchars: 30),
                  ),
                  SizedBox(width:),
                  Expanded(
                    child: _buildNumericField(
                        'no', (value) => A2b = int.parse(value ?? '0'),
                        maxchars: 2),
                  ),
                ],
              ),*/
              SingleChoiceCheckboxInput(
                topic: 'A6 Class of Accident',
                labels: const [
                  '1 Fatal',
                  '2 Grievous',
                  '3 Non-Grievous',
                  '4 Damage Only'
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A7 Urban/Rural',
                labels: ['1 Urban', '2 Rural'],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A8 Workday/Holiday',
                labels: [
                  '1 Normal working day',
                  '2 Normal Weekend',
                  '3 Public holiday',
                  '4 Festive day',
                  '5 Election day or 1st of May',
                ],
              ),
              Text('A9 Day of Week',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  )),
              TextFormField(
                initialValue: DateTime.now().weekday == DateTime.sunday
                    ? '1 Sunday'
                    : DateTime.now().weekday == DateTime.monday
                        ? '2 Monday'
                        : DateTime.now().weekday == DateTime.tuesday
                            ? '3 Tuesday'
                            : DateTime.now().weekday == DateTime.wednesday
                                ? '4 Wednesday'
                                : DateTime.now().weekday == DateTime.thursday
                                    ? '5 Thursday'
                                    : DateTime.now().weekday == DateTime.friday
                                        ? '6 Friday'
                                        : DateTime.now().weekday ==
                                                DateTime.saturday
                                            ? '7 Saturday'
                                            : '',
                readOnly: true,
                maxLength: 10,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  filled: true,
                ),
              ),
              _buildTextField('A10 Road Number', maxchars: 4),
              _buildTextField('A11 Road/Street Name', maxchars: 50),
              _buildNumericField('A12 Nearest,lower Km post', maxchars: 3),
              _buildNumericField('A13 Distance from Nearest Lower Km Post',
                  maxchars: 3),
              _buildNumericField('A14 Node number', maxchars: 6),
              _buildTextField('A15 Link number', maxchars: 7),
              _buildNumericField('A16 Distance from Node in metres',
                  maxchars: 5),
              _buildNumericField('A17 East co-ordinate', maxchars: 6),
              _buildNumericField('A18 North co-ordinate', maxchars: 6),
              _buildNumericField('A19 Collision type',
                  hintText: 'See separate Appendix', maxchars: 4),
              SingleChoiceCheckboxInput(
                topic: 'A20 Any second collision occurance',
                labels: [
                  '1 With other vehicle',
                  '2 With Pedestrian',
                  '3 With Fixed object',
                  '9 Others',
                  '0 Not Applicable',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A21 Road surface condition',
                labels: [
                  '1 Dry',
                  '2 Wet',
                  '3 Flooded with water',
                  '4 Slippery surface(mud,oil,garbage,leaves)',
                  '9 Others',
                  '0 Not known',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A22 Weather',
                labels: [
                  '1 Clear',
                  '2 Cloudy',
                  '3 Rain',
                  '4 Fog/Mist',
                  '9 Others',
                  '0 Not known',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A23 Light condition',
                labels: [
                  '1 Daylight',
                  '2 Night,no street lighting',
                  '3 Dusk,dawn',
                  '4 Night,improper street lighting',
                  '5 Night,good street lighting',
                  '0 Not known',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A24 Type of location',
                labels: [
                  '1 Stretch of road,no junction within 10 metres',
                  '2 4-leg junction',
                  '3 T-junction',
                  '4 Y-junction',
                  '5 Roundabout',
                  '6 Multiple road junction',
                  '7 Entrance,by-road',
                  '8 Railroad crossing',
                  '9 Others',
                  '0 Not known/NA',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A25 Type of location when pedestrian/s is/are involved',
                labels: [
                  '1 Or,pedestrian crossing',
                  '2 Pedestrian crossing within 50 metres',
                  '3 Pedestrian crossing beyond 50 metres',
                  '4 Pedestrian over-pass bridge or under-pass tunnel within 50 metres',
                  '5 Hit outside sidewalk',
                  '6 Hit on sidewalk',
                  '7 Hit on road without sidewalk',
                  '9 Other',
                  '0 Not known/NA',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A26 Traffic control',
                labels: [
                  '1 Police',
                  '2 Traffic lights',
                  '3 Stop sign/marking'
                      '4 Give way sign/marking',
                  '5 Controlled by traffic warden',
                  '6 No control',
                  '9 Other',
                  '0 Not known/NA',
                ],
              ),
              SingleChoiceCheckboxInput(
                topic: 'A27 Posted speed limit signs',
                labels: [
                  '1 Yes',
                  '2 No',
                ],
              ),
              _buildNumericField(
                  'A28 Gazetted speed limit for light vehicles(kmph)',
                  maxchars: 3),
              _buildNumericField(
                  'A29 Gazetted speed limit for heavy vehicles(kmph)',
                  maxchars: 3),
              SingleChoiceCheckboxInput(
                topic: 'A30 Action taken by police',
                labels: [
                  '1 Prosecution initiated',
                  '2 No Prosecution',
                  '3 Parties settled',
                  '4 Offender unknown',
                  '0 Not known/NA',
                ],
              ),
              _buildNumericField('A31 Case number', maxchars: 10),
              _buildNumericField('A32 B report', maxchars: 10),
              SingleChoiceCheckboxInput(
                topic: 'A33 Casualties',
                labels: ['1 Fatal', '2 Grievous', '3 Non Grievous'],
              ),
              _buildTextField('A34 For research purpose', maxchars: 2),

              SizedBox(height: 50.0),
              Container(
                width: 150,
                child: ElevatedButton(
                  child: Text(
                    'Save',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16.0,
                    ),
                  ),
                  onPressed: _saveForm,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

/*
          SingleChoiceCheckboxInput(
                  topic: 'C1 Casualty details',
                  labels: ['1 Fatal', '2 Grievous', '3 Non grievous'],
                  onSaved: (value) =>
                      _saveSingleChoice('casualty_details', value),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C3 Category',
                  labels: [
                    '1 Driver/Rider',
                    '2 Pedestrian',
                    '3 Passenger/Pillion rider',
                    '4 Passenger/Pillion rider falling off vehicle',
                    '5 Passenger entering or leaving bus',
                    '6 Not known'
                  ],
                  onSaved: (value) => _saveSingleChoice('category', value),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C4 Sex',
                  labels: ['1 Male', '2 Female', '3 Not known'],
                  onSaved: (value) => _saveSingleChoice('sex_c4', value),
                ),
                MultipleChoiceCheckboxInput(
                  topic: 'C6 Protection',
                  labels: [
                    '1 Safety belt, worn',
                    '2 Safety belt, not worn',
                    '3 Helmet, worn',
                    '4 Helmet, not worn',
                    '5 Child restraint seat used',
                    '6 Not known/NA'
                  ],
                  onSaved: (values) =>
                      _saveMultipleChoice('protection', values),
                ),
                SingleChoiceCheckboxInput(
                  topic: 'C7 Hospitalized',
                  labels: [
                    '1 Injured and admitted to hospital at least 1 day',
                    '2 Injured but not admitted to hospital or admitted less than 1 day'
                  ],
                  onSaved: (value) => _saveSingleChoice('hospitalized', value),
                ),
              */
Map<String, String> formData = {};

void saveInputValue(String prefix, int index, String value) {
  String key = '$prefix${String.fromCharCode(65 + index)}'; // e.g., E1A, E1B
  formData[key] = value;
  print('Saved: $key = $value');
}

void saveFormSectionValue(String prefix, int columnIndex, int labelPrefix) {
  String key =
      '$prefix${String.fromCharCode(65 + columnIndex)}'; // e.g., E1A, E1B
  formData[key] = labelPrefix.toString();
  print('Saved: $key = ${labelPrefix.toString()}');
}

class TabElement extends StatefulWidget {
  const TabElement({super.key});

  @override
  State<TabElement> createState() => _TabElementState();
}

class _TabElementState extends State<TabElement> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Store the checkbox states for each section
  final List<List<List<bool>>> _checkboxStates = [
    List.generate(15, (_) => List.generate(3, (_) => false)), // Element Type
    List.generate(
        7, (_) => List.generate(3, (_) => false)), // Vehicle Ownership
    List.generate(
        3, (_) => List.generate(3, (_) => false)), // Driver/Rider/Pedest Sex
    List.generate(6,
        (_) => List.generate(3, (_) => false)), // Validity of driving license
    List.generate(
        11,
        (_) => List.generate(3,
            (_) => false)), // Human pre crash factors contributing to accident
    List.generate(
        6,
        (_) => List.generate(
            3,
            (_) =>
                false)), // Pedestrian pre crash factor contributing to accident
    List.generate(
        6,
        (_) => List.generate(
            3, (_) => false)), // Road pre crash factor contributing to accident
    List.generate(
        8,
        (_) => List.generate(
            3,
            (_) =>
                false)), // Vehicle pre crash factor defects contributing to accident
    List.generate(
        8,
        (_) => List.generate(
            3, (_) => false)), // Crash factor contributing to accident severity
    List.generate(6, (_) => List.generate(3, (_) => false)), // Other factors
    List.generate(3, (_) => List.generate(3, (_) => false)), // Alcohol test
    List.generate(
        3,
        (_) =>
            List.generate(3, (_) => false)), // Driver/Rider/Pedestrian at fault
  ];

  // Keep track of the number of columns for each section
  final List<int> _columnsCount = [
    3, // Initial number of checkbox columns for Element Type
    3, // Initial number of checkbox columns for Vehicle Ownership
    3, // Initial number of checkbox columns for Driver/Rider/Pedestrian Sex
    3, // Initial number of checkbox columns for Validity of driving license
    3, // Initial number of checkbox columns for Human pre crash factors
    3, // Initial number of checkbox columns for Pedestrian pre crash factor
    3, // Initial number of checkbox columns for Road pre crash factor
    3, // Initial number of checkbox columns for Vehicle pre crash factor defects
    3, // Initial number of checkbox columns for Crash factor contributing to severity
    3, // Initial number of checkbox columns for Other factors
    3, // Initial number of checkbox columns for Alcohol test
    3, // Initial number of checkbox columns for Driver/Rider/Pedestrian at fault
  ];

  List<int> _topicTextFieldsCount = [3, 3, 3, 3];
  List<int> _integerInputFieldsCount = [3, 3, 3, 3, 3];

  void _toggleCheckbox(int sectionIndex, int rowIndex, int columnIndex) {
    setState(() {
      for (int i = 0; i < _checkboxStates[sectionIndex].length; i++) {
        _checkboxStates[sectionIndex][i][columnIndex] = false;
      }
      _checkboxStates[sectionIndex][rowIndex][columnIndex] = true;
      saveFormSectionValue('E${sectionIndex + 1}', columnIndex, rowIndex + 1);
    });
  }

  void _addCheckboxColumn(int sectionIndex) {
    setState(() {
      for (var row in _checkboxStates[sectionIndex]) {
        row.add(false);
      }
      _columnsCount[sectionIndex]++;
    });
  }

  void _addTopicTextFields(int sectionIndex) {
    setState(() {
      _topicTextFieldsCount[sectionIndex]++;
    });
  }

  void _addIntegerInputFields(int sectionIndex) {
    setState(() {
      _integerInputFieldsCount[sectionIndex]++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              FormSection(
                topic: 'E1 Element Type',
                labels: [
                  '1 Car',
                  '2 Dual purpose vehicle',
                  '3 Lorry',
                  '4 Cycle',
                  '5 Motor cycle,Moped',
                  '6 Three wheeler',
                  '7 Articulated vehicle,prime mover',
                  '8 SLTB bus',
                  '9 Private bus',
                  '10 Intercity bus',
                  '11 Land vehicle/Tractor',
                  '12 Animal drawn vehicle or rider on animal',
                  '13 Pedestrian',
                  '19 Others',
                  '00 Not known'
                ],
                checkboxStates: _checkboxStates[0],
                columnsCount: _columnsCount[0],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(0, rowIndex, columnIndex),
              ),
              TopicTextFields(
                topic: 'E2 Vehicle Registration number',
                maxChars: 9,
                columnsCount: _topicTextFieldsCount[0],
              ),
              IntegerInputFields(
                topic: 'E3 Vehicle year of manufacture',
                maxChars: 4,
                columnsCount: _integerInputFieldsCount[0],
              ),
              IntegerInputFields(
                topic: 'E4 Age of vehicle',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[1],
              ),
              FormSection(
                topic: 'E5 Vehicle Ownership',
                labels: [
                  '1 Private vehicle',
                  '2 Private company own vehicle',
                  '3 Government vehicle',
                  '4 Semi Government vehicle',
                  '5 Service vehicle',
                  '6 Police vehicle',
                  '0 Not Known',
                ],
                checkboxStates: _checkboxStates[1],
                columnsCount: _columnsCount[1],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(1, rowIndex, columnIndex),
              ),
              TopicTextFields(
                topic: 'E6 Direction of movement',
                maxChars: 2,
                columnsCount: _topicTextFieldsCount[1],
              ),
              FormSection(
                topic: 'E7 Driver/Rider/Pedestrian Sex',
                labels: ['1 Male', '2 Female', '0 Not known'],
                checkboxStates: _checkboxStates[2],
                columnsCount: _columnsCount[2],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(2, rowIndex, columnIndex),
              ),
              IntegerInputFields(
                topic: 'E8 Driver/Rider/Pedestrian age',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[2],
              ),
              TopicTextFields(
                topic: 'E9 Driving Licence number',
                maxChars: 10,
                columnsCount: _topicTextFieldsCount[2],
              ),
              FormSection(
                topic: 'E10 Validity of driving license',
                labels: [
                  '1 Valid license for the vehicle',
                  '2 Without valid license for the vehicle',
                  '3 Learner permit',
                  '4 Probation license',
                  '5 International license',
                  '0 Not known/NA'
                ],
                checkboxStates: _checkboxStates[3],
                columnsCount: _columnsCount[3],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(3, rowIndex, columnIndex),
              ),
              IntegerInputFields(
                topic: 'E11 Year of issue of Driving License',
                maxChars: 4,
                columnsCount: _integerInputFieldsCount[3],
              ),
              IntegerInputFields(
                topic:
                    'E12 Number of years since first issue of driving license',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[4],
              ),
              FormSection(
                topic: 'E13 Human pre crash factor 1 contributing to accident',
                labels: [
                  '1 Speeding',
                  '2 Aggressive/negligent driving',
                  '3 Error of judgment',
                  '4 Influenced by alcohol/drugs',
                  '5 Fatigue/fall asleep',
                  '6 Distracted/inattentiveness(handling radio,mobile phone,mental stress etc.)',
                  '7 Poor eye sight',
                  '8 Sudden illness',
                  '9 Blinded by another vehicle/sun',
                  '19 Others',
                  '00 Not known/NA'
                ],
                checkboxStates: _checkboxStates[4],
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(4, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E14 Human pre crash factor 2 contributing to accident',
                labels: [
                  '1 Speeding',
                  '2 Aggressive/negligent driving',
                  '3 Error of judgment',
                  '4 Influenced by alcohol/drugs',
                  '5 Fatigue/fall asleep',
                  '6 Distracted/inattentiveness(handling radio,mobile phone,mental stress etc.)',
                  '7 Poor eye sight',
                  '8 Sudden illness',
                  '9 Blinded by another vehicle/sun',
                  '19 Others',
                  '00 Not known/NA'
                ],
                checkboxStates: _checkboxStates[4],
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(4, rowIndex, columnIndex),
              ),
              FormSection(
                topic:
                    'E15 Pedestrian pre crash factor contributing to accident',
                labels: [
                  '1 Unexpected pedestrian movement',
                  '2 Disobey designated crossing',
                  '3 Influenced by alcohol/drugs',
                  '4 Poor visibility(clothing)',
                  '9 Other',
                  '0 Not known/NA'
                ],
                checkboxStates: _checkboxStates[5],
                columnsCount: _columnsCount[5],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(5, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E16 Road pre crash factor contributing to accident',
                labels: [
                  '1 Defective road surface,slippery road,pot holes,water puddles,large cracks,high or low sewer covers etc.',
                  '2 Defective,absent or badly maintained road markings or signs',
                  '3 Road works without adequate traffic control devices',
                  '4 Weather conditions',
                  '5 Poor street lighting',
                  '9 Other',
                ],
                checkboxStates: _checkboxStates[6],
                columnsCount: _columnsCount[6],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(6, rowIndex, columnIndex),
              ),
              FormSection(
                topic:
                    'E17 Vehicle pre crash factor defects contributing to accident',
                labels: [
                  '1 Brakes',
                  '2 Tyres,wheels',
                  '3 Steering',
                  '4 Lights,lamps',
                  '5 Poor mechanical condition',
                  '6 Overloaded or wrongly loaded vehicle',
                  '9 Other',
                  '0 Not known/NA'
                ],
                checkboxStates: _checkboxStates[7],
                columnsCount: _columnsCount[7],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(7, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E18 Crash factor contributing to accident severity',
                labels: [
                  '1 Hitting tree',
                  '2 Hitting pole/post',
                  '3 Hitting stone or boulder',
                  '4 Hitting road island,curb etc.',
                  '5 Hitting barrier or guard rail',
                  '6 Hitting other fixed object',
                  '7 Rolled over',
                  '0 Not known/NA'
                ],
                checkboxStates: _checkboxStates[8],
                columnsCount: _columnsCount[8],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(8, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E19 Other factors',
                labels: [
                  '1 Avoiding maneuver',
                  '2 Hit and run',
                  '3 Road works',
                  '4 Post crash violence',
                  '5 Stolen vehicle',
                  '0 Not known/NA'
                ],
                checkboxStates: _checkboxStates[9],
                columnsCount: _columnsCount[9],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(9, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E20 Alcohol test',
                labels: [
                  '1 No alcohol or below legal limit',
                  '2 Over legal limit',
                  '3 Not tested'
                ],
                checkboxStates: _checkboxStates[10],
                columnsCount: _columnsCount[10],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(10, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'E21 Driver/Rider/Pedestrian at fault',
                labels: ['1 Yes', '2 No', '0 Not known/NA'],
                checkboxStates: _checkboxStates[11],
                columnsCount: _columnsCount[11],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(11, rowIndex, columnIndex),
              ),
              TopicTextFields(
                  topic: 'E22 For research purpose',
                  maxChars: 2,
                  columnsCount: _topicTextFieldsCount[3]),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _addCheckboxColumn(0); // Add column to Element Type
                  _addCheckboxColumn(1); // Add column to Vehicle Ownership
                  _addCheckboxColumn(2); // Add column to Driver/Rider/Pedest
                  _addCheckboxColumn(
                      3); // Add column to Validity of driving license
                  _addCheckboxColumn(
                      4); // Add column to Human pre crash factors
                  _addCheckboxColumn(
                      5); // Add column to Pedestrian pre crash factors
                  _addCheckboxColumn(6); // Add column to Road pre crash factors
                  _addCheckboxColumn(
                      7); // Add column to Vehicle pre crash factors
                  _addCheckboxColumn(
                      8); // Add column to Crash factor contributing to accident severity
                  _addCheckboxColumn(9); // Add column to Other factors
                  _addCheckboxColumn(10); // Add column to Alcohol test
                  _addCheckboxColumn(
                      11); // Add column to Driver/Rider/Pedestrian at fault

                  _addTopicTextFields(
                      0); // Add column to Vehicle Registration number
                  _addIntegerInputFields(
                      0); // Add column to Vehicle year of manufacture
                  _addIntegerInputFields(1); // Add column to Age of vehicle
                  _addTopicTextFields(1); // Add column to Direction of movement
                  _addIntegerInputFields(
                      2); // Add column to Driver/Rider/Pedestrian age
                  _addTopicTextFields(
                      2); // Add column to Driving Licence number
                  _addIntegerInputFields(
                      3); // Add column to Year of issue of Driving License
                  _addIntegerInputFields(
                      4); // Add column to Number of years since first issue of driving license
                  _addTopicTextFields(3); // Add column to For research purpose
                },
                child: Text('Add Traffic Element'),
              ),
              SizedBox(height: 50.0),
              Container(
                width: 150,
                child: ElevatedButton(
                  child: Text(
                    'Save',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16.0,
                    ),
                  ),
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      _formKey.currentState?.save();
                      print('Form saved: $formData');
                    } else {
                      print("Error");
                      return;
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class TabCasualty extends StatefulWidget {
  const TabCasualty({super.key});

  @override
  State<TabCasualty> createState() => _TabCasualtyState();
}

class _TabCasualtyState extends State<TabCasualty> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  File? _pickedImage;
  File? _collisionSketch;

  // Store the checkbox states for each section
  final List<List<List<bool>>> _checkboxStates = [
    List.generate(3, (_) => List.generate(3, (_) => false)), // Severity
    List.generate(6, (_) => List.generate(3, (_) => false)), // Category
    List.generate(3, (_) => List.generate(3, (_) => false)), // Sex
    List.generate(6, (_) => List.generate(3, (_) => false)), // Protection
    List.generate(2, (_) => List.generate(3, (_) => false)), // Hospitalized
  ];

  // Keep track of the number of columns for each section
  final List<int> _columnsCount = [
    3, // Initial number of checkbox columns for Severity
    3, // Initial number of checkbox columns for Category
    3, // Initial number of checkbox columns for Sex
    3, // Initial number of checkbox columns for Protection
    3, // Initial number of checkbox columns for Hospitalized
  ];

  List<int> _topicTextFieldsCount = [3];
  List<int> _integerInputFieldsCount = [3];

  void _toggleCheckbox(int sectionIndex, int rowIndex, int columnIndex) {
    setState(() {
      for (int i = 0; i < _checkboxStates[sectionIndex].length; i++) {
        _checkboxStates[sectionIndex][i][columnIndex] = false;
      }
      _checkboxStates[sectionIndex][rowIndex][columnIndex] = true;
      saveFormSectionValue('C${sectionIndex + 1}', columnIndex, rowIndex + 1);
    });
  }

  void _addCheckboxColumn(int sectionIndex) {
    setState(() {
      for (var row in _checkboxStates[sectionIndex]) {
        row.add(false);
      }
      _columnsCount[sectionIndex]++;
    });
  }

  void _addTopicTextFields(int sectionIndex) {
    setState(() {
      _topicTextFieldsCount[sectionIndex]++;
    });
  }

  void _addIntegerInputFields(int sectionIndex) {
    setState(() {
      _integerInputFieldsCount[sectionIndex]++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TopicTextFields(
                topic: 'C1 Traffic element number',
                maxChars: 1,
                columnsCount: _topicTextFieldsCount[0],
              ),
              Text(
                  'If a driver or passenger casualty indicate the vehicles element number in which the casualty traveled.'),
              Text(
                  'If a pedestrian casualty indicate the element number for the pedestrian.'),
              FormSection(
                topic: 'C2. Severity according to penal code',
                labels: [
                  '1 Fatal',
                  '2 Grievous',
                  '3 Non grievous',
                ],
                checkboxStates: _checkboxStates[0],
                columnsCount: _columnsCount[0],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(0, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'C3 Category',
                labels: [
                  '1 Driver/Rider',
                  '2 Pedestrian',
                  '3 Passenger/pillion rider',
                  '4 Passenger/pillion rider falling off vehicle',
                  '5 Passenger entering or leaving bus',
                  '0 Not known',
                ],
                checkboxStates: _checkboxStates[1],
                columnsCount: _columnsCount[1],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(1, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'C4 Sex',
                labels: [
                  '1 Male',
                  '2 Female',
                  '3 Not known',
                ],
                checkboxStates: _checkboxStates[2],
                columnsCount: _columnsCount[2],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(2, rowIndex, columnIndex),
              ),
              IntegerInputFields(
                topic: 'C5 Age',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[0],
              ),
              FormSection(
                topic: 'C6 Protection',
                labels: [
                  '1 Safety belt, worn',
                  '2 Safety belt, not worn',
                  '3 Helmet, worn',
                  '4 Helmet, not worn',
                  '5 Child restraint seat used',
                  '0 Not known/NA',
                ],
                checkboxStates: _checkboxStates[3],
                columnsCount: _columnsCount[3],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(3, rowIndex, columnIndex),
              ),
              FormSection(
                topic: 'C7 Hospitalized',
                labels: [
                  '1 Injured and admitted to hospital at least 1 day',
                  '2 Injured but not admitted to hospital or admitted less than 1 day',
                ],
                checkboxStates: _checkboxStates[4],
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, columnIndex) =>
                    _toggleCheckbox(4, rowIndex, columnIndex),
              ),
              Row(
                children: [
                  ImagePickerFormField(
                    label: 'Collision Sketch',
                    onSaved: (file) => _collisionSketch = file,
                    validator: (file) {
                      if (file == null) {
                        return 'Please attach an image';
                      }
                      return null;
                    },
                  ),
                  SizedBox(width: 20),
                  ImagePickerFormField(
                    label: 'Add Picture',
                    onSaved: (file) => _pickedImage = file,
                    validator: (file) {
                      if (file == null) {
                        return 'Please attach an image';
                      }
                      return null;
                    },
                  ),
                ],
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _addCheckboxColumn(0); // Add column to Severity
                  _addCheckboxColumn(1); // Add column to Category
                  _addCheckboxColumn(2); // Add column to Sex
                  _addCheckboxColumn(3); // Add column to Protection
                  _addCheckboxColumn(4); // Add column to Hospitalized

                  _addTopicTextFields(
                      0); // Add column to Traffic element number
                  _addIntegerInputFields(0); // Add column to Age
                },
                child: Text('Add Traffic Element'),
              ),
              SizedBox(height: 50.0),
              Row(
                children: [
                  Container(
                    width: 150,
                    child: ElevatedButton(
                      child: Text(
                        'Save',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16.0,
                        ),
                      ),
                      onPressed: () {
                        if (_formKey.currentState?.validate() ?? false) {
                          _formKey.currentState?.save();
                          print('Form saved: $formData');
                        } else {
                          print("Error");
                          return;
                        }
                      },
                    ),
                  ),
                  SizedBox(width: 30.0),
                  Container(
                    width: 150,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFFfbbe00) , // Add your desired color here
                      ),
                      child: Text(
                        'Submit',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16.0,
                        ),
                      ),
                      onPressed: () {
                        if (_formKey.currentState?.validate() ?? false) {
                          _formKey.currentState?.save();
                          print('Form saved: $formData');
                        } else {
                          print("Error");
                          return;
                        }
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class TabOther extends StatefulWidget {
  const TabOther({super.key});

  @override
  State<TabOther> createState() => TabOtherState();
}

class TabOtherState extends State<TabOther> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  File? _pickedImage;
  File? _collisionSketch;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                children: [
                  ImagePickerFormField(
                    label: 'Collision Sketch',
                    onSaved: (file) => _collisionSketch = file,
                    validator: (file) {
                      if (file == null) {
                        return 'Please attach an image';
                      }
                      return null;
                    },
                  ),
                  SizedBox(width: 10),
                  ImagePickerFormField(
                    label: 'Add Picture',
                    onSaved: (file) => _pickedImage = file,
                    validator: (file) {
                      if (file == null) {
                        return 'Please attach an image';
                      }
                      return null;
                    },
                  ),
                ],
              ),
              SizedBox(height: 50.0),
              Container(
                width: 150,
                child: ElevatedButton(
                  child: Text(
                    'Submit',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16.0,
                    ),
                  ),
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      _formKey.currentState?.save();
                      print('Form saved: $formData');
                    } else {
                      print("Error");
                      return;
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
