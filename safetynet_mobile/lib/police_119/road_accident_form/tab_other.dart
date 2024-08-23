import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import 'input_fields.dart';

class TabOther extends StatefulWidget {
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
              ),
              SizedBox(width: 30.0),
              Container(
                width: 150,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFfbbe00),
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
