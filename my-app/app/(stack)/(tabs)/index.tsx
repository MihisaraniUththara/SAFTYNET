import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Header from '@/layouts/header';
import { Ionicons } from '@expo/vector-icons';
import Nav from '@/layouts/nav';
import useDrawer from '@/context/context-hooks/useDrawer';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import Map from '@/components/Map';

const Index = () => {
  const { drawer } = useDrawer();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={[
            styles.contentContainer,
            {
              minHeight: Dimensions.get('window').height - 100,
            },
          ]}
        >
          <Image
            source={require('@/assets/images/driver.png')}
            resizeMode="contain"
            style={styles.image}
          />

          {/* <Text style={styles.heading}>
            Start your journey
          </Text> */}

          <FormField
            title="Start Location"
            // value={form.username}
            // handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Destination"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
          />

          <TouchableOpacity onPress={() => <Map/>} activeOpacity={0.7} className={'w-full bg-yellow-300 rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-2'}>
                <Text className={'text-primary font-psemibold text-sm'}>
                  Start
                </Text>
          </TouchableOpacity>

          {/* Uncomment below to add login link
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              style={styles.loginLink}
            >
              Login
            </Link>
          </View>
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'primary', // adjust with your primary color
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    width: 150, // adjust as per your image size
    height: 150, // adjust as per your image size
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    fontFamily: 'psemibold',
  },
  startButton: {
    width: '100%',
    backgroundColor: 'yellow-300', // adjust with your color theme
    borderRadius: 20,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'primary', // adjust with your color theme
    fontFamily: 'psemibold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  loginText: {
    fontSize: 18,
    color: 'gray-100', // adjust with your color theme
    fontFamily: 'pregular',
  },
  loginLink: {
    fontSize: 18,
    color: 'secondary', // adjust with your color theme
    fontFamily: 'psemibold',
    marginLeft: 5,
  },
});

export default Index;
