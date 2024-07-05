import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Back Arrow */}
        {/* <TouchableOpacity style={{ marginTop: 20 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}

        {/* Title and Subtitle */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Welcome back 👋</Text>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>Please enter your email & password to sign in.</Text>
        </View>

        {/* Input Fields */}
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D', marginBottom: 5 }}>Email</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
            <TextInput
              placeholder="Email"
              style={{ flex: 1, fontSize: 16, paddingVertical: 5 }}
            />
            <Ionicons name="mail-outline" size={20} color="#7D7D7D" />
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
            <Text style={{ fontSize: 16, color: '#fba900' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={{ backgroundColor: '#fbbe00', paddingVertical: 15, borderRadius: 8, marginTop: 80, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#7D7D7D' }}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#fba900' }}>Sign up</Text>
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
    </SafeAreaView>
  );
}
