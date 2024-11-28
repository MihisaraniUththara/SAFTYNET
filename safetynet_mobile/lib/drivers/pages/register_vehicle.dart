import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

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
          .where('driverId', isEqualTo: user.uid)
          .snapshots();
    }
    return Stream.empty();
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

  Future<void> _showVehicleDetailsDialog(BuildContext context, DocumentSnapshot doc) async {
    final _agentContactNumberController = TextEditingController(text: doc['agentContactNumber']);

    await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Vehicle Details'),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Model: ${doc['model']}'),
                Text('Year: ${doc['year']}'),
                Text('License Plate: ${doc['licensePlate']}'),
                SizedBox(height: 16),
                TextFormField(
                  controller: _agentContactNumberController,
                  decoration: InputDecoration(
                    labelText: 'Insurance Agent Tele',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.phone,
                ),
              ],
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
              onPressed: () async {
                await FirebaseFirestore.instance
                    .collection('vehicles')
                    .doc(doc.id)
                    .update({'agentContactNumber': _agentContactNumberController.text.trim()});
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Contact number updated successfully!')),
                );
                Navigator.of(context).pop();
              },
              child: Text('Update'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFfbbe00),
              ),
            ),
          ],
        );
      },
    );
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
                    padding: EdgeInsets.all(8.0),  // Padding for the ListView
                    children: snapshot.data!.docs.map((doc) {
                      return Card(  // Using Card widget for individual items to add styling
                        elevation: 4,  // Elevation for shadow effect
                        margin: EdgeInsets.symmetric(vertical: 8.0),  // Margin between items
                        child: ListTile(
                          contentPadding: EdgeInsets.all(16.0),  // Padding inside ListTile
                          title: Text(
                            '${doc['model']}',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,  // Larger font size for title
                              color: Colors.black,
                            ),
                          ),
                          subtitle: Text(
                            'Year: ${doc['year']}, License Plate: ${doc['licensePlate']}',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey[600],  // Lighter color for subtitle
                            ),
                          ),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              IconButton(
                                icon: Icon(Icons.info, color: Colors.blue),
                                onPressed: () {
                                  _showVehicleDetailsDialog(context, doc);
                                },
                              ),
                              IconButton(
                                icon: Icon(Icons.delete, color: Colors.red),
                                onPressed: () {
                                  _showDeleteConfirmationDialog(context, doc.id);
                                },
                              ),
                            ],
                          ),
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
  final _modelController = TextEditingController();
  final _yearController = TextEditingController();
  final _licensePlateController = TextEditingController();
  final _agentContactNumberController = TextEditingController();
  final _auth = FirebaseAuth.instance;

  @override
  void dispose() {
    _modelController.dispose();
    _yearController.dispose();
    _licensePlateController.dispose();
    _agentContactNumberController.dispose();
    super.dispose();
  }

  Future<void> _registerVehicle() async {
    if (_formKey.currentState!.validate()) {
      final user = _auth.currentUser;
      if (user != null) {
        await FirebaseFirestore.instance.collection('vehicles').add({
          'driverId': user.uid,
          'model': _modelController.text.trim(),
          'year': _yearController.text.trim(),
          'licensePlate': _licensePlateController.text.trim(),
          'agentContactNumber': _agentContactNumberController.text.trim(),
          'createdAt': FieldValue.serverTimestamp(),
        });

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Vehicle registered successfully!')),
        );
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
              _buildTextFormField(
                controller: _agentContactNumberController,
                labelText: 'Insurance Agent Tele (Optional)',
                keyboardType: TextInputType.phone,
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
      ),
      keyboardType: keyboardType,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return validatorMessage;
        }
        return null;
      },
    );
  }
}
