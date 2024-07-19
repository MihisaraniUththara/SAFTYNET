import { DrawerContext } from "@/context/context-hooks/drawer";
import useDrawer from "@/context/context-hooks/useDrawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { DrawerLayoutAndroid, Image, Text, TouchableOpacity, View } from "react-native";

const Nav = ({drawer}:{drawer?: React.RefObject<DrawerLayoutAndroid>}) => <View className='w-full flex-1 bg-gray-900'>
    {/* user profile */}
    <View className="w-full items-center justify-center h-[220px]">
        <Image source={{
            uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',

        }} className="w-[100px] h-[100px] rounded-full"/>
    </View>

    {/* menu */}
    <View>
        <MenuItem drawer={drawer} name={"home-outline"} title="Home" navigate="/"/>
        <MenuItem drawer={drawer} name={"logo-dropbox"} title="Product" navigate="/product"/>
        <MenuItem drawer={drawer} name={"grid-outline"} title="Category" navigate="/category"/>
        <MenuItem drawer={drawer} name={"person-outline"} title="Profile" navigate="/profile"/>
    </View>
</View>

export default Nav

interface IMenuItem {
    name: "home-outline" | "logo-dropbox" | "grid-outline" | "person-outline",
    title: string,
    navigate: string
    drawer?: React.RefObject<DrawerLayoutAndroid>;
}

const MenuItem = ({name, title, navigate, drawer} : IMenuItem) => {

    // const {drawer} = useDrawer()

    // const {drawer} = useContext(DrawerContext)

    return(
    <TouchableOpacity 
        onPress={() => {
            // drawer?.current?.closeDrawer()
            router.navigate(navigate)
        }
        } className="w-full py-2 pr-2 border-b border-gray-50/25 flex-row items-center justify-between">
        <View className="flex-row items-center pl-4">
            <Ionicons name={name} size={27} color="white" />
            <Text className="ml-4 text-gray-50">{title}</Text>
        </View>
        <Ionicons name="arrow-forward-outline" size={24} color="white" />
    </TouchableOpacity>
    )
}


/* Types of Navigation
------------------------
1. Stack Navigate
2. Tab / Bottom-Tab Navigate
3. Drawer Navigate

Navigations are applied in the layout.
 */