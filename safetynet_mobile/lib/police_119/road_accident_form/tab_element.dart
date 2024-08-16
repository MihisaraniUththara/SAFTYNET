//import 'dart:io';

//import 'package:flutter/cupertino.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
//import 'package:flutter/widgets.dart';
//import 'package:get/get_connect/http/src/utils/utils.dart';

import 'input_fields.dart';

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
                      // Save checkbox data from FormSection
                      for (int sectionIndex = 0;
                          sectionIndex < _checkboxStates.length;
                          sectionIndex++) {
                        for (int rowIndex = 0;
                            rowIndex < _checkboxStates[sectionIndex].length;
                            rowIndex++) {
                          for (int colIndex = 0;
                              colIndex <
                                  _checkboxStates[sectionIndex][rowIndex]
                                      .length;
                              colIndex++) {
                            if (_checkboxStates[sectionIndex][rowIndex]
                                [colIndex]) {
                              saveFormSectionValue('E${sectionIndex + 1}',
                                  colIndex, rowIndex + 1);
                            }
                          }
                        }
                      }

                      print('Form saved: $formData');

                      // Save data to Firestore (replace with your collection path)
                      FirebaseFirestore.instance
                          .collection('accident')
                          .doc('elementDraft')
                          .set(formData)
                          .then((_) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Data saved successfully')),
                        );
                      }).catchError((error) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                              content: Text('Failed to save data: $error')),
                        );
                      });
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


  
                    /*  print('Form saved: $formData');
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
