import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:device_preview/device_preview.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:provider/provider.dart';
import 'police_119/services/accident_listener_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AccidentListenerService()),
      ],
      child: DevicePreview(
        enabled: true,
        builder: (context) => MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'SafetyNET',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xfffbbe00),
        useMaterial3: true,
      ),
      home: LoginScreen(),
    );
  }
}