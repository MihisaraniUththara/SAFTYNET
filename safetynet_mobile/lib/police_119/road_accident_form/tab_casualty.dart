import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import 'input_fields.dart';

class TabCasualty extends StatefulWidget {
  final String officerID; // Accept officerID

  // Pass officerID via the constructor
  const TabCasualty({super.key, required this.officerID});

  @override
  State<TabCasualty> createState() => _TabCasualtyState();
}

class _TabCasualtyState extends State<TabCasualty> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Declare the casultyData map to store all form values
  Map<String, dynamic> casualtyData = {};

  // Store the checkbox states for each section
  final Map<String, List<List<bool>>> _checkboxStates = {
    'C2': List.generate(3, (_) => List.generate(3, (_) => false)), // Severity
    'C3': List.generate(6, (_) => List.generate(3, (_) => false)), // Category
    'C4': List.generate(3, (_) => List.generate(3, (_) => false)), // Sex
    'C6': List.generate(6, (_) => List.generate(3, (_) => false)), // Protection
    'C7':
        List.generate(2, (_) => List.generate(3, (_) => false)), // Hospitalized
  };

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

  void _toggleCheckbox(
      String sectionPrefix, int rowIndex, String labelPrefix, int columnIndex) {
    setState(() {
      // Reset all other checkboxes in the row for that section
      if (_checkboxStates[sectionPrefix] != null) {
        for (int i = 0; i < _checkboxStates[sectionPrefix]!.length; i++) {
          _checkboxStates[sectionPrefix]![i][columnIndex] = false;
        }
      }

      // Set the selected checkbox to true
      _checkboxStates[sectionPrefix]![rowIndex][columnIndex] = true;

      // Save the selected value using the label's prefix
      String casualty = String.fromCharCode(65 + columnIndex); // A, B, C...
      saveFormSectionValue(sectionPrefix + casualty, labelPrefix);
    });
  }

  void _addCheckboxColumn(int sectionIndex) {
    setState(() {
      for (var row in _checkboxStates['E${sectionIndex + 1}']!) {
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

  void _addColumnsAndFields() {
    for (int i = 0; i < 12; i++) {
      _addCheckboxColumn(i);
    }
    for (int i = 0; i < _topicTextFieldsCount.length; i++) {
      _addTopicTextFields(i);
    }
    for (int i = 0; i < _integerInputFieldsCount.length; i++) {
      _addIntegerInputFields(i);
    }
  }

  void saveFormSectionValue(String key, dynamic value) {
    casualtyData[key] = value;
    print('Saved: $key = $value');
  }

  Future<void> saveCasualtyDraft() async {
    
    String draftID = "${widget.officerID}_currentAccidentID"; // Use the passed officerID

    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

     _formKey.currentState!.save();
    try {
      // Try to update the document if it exists
      await draftRef.update({
        'C': casualtyData, // Save C data 
        'updatedAt': FieldValue.serverTimestamp(),
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Draft updated successfully')),
      );
    } catch (e) {
      // If the document doesn't exist, create it
      try {
        await draftRef.set({
          'C': casualtyData,
          'officerID': widget.officerID,
          //'accidentID': accidentID,
          'createdAt': FieldValue.serverTimestamp(),
          'updatedAt': FieldValue.serverTimestamp(),
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Draft created successfully')),
        );
      } catch (e) {
        print('Failed to save draft: $e');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save draft')),
        );
      }
    }
  }

  /*Future<void> _saveForm() async {
    /*setState(() {
      _saveAttempted =
          true; // Mark the form as submitted when the user clicks save
    });*/

    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      // Save form data to Firestore
      try {
        await FirebaseFirestore.instance
            .collection('accident')
            .doc('casualtydraft')
            .set(formData);

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Draft saved successfully')),
        );
      } catch (e) {
        print('Failed to save draft: $e');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save draft')),
        );
      }
    } else {
      // Validation failed
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text('Please correct the validation errors in the form')),
      );
    }
  }*/

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
                onChanged: (key, value) {
                  casualtyData[key] = value;
                },
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
                checkboxStates: _checkboxStates['C2']!,
                columnsCount: _columnsCount[0],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('C2', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['C3']!,
                columnsCount: _columnsCount[1],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('C3', rowIndex, labelPrefix, columnIndex),
              ),
              FormSection(
                topic: 'C4 Sex',
                labels: [
                  '1 Male',
                  '2 Female',
                  '3 Not known',
                ],
                checkboxStates: _checkboxStates['C4']!,
                columnsCount: _columnsCount[2],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('C4', rowIndex, labelPrefix, columnIndex),
              ),
              IntegerInputFields(
                topic: 'C5 Age',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[0],
                onChanged: (key, value) {
                  casualtyData[key] = value;
                },
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
                checkboxStates: _checkboxStates['C6']!,
                columnsCount: _columnsCount[3],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('C6', rowIndex, labelPrefix, columnIndex),
              ),
              FormSection(
                topic: 'C7 Hospitalized',
                labels: [
                  '1 Injured and admitted to hospital at least 1 day',
                  '2 Injured but not admitted to hospital or admitted less than 1 day',
                ],
                checkboxStates: _checkboxStates['C7']!,
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('C7', rowIndex, labelPrefix, columnIndex),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _addColumnsAndFields();
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
                   onPressed: saveCasualtyDraft,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
