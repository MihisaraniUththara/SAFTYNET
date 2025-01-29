import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:intl/intl.dart';
import '../../services/location_service.dart';
import '../../models/accident_location.dart';
import '../../widgets/accept_officer_validation_dialog.dart';

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
              .where('police_station_email', isEqualTo: userEmail)
              .where('accepted', isEqualTo: false)
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
                  style: TextStyle(fontSize: 18, color: Color.fromARGB(255, 49, 48, 50)),
                ),
              );
            }

            return ListView.builder(
              padding: const EdgeInsets.all(16.0),
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

                    return _buildAccidentCard(
                      context: context,
                      accidentId: accident.id,
                      location: location,
                      formattedDateTime: formattedDateTime,
                      geoPoint: data['location'] as GeoPoint?,
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

  Widget _buildAccidentCard({
    required BuildContext context,
    required String accidentId,
    required String location,
    required String formattedDateTime,
    GeoPoint? geoPoint,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
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
        child: Column(
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 22,
                  backgroundColor:Colors.orange.shade100,
                    child: const Icon(Icons.location_on,
                      size: 24,  color: Colors.orange),
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
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () {
                    if (geoPoint != null) {
                      final accidentLocation = AccidentLocation.fromGeoPoint(geoPoint);
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return OfficerValidationDialog(
                            accidentId: accidentId,
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
                  style: ElevatedButton.styleFrom(
                    backgroundColor:Color.fromARGB(255, 208, 208, 208),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                    child: const Text('Accept', style: TextStyle(color: Color.fromARGB(255, 0, 0, 0))),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
