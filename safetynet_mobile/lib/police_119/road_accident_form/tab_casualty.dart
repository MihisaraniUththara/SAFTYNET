import 'dart:io';

//import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:flutter/widgets.dart';
//import 'package:get/get_connect/http/src/utils/utils.dart';

import 'input_fields.dart';

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
                        backgroundColor:
                            Color(0xFFfbbe00), // Add your desired color here
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

/*class TabOther extends StatefulWidget {
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
}*/