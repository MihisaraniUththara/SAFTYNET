import 'dart:io';
import 'package:image_picker/image_picker.dart';
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
                if (value == true) {
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

// Class to handle single choice checkbox input
class SingleChoiceCheckboxInput extends StatefulWidget {
  final String topic;
  final List<String> labels;
  final void Function(String?) onSaved;
  final String? Function()? validator; // Validator callback
  final String? initialValue; // Add initialValue parameter

  const SingleChoiceCheckboxInput({
    super.key,
    required this.topic,
    required this.labels,
    required this.onSaved,
    this.validator, // Optionally pass a validator
    this.initialValue,
  });

  @override
  SingleChoiceCheckboxInputState createState() =>
      SingleChoiceCheckboxInputState();
}

class SingleChoiceCheckboxInputState extends State<SingleChoiceCheckboxInput> {
  String? _selectedLabel;

  @override
  void initState() {
    super.initState();
    _selectedLabel = widget.initialValue; // Initialize with the provided value
  }

  String _extractPrefix(String label) {
    return label.split(' ')[0]; // Extract the prefix (e.g., '1', '2', etc.)
  }

  @override
  Widget build(BuildContext context) {
    return FormField<String>(
      initialValue: _selectedLabel,
      validator: (_) => widget.validator?.call(),
      onSaved: (value) => widget.onSaved(_selectedLabel),
      builder: (FormFieldState<String> state) {
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
                value: _selectedLabel == _extractPrefix(label),
                onChanged: (bool? value) {
                  setState(() {
                    _selectedLabel = value! ? _extractPrefix(label) : null;
                    state.didChange(_selectedLabel);
                  });
                },
                //controlAffinity: ListTileControlAffinity.leading,
              );
            }).toList(),
            if (state.hasError)
              Padding(
                padding: const EdgeInsets.only(left: 12, top: 8),
                child: Text(
                  state.errorText!,
                  style: const TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),
           /* if (widget.validator != null) // Add validation feedback if applicable
              Builder(
                builder: (context) {
                  final error = widget.validator!();
                  if (error != null && _selectedLabel == null) {
                    return Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        error,
                        style: TextStyle(color: Colors.red, fontSize: 12),
                      ),
                    );
                  }
                  return SizedBox.shrink();
                },
              ),*/
          ],
        );
      },
    );
  }
}

class FormSection extends StatefulWidget {
  final String topic;
  final List<String> labels;
  final List<List<bool>> checkboxStates;
  final int columnsCount;
  final Function(int, String, int) onCheckboxChanged;
  final String? Function()? validator; // Optional validator callback

  const FormSection({
    Key? key,
    required this.topic,
    required this.labels,
    required this.checkboxStates,
    required this.columnsCount,
    required this.onCheckboxChanged,
    this.validator, // Pass validator callback if needed
  }) : super(key: key);

  @override
  State<FormSection> createState() => _FormSectionState();
}

class _FormSectionState extends State<FormSection> {
  @override
  Widget build(BuildContext context) {
    return FormField<List<List<bool>>>(
      initialValue: widget.checkboxStates,
      validator: (_) => widget.validator?.call(),
      builder: (FormFieldState<List<List<bool>>> state) {
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
            const SizedBox(height: 8),
            Row(
              children: [
                const Expanded(flex: 2, child: SizedBox()), // Space for labels
                ...List.generate(widget.columnsCount, (index) {
                  return Expanded(
                    flex: 1,
                    child: Center(
                      child: Text(
                        String.fromCharCode(65 + index),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  );
                }),
              ],
            ),
            ...List.generate(widget.labels.length, (rowIndex) {
              String label = widget.labels[rowIndex];
              String prefix = label.split(' ')[0];

              return Row(
                children: [
                  Expanded(
                    flex: 2,
                    child: Text(label),
                  ),
                  ...List.generate(widget.columnsCount, (columnIndex) {
                    bool isChecked = widget.checkboxStates[rowIndex].length >
                            columnIndex
                        ? widget.checkboxStates[rowIndex][columnIndex]
                        : false;

                    return Expanded(
                      flex: 1,
                      child: Center(
                        child: Checkbox(
                          value: isChecked,
                          onChanged: (bool? value) {
                            if (value == true) {
                              widget.onCheckboxChanged(
                                  rowIndex, prefix, columnIndex);
                              state.didChange(widget.checkboxStates);
                            }
                          },
                        ),
                      ),
                    );
                  }),
                ],
              );
            }),
            if (state.hasError)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(
                  state.errorText!,
                  style: const TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),
            const SizedBox(height: 16),
          ],
        );
      },
    );
  }
}

class TopicTextFields extends StatelessWidget {
  final String topic;
  final int maxChars;
  final int columnsCount;
  final List<TextEditingController> controllers;
  final Function(String, String) onChanged;
  final String? Function(String)? validator; // Validator callback for individual fields

  const TopicTextFields({
    Key? key,
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.controllers,
    required this.onChanged,
    this.validator, // Optionally pass a validator
  }) : super(key: key);

  String _extractPrefix(String topic) {
    return topic.split(' ')[0];
  }

  @override
  Widget build(BuildContext context) {
    final prefix = _extractPrefix(topic);

    return FormField<List<TextEditingController>>(
      initialValue: controllers,
      validator: (_) {
        for (var controller in controllers) {
          final error = validator?.call(controller.text);
          if (error != null) return error; // Return first validation error
        }
        return null; // All fields are valid
      },
      builder: (FormFieldState<List<TextEditingController>> state) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              topic,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: List.generate(columnsCount, (index) {
                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4.0),
                    child: Column(
                      children: [
                        Text(
                          String.fromCharCode(65 + index),
                          style: const TextStyle(fontSize: 16.0),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: controllers[index],
                          maxLength: maxChars,
                          maxLines: 1,
                          decoration: const InputDecoration(
                            counterText: '',
                            border: InputBorder.none,
                            filled: true,
                          ),
                          onChanged: (value) {
                            final key =
                                '$prefix${String.fromCharCode(65 + index)}';
                            onChanged(key, value);
                            state.didChange(controllers);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              }),
            ),
            if (state.hasError)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(
                  state.errorText!,
                  style: const TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),
            const SizedBox(height: 16),
          ],
        );
      },
    );
  }
}

class IntegerInputFields extends StatelessWidget {
  final String topic;
  final int maxChars;
  final int columnsCount;
  final List<TextEditingController> controllers;
  final Function(String, String) onChanged;
  final String? Function(String)? validator; // Validator callback for each field

  const IntegerInputFields({
    Key? key,
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.controllers,
    required this.onChanged,
    this.validator,
  }) : super(key: key);

  String _extractPrefix(String topic) {
    return topic.split(' ')[0];
  }

  @override
  Widget build(BuildContext context) {
    final prefix = _extractPrefix(topic);

    return FormField<List<TextEditingController>>(
      initialValue: controllers,
      validator: (_) {
        for (var controller in controllers) {
          final error = validator?.call(controller.text);
          if (error != null) return error; // Return the first error found
        }
        return null; // No errors found
      },
      builder: (FormFieldState<List<TextEditingController>> state) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              topic,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: List.generate(columnsCount, (index) {
                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4.0),
                    child: Column(
                      children: [
                        Text(
                          String.fromCharCode(65 + index),
                          style: const TextStyle(fontSize: 16.0),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: controllers[index],
                          maxLength: maxChars,
                          maxLines: 1,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            counterText: '',
                            border: InputBorder.none,
                            filled: true,
                          ),
                          onChanged: (value) {
                            final key =
                                '$prefix${String.fromCharCode(65 + index)}';
                            onChanged(key, value);
                            state.didChange(controllers);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              }),
            ),
            if (state.hasError)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(
                  state.errorText!,
                  style: const TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),
            const SizedBox(height: 16),
          ],
        );
      },
    );
  }
}




