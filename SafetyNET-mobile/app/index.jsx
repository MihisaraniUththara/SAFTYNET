import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from "../constants"
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary flex-1 min-h-[85vh]">
      <StatusBar backgroundColor='#FCD14C' style="dark"/>

      <ScrollView >
      
       
         <View className="w-full flex-1 justify-center items-center bg-secondary max-h-[45vh] mt-0 px-0 "style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
            <Image
              source={images.logo}
              className="w-60 h-70"
              resizeMode="contain"
            />
          </View>
          <View className="mt-20 mb-5  justify-center px-5">
            
            <Text className="text-2xl text-center text-black font-bold">Welcome to <Text className ="text-secondary">SafetyNet!</Text>{'\n'} Create your account or sign in to join us. Let's work together for a safer tomorrow!"</Text>
          </View>
          <View className="w-full px-5 mt-3">
            <CustomButton
              title="Sign Up"
              handlePress={() => router.push('sign-up')}
              containerStyles="w-full bg-secondary py-3  mb-3"
              textStyles="text-center text-lg font-bold text-white"
            />
            <CustomButton
              title="Sign In"
              handlePress={() => router.push('sign-in')}
              containerStyles="w-full bg-secondary py-3 "
              textStyles="text-center text-lg font-bold text-white"
            />
          </View>
        
      </ScrollView>
      
    </SafeAreaView>
  );
}

