import 'package:flutter/material.dart';

class UniqueIdInputField extends StatelessWidget {
  final String? draftData;
  final Future<String> Function() generateUniqueId;
  final TextEditingController controller;
  final String label;
  final String hintText;

  const UniqueIdInputField({
    Key? key,
    required this.draftData,
    required this.generateUniqueId,
    required this.controller,
    this.label = 'Unique ID Number',
    this.hintText = 'Division-Station-AR no-Year',
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        FutureBuilder<String>(
          future: _fetchUniqueId(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return TextFormField(
                decoration: InputDecoration(
                  hintText: 'Loading...',
                  filled: true,
                  border: InputBorder.none,
                ),
                readOnly: true,
              );
            } else if (snapshot.hasError) {
              return TextFormField(
                decoration: InputDecoration(
                  hintText: 'Error fetching Unique ID',
                  filled: true,
                  border: InputBorder.none,
                ),
                readOnly: true,
              );
            }

            // Populate controller with the draft data or generated ID
            if (controller.text.isEmpty) {
              controller.text = snapshot.data ?? '';
            }

            return TextFormField(
              controller: controller,
              maxLength: 50,
              decoration: InputDecoration(
                hintText: hintText,
                filled: true,
                border: InputBorder.none,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return "$label is required";
                }
                return null;
              },
            );
          },
        ),
      ],
    );
  }

  Future<String> _fetchUniqueId() async {
    // Use draft data if available
    if (draftData != null && draftData!.isNotEmpty) {
      return draftData!;
    }
    // Otherwise, generate a unique ID
    return generateUniqueId();
  }
}
