import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/layouts/header'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Profile = () => {
  return (
    <View className='w-full flex-1'>
      {/* <Header 
        Left={
            <Link href={'/'} asChild>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={27} color="black" />
                </TouchableOpacity>
            </Link>
        } 
        centerText='Profile'
      />  */}
    </View>
  )
}

export default Profile