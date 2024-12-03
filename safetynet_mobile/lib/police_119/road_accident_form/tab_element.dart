import 'dart:math';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'input_fields.dart';

class TabElement extends StatefulWidget {
  final String officerID; // Accept officerID
  final Map<String, dynamic>? draftData;
  final ValueNotifier<String?> uniqueIdNotifier; // Shared notifier

  // Pass officerID via the constructor
  const TabElement({
    super.key,
    required this.officerID,
    this.draftData,
    required this.uniqueIdNotifier,
  });

  @override
  State<TabElement> createState() => _TabElementState();
}

class _TabElementState extends State<TabElement> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Declare the elementData map to store all form values
  Map<String, dynamic> elementData = {};

  // Controllers for text fields
  final Map<String, List<TextEditingController>> _textControllers = {
    'E2': [], // Vehicle Registration number
    'E6': [], // Direction of movement
    'E9': [], // Driving License number
    'E22': [], // For research purpose
  };

  // Controllers for integer fields
  final Map<String, List<TextEditingController>> _integerControllers = {
    'E3': [], // Vehicle year of manufacture
    'E4': [], // Age of vehicle
    'E8': [], // Driver/Rider/Pedestrian age
    'E11': [], // Year of issue of Driving License
    'E12': [], // Number of years since first issue of driving license
  };

  // Store the checkbox states for each section
  final Map<String, List<List<bool>>> _checkboxStates = {
    'E1': List.generate(
        15, (_) => List.generate(3, (_) => false)), // Element Type
    'E5': List.generate(
        7, (_) => List.generate(3, (_) => false)), // Vehicle Ownership
    'E7': List.generate(
        3, (_) => List.generate(3, (_) => false)), // Driver/Rider/Pedest Sex
    'E10': List.generate(6,
        (_) => List.generate(3, (_) => false)), // Validity of driving license
    'E13': List.generate(
        11,
        (_) => List.generate(3,
            (_) => false)), // Human pre crash factor 1 contributing to accident
    'E14': List.generate(
        11,
        (_) => List.generate(3,
            (_) => false)), // human pre crash factor 2 contributing to accident
    'E15': List.generate(
        6,
        (_) => List.generate(
            3,
            (_) =>
                false)), // Pedestrian pre crash factor contributing to accident
    'E16': List.generate(
        6,
        (_) => List.generate(
            3, (_) => false)), // Road pre crash factor contributing to accident
    'E17': List.generate(
        8,
        (_) => List.generate(
            3,
            (_) =>
                false)), // Vehicle pre crash factor defects contributing to accident
    'E18': List.generate(
        8,
        (_) => List.generate(
            3, (_) => false)), // Crash factor contributing to accident severity
    'E19': List.generate(
        6, (_) => List.generate(3, (_) => false)), // Other factors
    'E20':
        List.generate(3, (_) => List.generate(3, (_) => false)), // Alcohol test
    'E21': List.generate(
        3,
        (_) =>
            List.generate(3, (_) => false)), // Driver/Rider/Pedestrian at fault
  };

  // Define labels for each section
  final Map<String, List<String>> labels = {
    'E1': [
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
    'E5': [
      '1 Private vehicle',
      '2 Private company own vehicle',
      '3 Government vehicle',
      '4 Semi Government vehicle',
      '5 Service vehicle',
      '6 Police vehicle',
      '0 Not Known',
    ],
    'E7': ['1 Male', '2 Female', '0 Not known'],
    'E10': [
      '1 Valid license for the vehicle',
      '2 Without valid license for the vehicle',
      '3 Learner permit',
      '4 Probation license',
      '5 International license',
      '0 Not known/NA'
    ],
    'E13': [
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
    'E14': [
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
    'E15': [
      '1 Unexpected pedestrian movement',
      '2 Disobey designated crossing',
      '3 Influenced by alcohol/drugs',
      '4 Poor visibility(clothing)',
      '9 Other',
      '0 Not known/NA'
    ],
    'E16': [
      '1 Defective road surface,slippery road,pot holes,water puddles,large cracks,high or low sewer covers etc.',
      '2 Defective,absent or badly maintained road markings or signs',
      '3 Road works without adequate traffic control devices',
      '4 Weather conditions',
      '5 Poor street lighting',
      '9 Other',
    ],
    'E17': [
      '1 Brakes',
      '2 Tyres,wheels',
      '3 Steering',
      '4 Lights,lamps',
      '5 Poor mechanical condition',
      '6 Overloaded or wrongly loaded vehicle',
      '9 Other',
      '0 Not known/NA'
    ],
    'E18': [
      '1 Hitting tree',
      '2 Hitting pole/post',
      '3 Hitting stone or boulder',
      '4 Hitting road island,curb etc.',
      '5 Hitting barrier or guard rail',
      '6 Hitting other fixed object',
      '7 Rolled over',
      '0 Not known/NA'
    ],
    'E19': [
      '1 Avoiding maneuver',
      '2 Hit and run',
      '3 Road works',
      '4 Post crash violence',
      '5 Stolen vehicle',
      '0 Not known/NA'
    ],
    'E20': [
      '1 No alcohol or below legal limit',
      '2 Over legal limit',
      '3 Not tested'
    ],
    'E21': ['1 Yes', '2 No', '0 Not known/NA'],
  };

  // Keep track of the initial number of columns for each section
  List<int> _columnsCount = List.filled(12, 3); //12*3
  List<int> _topicTextFieldsCount = List.filled(4, 3); // [3, 3, 3, 3];
  List<int> _integerInputFieldsCount = List.filled(5, 3); //[3, 3, 3, 3, 3];

  @override
  void initState() {
    super.initState();
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
    final dataE = widget.draftData!['E'];
    if (dataE != null) {
      setState(() {
        elementData = Map<String, dynamic>.from(dataE);

        // Load checkbox values
        _checkboxStates.forEach((section, rows) {
          for (int i = 0; i < rows.length; i++) {
            for (int j = 0; j < rows[i].length; j++) {
              String key =
                  '$section${String.fromCharCode(65 + j)}'; // Key format: E2A, E2B, etc.
              String expectedPrefix = labels[section]![i].split(' ')[0];
              if (dataE[key] != null &&
                  dataE[key].toString() == expectedPrefix) {
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
          for (int i = 0; i < controllers.length; i++) {
            //controllers.length = _columnCount.length
            String key = '$section${String.fromCharCode(65 + i)}';
            if (dataE[key] != null) {
              controllers[i].text = dataE[key].toString();
            }
          }
        });

        // Load integer field values
        _integerControllers.forEach((section, controllers) {
          for (int i = 0; i < controllers.length; i++) {
            String key = '$section${String.fromCharCode(65 + i)}';
            if (dataE[key] != null) {
              controllers[i].text = dataE[key].toString();
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

        _columnsCount = List.filled(12, maxColumns);
        _topicTextFieldsCount = List.filled(4, maxColumns);
        _integerInputFieldsCount = List.filled(5, maxColumns);
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
      String trafficElement =
          String.fromCharCode(65 + columnIndex); // A, B, C...
      saveFormSectionValue(sectionPrefix + trafficElement, labelPrefix);
    });
  }

  void _addCheckboxColumn(int sectionIndex) {
    setState(() {
      String section = [
        'E1',
        'E5',
        'E7',
        'E10',
        'E13',
        'E14',
        'E15',
        'E16',
        'E17',
        'E18',
        'E19',
        'E20',
        'E21'
      ][sectionIndex];
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
      String section = ['E2', 'E6', 'E9', 'E22'][sectionIndex];
      _textControllers[section]?.add(TextEditingController());
    });
  }

  void _addIntegerInputFields(int sectionIndex) {
    setState(() {
      _integerInputFieldsCount[sectionIndex]++;
      String section = ['E3', 'E4', 'E8', 'E11', 'E12'][sectionIndex];
      _integerControllers[section]?.add(TextEditingController());
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
    elementData[key] = value;
    print('Saved: $key = $value');
  }

  Future<void> saveElementDraft() async {

    String draftID =
        "${widget.officerID}_${widget.uniqueIdNotifier.value}"; // Use the passed officerID

    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

    _formKey.currentState!.save();

    // Save text field values
    _textControllers.forEach((section, controllers) {
      for (int i = 0; i < controllers.length; i++) {
        String key = '$section${String.fromCharCode(65 + i)}';
        elementData[key] = controllers[i].text.trim();
      }
    });

    // Save integer field values
    _integerControllers.forEach((section, controllers) {
      for (int i = 0; i < controllers.length; i++) {
        String key = '$section${String.fromCharCode(65 + i)}';
        elementData[key] = controllers[i].text.trim();
      }
    });

    try {
      // Try to update the document if it exists
      await draftRef.update({
        'E': elementData, // Save  E data
        'updatedAt': FieldValue.serverTimestamp(),
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Draft updated successfully')),
      );
    } catch (e) {
      // If the document doesn't exist, create it
      try {
        await draftRef.set({
          'E': elementData,
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
            .doc('elementdraft')
            .set(elementData);

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
                checkboxStates: _checkboxStates['E1']!,
                columnsCount: _columnsCount[0],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E1', rowIndex, labelPrefix, columnIndex),
              ),
              TopicTextFields(
                topic: 'E2 Vehicle Registration number',
                maxChars: 9,
                columnsCount: _topicTextFieldsCount[0],
                controllers: _textControllers['E2']!,
                onChanged: (key, value) {
                  elementData[key] = value; // Store the value in the form state
                },
              ),
              IntegerInputFields(
                topic: 'E3 Vehicle year of manufacture',
                maxChars: 4,
                columnsCount: _integerInputFieldsCount[0],
                controllers: _integerControllers['E3']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                  print(elementData[key]);
                },
              ),
              IntegerInputFields(
                topic: 'E4 Age of vehicle',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[1],
                controllers: _integerControllers['E4']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
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
                checkboxStates: _checkboxStates['E5']!,
                columnsCount: _columnsCount[1],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E5', rowIndex, labelPrefix, columnIndex),
              ),
              TopicTextFields(
                topic: 'E6 Direction of movement',
                maxChars: 2,
                columnsCount: _topicTextFieldsCount[1],
                controllers: _textControllers['E6']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
              ),
              FormSection(
                topic: 'E7 Driver/Rider/Pedestrian Sex',
                labels: ['1 Male', '2 Female', '0 Not known'],
                checkboxStates: _checkboxStates['E7']!,
                columnsCount: _columnsCount[2],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E7', rowIndex, labelPrefix, columnIndex),
              ),
              IntegerInputFields(
                topic: 'E8 Driver/Rider/Pedestrian age',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[2],
                controllers: _integerControllers['E8']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
              ),
              TopicTextFields(
                topic: 'E9 Driving Licence number',
                maxChars: 10,
                columnsCount: _topicTextFieldsCount[2],
                controllers: _textControllers['E9']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
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
                checkboxStates: _checkboxStates['E10']!,
                columnsCount: _columnsCount[3],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E10', rowIndex, labelPrefix, columnIndex),
              ),
              IntegerInputFields(
                topic: 'E11 Year of issue of Driving License',
                maxChars: 4,
                columnsCount: _integerInputFieldsCount[3],
                controllers: _integerControllers['E11']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
              ),
              IntegerInputFields(
                topic:
                    'E12 Number of years since first issue of driving license',
                maxChars: 2,
                columnsCount: _integerInputFieldsCount[4],
                controllers: _integerControllers['E12']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
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
                checkboxStates: _checkboxStates['E13']!,
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E13', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E14']!,
                columnsCount: _columnsCount[4],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E14', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E15']!,
                columnsCount: _columnsCount[5],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E15', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E16']!,
                columnsCount: _columnsCount[6],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E16', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E17']!,
                columnsCount: _columnsCount[7],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E17', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E18']!,
                columnsCount: _columnsCount[8],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E18', rowIndex, labelPrefix, columnIndex),
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
                checkboxStates: _checkboxStates['E19']!,
                columnsCount: _columnsCount[9],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E19', rowIndex, labelPrefix, columnIndex),
              ),
              FormSection(
                topic: 'E20 Alcohol test',
                labels: [
                  '1 No alcohol or below legal limit',
                  '2 Over legal limit',
                  '3 Not tested'
                ],
                checkboxStates: _checkboxStates['E20']!,
                columnsCount: _columnsCount[10],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E20', rowIndex, labelPrefix, columnIndex),
              ),
              FormSection(
                topic: 'E21 Driver/Rider/Pedestrian at fault',
                labels: ['1 Yes', '2 No', '0 Not known/NA'],
                checkboxStates: _checkboxStates['E21']!,
                columnsCount: _columnsCount[11],
                onCheckboxChanged: (rowIndex, labelPrefix, columnIndex) =>
                    _toggleCheckbox('E21', rowIndex, labelPrefix, columnIndex),
              ),
              TopicTextFields(
                topic: 'E22 For research purpose',
                maxChars: 2,
                columnsCount: _topicTextFieldsCount[3],
                controllers: _textControllers['E22']!,
                onChanged: (key, value) {
                  elementData[key] = value;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _addColumnsAndFields,
                child: Text('Add a Traffic Element'),
              ),
              const SizedBox(height: 50.0),
              SizedBox(
                width: 150,
                child: ElevatedButton(
                  child: const Text(
                    'Save',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16.0,
                    ),
                  ),
                  onPressed: saveElementDraft,
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
