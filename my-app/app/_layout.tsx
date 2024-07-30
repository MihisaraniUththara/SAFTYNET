import { Link, Slot, useNavigation } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer'
import Nav from '@/layouts/nav'


const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
      drawerContent={() => <Nav/>} 
      screenOptions= {{
        headerShown:false, 
        drawerStyle:{
        backgroundColor: 'green',
        width: '70%'
      }}}>
        {/* <Drawer.Screen 
          name='index'
          options={{
            headerShown: true,
            title: 'Home',
            headerLeft: () => <DrawerHeaderIcon/>,
            headerTitleAlign: 'center',
          }}
        /> */}
        <Drawer.Screen name='stack'/>
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default RootLayout

const DrawerHeaderIcon = () => {

  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  
  return (
    <TouchableOpacity onPress={() => {navigation.openDrawer()}} className='ml-4'>
        <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  )
}

const DrawerContent = (p: DrawerContentComponentProps) => {
  // console.log(p)
  return( 
    <View className='w-full flex-1' >
      <Link className='mt-12 text-gray-50' href={'/stack/category'}>Category</Link>
    </View>
  )
}