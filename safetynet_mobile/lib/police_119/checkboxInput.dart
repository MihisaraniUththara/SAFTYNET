import 'package:flutter/material.dart';

//class to handle multiple choice checkbox input
class MultipleChoiceCheckboxInput extends StatefulWidget {
  final String topic;
  final List<String> labels;
  final void Function(Set<String>) onSaved;

  const MultipleChoiceCheckboxInput({
    Key? key,
    required this.topic,
    required this.labels,
    required this.onSaved,
  }) : super(key: key);

  @override
  _MultipleChoiceCheckboxInputState createState() =>
      _MultipleChoiceCheckboxInputState();
}

class _MultipleChoiceCheckboxInputState
    extends State<MultipleChoiceCheckboxInput> {
  final Set<String> _selectedLabels = {};

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.topic,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        ...widget.labels.map((label) {
          return CheckboxListTile(
            title: Text(label),
            value: _selectedLabels.contains(label),
            onChanged: (bool? value) {
              setState(() {
                if (value ?? false) {
                  _selectedLabels.add(label);
                } else {
                  _selectedLabels.remove(label);
                }
              });
            },
          );
        }).toList(),
      ],
    );
  }

  @override
  void dispose() {
    widget.onSaved(_selectedLabels);
    super.dispose();
  }
}

//class to handle single choice checkbox input
class SingleChoiceCheckboxInput extends StatefulWidget {
  final String topic;
  final List<String> labels;
  final void Function(String?) onSaved;

  const SingleChoiceCheckboxInput({
    Key? key,
    required this.topic,
    required this.labels,
    required this.onSaved,
  }) : super(key: key);

  @override
  _SingleChoiceCheckboxInputState createState() =>
      _SingleChoiceCheckboxInputState();
}

class _SingleChoiceCheckboxInputState extends State<SingleChoiceCheckboxInput> {
  String? _selectedLabel;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.topic,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        ...widget.labels.map((label) {
          return CheckboxListTile(
            title: Text(label),
            value: _selectedLabel == label,
            onChanged: (bool? value) {
              setState(() {
                if (value ?? false) {
                  _selectedLabel = label;
                } else {
                  _selectedLabel = null;
                }
              });
            },
          );
        }).toList(),
      ],
    );
  }

  @override
  void dispose() {
    widget.onSaved(_selectedLabel);
    super.dispose();
  }
}