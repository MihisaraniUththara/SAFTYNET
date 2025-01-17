import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../services/report_notification_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ReportNotificationScreen extends StatefulWidget {
  final String policeStation; // Station ID for 119 unit

  const ReportNotificationScreen({super.key, required this.policeStation});

  @override
  ReportNotificationScreenState createState() =>
      ReportNotificationScreenState();
}

class ReportNotificationScreenState extends State<ReportNotificationScreen> {
  int _selectedIndex = 1;
  bool _newNotification = false;
  late final ReportNotificationService _notificationService;

  @override
  void initState() {
    super.initState();

    // Initialize the NotificationService for the given police station
    _notificationService =
        ReportNotificationService(policeStation: widget.policeStation);

    // Listen for new notifications
    _notificationService.listenForNotifications().listen((notifications) {
      setState(() {
        _newNotification = notifications.isNotEmpty;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Notifications',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: const Color(0xFFfbbe00),
        elevation: 0,
      ),
      body: StreamBuilder<List<Map<String, String>>>(
        stream: _notificationService.listenForNotifications(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return const Center(child: Text('Error fetching notifications'));
          }

          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No notifications available'));
          }

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
        },
      ),
    );
  }

  Widget _buildNotificationCard({
    required String title,
    required String message,
    required String date,
  }) {
    DateTime notificationDate = DateTime.parse(date);
    String formattedDate =
        "${notificationDate.hour}:${notificationDate.minute.toString().padLeft(2, '0')} | ${notificationDate.day}/${notificationDate.month}/${notificationDate.year}";

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
                  backgroundColor: Colors.orange.shade100,
                  child: const Icon(Icons.notifications,
                      size: 24, color: Colors.orange),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
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
                      style: const TextStyle(
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
              style: const TextStyle(
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
}
