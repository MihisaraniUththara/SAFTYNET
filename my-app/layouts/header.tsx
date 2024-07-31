import { View, Text } from 'react-native'

interface IHeader {
    Left?:React.ReactNode;
    centerText?:string;
    Center?:React.ReactNode;
    Right?:React.ReactNode;
}

const Header = ({Left, centerText, Center, Right}: IHeader) => {
  return (
    <View style={{elevation: 5}} className='w-full h-[70px] flex-row bg-gray-300 items-end justify-between pb-3 px-5'>
        {Left ? Left : <View/>}
        {Center ? Center : centerText? <Text className='text-2xl font-semibold'>{centerText}</Text> : <View/>}
        {Right ? Right : <View/>}
    </View>
  )
}

export default Header