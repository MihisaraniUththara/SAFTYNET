import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../widgets/accept_officer_validation_dialog.dart';
import 'package:intl/intl.dart';
import '../../services/location_service.dart';
import '../../models/accident_location.dart';

class TabNew extends StatelessWidget {
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
    return FutureBuilder<String?>(
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
              .where('accepted', isEqualTo: false)
              .where('police_station_email', isEqualTo: userEmail)
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
                  'No new accidents reported.',
                  style: TextStyle(fontSize: 18, color: Colors.grey),
                ),
              );
            }

            return ListView.builder(
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
                      formattedDateTime = DateFormat('yyyy-MM-dd HH:mm:ss').format(dateTime);
                    }

                    final location = locationSnapshot.data ?? 'Fetching location...';

                    return Card(
                      key: ValueKey(accident.id),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15.0),
                      ),
                      elevation: 10,
                      child: ListTile(
                        leading: const Icon(Icons.location_on),
                        title: Text('Accident at $location'),
                        subtitle: Text(
                          'Time: $formattedDateTime',
                          style: const TextStyle(fontSize: 14),
                        ),
                        trailing: ElevatedButton(
                          onPressed: () {
                            if (data['location'] is GeoPoint) {
                              final geoPoint = data['location'] as GeoPoint;
                              final accidentLocation = AccidentLocation.fromGeoPoint(geoPoint);

                              showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return OfficerValidationDialog(
                                    accidentId: accident.id,
                                    accidentLocation: accidentLocation,
                                  );
                                },
                              );
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Accident location is invalid')),
                              );
                            }
                          },
                          child: const Text('Accept'),
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
    );
  }
}