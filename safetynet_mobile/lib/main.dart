import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:device_preview/device_preview.dart';

import 'package:firebase_core/firebase_core.dart';

import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(DevicePreview(
    enabled: true,
    builder: (context) => MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'SafetyNET',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Color(0xfffbbe00),
        useMaterial3: true,
      ),
      home: LoginScreen(),
    );
  }
} 
