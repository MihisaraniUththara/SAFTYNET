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
            /*if (state.hasError)
              Padding(
                padding: const EdgeInsets.only(left: 12, top: 8),
                child: Text(
                  state.errorText!,
                  style: const TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),*/
            if (widget.validator != null) // Add validation feedback if applicable
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
              ),
          ],
        );
      },
    );
  }
}

//class to handle multiple choice radio input for checkbox fields
/*class FormSection extends StatelessWidget {
  final String topic;
  final List<String> labels;
  final List<List<bool>> checkboxStates;
  final int columnsCount;
  final Function(int, String, int) onCheckboxChanged;

  const FormSection({
    required this.topic,
    required this.labels,
    required this.checkboxStates,
    required this.columnsCount,
    required this.onCheckboxChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          topic,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Row(
          children: [
            Expanded(flex: 2, child: Container()), // Placeholder for labels
            ...List.generate(columnsCount, (index) {
              String label = String.fromCharCode(65 + index); // A = 65 in ASCII
              return Expanded(
                flex: 1,
                child: Center(
                  child: Text(label,
                      style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              );
            }),
          ],
        ),
        ...labels.asMap().entries.map((entry) {
          int rowIndex = entry.key;
          String label = entry.value;

          // Extract the prefix (before the first space)
          String labelPrefix = label.split(' ')[0];

          return CheckboxRow(
            label: label,
            checkboxStates: checkboxStates[rowIndex],
            columnsCount: columnsCount,
            onChanged: (columnIndex) {
              // Pass the prefix ,row index and column index to the parent widget
              onCheckboxChanged(rowIndex, labelPrefix, columnIndex);
            },
          );
        }).toList(),
        SizedBox(height: 20),
      ],
    );
  }
}

class CheckboxRow extends StatelessWidget {
  final String label;
  final List<bool> checkboxStates;
  final int columnsCount;
  final Function(int) onChanged;

  const CheckboxRow({
    required this.label,
    required this.checkboxStates,
    required this.columnsCount,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(flex: 2, child: Text(label)),
        ...List.generate(columnsCount, (index) {
          return Expanded(
            flex: 1,
            child: Checkbox(
              value:
                  checkboxStates.length > index ? checkboxStates[index] : false,
              onChanged: (value) {
                if (value == true) {
                  onChanged(index); // Pass column index when checked
                }
              },
            ),
          );
        }),
      ],
    );
  }
}*/

class FormSection extends StatefulWidget {
  final String topic;
  final List<String> labels;
  final List<List<bool>> checkboxStates;
  final int columnsCount;
  final Function(int, String, int) onCheckboxChanged;

  const FormSection({
    Key? key,
    required this.topic,
    required this.labels,
    required this.checkboxStates,
    required this.columnsCount,
    required this.onCheckboxChanged,
  }) : super(key: key);

  @override
  State<FormSection> createState() => _FormSectionState();
}

class _FormSectionState extends State<FormSection> {
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
                bool isChecked = widget.checkboxStates[rowIndex].length > columnIndex 
                    ? widget.checkboxStates[rowIndex][columnIndex] 
                    : false;
                    
                return Expanded(
                  flex: 1,
                  child: Center(
                    child: Checkbox(
                      value: isChecked,
                      onChanged: (bool? value) {
                        if (value == true) {
                          widget.onCheckboxChanged(rowIndex, prefix, columnIndex);
                        }
                      },
                    ),
                  ),
                );
              }),
            ],
          );
        }),
        const SizedBox(height: 16),
      ],
    );
  }
}



//for 3 column text input fields
/*class TopicTextFields extends StatefulWidget {
  final String
      topic; // Topic with prefix (e.g., "E2 Vehicle Registration number")
  final int maxChars;
  final int columnsCount;
  final Function(String, String) onChanged; // Callback with key and value

  TopicTextFields({
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.onChanged,
  });

  @override
  _TopicTextFieldsState createState() => _TopicTextFieldsState();
}

class _TopicTextFieldsState extends State<TopicTextFields> {
  List<String> _userInputs = [];

  @override
  void initState() {
    super.initState();
    _userInputs = List.generate(widget.columnsCount, (_) => '');
  }

  @override
  void didUpdateWidget(covariant TopicTextFields oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.columnsCount > oldWidget.columnsCount) {
      _userInputs.add('');
    }
  }

  String _extractPrefix(String topic) {
    // Extracts the prefix (e.g., "E2") from the topic
    return topic.split(' ')[0]; // Assumes the prefix is the first word
  }

  @override
  Widget build(BuildContext context) {
    String prefix = _extractPrefix(widget.topic); // Extract the prefix

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          widget.topic,
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 16.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(widget.columnsCount, (index) {
            return Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.0),
                child: Column(
                  children: [
                    Text(
                      '${String.fromCharCode(65 + index)}', // A, B, C, ...
                      style: TextStyle(fontSize: 16.0),
                    ),
                    SizedBox(height: 8.0),
                    TextFormField(
                      maxLength: widget.maxChars,
                      autofocus: true,
                      maxLines: 1,
                      keyboardType: TextInputType.text,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        filled: true,
                      ),
                      onChanged: (value) {
                        setState(() {
                          _userInputs[index] = value;
                        });
                        // Generate key for the form states, e.g., 'E2A', 'E2B', 'E2C'
                        String key =
                            '$prefix${String.fromCharCode(65 + index)}';
                        widget.onChanged(key, value); // Pass key and value
                        //print('Key: $key, Value: $value');
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ],
    );
  }
}*/

class TopicTextFields extends StatelessWidget {
  final String topic;
  final int maxChars;
  final int columnsCount;
  final List<TextEditingController> controllers;
  final Function(String, String) onChanged;

  const TopicTextFields({
    Key? key,
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.controllers,
    required this.onChanged,
  }) : super(key: key);

  String _extractPrefix(String topic) {
    return topic.split(' ')[0];
  }

  @override
  Widget build(BuildContext context) {
    final prefix = _extractPrefix(topic);

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
                        final key = '$prefix${String.fromCharCode(65 + index)}';
                        onChanged(key, value);
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}


// For 3 column integer input fields
/*class IntegerInputFields extends StatefulWidget {
  final String topic;
  final int maxChars;
  final int columnsCount;
  final Function(String, String) onChanged; // Callback with key and value

  IntegerInputFields({
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.onChanged,
  });

  @override
  _IntegerInputFieldsState createState() => _IntegerInputFieldsState();
}

class _IntegerInputFieldsState extends State<IntegerInputFields> {
  List<int?> _userInputs = [];

  @override
  void initState() {
    super.initState();
    _userInputs = List.generate(widget.columnsCount, (_) => null);
  }

  @override
  void didUpdateWidget(covariant IntegerInputFields oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.columnsCount > oldWidget.columnsCount) {
      _userInputs.add(null);
    }
  }

  String _extractPrefix(String topic) {
    // Extracts the prefix (e.g., "E3") from the topic
    return topic.split(' ')[0]; // Assumes the prefix is the first word
  }

  @override
  Widget build(BuildContext context) {
    String prefix = _extractPrefix(widget.topic); // Extract the prefix

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          widget.topic,
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 16.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(widget.columnsCount, (index) {
            return Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.0),
                child: Column(
                  children: [
                    Text(
                      '${String.fromCharCode(65 + index)}', // A, B, C, ...
                      style: TextStyle(fontSize: 16.0),
                    ),
                    SizedBox(height: 8.0),
                    TextFormField(
                      maxLength: widget.maxChars,
                      autofocus: true,
                      maxLines: 1,
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        filled: true,
                      ),
                      onChanged: (value) {
                        setState(() {
                          _userInputs[index] = int.tryParse(value);
                        });
                        // Generate key for the form states, e.g., 'E3A', 'E3B', 'E3C'
                        String key =
                            '$prefix${String.fromCharCode(65 + index)}';
                        widget.onChanged(key, value); // Pass key and value
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a number';
                        }
                        if (int.tryParse(value) == null) {
                          return 'Please enter a valid integer';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ],
    );
  }
}*/

class IntegerInputFields extends StatelessWidget {
  final String topic;
  final int maxChars;
  final int columnsCount;
  final List<TextEditingController> controllers;
  final Function(String, String) onChanged;

  const IntegerInputFields({
    Key? key,
    required this.topic,
    required this.maxChars,
    required this.columnsCount,
    required this.controllers,
    required this.onChanged,
  }) : super(key: key);

  String _extractPrefix(String topic) {
    return topic.split(' ')[0];
  }

  @override
  Widget build(BuildContext context) {
    final prefix = _extractPrefix(topic);

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
                        final key = '$prefix${String.fromCharCode(65 + index)}';
                        onChanged(key, value);
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a number';
                        }
                        if (int.tryParse(value) == null) {
                          return 'Please enter a valid integer';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}

