//import 'dart:io';

//import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:flutter/widgets.dart';
//import 'package:get/get_connect/http/src/utils/utils.dart';

import 'input_fields.dart';

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


