import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Back Arrow */}
        {/* <TouchableOpacity style={{ marginTop: 20 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}

        {/* Progress Bar */}
        <View style={{ marginTop: 5, alignItems: 'center' }}>
          <View style={{ width: '80%', height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 }}>
            <View style={{ width: '25%', height: '100%', backgroundColor: '#fbbe00', borderRadius: 4 }} />
          </View>
        </View>

        {/* Title and Subtitle */}
        <View style={{ marginTop: 15}}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hello there 👋</Text>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>Please enter your details to create an account.</Text>
        </View>

        {/* Input Fields */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D', marginBottom: 5 }}>Full Name</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 20 }}>
            <TextInput
              placeholder="Full Name"
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
          </View>

          <Text style={{ fontSize: 16, color: '#7D7D7D', marginBottom: 5 }}>Email</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 ,marginBottom: 20}}>
            <TextInput
              placeholder="Email"
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
            <Ionicons name="mail-outline" size={20} color="#7D7D7D" />
          </View>

          <Text style={{ fontSize: 16, color: '#7D7D7D', marginBottom: 5 }}>National ID Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5,marginBottom: 20 }}>
            <TextInput
              placeholder="National Id Number"
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
          </View>

          <Text style={{ fontSize: 16, color: '#7D7D7D', marginBottom: 5 }}>Driver License Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
            <TextInput
              placeholder="Driver License Number"
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
          </View>

          <Text style={{ fontSize: 16, color: '#7D7D7D', marginTop: 20, marginBottom: 5 }}>Phone Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
            <TextInput
              placeholder="Phone Number"
              secureTextEntry
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
            <Ionicons name="call-outline" size={20} color="#7D7D7D" />
          </View>
          <Text style={{ fontSize: 16, color: '#7D7D7D', marginTop: 20, marginBottom: 5 }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
            <Ionicons name="eye-off-outline" size={20} color="#7D7D7D" />
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#fbbe00' : undefined}
          />
          <Text style={{ marginLeft: 8, fontSize: 16, color: '#7D7D7D' }}>I agree to SafetyNET <Text style={{ color: '#fba900' }}>Terms, & Privacy Policy.</Text></Text>
        </View>

        {/* Sign In Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#fba900' }}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Sign In */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>or continue with</Text>
        </View> */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity>
            <Image source={require('../assets/google.png')} style={{ width: 50, height: 50 }} />
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

        {/* Sign Up Button */}
        <TouchableOpacity style={{ backgroundColor: '#fbbe00', paddingVertical: 15, borderRadius: 8, marginTop: 30, marginBottom:40, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
