import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class TabOther extends StatefulWidget {
  final String officerID;
  final Map<String, dynamic>? draftData;

  const TabOther({
    super.key,
    required this.officerID,
    this.draftData,
  });

  @override
  State<TabOther> createState() => TabOtherState();
}

class TabOtherState extends State<TabOther> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final _descriptionOfAccidentController = TextEditingController();

  // Store both File and URL to handle both new and draft images
  File? _collisionSketchImage;
  String? _collisionSketchUrl;

  List<Map<String, dynamic>> _additionalImages = [
    {'file': null, 'url': null}
  ];

  @override
  void initState() {
    super.initState();
    if (widget.draftData != null) {
      _loadDraftData();
    }
  }

  void _loadDraftData() {
    final dataO = widget.draftData?['O'];
    if (dataO != null) {
      setState(() {
        _descriptionOfAccidentController.text =
            dataO['description of accident'] ?? '';

        // Load collision sketch
        if (dataO['collisionSketchUrls'] != null &&
            (dataO['collisionSketchUrls'] as List).isNotEmpty) {
          _collisionSketchUrl = (dataO['collisionSketchUrls'] as List).first;
        }

        // Load additional images
        if (dataO['additionalImageUrls'] != null &&
            (dataO['additionalImageUrls'] as List).isNotEmpty) {
          _additionalImages = (dataO['additionalImageUrls'] as List)
              .map((url) => {'file': null, 'url': url})
              .toList();
          _additionalImages.add({'file': null, 'url': null}); // Add placeholder
        }
      });
    }
  }

  Future<void> _pickImage({required bool isCollisionSketch, int? index}) async {
    try {
      final picker = ImagePicker();
      if (isCollisionSketch) {
        final XFile? pickedFile =
            await picker.pickImage(source: ImageSource.gallery);
        if (pickedFile != null) {
          setState(() {
            _collisionSketchImage = File(pickedFile.path);
            _collisionSketchUrl = null; // Clear the URL when new file is picked
          });
        }
      } else {
        final List<XFile>? pickedFiles = await picker.pickMultiImage();
        if (pickedFiles != null && pickedFiles.isNotEmpty) {
          setState(() {
            if (index != null && index < _additionalImages.length - 1) {
              // Replace existing image
              _additionalImages[index] = {
                'file': File(pickedFiles.first.path),
                'url': null
              };
            } else {
              // Add new images
              _additionalImages.removeLast(); // Remove placeholder
              _additionalImages.addAll(pickedFiles
                  .map((xFile) => {'file': File(xFile.path), 'url': null})
                  .toList());
              if (_additionalImages.length < 10) {
                _additionalImages
                    .add({'file': null, 'url': null}); // Add placeholder
              }
            }
          });
        }
      }
    } catch (e) {
      print('Error picking image: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to pick image: $e')),
      );
    }
  }

  void _removeImage({required bool isCollisionSketch, int? index}) {
    setState(() {
      if (isCollisionSketch) {
        _collisionSketchImage = null;
        _collisionSketchUrl = null;
      } else if (index != null) {
        _additionalImages.removeAt(index);
        if (_additionalImages.isEmpty ||
            _additionalImages.last['file'] != null ||
            _additionalImages.last['url'] != null) {
          _additionalImages.add({'file': null, 'url': null});
        }
      }
    });
  }

  Widget _buildImageTile(
      {required bool isCollisionSketch, File? file, String? url, int? index}) {
    return Stack(
      children: [
        GestureDetector(
          onTap: () =>
              _pickImage(isCollisionSketch: isCollisionSketch, index: index),
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(10),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: file != null
                  ? Image.file(
                      file,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        print('Error loading file image: $error');
                        return Center(
                          child: Icon(Icons.error, color: Colors.red),
                        );
                      },
                    )
                  : url != null
                      ? Image.network(
                          url,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            print('Error loading network image: $error');
                            return Center(
                              child: Icon(Icons.error, color: Colors.red),
                            );
                          },
                        )
                      : Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.add_a_photo, color: Colors.grey),
                              if (isCollisionSketch)
                                  Text(
                                    'Add Sketch',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                              if(!isCollisionSketch)
                                    Text(
                                    'Add images',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                            ],
                          ),
                        ),
            ),
          ),
        ),
        if (file != null || url != null)
          Positioned(
            top: 2,
            right: 2,
            child: GestureDetector(
              onTap: () => _removeImage(
                  isCollisionSketch: isCollisionSketch, index: index),
              child: Container(
                padding: EdgeInsets.all(2),
                decoration: BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.close, color: Colors.white, size: 16),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildCollisionSketchField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Collision Sketch',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 10),
        _buildImageTile(
          isCollisionSketch: true,
          file: _collisionSketchImage,
          url: _collisionSketchUrl,
        ),
        FormField<File?>(
          validator: (value) {
            if (_collisionSketchImage == null && _collisionSketchUrl == null) {
              return 'Please attach a collision sketch image';
            }
            return null;
          },
          builder: (FormFieldState<File?> field) {
            return field.hasError
                ? Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(
                      field.errorText!,
                      style: TextStyle(
                        color: Colors.red,
                        fontSize: 12,
                      ),
                    ),
                  )
                : SizedBox.shrink();
          },
        ),
      ],
    );
  }

  Widget _buildAdditionalImagesField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Additional Images',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 10),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: List.generate(
              _additionalImages.length,
              (index) => Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: _buildImageTile(
                  isCollisionSketch: false,
                  file: _additionalImages[index]['file'],
                  url: _additionalImages[index]['url'],
                  index: index,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> saveOtherDraft() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    String draftID = "${widget.officerID}_currentAccidentID";
    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

    try {
      List<String> collisionSketchUrls = [];
      if (_collisionSketchImage != null) {
        collisionSketchUrls = [
          await _uploadImageToFirebase(_collisionSketchImage!)
        ];
      } else if (_collisionSketchUrl != null) {
        collisionSketchUrls = [_collisionSketchUrl!];
      }

      List<String> additionalImageUrls = [];
      for (var image in _additionalImages) {
        if (image['file'] != null) {
          additionalImageUrls.add(await _uploadImageToFirebase(image['file']));
        } else if (image['url'] != null) {
          additionalImageUrls.add(image['url']);
        }
      }

      await draftRef.set({
        'O': {
          'description of accident':
              _descriptionOfAccidentController.text.trim(),
          'collisionSketchUrls': collisionSketchUrls,
          'additionalImageUrls': additionalImageUrls,
        },
        'officerID': widget.officerID,
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Draft saved successfully')),
      );
    } catch (e) {
      print('Failed to save draft: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to save draft: $e')),
      );
    }
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

  Future<void> submitAccidentReport() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    String draftID = "${widget.officerID}_currentAccidentID";
    DocumentReference draftRef =
        FirebaseFirestore.instance.collection('accident_draft').doc(draftID);

    try {
      DocumentSnapshot draftSnapshot = await draftRef.get();
      if (draftSnapshot.exists) {
        Map<String, dynamic> draftData =
            draftSnapshot.data() as Map<String, dynamic>;

        await FirebaseFirestore.instance.collection('accident_report').add({
          'A': draftData['A'],
          'E': draftData['E'],
          'C': draftData['C'],
          'O': draftData['O'],
          'officerID': widget.officerID,
          'createdAt': draftData['createdAt'],
          'submittedAt': FieldValue.serverTimestamp(),
        });

        await draftRef.delete();

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Report submitted successfully')),
        );
      }
    } catch (e) {
      print('Failed to submit report: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to submit report: $e')),
      );
    }
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
                maxLines: 5,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  filled: true,
                ),
              ),
              SizedBox(height: 20.0),
              _buildCollisionSketchField(),
              SizedBox(height: 20),
              _buildAdditionalImagesField(),
              SizedBox(height: 50.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
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
                      onPressed: saveOtherDraft,
                    ),
                  ),
                  ElevatedButton(
                    child: Text(
                      'Submit',
                      style: TextStyle(color: Colors.black, fontSize: 16.0),
                    ),
                    onPressed: submitAccidentReport,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xfffbbe00),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                      ),
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
}
