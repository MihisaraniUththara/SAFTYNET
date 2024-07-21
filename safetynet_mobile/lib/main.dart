import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';
import 'package:safetynet_mobile/drivers/authentication/signup_screen.dart';
import 'package:device_preview/device_preview.dart';
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(DevicePreview(
    enabled: true,
    builder: (context) => MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'SafetyNET',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: FutureBuilder(future: null, builder: (context, dataSnapshot) { 
     return LoginScreen(); 
          } ,
        ),
    );
  }
}

