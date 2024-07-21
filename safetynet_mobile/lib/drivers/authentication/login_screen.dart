import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:safetynet_mobile/drivers/authentication/signup_screen.dart';


class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

var formkey = GlobalKey<FormState>();
var emailController = TextEditingController();
var passwordController =TextEditingController();
var isObsecure = true.obs;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
     backgroundColor: Color(0xfffbbe00),
     body:LayoutBuilder(
      builder: (context, cons){
        return ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: cons.maxHeight,
            ),
            
            child: SingleChildScrollView(child: Column(
              children: [
                //login screen header

                 const SizedBox(height: 60),
                SizedBox(
                  width: MediaQuery.of(context).size.width,
                  height: 285,
                  child: Image.asset(
                    "images/login.png",
                  ),
                ),

                 const SizedBox(height: 10,),

                //login screen form

                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Container(
                    decoration:const BoxDecoration(
                      color: Color.fromARGB(171, 255, 255, 255),
                      borderRadius: BorderRadius.all(
                        Radius.circular(60),
                      ),
                      boxShadow: [
                        BoxShadow(
                          blurRadius: 8,
                          color: Colors.black26,
                          offset: Offset(0, -3),
                        ),
                      ]
                    ),
                                
                    child:Padding(
                      padding: const EdgeInsets.fromLTRB(30,30,30,8),
                      child: Column(
                      children: [
                        Text(
                          "Welcome to SafetyNET!\n Create an account or sing in to join us.\n Let's work together for a safer tomorrow.",
                          style: TextStyle(
                            fontSize: 16,
                            
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 16),
                        Form(
                          key: formkey,
                          child: Column(
                            children: [
                              //email
                              TextFormField(
                                controller: emailController,
                                validator: (val) => val == "" ? "Please enter your email": null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.email,
                                    color:Colors.black,
                      
                                  ),
                                  hintText: "email...",
                                  border:OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                      
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                      
                                  contentPadding:const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                      
                              const SizedBox(height: 18,),
                              //password
                              Obx(
                                ()=> TextFormField(
                                controller: passwordController,
                                obscureText: isObsecure.value,
                                validator: (val) => val == "" ? "Please enter your password": null,
                                decoration: InputDecoration(
                                  prefixIcon: const Icon(
                                    Icons.vpn_key_off_sharp,
                                    color:Colors.black,
                      
                                  ),
                                  suffixIcon: Obx(
                                    ()=>GestureDetector(
                                      onTap: ()
                                      {
                                        isObsecure.value =!isObsecure.value;
                                      },
                      
                                      child: Icon(
                                        isObsecure.value ? Icons.visibility_off: Icons.visibility,
                                        color: Colors.black,
                                      ),
                                    ),
                                  ),
                                  hintText: "password...",
                                  border:OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                      
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(30),
                                    borderSide:const BorderSide(
                                      color: Colors.white60,
                                    ),
                                  ),
                      
                                  contentPadding:const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 6,
                                  ),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                              ),
                              ),
                               const SizedBox(height: 18,),
                      
                               Material(
                                color: Colors.black,
                                borderRadius: BorderRadius.circular(30),
                                child: InkWell(
                                  onTap: ()
                                  {
                      
                                  },
                      
                                  borderRadius: BorderRadius.circular(30),
                                  child:const Padding(
                                    padding: EdgeInsets.symmetric(
                                      vertical: 10,
                                      horizontal: 50,
                                    ),
                                    child: Text(
                                      "Login",
                                      style:TextStyle(
                                        color:Colors.white,
                                        fontSize: 16,
                                      ),
                                    ),
                                    ),
                                ),
                               ),
                            ],
                            ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment:MainAxisAlignment.center,
                          children: [
                            const Text(
                              "Do not have an Account?",
                              ),

                              TextButton(
                                onPressed: (){
                                  Get.to(SignupScreen());
                                }, 
                                child: const Text(
                                  "Sign Up here",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontFamily: AutofillHints.url,
                                  ),
                                ),
                                ),
                          ],
                        ),
                      ],
                                      ),
                    ),
                  ),
                ),

              

              ],
            ),),
          );
      },
     )
    );
  }
}
