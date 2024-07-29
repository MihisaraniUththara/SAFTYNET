import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

class RegisterVehiclePage extends StatefulWidget {
  @override
  _RegisterVehiclePageState createState() => _RegisterVehiclePageState();
}

class _RegisterVehiclePageState extends State<RegisterVehiclePage> {
  final _auth = FirebaseAuth.instance;

  // Fetching registered vehicles for the current driver
  Stream<QuerySnapshot> _getRegisteredVehicles() {
    final user = _auth.currentUser;
    if (user != null) {
      return FirebaseFirestore.instance
          .collection('vehicles')
          .where('driverId', isEqualTo: user.uid) // Filter by driverId
          .snapshots();
    }
    return Stream.empty(); // Return an empty stream if no user is logged in
  }

  Future<void> _showDeleteConfirmationDialog(BuildContext context, String docId) async {
    bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm Deletion'),
          content: Text('Are you sure you want to delete this vehicle?'),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop(false);
              },
            ),
            TextButton(
              child: Text('Delete'),
              onPressed: () {
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );

    if (confirmed == true) {
      await FirebaseFirestore.instance.collection('vehicles').doc(docId).delete();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Vehicle deleted successfully!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Registered Vehicles'),
        backgroundColor: Color(0xFFfbbe00),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: _getRegisteredVehicles(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  }
                  if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                    return Center(child: Text('No registered vehicles.'));
                  }
                  return ListView(
                    children: snapshot.data!.docs.map((doc) {
                      return ListTile(
                        title: Text('${doc['model']}'),
                        subtitle: Text(
                            'Year: ${doc['year']}, License Plate: ${doc['licensePlate']}'),
                        trailing: IconButton(
                          icon: Icon(Icons.delete, color: Colors.red),
                          onPressed: () {
                            _showDeleteConfirmationDialog(context, doc.id);
                          },
                        ),
                      );
                    }).toList(),
                  );
                },
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton.icon(
              icon: Icon(Icons.add),
              label: Text('Add New Vehicle'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFfbbe00),
                foregroundColor: Colors.white,
              ),
              onPressed: () {
                _showAddVehicleDialog(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showAddVehicleDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AddVehicleDialog();
      },
    );
  }
}

class AddVehicleDialog extends StatefulWidget {
  @override
  _AddVehicleDialogState createState() => _AddVehicleDialogState();
}

class _AddVehicleDialogState extends State<AddVehicleDialog> {
  final _formKey = GlobalKey<FormState>();
  //final _makeController = TextEditingController();
  final _modelController = TextEditingController();
  final _yearController = TextEditingController();
  final _licensePlateController = TextEditingController();
  final _vinController = TextEditingController();
  //final _insuranceCompanyController = TextEditingController(); // New controller for insurance company
  final _agentContactNumberController = TextEditingController(); // New controller for agent contact number
  final _auth = FirebaseAuth.instance; // Firebase Auth instance

  @override
  void dispose() {
   // _makeController.dispose();
    _modelController.dispose();
    _yearController.dispose();
    _licensePlateController.dispose();
    _vinController.dispose();
  //  _insuranceCompanyController.dispose(); // Dispose new controller
    _agentContactNumberController.dispose(); // Dispose new controller
    super.dispose();
  }

  Future<void> _registerVehicle() async {
    if (_formKey.currentState!.validate()) {
      final user = _auth.currentUser;
      if (user != null) {
        // Save vehicle details to Firestore
        await FirebaseFirestore.instance.collection('vehicles').add({
          'driverId': user.uid, // Associate vehicle with driver
          // 'make': _makeController.text.trim(),
          'model': _modelController.text.trim(),
          'year': _yearController.text.trim(),
          'licensePlate': _licensePlateController.text.trim(),
          // 'insuranceCompany': _insuranceCompanyController.text.trim(), // Save insurance company
          'agentContactNumber': _agentContactNumberController.text.trim(), // Save agent contact number
          'createdAt': FieldValue.serverTimestamp(),
        });

        // Show success message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Vehicle registered successfully!')),
        );

        // Close the dialog
        Navigator.of(context).pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Add New Vehicle'),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // _buildTextFormField(
              //   controller: _makeController,
              //   labelText: 'Make',
              //   validatorMessage: 'Please enter the vehicle make',
              // ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _modelController,
                labelText: 'Model',
                validatorMessage: 'Please enter the vehicle model',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _yearController,
                labelText: 'Year of Manufacture',
                keyboardType: TextInputType.number,
                validatorMessage: 'Please enter the vehicle year',
              ),
              SizedBox(height: 16),
              _buildTextFormField(
                controller: _licensePlateController,
                labelText: 'Vehicle Registration Number',
                validatorMessage: 'Please enter the vehicle registration number',
              ),
              SizedBox(height: 16),
              // _buildTextFormField(
              //   controller: _insuranceCompanyController,
              //   labelText: 'Insurance Company (Optional)',
              //   validatorMessage: null, // No validation required
              // ),
              SizedBox(height: 16),
             _buildTextFormField(
                controller: _agentContactNumberController,
                labelText: 'Insurance Agent Tele (Optional)', 
                keyboardType: TextInputType.phone,
                validatorMessage: null, // No validation required
                // Adding the phone icon
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          child: Text('Cancel'),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        ElevatedButton(
          onPressed: _registerVehicle,
          child: Text('Register Vehicle'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFFfbbe00),
          ),
        ),
      ],
    );
  }

  Widget _buildTextFormField({
    required TextEditingController controller,
    required String labelText,
    String? validatorMessage,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        border: OutlineInputBorder(),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Color(0xFFfbbe00)),
        ),
      ),
      keyboardType: keyboardType,
      validator: (value) {
        if (validatorMessage != null && (value == null || value.isEmpty)) {
          return validatorMessage;
        }
        return null;
      },
    );
  }
}
