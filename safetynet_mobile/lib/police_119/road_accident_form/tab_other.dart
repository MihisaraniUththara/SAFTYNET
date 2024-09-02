import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'input_fields.dart';

class TabOther extends StatefulWidget {
  const TabOther({super.key});

  @override
  State<TabOther> createState() => TabOtherState();
}

class TabOtherState extends State<TabOther> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final _descriptionOfAccidentController = TextEditingController();
  List<File?> _images = [null]; // Start with one placeholder for adding images
  List<String> _uploadedImageUrls = [];

  File? _collisionSketch;

  Future<void> _saveForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      // Save form data to Firestore
      try {
        // Upload images to Firebase storage and get their URLs
        for (File? image in _images) {
          if (image != null) {
            String imageUrl = await _uploadImageToFirebase(image);
            _uploadedImageUrls.add(imageUrl);
          }
        }

         // Save description and image URLs to Firestore
        await FirebaseFirestore.instance
            .collection('accident')
            .doc('otherdraft')
            .set({
          'description of accident':
              _descriptionOfAccidentController.text.trim(),
              'imageUrls': _uploadedImageUrls,
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
  }

  Future<String> _uploadImageToFirebase(File image) async {
    String fileName = DateTime.now().millisecondsSinceEpoch.toString();
    Reference storageRef = FirebaseStorage.instance.ref().child("images/$fileName.jpg");
    UploadTask uploadTask = storageRef.putFile(image);
    TaskSnapshot snapshot = await uploadTask;
    return await snapshot.ref.getDownloadURL();
  }

  Future<void> _pickImage(int index) async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        if (index == _images.length - 1 && _images.length < 10) {
          // Add new placeholder only if current index is the last placeholder
          _images.insert(_images.length - 1, File(pickedFile.path));
        } else {
          // Replace the image at the current index
          _images[index] = File(pickedFile.path);
        }
      });
    }
  }

  void _removeImage(int index) {
    setState(() {
      _images.removeAt(index);
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Description of accident & additional information',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.left,
                  ),
                  TextFormField(
                    controller: _descriptionOfAccidentController,
                    maxLength: 500,
                    maxLines: 7,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      filled: true,
                      //floatingLabelBehavior: FloatingLabelBehavior.auto,
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                      return 'Please provide a description of the accident';
                      }
                      return null;
                    },
                  ),
                ],
              ),
              SizedBox(height: 20.0),
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
                label: 'Add Images',
                onSaved: (file) => _collisionSketch = file,
                validator: (file) {
                  if (file == null) {
                    return 'Please attach an image';
                  }
                  return null;
                },
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
              Align(
                alignment: Alignment.bottomRight,
                child: ElevatedButton(
                  child: Text(
                    'Submit',
                    style: TextStyle(color: Colors.black, fontSize: 16.0),
                  ),
                  onPressed: _saveForm,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xfffbbe00) ,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(10))),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }


 Widget _buildImageTile(int index, File? image) {
    return Stack(
      children: [
        GestureDetector(
          onTap: () => _pickImage(index),
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(10),
            ),
            child: image != null
                ? Image.file(image, fit: BoxFit.cover)
                : Center(child: Icon(Icons.add_a_photo, color: Colors.grey)),
          ),
        ),
        if (image != null)
          Positioned(
            top: 2,
            right: 2,
            child: GestureDetector(
              onTap: () => _removeImage(index),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.close, color: Colors.white, size: 20),
              ),
            ),
          ),
      ],
    );
  }
}





 