import 'dart:io';
import 'dart:math';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import 'input_fields.dart';

class TabCasualty extends StatefulWidget {
  final String officerID;   // Accept officerID
  final Map<String, dynamic>? draftData;  //Accept draft data
  final ValueNotifier<String?> uniqueIdNotifier; // Shared notifier 

  // Pass officerID via the constructor
  const TabCasualty({
    super.key,
    required this.officerID,
    this.draftData,
    required this.uniqueIdNotifier,
  });
  
  @override
  State<TabCasualty> createState() => _TabCasualtyState();
}

class _TabCasualtyState extends State<TabCasualty> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Declare the casultyData map to store all form values
  Map<String, dynamic> casualtyData = {};

  // Controllers for text fields
  final Map<String, List<TextEditingController>> _textControllers = {
    'C1': [], // Traffic element number
  };

  // Controllers for integer fields
  final Map<String, List<TextEditingController>> _integerControllers = {
    'C5': [], // Age
  };

  // Store the checkbox states for each section
  final Map<String, List<List<bool>>> _checkboxStates = {
    'C2': List.generate(3, (_) => List.generate(3, (_) => false)), // Severity
    'C3': List.generate(6, (_) => List.generate(3, (_) => false)), // Category
    'C4': List.generate(3, (_) => List.generate(3, (_) => false)), // Sex
    'C6': List.generate(6, (_) => List.generate(3, (_) => false)), // Protection
    'C7':
        List.generate(2, (_) => List.generate(3, (_) => false)), // Hospitalized
  };

  // Keep track of the initial number of columns for each section
  List<int> _columnsCount = List.filled(5, 3); //=[3,3,3,3,3]
  List<int> _topicTextFieldsCount = List.filled(1, 3); //=[3]
  List<int> _integerInputFieldsCount = List.filled(1, 3); //=[3]
  //List<int> _integerInputFieldsCount = [3];

  // Define labels for each section
  final Map<String, List<String>> labels = {
    'C2': ['1 Fatal', '2 Grievous', '3 Non grievous'],
    'C3': [
      '1 Driver/Rider',
      '2 Pedestrian',
      '3 Passenger/pillion rider',
      '4 Passenger/pillion rider falling off vehicle',
      '5 Passenger entering or leaving bus',
      '0 Not known'
    ],
    'C4': ['1 Male', '2 Female', '3 Not known'],
    'C6': [
      '1 Safety belt, worn',
      '2 Safety belt, not worn',
      '3 Helmet, worn',
      '4 Helmet, not worn',
      '5 Child restraint seat used',
      '0 Not known/NA'
    ],
    'C7': [
      '1 Injured and admitted to hospital at least 1 day',
      '2 Injured but not admitted to hospital or admitted less than 1 day'
    ],
  };

  @override
  void initState() {
    super.initState();
    print('load Draft');
    _initializeControllers();
    if (widget.draftData != null) {
      _loadDraftData();
      
    }
  }

  void _initializeControllers() {
    // Initialize text controllers
    _textControllers.forEach((key, list) {
      for (int i = 0; i < 3; i++) {
        list.add(TextEditingController());
      }
    });

    // Initialize integer controllers
    _integerControllers.forEach((key, list) {
      for (int i = 0; i < 3; i++) {
        list.add(TextEditingController());
      }
    });
  }

  void _loadDraftData() {
    final dataC = widget.draftData?['C'];
    if (dataC != null) {
      setState(() {
        casualtyData = Map<String, dynamic>.from(dataC);

        // Load checkbox values
        _checkboxStates.forEach((section, rows) {
          for (int i = 0; i < rows.length; i++) {
            for (int j = 0; j < rows[i].length; j++) {
              String key = '$section${String.fromCharCode(65 + j)}'; // Key format: C2A, C2B, etc.
              String expectedPrefix = labels[section]![i].split(' ')[0];
              if (dataC[key] != null &&
                  dataC[key].toString() == expectedPrefix) {
                rows[i][j] = true; // Match found, set checkbox as checked
              } else {
                rows[i][j] = false; // No match, ensure checkbox is unchecked
              }
              
              print('Section: $section, Row: $i, Column: $j, Key: $key');
            }
          }
        });

        // Load text field values
        _textControllers.forEach((section, controllers) {
          for (int i = 0; i < controllers.length; i++) {          //controllers.length = _columnCount.length
            String key = '$section${String.fromCharCode(65 + i)}';
            if (dataC[key] != null) {
              controllers[i].text = dataC[key].toString();
            }
          }
        });

        // Load integer field values
        _integerControllers.forEach((section, controllers) {
          for (int i = 0; i < controllers.length; i++) {
            String key = '$section${String.fromCharCode(65 + i)}';
            if (dataC[key] != null) {
              controllers[i].text = dataC[key].toString();
            }
          }
        });

        // Update column counts if needed
        int maxColumns = 3;
        _checkboxStates.forEach((key, value) {
          for (var row in value) {
            maxColumns = max(maxColumns, row.length);
          }
        });

        _columnsCount = List.filled(5, maxColumns);
        _topicTextFieldsCount = List.filled(1, maxColumns);
        _integerInputFieldsCount = List.filled(1, maxColumns);
      });
    }
  }

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
      String section = ['C2', 'C3', 'C4', 'C6', 'C7'][sectionIndex];
      if (_checkboxStates.containsKey(section)) {
        for (var row in _checkboxStates[section]!) {
          row.add(false);
        }
      }
      _columnsCount[sectionIndex]++;
    });
  }

  void _addTopicTextFields(int sectionIndex) {
    setState(() {
      _topicTextFieldsCount[sectionIndex]++;
      _textControllers['C1']?.add(TextEditingController());
    });
  }

  void _addIntegerInputFields(int sectionIndex) {
    setState(() {
      _integerInputFieldsCount[sectionIndex]++;
      _integerControllers['C5']?.add(TextEditingController());
    });
  }

  void _addColumnsAndFields() {
    for (int i = 0; i < _columnsCount.length; i++) {
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
    String draftID =
        "${widget.officerID}_${widget.uniqueIdNotifier.value}"; // Use the passed officerID

    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

    _formKey.currentState!.save();

    // Save text field values
    _textControllers.forEach((section, controllers) {
      for (int i = 0; i < controllers.length; i++) {
        String key = '$section${String.fromCharCode(65 + i)}';
        casualtyData[key] = controllers[i].text.trim();
      }
    });

    // Save integer field values
    _integerControllers.forEach((section, controllers) {
      for (int i = 0; i < controllers.length; i++) {
        String key = '$section${String.fromCharCode(65 + i)}';
        casualtyData[key] = controllers[i].text.trim();
      }
    });
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
        margin: const EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TopicTextFields(
                topic: 'C1 Traffic element number',
                maxChars: 1,
                columnsCount: _topicTextFieldsCount[0],
                controllers: _textControllers['C1']!,
                onChanged: (key, value) => casualtyData[key] = value,
              ),
              const Text(
                'If a driver or passenger casualty indicate the vehicles element number in which the casualty traveled.',
                style: TextStyle(fontSize: 12),
              ),
              const Text(
                'If a pedestrian casualty indicate the element number for the pedestrian.',
                style: TextStyle(fontSize: 12),
              ),
              const SizedBox(height: 16),
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
                controllers: _integerControllers['C5']!,
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
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _addColumnsAndFields,
                child: Text('Add Traffic Element'),
              ),
              const SizedBox(height: 50.0),
              SizedBox(
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

  @override
  void dispose() {
    // Dispose of all controllers
    _textControllers.forEach((_, controllers) {
      for (var controller in controllers) {
        controller.dispose();
      }
    });
    _integerControllers.forEach((_, controllers) {
      for (var controller in controllers) {
        controller.dispose();
      }
    });
    super.dispose();
  }
}
