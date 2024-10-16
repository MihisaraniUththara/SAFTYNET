import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/rendering.dart';
import 'input_fields.dart';

class TabAccident extends StatefulWidget {
  final String officerID; // Accept officerID
  final Map<String, dynamic>? draftData; // Accept draft data

  // Pass officerID via the constructor
  const TabAccident({super.key, required this.officerID, this.draftData});
  @override
  State<TabAccident> createState() => _TabAccidentState();
}

class _TabAccidentState extends State<TabAccident> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _saveAttempted = false; // Flag to track if the form has been submitted

  // Controllers for text and numeric fields
  final _divisionController = TextEditingController();
  final _stationController = TextEditingController();
  final _dateController = TextEditingController();
  final _timeController = TextEditingController();
  final _uniqueIdController = TextEditingController();
  //final _dayOfWeek = TextEditingController();
  final _roadNumberController = TextEditingController();
  final _streetNameController = TextEditingController();
  final _nearestLowerkmPostController = TextEditingController();
  final _distanceFromNearestLowerKmPostController = TextEditingController();
  final _nodeNumberController = TextEditingController();
  final _linkNumberController = TextEditingController();
  final _distanceFromNodeController = TextEditingController();
  final _eastCoordinateController = TextEditingController();
  final _northCoordinateController = TextEditingController();
  final _collisionTypeController = TextEditingController();
  final _caseNumberController = TextEditingController();
  final _bReportController = TextEditingController();
  final _researchPurposeController = TextEditingController();
  final _gazettedSpeedLimitForLightVehiclesController = TextEditingController();
  final _gazettedSpeedLimitForHeavyVehiclesController = TextEditingController();

  // Variables to store checkbox selections
  String? _classOfAccident;
  String? _urbanOrRural;
  String? _workdayOrHoliday;
  String? _secondCollisionOccurence;
  String? _roadSurfaceCondition;
  String? _weather;
  String? _lightCondition;
  String? _locationType;
  String? _locationTypeWhenPedestrianInvolved;
  String? _trafficControl;
  String? _postedSpeedLimitSigns;
  String? _policeAction;
  String? _casualties;

  @override
  void initState() {
    super.initState();
    // Populate fields with draft data if available
    if (widget.draftData != null) {
      
      _divisionController.text = widget.draftData?['A']?['A1'] ?? '';
      _stationController.text = widget.draftData?['A']?['A2'] ?? '';
      _dateController.text = widget.draftData?['A']?['A3'] ?? '';
      _timeController.text = widget.draftData?['A']?['A4'] ?? '';
      _uniqueIdController.text = widget.draftData?['A']?['A5'] ?? '';
      _classOfAccident = widget.draftData?['A']?['A6'] ?? '';
      _urbanOrRural = widget.draftData?['A']?['A7'] ?? '';
      _workdayOrHoliday = widget.draftData?['A']?['A8'] ?? '';
      //_dayOfWeek.text = widget.draftData?['A']?['A9'] ?? '';
      _roadNumberController.text = widget.draftData?['A']?['A10'] ?? '';
      _streetNameController.text = widget.draftData?['A']?['A11'] ?? '';
      _nearestLowerkmPostController.text = widget.draftData?['A']?['A12'] ?? '';
      _distanceFromNearestLowerKmPostController.text =
          widget.draftData?['A']?['A13'] ?? '';
      _nodeNumberController.text = widget.draftData?['A']?['A14'] ?? '';
      _linkNumberController.text = widget.draftData?['A']?['A15'] ?? '';
      _distanceFromNodeController.text = widget.draftData?['A']?['A16'] ?? '';
      _eastCoordinateController.text = widget.draftData?['A']?['A17'] ?? '';
      _northCoordinateController.text = widget.draftData?['A']?['A18'] ?? '';
      _collisionTypeController.text = widget.draftData?['A']?['A19'] ?? '';
      _secondCollisionOccurence = widget.draftData?['A']?['A20'] ?? '';
      _roadSurfaceCondition = widget.draftData?['A']?['A21'] ?? '';
      _weather = widget.draftData?['A']?['A22'] ?? '';
      _lightCondition = widget.draftData?['A']?['A23'] ?? '';
      _locationType = widget.draftData?['A']?['A24'] ?? '';
      _locationTypeWhenPedestrianInvolved =
          widget.draftData?['A']?['A25'] ?? '';
      _trafficControl = widget.draftData?['A']?['A26'] ?? '';
      _postedSpeedLimitSigns = widget.draftData?['A']?['A27'] ?? '';
      _gazettedSpeedLimitForLightVehiclesController.text =
          widget.draftData?['A']?['A28'] ?? '';
      _gazettedSpeedLimitForHeavyVehiclesController.text =
          widget.draftData?['A']?['A29'] ?? '';
      _policeAction = widget.draftData?['A']?['A30'] ?? '';
      _caseNumberController.text = widget.draftData?['A']?['A31'] ?? '';
      _bReportController.text = widget.draftData?['A']?['A32'] ?? '';
      _casualties = widget.draftData?['A']?['A33'] ?? '';
      _researchPurposeController.text = widget.draftData?['A']?['A34'] ?? '';
    }
  }

  // Method to save accident data to Firestore
  Future<void> saveAccidentDraft() async {
    /*setState(() {
      _saveAttempted =
          true; // Mark the form as submitted when the user clicks save
    });*/

    String draftID =
        "${widget.officerID}_currentAccidentID"; // Use the passed officerID

    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

    _formKey.currentState!.save();
    try {
      // Try to update the document if it exists
      await draftRef.update({
        'A': {
          'A1': _divisionController.text.trim(),
          'A2': _stationController.text.trim(),
          'A3': _dateController.text.trim(),
          'A4': _timeController.text.trim(),
          'A5': _uniqueIdController.text.trim(),
          'A6': _classOfAccident,
          'A7': _urbanOrRural,
          'A8': _workdayOrHoliday,
          //'A9': _dayOfWeek.text.trim(),
          'A10': _roadNumberController.text.trim(),
          'A11': _streetNameController.text.trim(),
          'A12': _nearestLowerkmPostController.text.trim(),
          'A13': _distanceFromNearestLowerKmPostController.text.trim(),
          'A14': _nodeNumberController.text.trim(),
          'A15': _linkNumberController.text.trim(),
          'A16': _distanceFromNodeController.text.trim(),
          'A17': _eastCoordinateController.text.trim(),
          'A18': _northCoordinateController.text.trim(),
          'A19': _collisionTypeController.text.trim(),
          'A20': _secondCollisionOccurence,
          'A21': _roadSurfaceCondition,
          'A22': _weather,
          'A23': _lightCondition,
          'A24': _locationType,
          'A25': _locationTypeWhenPedestrianInvolved,
          'A26': _trafficControl,
          'A27': _postedSpeedLimitSigns,
          'A28': _gazettedSpeedLimitForLightVehiclesController.text.trim(),
          'A29': _gazettedSpeedLimitForHeavyVehiclesController.text.trim(),
          'A30': _policeAction,
          'A31': _caseNumberController.text.trim(),
          'A32': _bReportController.text.trim(),
          'A33': _casualties,
          'A34': _researchPurposeController.text.trim(),
        }, // Save A data
        'updatedAt': FieldValue.serverTimestamp(),
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Draft updated successfully')),
      );
    } catch (e) {
      // If the document doesn't exist, create it
      try {
        await draftRef.set({
          'A': {
            'A1': _divisionController.text.trim(),
            'A2': _stationController.text.trim(),
            'A3': _dateController.text.trim(),
            'A4': _timeController.text.trim(),
            'A5': _uniqueIdController.text.trim(),
            'A6': _classOfAccident,
            'A7': _urbanOrRural,
            'A8': _workdayOrHoliday,
            //'A9': _dayOfWeek.text.trim(),
            'A10': _roadNumberController.text.trim(),
            'A11': _streetNameController.text.trim(),
            'A12': _nearestLowerkmPostController.text.trim(),
            'A13': _distanceFromNearestLowerKmPostController.text.trim(),
            'A14': _nodeNumberController.text.trim(),
            'A15': _linkNumberController.text.trim(),
            'A16': _distanceFromNodeController.text.trim(),
            'A17': _eastCoordinateController.text.trim(),
            'A18': _northCoordinateController.text.trim(),
            'A19': _collisionTypeController.text.trim(),
            'A20': _secondCollisionOccurence,
            'A21': _roadSurfaceCondition,
            'A22': _weather,
            'A23': _lightCondition,
            'A24': _locationType,
            'A25': _locationTypeWhenPedestrianInvolved,
            'A26': _trafficControl,
            'A27': _postedSpeedLimitSigns,
            'A28': _gazettedSpeedLimitForLightVehiclesController.text.trim(),
            'A29': _gazettedSpeedLimitForHeavyVehiclesController.text.trim(),
            'A30': _policeAction,
            'A31': _caseNumberController.text.trim(),
            'A32': _bReportController.text.trim(),
            'A33': _casualties,
            'A34': _researchPurposeController.text.trim(),
          },
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

  /*Future<void> saveForm() async {
    setState(() {
      _saveAttempted =
          true; // Mark the form as submitted when the user clicks save
    });

    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      // Save form data to Firestore
      try {
        await FirebaseFirestore.instance
            .collection('accidentReport')
            .doc('accidentdraft')
            .set({
          'A1': _divisionController.text.trim(),
          'A2': _stationController.text.trim(),
          'A3': _dateController.text.trim(),
          'A4': _timeController.text.trim(),
          'A5': _uniqueIdController.text.trim(),
          'A6': _classOfAccident,
          'A7': _urbanOrRural,
          'A8': _workdayOrHoliday,
          //'A9': _dayOfWeek.text.trim(),
          'A10': _roadNumberController.text.trim(),
          'A11': _streetNameController.text.trim(),
          'A12': _nearestLowerkmPostController.text.trim(),
          'A13': _distanceFromNearestLowerKmPostController.text.trim(),
          'A14': _nodeNumberController.text.trim(),
          'A15': _linkNumberController.text.trim(),
          'A16': _distanceFromNodeController.text.trim(),
          'A17': _eastCoordinateController.text.trim(),
          'A18': _northCoordinateController.text.trim(),
          'A19': _collisionTypeController.text.trim(),
          'A20': _secondCollisionOccurence,
          'A21': _roadSurfaceCondition,
          'A22': _weather,
          'A23': _lightCondition,
          'A24': _locationType,
          'A25': _locationTypeWhenPedestrianInvolved,
          'A26': _trafficControl,
          'A27': _postedSpeedLimitSigns,
          'A28': _gazettedSpeedLimitForLightVehiclesController.text.trim(),
          'A29': _gazettedSpeedLimitForHeavyVehiclesController.text.trim(),
          'A30': _policeAction,
          'A31': _caseNumberController.text.trim(),
          'A32': _bReportController.text.trim(),
          'A33': _casualties,
          'A34': _researchPurposeController.text.trim(),
        });

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
              Row(
                children: [
                  Expanded(
                    child: _buildTextField('A1 Division', _divisionController,
                        maxchars: 30),
                  ),
                  SizedBox(width: 10),
                  /* Expanded(
                    child: _buildNumericField('no', maxchars: 2),
                  ),*/
                ],
              ),
              Row(
                children: [
                  Expanded(
                    child: _buildTextField('A2 Station', _stationController,
                        maxchars: 30),
                  ),
                  SizedBox(width: 10),
                  /* Expanded(
                    child: _buildNumericField('no', maxchars: 2),
                  ),*/
                ],
              ),
              _buildTextField('A3 Date', _dateController,
                  hintText: 'YYYY-MM-DD', maxchars: 10),
              _buildTextField('A4 Time of accident', _timeController,
                  hintText: 'HH:MM', maxchars: 5),
              _buildTextField('A5 Unique ID Number', _uniqueIdController,
                  validatorMessage: "Unique ID Number is required",
                  hintText: 'Division-Station-AR no-Year',
                  maxchars: 50),
              SingleChoiceCheckboxInput(
                topic: 'A6 Class of Accident',
                labels: const [
                  '1 Fatal',
                  '2 Grievous',
                  '3 Non-Grievous',
                  '4 Damage Only'
                ],
                onSaved: (selectedValue) {
                  print('Selected Value: $selectedValue');
                  _classOfAccident = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _classOfAccident == null) {
                    return 'Please select an option for Class of Accident';
                  }
                  return null;
                },
              ),
              SingleChoiceCheckboxInput(
                topic: 'A7 Urban/Rural',
                labels: ['1 Urban', '2 Rural'],
                onSaved: (selectedValue) {
                  _urbanOrRural = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _urbanOrRural == null) {
                    return 'Please select an option for Urban/Rural';
                  }
                  return null;
                },
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
                onSaved: (selectedValue) {
                  _workdayOrHoliday = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _workdayOrHoliday == null) {
                    return 'Please select an option for workday or holiday';
                  }
                  return null;
                },
              ),
              Text(
                'A9 Day of Week',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              _buildReadOnlyField(
                  DateTime.now().weekday == DateTime.sunday
                      ? '1 Sunday'
                      : DateTime.now().weekday == DateTime.monday
                          ? '2 Monday'
                          : DateTime.now().weekday == DateTime.tuesday
                              ? '3 Tuesday'
                              : DateTime.now().weekday == DateTime.wednesday
                                  ? '4 Wednesday'
                                  : DateTime.now().weekday == DateTime.thursday
                                      ? '5 Thursday'
                                      : DateTime.now().weekday ==
                                              DateTime.friday
                                          ? '6 Friday'
                                          : '7 Saturday', (dayOfWeek) {
                // Save the numeric day prefix to Firestore
                // Replace 'A9' with the appropriate key for the database field
                FirebaseFirestore.instance
                    .collection('accident')
                    .doc('accidentdraft')
                    .set(
                        {
                      'A9':
                          dayOfWeek, // This saves the prefix value, like '1' for Sunday
                    },
                        SetOptions(
                            merge:
                                true)); // Use merge to avoid overwriting the entire document*/
              }),
              _buildTextField('A10 Road Number', _roadNumberController,
                  validatorMessage: "Road Number is required", maxchars: 4),
              _buildTextField('A11 Road/Street Name', _streetNameController,
                  validatorMessage: "Road/Street Name is required",
                  maxchars: 50),
              _buildNumericField(
                  'A12 Nearest,lower Km post', _nearestLowerkmPostController,
                  validatorMessage: "Nearest,lower Km post is required",
                  maxchars: 3),
              _buildNumericField('A13 Distance from Nearest Lower Km Post',
                  _distanceFromNearestLowerKmPostController,
                  validatorMessage:
                      "Distance from nearest,lower km post in metres is required",
                  maxchars: 3),
              _buildNumericField('A14 Node number', _nodeNumberController,
                  validatorMessage: " Node number is required", maxchars: 6),
              _buildTextField('A15 Link number', _linkNumberController,
                  validatorMessage: "Link number is required", maxchars: 7),
              _buildNumericField(
                  'A16 Distance from Node in metres',
                  validatorMessage: "Distance from Node in metres is required",
                  _distanceFromNodeController,
                  maxchars: 5),
              _buildNumericField(
                  'A17 East co-ordinate', _eastCoordinateController,
                  validatorMessage: "East co-ordinate is required",
                  maxchars: 6),
              _buildNumericField(
                  'A18 North co-ordinate', _northCoordinateController,
                  validatorMessage: "North co-ordinate is required",
                  maxchars: 6),
              _buildNumericField('A19 Collision type', _collisionTypeController,
                  validatorMessage: "Collision type is required",
                  hintText: 'See separate Appendix',
                  maxchars: 4),
              SingleChoiceCheckboxInput(
                topic: 'A20 Any second collision occurance',
                labels: [
                  '1 With other vehicle',
                  '2 With Pedestrian',
                  '3 With Fixed object',
                  '9 Others',
                  '0 Not Applicable'
                ],
                onSaved: (selectedValue) {
                  _secondCollisionOccurence = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _secondCollisionOccurence == null) {
                    return 'Please select an option for Any second collision occurance';
                  }
                  return null;
                },
              ),
              SingleChoiceCheckboxInput(
                topic: 'A21 Road surface condition',
                labels: [
                  '1 Dry',
                  '2 Wet',
                  '3 Flooded with water',
                  '4 Slippery surface(mud,oil,garbage,leaves)',
                  '9 Others',
                  '0 Not known'
                ],
                onSaved: (selectedValue) {
                  _roadSurfaceCondition = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _roadSurfaceCondition == null) {
                    return 'Please select an option for Road surface condition';
                  }
                  return null;
                },
              ),
              SingleChoiceCheckboxInput(
                topic: 'A22 Weather',
                labels: [
                  '1 Clear',
                  '2 Cloudy',
                  '3 Rain',
                  '4 Fog/Mist',
                  '9 Others',
                  '0 Not known'
                ],
                onSaved: (selectedValue) {
                  _weather = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _weather == null) {
                    return 'Please select an option for Weather';
                  }
                  return null;
                },
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
                onSaved: (selectedValue) {
                  _lightCondition = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _lightCondition == null) {
                    return 'Please select an option for Light condition';
                  }
                  return null;
                },
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
                onSaved: (selectedValue) {
                  _locationType = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _locationType == null) {
                    return 'Please select an option for Type of location';
                  }
                  return null;
                },
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
                onSaved: (selectedValue) {
                  _locationTypeWhenPedestrianInvolved = selectedValue;
                },
                validator: () {
                  if (_saveAttempted &&
                      _locationTypeWhenPedestrianInvolved == null) {
                    return 'Please select an option for Type of location when pedestrian/s is/are involved';
                  }
                  return null;
                },
              ),
              SingleChoiceCheckboxInput(
                topic: 'A26 Traffic control',
                labels: [
                  '1 Police',
                  '2 Traffic lights',
                  '3 Stop sign/marking',
                  '4 Give way sign/marking',
                  '5 Controlled by traffic warden',
                  '6 No control',
                  '9 Other',
                  '0 Not known/NA',
                ],
                onSaved: (selectedValue) {
                  _trafficControl = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _trafficControl == null) {
                    return 'Please select an option for Traffic control';
                  }
                  return null;
                },
              ),
              SingleChoiceCheckboxInput(
                topic: 'A27 Posted speed limit signs',
                labels: ['1 Yes', '2 No'],
                onSaved: (selectedValue) {
                  _postedSpeedLimitSigns = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _postedSpeedLimitSigns == null) {
                    return 'Please select an option for Posted speed limit signs';
                  }
                  return null;
                },
              ),
              _buildNumericField(
                  'A28 Gazetted speed limit for light vehicles(kmph)',
                  _gazettedSpeedLimitForLightVehiclesController,
                  validatorMessage:
                      "Gazetted speed limit for light vehicles is required",
                  maxchars: 3),
              _buildNumericField(
                  'A29 Gazetted speed limit for heavy vehicles(kmph)',
                  _gazettedSpeedLimitForHeavyVehiclesController,
                  validatorMessage:
                      "Gazetted speed limit for heavy vehicles is required",
                  maxchars: 3),
              SingleChoiceCheckboxInput(
                topic: 'A30 Action taken by police',
                labels: [
                  '1 Prosecution initiated',
                  '2 No Prosecution',
                  '3 Parties settled',
                  '4 Offender unknown',
                  '0 Not known/NA'
                ],
                onSaved: (selectedValue) {
                  _policeAction = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _policeAction == null) {
                    return 'Please select an option for Action taken by police';
                  }
                  return null;
                },
              ),
              _buildNumericField('A31 Case number', _caseNumberController,
                  hintText: "if available", maxchars: 10),
              _buildNumericField('A32 B report', _bReportController,
                  hintText: "if available", maxchars: 10),
              SingleChoiceCheckboxInput(
                topic: 'A33 Casualties',
                labels: ['1 Fatal', '2 Grievous', '3 Non Grievous'],
                onSaved: (selectedValue) {
                  _casualties = selectedValue;
                },
                validator: () {
                  if (_saveAttempted && _casualties == null) {
                    return 'Please select an option for Casualties';
                  }
                  return null;
                },
              ),
              _buildTextField(
                  'A34 For research purpose', _researchPurposeController,
                  maxchars: 2),
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
                  onPressed: saveAccidentDraft,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller,
      {String? validatorMessage, String hintText = '', required int maxchars}) {
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
          controller: controller,
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
          validator: (value) {
            if (validatorMessage != null && (value == null || value.isEmpty)) {
              return validatorMessage;
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildNumericField(String label, TextEditingController controller,
      {String? validatorMessage, String hintText = '', required int maxchars}) {
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
          controller: controller,
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
          validator: (value) {
            if (validatorMessage != null && (value == null || value.isEmpty)) {
              return validatorMessage;
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

  Widget _buildReadOnlyField(
      String initialValue, void Function(String?) onSaved) {
    String? _extractPrefix(String label) {
      return label.split(' ')[0]; // Extract the prefix (e.g., '1', '2', etc.)
    }

    // Save the prefix when initializing
    onSaved(_extractPrefix(initialValue));

    return TextFormField(
      initialValue: initialValue,
      readOnly: true,
      maxLength: 10,
      decoration: InputDecoration(
        border: InputBorder.none,
        filled: true,
      ),
    );
  }
}
