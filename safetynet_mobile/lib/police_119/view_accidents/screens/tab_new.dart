import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../widgets/accept_officer_validation_dialog.dart';
import 'package:geocoding/geocoding.dart';
import 'package:intl/intl.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class TabNew extends StatelessWidget {
  // Method to get a human-readable location name from a GeoPoint
  Future<String> _getLocationName(GeoPoint geoPoint) async {
    try {
      // Attempt reverse geocoding
      List<Placemark> placemarks = await placemarkFromCoordinates(
        geoPoint.latitude,
        geoPoint.longitude,
      );
      if (placemarks.isNotEmpty) {
        final placemark = placemarks.first;
        return placemark.locality ?? 'Unknown location';
      }
    } catch (e) {
      print('Error in reverse geocoding: $e');
    }
    return 'Unknown location'; // Fallback if geocoding fails
  }

  // Method to get the logged-in user's email
  Future<String?> _getUserEmail() async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      return user?.email; // Return the logged-in user's email
    } catch (e) {
      print("Error fetching user email: $e");
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String?>(
      future: _getUserEmail(), // Fetch the logged-in user's email
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
              .where('police_station_email',
                  isEqualTo: userEmail) // Filter by logged-in user's email
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

            var accidents = snapshot.data!.docs;

            return ListView.builder(
              itemCount: accidents.length,
              itemBuilder: (context, index) {
                var accident = accidents[index];

                return FutureBuilder<String>(
                  future: (accident.data() as Map<String, dynamic>)
                              .containsKey('location') &&
                          accident['location'] is GeoPoint
                      ? _getLocationName(accident['location'] as GeoPoint)
                      : Future.value('Unknown location'),
                  builder: (context, locationSnapshot) {
                    // Safely handle dateTime (convert Timestamp to DateTime)
                    String formattedDateTime = 'Unknown time';
                    if ((accident.data() as Map<String, dynamic>)
                            .containsKey('date_time') &&
                        accident['date_time'] is Timestamp) {
                      final timestamp = accident['date_time'] as Timestamp;
                      final dateTime = timestamp.toDate();
                      formattedDateTime =
                          DateFormat('yyyy-MM-dd HH:mm:ss').format(dateTime);
                    }

                    // Handle the location result
                    final location = locationSnapshot.connectionState ==
                                ConnectionState.done &&
                            locationSnapshot.hasData
                        ? locationSnapshot.data!
                        : 'Fetching location...';

                    return Card(
                      key: ValueKey(
                          accident.id), // Assign a unique key to each Card
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
                            if (accident['location'] is GeoPoint) {
                              GeoPoint geoPoint = accident['location'];
                              LatLng location =
                                  LatLng(geoPoint.latitude, geoPoint.longitude);

                              print(
                                  'Opening dialog with accidentId: ${accident.id}');

                              showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return OfficerValidationDialog(
                                    accidentId: accident.id,
                                    accidentLocation: location, // Pass location
                                  );
                                },
                              );
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                    content:
                                        Text('Accident location is invalid')),
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
