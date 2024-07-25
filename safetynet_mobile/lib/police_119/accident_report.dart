import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import './checkboxInput.dart';

class AccidentReportForm extends StatefulWidget {
  @override
  _AccidentReportFormState createState() => _AccidentReportFormState();
}

class _AccidentReportFormState extends State<AccidentReportForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final Set<String> _selectedClasses = {};
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
  String? _nearestLowerKmPost;
  String? _distanceFromNearestLowerKmPost;
  String? _nodeNumber;
  String? _distanceFromNode;
  double? _eastCoordinate;
  double? _northCoordinate;
  int? _collisionType;
  String? _secondCollisionOccurrence;
  int? _roadSurfaceCondition;
  int? _trafficControl;
  int? _weather;
  int? _postedSpeedLimitSigns;
  int? _gazettedSpeedLimitForLightVehicles;
  int? _gazettedSpeedLimitForHeavyVehicles;
  int? _actionTakenByPolice;
  String? _caseNumber;
  bool _bReport = false; // Set default value to false
  String? _classOfAccident;

  // Variables for the accident class checkboxes
  final _isFatal = false;
  final _isGrievous = false;
  final _isNonGrievous = false;
  final _isDamageOnly = false;

  // Variables for the working/holiday checkboxes
  /*bool _normalWorkingday = false;
  bool _normalWeekend = false;
  bool _publicHoliday = false;
  bool _festiveday = false;*/

  Widget _buildTextField(String label, void Function(String?)? onSaved,
      {String hintText = ''}) {
    return Column(
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
          maxLength: 50,
          maxLines: 1,
          keyboardType: TextInputType.text,
          decoration: InputDecoration(
            //labelText: label,
            border: InputBorder.none,
            filled: true,
            //hintText: hintText,
            floatingLabelBehavior: FloatingLabelBehavior.auto,
          ),
          onSaved: onSaved,
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

  Widget _buildNumericField(String label, void Function(String?)? onSaved,
      {String hintText = ''}) {
    return TextFormField(
      keyboardType: TextInputType.number,
      maxLength: 50,
      decoration: InputDecoration(
        labelText: label,
        floatingLabelStyle: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
        border: InputBorder.none,
        filled: true,
      ),
      onSaved: onSaved,
      validator: (value) {
        if (value?.isEmpty ?? true) {
          return 'This field cannot be empty';
        }
        if (double.tryParse(value!) == null) {
          return 'Please enter a valid number';
        }
        return null;
      },
    );
  }

  // Helper function to update class of accident
  /*void _updateClassOfAccident() {
    if (_isFatal) {
      _classOfAccident = 1;
    } else if (_isGrievous) {
      _classOfAccident = 2;
    } else if (_isNonGrievous) {
      _classOfAccident = 3;
    } else if (_isDamageOnly) {
      _classOfAccident = 4;
    } else {
      _classOfAccident = null;
    }
  }*/

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Road Accident Report',
            style: TextStyle(
                color: Colors.black,
                fontSize: 25.0,
                fontWeight: FontWeight.bold)),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(30.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Text("Station 21", style: TextStyle(fontSize: 20.0)),
              Text("AR-no 118", style: TextStyle(fontSize: 20.0)),
              Text("Police 297 B",
                  style: TextStyle(
                      fontSize: 20.0,
                      fontFamily: 'Roboto',
                      fontWeight: FontWeight.bold)),
            ],
          ),
        ),
        backgroundColor: const Color(0xfffbbe00),
      ),
      body: SingleChildScrollView(
        child: Container(
          margin: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                // Add your form fields here
                _buildTextField('A1. Division', (value) => _division = value),
                _buildTextField('A2. Station', (value) => _station = value),
                _buildTextField(
                    'A5. Unique ID Number', (value) => _uniqueId = value),
                SingleChoiceCheckboxInput(
                  topic: 'Class of Accident',
                  labels: const ['Fatal', 'Grievous', 'Non-Grievous', 'Damage Only'],
                  onSaved: (selectedValue) {
                    _classOfAccident = selectedValue;
                  },
                ),
                _buildNumericField('Urban (1) / Rural (2)',
                    (value) => _urbanOrRural = int.parse(value ?? '0')),
                SingleChoiceCheckboxInput(
                  topic: 'Workday/Holiday',
                  labels: [
                    'Normal working day',
                    'Grievous',
                    'Non-Grievous',
                    'Damage Only'
                  ],
                  onSaved: (selectedValue) {
                    _workdayOrHoliday = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'Day of Week',
                  labels: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  onSaved: (selectedValue) {
                    _dayOfWeek = selectedValue;
                  },
                ),
                _buildTextField('Road Number', (value) => _roadNumber = value),
                _buildTextField(
                    'Road/Street Name', (value) => _roadStreetName = value),
                _buildTextField('Nearest Lower Km Post',
                    (value) => _nearestLowerKmPost = value),
                _buildTextField('Distance from Nearest Lower Km Post',
                    (value) => _distanceFromNearestLowerKmPost = value),
                _buildTextField('Node Number', (value) => _nodeNumber = value),
                _buildTextField(
                    'Distance from Node', (value) => _distanceFromNode = value),
                _buildNumericField('East Coordinate',
                    (value) => _eastCoordinate = double.parse(value ?? '0.0')),
                _buildNumericField('North Coordinate',
                    (value) => _northCoordinate = double.parse(value ?? '0.0')),
                _buildNumericField('Collision Type',
                    (value) => _collisionType = int.parse(value ?? '0')),
                const Text('See separate Appendix'),
                SingleChoiceCheckboxInput(
                  topic: 'Any second collision occurance',
                  labels: [
                    '1 With other vehicle',
                    '2 With Pedestrian',
                    '3 With Fixed object',
                    '9 Others',
                    '0 Not Applicable',
                  ],
                  onSaved: (selectedValue) {
                    _secondCollisionOccurrence = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'Road surface condition',
                  labels: [
                    '1 Dry',
                    '2 Wet',
                    '3 Flooded with water',
                    '4 Slippery surface(mud,oil,garbage,leaves)',
                    '9 Others',
                    '0 Not known',
        
                  ],
                  onSaved: (selectedValue) {
                    _selectedClass = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'weather',
                  labels: [
                    '1 Clear',
                    '2 Cloudy',
                    '3 Rain',
                    '4 Fog/Mist',
                    '9 Others',
                    '0 Not known',
        
                  ],
                  onSaved: (selectedValue) {
                    _selectedClass = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'Light condition',
                  labels: [
                    '1 Daylight',
                    '2 Night,no street lighting',
                    '3 Dusk,dawn',
                    '4 Night,improper street lighting',
                    '5 Night,good street lighting',
                    '0 Not known',
        
                  ],
                  onSaved: (selectedValue) {
                    _selectedClass = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'Type of location',
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
                  onSaved: (selectedValue) {
                    _selectedClass = selectedValue;
                  },
                ),
                SingleChoiceCheckboxInput(
                  topic: 'Type of location when pedestrian/s is/are involved',
                  labels: [
                    '1 Or,pedestrian crossing',
                    '2 Pedestrian crossing within 50 metres',
                    '3 Pedestrian crossing beyond 50 metres',
                    '4 Slippery surface(mud,oil,garbage,leaves)',
                    '9 Others',
                    '0 Not known',
        
                  ],
                  onSaved: (selectedValue) {
                    _selectedClass = selectedValue;
                  },
                ),
                _buildNumericField('Traffic Control',
                    (value) => _trafficControl = int.parse(value ?? '0')),
                _buildNumericField(
                    'Weather', (value) => _weather = int.parse(value ?? '0')),
                _buildNumericField(
                    'Posted Speed Limit Signs',
                    (value) =>
                        _postedSpeedLimitSigns = int.parse(value ?? '0')),
                _buildNumericField(
                    'Gazetted Speed Limit for Light Vehicles',
                    (value) => _gazettedSpeedLimitForLightVehicles =
                        int.parse(value ?? '0')),
                _buildNumericField(
                    'Gazetted Speed Limit for Heavy Vehicles',
                    (value) => _gazettedSpeedLimitForHeavyVehicles =
                        int.parse(value ?? '0')),
                _buildNumericField('Action Taken by Police',
                    (value) => _actionTakenByPolice = int.parse(value ?? '0')),
                _buildTextField('Case Number', (value) => _caseNumber = value),
                CheckboxListTile(
                  title: Text('B Report'),
                  value: _bReport,
                  onChanged: (bool? value) {
                    setState(() {
                      _bReport = value ?? false;
                    });
                  },
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
                        print('Form is valid');
                      } else {
                        print("Error");
                        return;
                      }
                    },
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
