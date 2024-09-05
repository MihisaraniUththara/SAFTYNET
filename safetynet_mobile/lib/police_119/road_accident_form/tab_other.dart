import 'dart:io';
import 'dart:typed_data'; // For ByteData
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class TabOther extends StatefulWidget {
  const TabOther({super.key});

  @override
  State<TabOther> createState() => TabOtherState();
}

class TabOtherState extends State<TabOther> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final _descriptionOfAccidentController = TextEditingController();

  // Separate lists for each image picker field
  List<File?> _collisionSketchImages = [null]; // For Collision Sketch
  List<File?> _additionalImages = [null]; // For Add Images

  Future<void> _saveForm() async {
    if (_collisionSketchImages.isEmpty || _collisionSketchImages[0] == null) {
      // Show error if collision sketch is empty
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please attach a collision sketch image')),
      );
      return; // Prevent saving
    }

    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      // Save form data to Firestore
      try {
        // Upload images to Firebase storage and get their URLs
        List<String> collisionSketchUrls =
            await _uploadImages(_collisionSketchImages);
        List<String> additionalImageUrls =
            await _uploadImages(_additionalImages);

        // Debugging output
        print('collisionSketchUrls: $collisionSketchUrls');
        print('additionalImageUrls: $additionalImageUrls');

        // Save description and image URLs to Firestore
        await FirebaseFirestore.instance
            .collection('accident')
            .doc('otherdraft')
            .set({
          'description of accident':
              _descriptionOfAccidentController.text.trim(),
          'collisionSketchUrls': collisionSketchUrls,
          'additionalImageUrls': additionalImageUrls,
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

  Future<List<String>> _uploadImages(List<File?> images) async {
    List<String> urls = [];
    for (File? image in images) {
      if (image != null) {
        String imageUrl = await _uploadImageToFirebase(image);
        urls.add(imageUrl);
      }
    }
    return urls;
  }

  Future<String> _uploadImageToFirebase(File image) async {
    try {
      String fileName = DateTime.now().millisecondsSinceEpoch.toString();
      Reference storageRef =
          FirebaseStorage.instance.ref().child("images/$fileName.jpg");
      UploadTask uploadTask = storageRef.putFile(image);
      TaskSnapshot snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      print('Image upload failed: $e');
      throw e;
    }
  }

  Future<void> _pickImage(int index,
      {required bool isCollisionSketch, bool isMultiple = false}) async {
    final picker = ImagePicker();
    final List<XFile>? pickedFiles = await picker.pickMultiImage();

    if (pickedFiles != null && pickedFiles.isNotEmpty) {
      setState(() {
        List<File?> targetList =
            isCollisionSketch ? _collisionSketchImages : _additionalImages;

        if (isCollisionSketch && !isMultiple) {
          // If it's a collision sketch and only one image is allowed
          targetList[index] = File(pickedFiles.first.path);
        } else {
          // For additional images or other cases
          if (index == targetList.length - 1 && targetList.length < 10) {
            // Insert picked images at the current position, replacing the placeholder
            for (var pickedFile in pickedFiles) {
              targetList.insert(targetList.length - 1, File(pickedFile.path));
            }
          } else {
            // Replace the image at the current index with the first selected image
            targetList[index] = File(pickedFiles.first.path);
            // Add any additional images (if multiple were selected)
            for (var i = 1; i < pickedFiles.length; i++) {
              targetList.insert(
                  targetList.length - 1, File(pickedFiles[i].path));
            }
          }
        }
      });
    }
  }

  void _removeImage(int index, {required bool isCollisionSketch}) {
    setState(() {
      List<File?> targetList =
          isCollisionSketch ? _collisionSketchImages : _additionalImages;

      targetList.removeAt(index);

      // Add a placeholder if the list is empty after removal
      if (targetList.isEmpty || (isCollisionSketch && targetList.length == 0)) {
        targetList.add(null);
      }
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
                ),
                /*validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please provide a description of the accident';
                  }
                  return null;
                },*/
              ),
              SizedBox(height: 20.0),
              _buildImagePickerField(
                label: 'Collision Sketch',
                images: _collisionSketchImages,
                onSaved: (file) => _collisionSketchImages.add(file),
                isCollisionSketch: true,
                isMultiple: false,
              ),
              SizedBox(height: 20),
              _buildImagePickerField(
                label: 'Add Images',
                images: _additionalImages,
                onSaved: (file) => _additionalImages.add(file),
                isCollisionSketch: false,
                isMultiple: true, // Allow multiple images
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
                    backgroundColor: const Color(0xfffbbe00),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildImagePickerField({
    required String label,
    required List<File?> images,
    required FormFieldSetter<File?> onSaved,
    FormFieldValidator<File?>? validator,
    bool isMultiple = false,
    required bool isCollisionSketch,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 10),
        Row(
          children: List.generate(
            images.length,
            (index) => Padding(
              padding: const EdgeInsets.only(right: 8.0),
              child: _buildImageTile(index, images[index], isCollisionSketch),
            ),
          ),
        ),
        if (validator != null)
          FormField<File?>(
            onSaved: onSaved,
            validator: (value) {
              if (images.isEmpty || images[0] == null) {
                return 'Please attach an image';
              }
              return null;
            },
            builder: (FormFieldState<File?> field) {
              return field.errorText != null
                  ? Text(
                      field.errorText!,
                      style: TextStyle(
                        color: Colors.red,
                        fontSize: 12,
                      ),
                    )
                  : Container();
            },
          ),
      ],
    );
  }

  Widget _buildImageTile(int index, File? image, bool isCollisionSketch) {
    return Stack(
      children: [
        GestureDetector(
          onTap: () => _pickImage(index, isCollisionSketch: isCollisionSketch),
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
              onTap: () =>
                  _removeImage(index, isCollisionSketch: isCollisionSketch),
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
