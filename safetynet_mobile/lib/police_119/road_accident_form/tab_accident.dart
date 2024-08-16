import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'input_fields.dart';

class TabAccident extends StatefulWidget {
  @override
  State<TabAccident> createState() => _TabAccidentState();
}

class _TabAccidentState extends State<TabAccident> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Controllers for text and numeric fields
  final _divisionController = TextEditingController();
  final _stationController = TextEditingController();
  final _dateController = TextEditingController();
  final _timeController = TextEditingController();
  final _uniqueIdController = TextEditingController();
  final _roadNumberController = TextEditingController();
  final _streetNameController = TextEditingController();
  final _kmPostController = TextEditingController();
  final _distanceKmPostController = TextEditingController();
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
  String? _secondCollision;
  String? _roadSurfaceCondition;
  String? _weather;
  String? _lightCondition;
  String? _locationType;
  String? _pedestrianLocation;
  String? _trafficControl;
  String? _speedLimitSigns;
  String? _policeAction;
  String? _casualties;

  // Method to save form data to Firestore
  Future<void> _saveForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

     /*// Print form data before saving
    print({
      'division': _divisionController.text.trim(),
      'station': _stationController.text.trim(),
      'date': _dateController.text.trim(),
      'time': _timeController.text.trim(),
      'uniqueId': _uniqueIdController.text.trim(),
      'roadNumber': _roadNumberController.text.trim(),
      'streetName': _streetNameController.text.trim(),
      'kmPost': _kmPostController.text.trim(),
      'distanceKmPost': _distanceKmPostController.text.trim(),
      'nodeNumber': _nodeNumberController.text.trim(),
      'linkNumber': _linkNumberController.text.trim(),
      'distanceFromNode': _distanceFromNodeController.text.trim(),
      'eastCoordinate': _eastCoordinateController.text.trim(),
      'northCoordinate': _northCoordinateController.text.trim(),
      'collisionType': _collisionTypeController.text.trim(),
      'caseNumber': _caseNumberController.text.trim(),
      'bReport': _bReportController.text.trim(),
      'researchPurpose': _researchPurposeController.text.trim(),
      'gazettedSpeedLimitForLightVehicles': _gazettedSpeedLimitForLightVehiclesController.text.trim(),
      'gazettedSpeedLimitForHeavyVehicles': _gazettedSpeedLimitForHeavyVehiclesController.text.trim(),
      'classOfAccident': _classOfAccident,
      'urbanOrRural': _urbanOrRural,
      'workdayOrHoliday': _workdayOrHoliday,
      'secondCollision': _secondCollision,
      'roadSurfaceCondition': _roadSurfaceCondition,
      'weather': _weather,
      'lightCondition': _lightCondition,
      'locationType': _locationType,
      'pedestrianLocation': _pedestrianLocation,
      'trafficControl': _trafficControl,
      'speedLimitSigns': _speedLimitSigns,
      'policeAction': _policeAction,
      'casualties': _casualties,
    });*/


      // Save form data to Firestore
      try {
        await FirebaseFirestore.instance.collection('accident').doc('accidentdraft').set({
          'division': _divisionController.text.trim(),
          'station': _stationController.text.trim(),
          'date': _dateController.text.trim(),
          'time': _timeController.text.trim(),
          'uniqueId': _uniqueIdController.text.trim(),
          'roadNumber': _roadNumberController.text.trim(),
          'streetName': _streetNameController.text.trim(),
          'kmPost': _kmPostController.text.trim(),
          'distanceKmPost': _distanceKmPostController.text.trim(),
          'nodeNumber': _nodeNumberController.text.trim(),
          'linkNumber': _linkNumberController.text.trim(),
          'distanceFromNode': _distanceFromNodeController.text.trim(),
          'eastCoordinate': _eastCoordinateController.text.trim(),
          'northCoordinate': _northCoordinateController.text.trim(),
          'collisionType': _collisionTypeController.text.trim(),
          'caseNumber': _caseNumberController.text.trim(),
          'bReport': _bReportController.text.trim(),
          'researchPurpose': _researchPurposeController.text.trim(),
          'gazettedSpeedLimitForLightVehicles': _gazettedSpeedLimitForLightVehiclesController.text.trim(),
          'gazettedSpeedLimitForHeavyVehicles': _gazettedSpeedLimitForHeavyVehiclesController.text.trim(),
          'classOfAccident': _classOfAccident,
          'urbanOrRural': _urbanOrRural,
          'workdayOrHoliday': _workdayOrHoliday,
          'secondCollision': _secondCollision,
          'roadSurfaceCondition': _roadSurfaceCondition,
          'weather': _weather,
          'lightCondition': _lightCondition,
          'locationType': _locationType,
          'pedestrianLocation': _pedestrianLocation,
          'trafficControl': _trafficControl,
          'speedLimitSigns': _speedLimitSigns,
          'policeAction': _policeAction,
          'casualties': _casualties,
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
              Row(
                children: [
                  Expanded(
                    child: _buildTextField('A1 Division',_divisionController, maxchars: 30),
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
                    child: _buildTextField('A2 Station',_stationController, maxchars: 30),
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
                  hintText: 'Division, Station, AR no, Year', maxchars: 50),
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
              ),
              SingleChoiceCheckboxInput(
                topic: 'A7 Urban/Rural',
                labels: ['1 Urban', '2 Rural'],
                onSaved: (selectedValue) {
                  _urbanOrRural = selectedValue;
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
                                    : DateTime.now().weekday == DateTime.friday
                                        ? '6 Friday'
                                        : DateTime.now().weekday ==
                                                DateTime.saturday
                                            ? '7 Saturday'
                                            : '',
              ),
              _buildTextField('A10 Road Number', _roadNumberController,
                  maxchars: 4),
              _buildTextField('A11 Road/Street Name', _streetNameController,
                  maxchars: 50),
              _buildNumericField('A12 Nearest,lower Km post', _kmPostController,
                  maxchars: 3),
              _buildNumericField('A13 Distance from Nearest Lower Km Post',
                  _distanceKmPostController,
                  maxchars: 3),
              _buildNumericField('A14 Node number', _nodeNumberController,
                  maxchars: 6),
              _buildTextField('A15 Link number', _linkNumberController,
                  maxchars: 7),
              _buildNumericField('A16 Distance from Node in metres',
                  _distanceFromNodeController,
                  maxchars: 5),
              _buildNumericField(
                  'A17 East co-ordinate', _eastCoordinateController,
                  maxchars: 6),
              _buildNumericField(
                  'A18 North co-ordinate', _northCoordinateController,
                  maxchars: 6),
              _buildNumericField('A19 Collision type', _collisionTypeController,
                  hintText: 'See separate Appendix', maxchars: 4),
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
                  _secondCollision = selectedValue;
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
                  _pedestrianLocation = selectedValue;
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
              ),
              SingleChoiceCheckboxInput(
                topic: 'A27 Posted speed limit signs',
                labels: ['1 Yes', '2 No'],
                onSaved: (selectedValue) {
                  _speedLimitSigns = selectedValue;
                },
              ),
              _buildNumericField(
                  'A28 Gazetted speed limit for light vehicles(kmph)',
                  _gazettedSpeedLimitForLightVehiclesController,
                  maxchars: 3),
              _buildNumericField(
                  'A29 Gazetted speed limit for heavy vehicles(kmph)',
                  _gazettedSpeedLimitForHeavyVehiclesController,
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
              ),
              _buildNumericField('A31 Case number', _caseNumberController,
                  maxchars: 10),
              _buildNumericField('A32 B report', _bReportController,
                  maxchars: 10),
              SingleChoiceCheckboxInput(
                topic: 'A33 Casualties',
                labels: ['1 Fatal', '2 Grievous', '3 Non Grievous'],
                onSaved: (selectedValue) {
                  _casualties = selectedValue;
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
                  onPressed: _saveForm,
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
            if (value?.isEmpty ?? true) {
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

  Widget _buildReadOnlyField(String initialValue) {
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
