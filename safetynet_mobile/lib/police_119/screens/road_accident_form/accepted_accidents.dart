import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../widgets/report_officer_validation_dialog.dart';
import 'package:intl/intl.dart';
import '../../services/location_service.dart';

class AcceptedAccidents extends StatelessWidget {
  Future<String?> _getUserEmail() async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      return user?.email;
    } catch (e) {
      print("Error fetching user email: $e");
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // Ensure background blends with the list
      appBar: AppBar(
        title: const Text(
          'Recently Accepted Accidents',
          style: TextStyle(
            color: Colors.black,
            fontSize: 25.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: const Color(0xfffbbe00),
        centerTitle: true,
      ),
      body: FutureBuilder<String?>(
        future: _getUserEmail(),
        builder: (context, userEmailSnapshot) {
          if (userEmailSnapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (userEmailSnapshot.hasError) {
            return Center(
              child: Text(
                'Error fetching station email: ${userEmailSnapshot.error}',
                style: const TextStyle(color: Colors.red, fontSize: 16),
              ),
            );
          }

          final userEmail = userEmailSnapshot.data;

          return StreamBuilder<QuerySnapshot>(
            stream: FirebaseFirestore.instance
                .collection('driver_accidents')
                .where('police_station_email', isEqualTo: userEmail)
                .where('reported', isEqualTo: false)
                .where('accepted', isEqualTo: true)
                .snapshots(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }

              if (snapshot.hasError) {
                return Center(
                  child: Text(
                    'Error loading data: ${snapshot.error}',
                    style: const TextStyle(color: Colors.red, fontSize: 16),
                  ),
                );
              }

              if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                return const Center(
                  child: Text(
                    'No recently accepted accidents.',
                    style: TextStyle(
                        fontSize: 18, color: Color.fromARGB(255, 56, 56, 57)),
                  ),
                );
              }

              return ListView.builder(
                physics: const ClampingScrollPhysics(), // Prevent unwanted scrolling
                shrinkWrap: true, // Ensures no unnecessary space is taken
                itemCount: snapshot.data!.docs.length,
                itemBuilder: (context, index) {
                  var accident = snapshot.data!.docs[index];
                  var data = accident.data() as Map<String, dynamic>;

                  return FutureBuilder<String>(
                    future: data['location'] is GeoPoint
                        ? LocationService.getLocationName(data['location'])
                        : Future.value('Unknown location'),
                    builder: (context, locationSnapshot) {
                      String formattedDateTime = 'Unknown time';
                      if (data['date_time'] is Timestamp) {
                        final dateTime = (data['date_time'] as Timestamp).toDate();
                        formattedDateTime = DateFormat('HH:mm | dd/MM/yyyy').format(dateTime);
                      }

                      final location = locationSnapshot.data ?? 'Fetching location...';
                      final String uniqueIdNo = data['unique_id_number']?.toString() ?? 'unknown';
                      final Timestamp? acceptedTimestamp = data['accepted_time'] as Timestamp?;
                      final String acceptedTime = acceptedTimestamp != null
                          ? DateFormat('HH:mm | dd/MM/yyyy').format(acceptedTimestamp.toDate())
                          : 'unknown';

                      return Container(
                        key: ValueKey(accident.id),
                        margin: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 8.0), // Top margin removed
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.2),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 22,
                                backgroundColor: Colors.orange.shade100,
                                child: const Icon(Icons.location_on,
                                    size: 24, color: Colors.orange),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Accident at $location',
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black87,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      formattedDateTime,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                        color: Color.fromARGB(255, 87, 86, 86),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Unique ID No: $uniqueIdNo',
                                      style: const TextStyle(
                                        fontSize: 14,
                                        color: Colors.black87,
                                      ),
                                    ),
                                    Text(
                                      'Accepted Time: $acceptedTime',
                                      style: const TextStyle(
                                        fontSize: 14,
                                        color: Colors.black87,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 12),
                              ElevatedButton(
                                onPressed: () {
                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return OfficerValidationDialog(
                                        uniqueIdNo: uniqueIdNo,
                                      );
                                    },
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color.fromARGB(255, 208, 208, 208),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                                child: const Text(
                                  'Add',
                                  style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
