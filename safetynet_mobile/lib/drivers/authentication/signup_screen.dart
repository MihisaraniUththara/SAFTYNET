import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:safetynet_mobile/drivers/authentication/login_screen.dart';

class SignupScreen extends StatefulWidget {
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  var formKey = GlobalKey<FormState>();
  var emailController = TextEditingController();
  var nameController = TextEditingController();
  var nationalIdController = TextEditingController();
  var driverLicenseController = TextEditingController();
  var phoneNumberController = TextEditingController();
  var emergencynameController = TextEditingController();
  var emergencyphoneNumberController = TextEditingController();
  var passwordController = TextEditingController();
  var isObsecure = true.obs;

  Future<void> signup() async {
  if (formKey.currentState!.validate()) {
    try {
      UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: emailController.text.trim(),
        password: passwordController.text.trim(),
      );

      print("User signed up: ${userCredential.user!.uid}");

      // Save additional user data to Firestore
      await FirebaseFirestore.instance.collection('drivers').doc(userCredential.user!.uid).set({
        'fullName': nameController.text.trim(),
        'email': emailController.text.trim(),
        'nationalId': nationalIdController.text.trim(),
        'driverLicense': driverLicenseController.text.trim(),
        'phoneNumber': phoneNumberController.text.trim(),
        'emergencyContactName': emergencynameController.text.trim(),
        'emergencyContactNumber': emergencyphoneNumberController.text.trim(),
      });

      print("User data saved to Firestore");

      // Show success snackbar
      Get.snackbar(
        "Success",
        "Account created successfully",
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );

      // Navigate to login screen
      Get.to(LoginScreen());
    } on FirebaseAuthException catch (e) {
      print("FirebaseAuthException: ${e.message}");
      Get.snackbar(
        "Signup Failed",
        e.message!,
        snackPosition: SnackPosition.BOTTOM,
      );
    } on FirebaseException catch (e) {
      print("FirebaseException: ${e.message}");
      Get.snackbar(
        "Signup Failed",
        e.message!,
        snackPosition: SnackPosition.BOTTOM,
      );
    } catch (e, stackTrace) {
      print("Unknown Error: $e");
      print(stackTrace);
      Get.snackbar(
        "Signup Failed",
        "An unknown error occurred: $e",
        snackPosition: SnackPosition.BOTTOM,
      );
    }
  }
}





  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: LayoutBuilder(
        builder: (context, cons) {
          return ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: cons.maxHeight,
            ),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 60),

                  // Progress bar
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: LinearProgressIndicator(
                      value: 1,
                      backgroundColor: Colors.grey[300],
                      color: Color(0xfffbbe00),
                      minHeight: 8,
                    ),
                  ),

                  const SizedBox(height: 30),

                  // Title and subtitle
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          "Hello there 👋",
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          "Please enter your details to create an account.",
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 30),

                  // Form
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Color.fromARGB(171, 255, 255, 255),
                        borderRadius: BorderRadius.all(
                          Radius.circular(30),
                        ),
                        boxShadow: [
                          BoxShadow(
                            blurRadius: 8,
                            color: Colors.black26,
                            offset: Offset(0, -3),
                          ),
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(24.0),
                        child: Form(
                          key: formKey,
                          child: Column(
                            children: [
                              // Full Name
                              TextFormField(
                                controller: nameController,
                                validator: (val) => val == "" ? "Please enter your full name" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.person,
                                    color: Colors.black,
                                  ),
                                  hintText: "Full Name",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Email
                              TextFormField(
                                controller: emailController,
                                validator: (val) => val == "" ? "Please enter your email" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.email,
                                    color: Colors.black,
                                  ),
                                  hintText: "Email",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // National ID
                              TextFormField(
                                controller: nationalIdController,
                                validator: (val) => val == "" ? "Please enter your national ID number" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.badge,
                                    color: Colors.black,
                                  ),
                                  hintText: "National ID Number",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Driver License
                              TextFormField(
                                controller: driverLicenseController,
                                validator: (val) => val == "" ? "Please enter your driver license number" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.drive_eta,
                                    color: Colors.black,
                                  ),
                                  hintText: "Driver License Number",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Phone Number
                              TextFormField(
                                controller: phoneNumberController,
                                validator: (val) => val == "" ? "Please enter your phone number" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.phone,
                                    color: Colors.black,
                                  ),
                                  hintText: "Phone Number 077-1234567",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Emergency Name
                              TextFormField(
                                controller: emergencynameController,
                                validator: (val) => val == "" ? "Please enter emergency contact name" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.person,
                                    color: Colors.black,
                                  ),
                                  hintText: "Emergency Contact Name",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Emergency Contact Number
                              TextFormField(
                                controller: emergencyphoneNumberController,
                                validator: (val) => val == "" ? "Please enter emergency contact number" : null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.phone,
                                    color: Colors.black,
                                  ),
                                  hintText: "Emergency Contact Number",
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide: const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Password
                              Obx(
                                () => TextFormField(
                                  controller: passwordController,
                                  obscureText: isObsecure.value,
                                  validator: (val) => val == "" ? "Please enter your password" : null,
                                  decoration: InputDecoration(
                                    prefixIcon: const Icon(
                                      Icons.vpn_key_off_sharp,
                                      color: Colors.black,
                                    ),
                                    suffixIcon: Obx(
                                      () => GestureDetector(
                                        onTap: () {
                                          isObsecure.value = !isObsecure.value;
                                        },
                                        child: Icon(
                                          isObsecure.value ? Icons.visibility_off : Icons.visibility,
                                          color: Colors.black,
                                        ),
                                      ),
                                    ),
                                    hintText: "Password",
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(30),
                                      borderSide: const BorderSide(
                                        color: Colors.white60,
                                      ),
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(30),
                                      borderSide: const BorderSide(
                                        color: Colors.white60,
                                      ),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(30),
                                      borderSide: const BorderSide(
                                        color: Colors.white60,
                                      ),
                                    ),
                                    disabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(30),
                                      borderSide: const BorderSide(
                                        color: Colors.white60,
                                      ),
                                    ),
                                    contentPadding: const EdgeInsets.symmetric(
                                      horizontal: 14,
                                      vertical: 6,
                                    ),
                                    fillColor: Colors.white,
                                    filled: true,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 18),

                              // Submit Button
                              Material(
                                color: Color(0xfffbbe00),
                                borderRadius: BorderRadius.circular(30),
                                child: InkWell(
                                  onTap: signup,
                                  borderRadius: BorderRadius.circular(30),
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                      vertical: 10,
                                      horizontal: 50,
                                    ),
                                    child: Text(
                                      "Create Account",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),

                  // Sign in link
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Already have an account?"),
                      TextButton(
                        onPressed: () {
                          Get.to(LoginScreen());
                        },
                        child: const Text(
                          "Sign In",
                          style: TextStyle(
                            color: Color(0xfffbbe00),
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
