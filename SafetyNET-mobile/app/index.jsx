import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from "../constants"
import CustomButton from '../constants/components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary flex-1 min-h-[85vh]">
      <StatusBar backgroundColor='#fbbe00' style="dark"/>

      <ScrollView >
      
        <View className="w-full flex-1 justify-center items-center bg-white min-h-[85vh] mt-0">
         <View className="w-full flex-1 justify-center items-center bg-secondary max-h-[45vh] mt-0 px-0 rounded-[30px]">
            <Image
              source={images.logo}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </View>
          <View className="mt-10 mb-5">
            
            <Text className="text-base text-center text-black">Welcome! Let's create your account or sign in if you already have an account</Text>
          </View>
          <View className="w-full px-5 mt-3">
            <CustomButton
              title="Sign Up"
              handlePress={() => router.push('sign-up')}
              containerStyles="w-full bg-secondary py-3 rounded-full mb-3"
              textStyles="text-center text-lg font-bold text-white"
            />
            <CustomButton
              title="Sign In"
              handlePress={() => router.push('sign-in')}
              containerStyles="w-full bg-secondary py-3 rounded-full"
              textStyles="text-center text-lg font-bold text-white"
            />
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

