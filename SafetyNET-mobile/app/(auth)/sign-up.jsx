import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView,  Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";


const SignUp = () => {
  
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name:"",
    nic:"",
    license:"",
    phone:"",
    password: "",
  });

  const submit = ()=>{
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          
        >
          <View style={{ marginTop: 5, alignItems: 'center' }}>
          <View style={{ width: '80%', height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 }}>
            <View style={{ width: '25%', height: '100%', backgroundColor: '#fbbe00', borderRadius: 4 }} />
          </View>
        </View>
          
          <Text className="text-3xl font-semibold text-black mt-10 font-psemibold">
          Hello there 👋 
          </Text>
          <Text className="text-lg font-semibold text-[#7D7D7D] mt-3">Please enter your details to create an account.</Text>
          
          <FormField
            title="Full Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
            keyboardType="name"
            placeholder="Enter your full name"
           
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
            iconName="mail-outline"
          />

          
          <FormField
            title="National Id Number"
            value={form.nic}
            handleChangeText={(e) => setForm({ ...form, nic: e })}
            otherStyles="mt-7"
            placeholder="Enter your National Id number"
           
          />

        <FormField
            title="Driver License"
            value={form.license}
            handleChangeText={(e) => setForm({ ...form, license: e })}
            otherStyles="mt-7"
            placeholder="Enter your driver license number"
           
          />

      <FormField
            title="Phone Number"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles="mt-7"
            placeholder="Enter your phone number"
            iconName="call-outline"
           
          />

      <FormField
            title="Emergencty Contact Number"
            value={form.emergencyno}
            handleChangeText={(e) => setForm({ ...form, emergencyno: e })}
            otherStyles="mt-7"
            placeholder="Enter your emergency contact number"
            iconName="call-outline"
           
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Un"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-ip"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;