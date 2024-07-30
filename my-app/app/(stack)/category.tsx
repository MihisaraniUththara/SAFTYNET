import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/layouts/header'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const Category = () => {
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
        centerText='Category'
      />  */}
    </View>
  )
}

export default Category