import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/rendering.dart';
import 'package:provider/provider.dart';
import '../../widgets/input_fields.dart';
import '../../services/police_station_provider.dart';

class TabAccident extends StatefulWidget {
  final String officerID; // Accept officerID
  final Map<String, dynamic>? draftData; // Accept draft data
  final ValueNotifier<String?> uniqueIdNotifier; // Shared notifier
  final String uniqueIdNo;

  // Pass officerID via the constructor
  const TabAccident({
    super.key,
    required this.officerID,
    this.draftData,
    required this.uniqueIdNotifier,
    required this.uniqueIdNo,
  });

  @override
  State<TabAccident> createState() => _TabAccidentState();
}

class _TabAccidentState extends State<TabAccident> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  bool _saveAttempted = false; // Flag to track if the form has been submitted

  // Controllers for text and numeric fields
  final _divisionController = TextEditingController();
  final _dnoController = TextEditingController();
  final _stationController = TextEditingController();
  final _snoController = TextEditingController();
  final _dateController = TextEditingController();
  final _timeController = TextEditingController();
  final _uniqueIdController = TextEditingController();
  final _dayOfWeek = TextEditingController();
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
  //final _casualtiesController = TextEditingController();
  final _fatalController = TextEditingController();
  final _grievousController = TextEditingController();
  final _nonGrievousController = TextEditingController();
  final _arNumberController = TextEditingController();
  final _yearController = TextEditingController();

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

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final policeStationProvider = context.read<PoliceStationProvider>();

    // Fetch Date-Time from Firestore
    _fetchDateTimeFromDriverAccidents().then((dateTime) {
      _dateController.text = dateTime['date'] ?? '';
      _timeController.text = dateTime['time'] ?? '';

      // Load Draft Data (if exists)
      if (widget.draftData != null) {
        _loadDraftData();
      } else {
        //Auto-Fill Remaining Fields if Draft Data is Not Found
        _autoFillFields(
            policeStationProvider, dateTime['date'], dateTime['time']);
      }
    });

    // Step 5: Set Unique ID Notifier Listener
    _uniqueIdController.addListener(() {
      widget.uniqueIdNotifier.value = _uniqueIdController.text;
    });
  }

  Future<Map<String, String>> _fetchDateTimeFromDriverAccidents() async {
    String? _fetchedDate;
    String? _fetchedTime;
    //String? _fetchedDriverlicence;

    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('driver_accidents')
          .where('unique_id_number', isEqualTo: widget.uniqueIdNo) 
          .get();

      if (snapshot.docs.isNotEmpty) {
        final data = snapshot.docs.first.data();
        if (data['date_time'] != null) {
          DateTime dateTime = (data['date_time'] as Timestamp).toDate();
          _fetchedDate =
              '${dateTime.year}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.day.toString().padLeft(2, '0')}';
          _fetchedTime =
              '${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}';
        }
      }
    } catch (e) {
      print('Error fetching date-time: $e');
    }

    return {
      'date': _fetchedDate ?? '',
      'time': _fetchedTime ?? '',
    };
  }

  void _autoFillFields(PoliceStationProvider policeStationProvider,
      String? fetchedDate, String? fetchedTime) {
    // Auto-fill police station details
    _divisionController.text = policeStationProvider.division;
    _dnoController.text = policeStationProvider.divisionNumber;
    _stationController.text = policeStationProvider.station;
    _snoController.text = policeStationProvider.stationNumber;
    _uniqueIdController.text = widget.uniqueIdNo;

    // Auto-fill date and time (fetched from Firestore earlier)
    _dateController.text = fetchedDate ?? ''; // Fallback empty if not fetched
    _timeController.text = fetchedTime ?? ''; // Fallback empty if not fetched
  }

  void _loadDraftData() {
    if (widget.draftData != null) {
      _yearController.text = widget.draftData?['year'] ?? '';
      _arNumberController.text = widget.draftData?['ARno'] ?? '';
      _dnoController.text = widget.draftData?['dno'] ?? '';
      _snoController.text = widget.draftData?['sno'] ?? '';
    }
    final dataA = widget.draftData!['A'];
    if (dataA != null && dataA['A5'] != null) {
      _divisionController.text = dataA['A1'] ?? '';
      _stationController.text = dataA['A2'] ?? '';
      _dateController.text = dataA['A3'] ?? '';
      _timeController.text = dataA['A4'] ?? '';
      _uniqueIdController.text = dataA['A5'] ?? '';
      _classOfAccident = dataA['A6'] ?? '';
      _urbanOrRural = dataA['A7'] ?? '';
      _workdayOrHoliday = dataA['A8'] ?? '';
      _dayOfWeek.text = dataA['A9'] ?? '';
      _roadNumberController.text = dataA['A10'] ?? '';
      _streetNameController.text = dataA['A11'] ?? '';
      _nearestLowerkmPostController.text = dataA['A12'] ?? '';
      _distanceFromNearestLowerKmPostController.text = dataA['A13'] ?? '';
      _nodeNumberController.text = dataA['A14'] ?? '';
      _linkNumberController.text = dataA['A15'] ?? '';
      _distanceFromNodeController.text = dataA['A16'] ?? '';
      _eastCoordinateController.text = dataA['A17'] ?? '';
      _northCoordinateController.text = dataA['A18'] ?? '';
      _collisionTypeController.text = dataA['A19'] ?? '';
      _secondCollisionOccurence = dataA['A20'] ?? '';
      _roadSurfaceCondition = dataA['A21'] ?? '';
      _weather = dataA['A22'] ?? '';
      _lightCondition = dataA['A23'] ?? '';
      _locationType = dataA['A24'] ?? '';
      _locationTypeWhenPedestrianInvolved = dataA['A25'] ?? '';
      _trafficControl = dataA['A26'] ?? '';
      _postedSpeedLimitSigns = dataA['A27'] ?? '';
      _gazettedSpeedLimitForLightVehiclesController.text = dataA['A28'] ?? '';
      _gazettedSpeedLimitForHeavyVehiclesController.text = dataA['A29'] ?? '';
      _policeAction = dataA['A30'] ?? '';
      _caseNumberController.text = dataA['A31'] ?? '';
      _bReportController.text = dataA['A32'] ?? '';
      //_casualtiesController.text = dataA['A33'] ?? '';
      _fatalController.text = dataA['A33']?['1'] ?? '';
      _grievousController.text = dataA['A33']?['2'] ?? '';
      _nonGrievousController.text = dataA['A33']?['3'] ?? '';
      _researchPurposeController.text = dataA['A34'] ?? '';
      widget.uniqueIdNotifier.value = dataA['A5']; // Notify listeners
    }
  }

  // Method to save accident data to Firestore
  Future<void> saveAccidentDraft() async {
    /* setState(() {
      _saveAttempted =
          true; // Mark the form as submitted when the user clicks save
    });*/

    String draftID =
        "$widget.uniqueIdNotifier.value"; // Use the passed officerID

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
          'A9': _dayOfWeek.text.trim(),
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
          'A33': {
            '1': _fatalController.text.trim(),
            '2': _grievousController.text.trim(),
            '3': _nonGrievousController.text.trim(),
          },
          'A34': _researchPurposeController.text.trim(),
        }, // Save A data
        'year': _yearController.text.trim(),
        'ARno': _arNumberController.text.trim(),
        'dno': _dnoController.text.trim(),
        'sno': _snoController.text.trim(),
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
            'A9': _dayOfWeek.text.trim(),
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
            'A33': {
              ' 1': _fatalController.text.trim(),
              ' 2': _grievousController.text.trim(),
              ' 3': _nonGrievousController.text.trim(),
            },
            'A34': _researchPurposeController.text.trim(),
          },
          'dno': _dnoController.text.trim(),
          'sno': _snoController.text.trim(),
          'year': _yearController.text.trim(),
          'ARno': _arNumberController.text.trim(),
          'officerID': widget.officerID,
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
                    child: _buildReadOnlyTextField(
                        'A1 Division', _divisionController),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: _buildReadOnlyTextField(' no', _dnoController),
                  ),
                ],
              ),
              Row(
                children: [
                  Expanded(
                    child: _buildReadOnlyTextField(
                        'A2 Station', _stationController),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: _buildReadOnlyTextField(' no', _snoController),
                  ),
                ],
              ),
              _buildTextField('A3 Date', _dateController,
                  hintText: 'YYYY-MM-DD', maxchars: 10),
              _buildTextField('A4 Time of accident', _timeController,
                  hintText: 'HH:MM', maxchars: 5),
              _buildTextField('A5 Unique ID Number', _uniqueIdController,
                  maxchars: 15),
              SingleChoiceCheckboxInput(
                topic: 'A6 Class of Accident',
                labels: const [
                  '1 Fatal',
                  '2 Grievous',
                  '3 Non-Grievous',
                  '4 Damage Only'
                ],
                initialValue: _classOfAccident,
                onSaved: (selectedValue) => _classOfAccident = selectedValue,
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
                initialValue: _urbanOrRural,
                onSaved: (selectedValue) => _urbanOrRural = selectedValue,
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
                initialValue: _workdayOrHoliday,
                onSaved: (selectedValue) => _workdayOrHoliday = selectedValue,
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
              _buildReadOnlyFieldCheckbox(
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
              _buildNumericField('A16 Distance from Node in metres',
                  _distanceFromNodeController,
                  validatorMessage: "Distance from Node in metres is required",
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
                initialValue: _secondCollisionOccurence,
                onSaved: (selectedValue) =>
                    _secondCollisionOccurence = selectedValue,
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
                initialValue: _roadSurfaceCondition,
                onSaved: (selectedValue) =>
                    _roadSurfaceCondition = selectedValue,
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
                initialValue: _weather,
                onSaved: (selectedValue) => _weather = selectedValue,
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
                initialValue: _lightCondition,
                onSaved: (selectedValue) => _lightCondition = selectedValue,
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
                initialValue: _locationType,
                onSaved: (selectedValue) => _locationType = selectedValue,
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
                initialValue: _locationTypeWhenPedestrianInvolved,
                onSaved: (selectedValue) =>
                    _locationTypeWhenPedestrianInvolved = selectedValue,
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
                initialValue: _trafficControl,
                onSaved: (selectedValue) => _trafficControl = selectedValue,
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
                initialValue: _postedSpeedLimitSigns,
                onSaved: (selectedValue) =>
                    _postedSpeedLimitSigns = selectedValue,
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
                initialValue: _policeAction,
                onSaved: (selectedValue) => _policeAction = selectedValue,
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
              /*_buildNumericField('A33 Casualties', _casualtiesController,
                  validatorMessage: "No of casualties is required",
                  maxchars: 2),*/
              Text(
                'A33 Casualties',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16.0),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildNumericField('1 Fatal', _fatalController,
                        validatorMessage: "No of fatal casualties is required",
                        maxchars: 2),
                    _buildNumericField('2 Grievous', _grievousController,
                        validatorMessage:
                            "No of grievous casualties is required",
                        maxchars: 2),
                    _buildNumericField('3 Non Grievous', _nonGrievousController,
                        validatorMessage:
                            "No of non-grievous casualties is required",
                        maxchars: 2),
                  ],
                ),
              ),
              _buildTextField(
                  'A34 For research purpose', _researchPurposeController,
                  maxchars: 2),
              SizedBox(height: 50.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
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
                      onPressed: saveAccidentDraft,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color.fromARGB(255, 208, 208, 208),
                        /* shape: const RoundedRectangleBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(10)),
                            ),*/
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 150,
                    child: ElevatedButton(
                      child: Text(
                        'Exit',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16.0,
                        ),
                      ),
                      onPressed: () {
                        Navigator.of(context)
                            .popUntil((route) => route.isFirst);
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

  Widget _buildReadOnlyFieldCheckbox(
      String initialValue, void Function(String?) onSaved) {
    String? _extractPrefix(String label) {
      return label.split(' ')[0]; // Extract the prefix (e.g., '1', '2', etc.)
    }

    // Save the prefix when initializing
    onSaved(_extractPrefix(initialValue));

    return TextFormField(
      initialValue: initialValue,
      readOnly: true,
      maxLength: 15,
      decoration: InputDecoration(
        border: InputBorder.none,
        filled: true,
      ),
    );
  }
}

Widget _buildReadOnlyTextField(String label, TextEditingController controller) {
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
      Container(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: TextFormField(
          controller: controller,
          readOnly: true,
          maxLines: 1,
          decoration: InputDecoration(
            border: InputBorder.none,
            filled: true,
            contentPadding: const EdgeInsets.symmetric(
              vertical: 12.0,
              horizontal: 12.0,
            ),
          ),
          style: TextStyle(
            fontSize: 16,
            color: Colors.black87,
          ),
        ),
      ),
    ],
  );
}
