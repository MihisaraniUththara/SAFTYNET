import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import  FormField  from "../../components/FormField"
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState ({
    email:'',
    password:''
  })
  const [isChecked, setChecked] = React.useState(false);

  const [isSubmitiing, setSubmitting] = useState(false);
  const submit = ()=>{
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20  }}>
        {/* Back Arrow */}
        {/* <TouchableOpacity style={{ marginTop: 20 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}

        {/* Title and Subtitle */}
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Welcome back 👋</Text>
          <Text style={{ fontSize: 16, color: '#7D7D7D' , marginTop:20, marginBottom:30}}>Please enter your email & password to sign in.</Text>
        </View>

        {/* Input Fields */}
       
        <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e)=>setForm({...form,
          email:e
        })}
         placeholder="Enter your email"
        otherStyles="mt-7"
        keyboardType="eamil-address"
        iconName="mail-outline"
      />

<FormField
        title="Password"
        value={form.password}
        handleChangeText={(e)=>setForm({...form,
          password:e
        })}
        otherStyles="mt-7 mb-10"
        placeholder="Enter your password"
     
      />
          

        {/* Remember Me and Forgot Password */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#fbbe00' : undefined}
            />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#7D7D7D' }}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Link href="/forgetpassword" style={{ fontSize: 16, color: '#fba900' }}>Forgot password?</Link>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <View className="mt-10">
        <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitiing}
        />
        </View>

        {/* Sign Up Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Link href="/sign-up" style={{ fontSize: 16, color: '#fba900' }}>Sign up</Link>
          </TouchableOpacity>
        </View>

        {/* Social Media Sign In */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>or continue with</Text>
        </View> */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity>
            <Image source={images.} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/apple.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/facebook.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/twitter.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View> */}
      </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn