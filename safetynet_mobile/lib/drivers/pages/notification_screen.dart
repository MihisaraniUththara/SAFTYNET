import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:safetynet_mobile/drivers/pages/activity_screen.dart';
import 'package:safetynet_mobile/drivers/pages/home.dart';
import 'package:safetynet_mobile/drivers/pages/profile_screen.dart';
import 'package:safetynet_mobile/drivers/pages/bottom_navigation.dart';
import 'package:safetynet_mobile/drivers/pages/NotificationService.dart';

class NotificationPage extends StatefulWidget {
  @override
  _NotificationPageState createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  int _selectedIndex = 1;
   bool _newNotification = false;

  @override
void initState() {
  super.initState();

  Future<void> markNotificationsAsRead(String currentUserId) async {
  try {
    // Get all driver accidents where the current user is the driver
    QuerySnapshot snapshot = await FirebaseFirestore.instance
        .collection('driver_accidents')
        .where('driver_id', isEqualTo: currentUserId)
        .where('read', isEqualTo: false) // Only update unread notifications
        .get();

    // Loop through all documents and update the 'read' field to true
    for (var doc in snapshot.docs) {
      await FirebaseFirestore.instance
          .collection('driver_accidents')
          .doc(doc.id)
          .update({'read': true});
    }
  } catch (e) {
    print("Error updating notifications: $e");
  }
}

  
 String currentUserId = FirebaseAuth.instance.currentUser?.uid ?? ''; // Get user ID from Firebase Auth
 if (currentUserId.isNotEmpty) {
    markNotificationsAsRead(currentUserId);
  }
  // Get this dynamically from Firebase or a local source
  NotificationService(currentUserId: currentUserId)
    .listenForNewNotifications()
    .listen((hasNewNotification) {
      setState(() {
        _newNotification = hasNewNotification;  // Update the state when a new notification is detected
      });
    });
}

  // Stream to fetch accident notifications
  Stream<List<Map<String, String>>> _getAccidentNotifications() {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      print("Error: No user is currently signed in.");
      return Stream.empty();
    }

    return FirebaseFirestore.instance
        .collection('driver_accidents')
        .where('driver_id', isEqualTo: user.uid)
        .snapshots()
        .asyncMap((snapshot) async {
      List<Map<String, String>> notifications = [];

      for (var accidentDoc in snapshot.docs) {
        if (accidentDoc['accepted'] == true) {
          try {
            Map<String, String> notification = {};
            String message =
                'Your accident report has been accepted. The police will arrive soon to assist you.';

            // Check if police station info is available and add it to the message
            if (accidentDoc['police_station_id'] != null) {
              String policeStationId = accidentDoc['police_station_id'];
              try {
                DocumentSnapshot policeStationDoc = await FirebaseFirestore
                    .instance
                    .collection('police_stations')
                    .doc(policeStationId)
                    .get();
                if (policeStationDoc.exists) {
                  message +=
                      ' The police from ${policeStationDoc['station_name'] ?? 'Unknown Police Station'} are on their way.';
                } else {
                  print("No police station found for ID $policeStationId");
                }
              } catch (e) {
                print(
                    "Error fetching police station details for ID $policeStationId: $e");
              }
            }

            notification['title'] = 'Accident Report Accepted';
            notification['message'] = message;

            // Format the accepted_time as DateTime
            notification['date'] = (accidentDoc['accepted_time'] as Timestamp)
                .toDate()
                .toString(); // Full DateTime for time display

            notifications.add(notification);
          } catch (e) {
            print("Error processing accident document ${accidentDoc.id}: $e");
          }
        }
      }

      // Sort notifications by accepted_time client-side
      notifications.sort((a, b) => DateTime.parse(b['date']!)
          .compareTo(DateTime.parse(a['date']!)));

      return notifications;
    });
  }

  // Widget to build notification cards
  Widget _buildNotificationCard({
    required String title,
    required String message,
    required String date,
  }) {
    DateTime notificationDate = DateTime.parse(date);
    String formattedDate =
        "${notificationDate.hour}:${notificationDate.minute < 10 ? '0' : ''}${notificationDate.minute} | ${notificationDate.day}/${notificationDate.month}/${notificationDate.year}";

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
            offset: Offset(0, 3),
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
                  backgroundColor: Colors.orange.shade100,
                  child: Icon(Icons.notifications, size: 24, color: Colors.orange),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      formattedDate,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              message,
              style: TextStyle(
                fontSize: 14,
                color: Colors.black54,
              ),
              softWrap: true,
            ),
          ],
        ),
      ),
    );
  }

  Future<String> _fetchUserName() async {
    try {
      User? user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        DocumentSnapshot userDoc = await FirebaseFirestore.instance
            .collection('drivers')
            .doc(user.uid)
            .get();
        if (userDoc.exists) {
          return userDoc['fullName'];
        } else {
          print("User document does not exist.");
        }
      } else {
        print("No user found.");
      }
    } catch (e) {
      print("Error fetching user name: $e");
    }
    return 'Unknown Driver';
  }

  void _onItemTapped(int index) async {
    setState(() {
      _selectedIndex = index;
    });

    // If the Notifications tab is selected, reset the notification indicator
    if (index == 1) {
      setState(() {
        _newNotification = false; // Hide the indicator when navigating to the notifications page
      });
    }

    switch (index) {
      case 0:
        final fullName = await _fetchUserName();
        Get.to(() => DriverHomePage(fullName: fullName));
        break;
      case 1:
      Get.offAll(() => NotificationPage());
        break;
      case 2:
        Get.to(() => ProfileScreen());
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifications'),
        backgroundColor: Color(0xFFfbbe00),
        elevation: 0,
      ),
      body: Container(
        color: Colors.grey.shade100,
        child: StreamBuilder<List<Map<String, String>>>(
          stream: _getAccidentNotifications(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              print("Stream error: ${snapshot.error}");
              return Center(child: Text('Error fetching notifications'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              print("No notifications found for user.");
              return Center(child: Text('No notifications available'));
            } else {
              final notifications = snapshot.data!;
              return ListView.builder(
                padding: const EdgeInsets.all(16.0),
                itemCount: notifications.length,
                itemBuilder: (context, index) {
                  final notification = notifications[index];
                  return _buildNotificationCard(
                    title: notification['title']!,
                    message: notification['message']!,
                    date: notification['date']!,
                  );
                },
              );
            }
          },
        ),
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        selectedIndex: _selectedIndex,
        onItemTapped: _onItemTapped,
        showNotificationIndicator: _newNotification, 
      ),
    );
  }
}
