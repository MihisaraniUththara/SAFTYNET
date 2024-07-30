import Header from '@/layouts/header'
import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const Product = () => {
    const params = useLocalSearchParams()
    console.log(params)

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
        centerText='Product'
      />  */}
    </View>
  )
}

export default Product