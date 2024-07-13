import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
     className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}  ${isLoading ? 'opacity-50':''}`}
    style={[{
        backgroundColor: '#fbbe00', 
        borderRadius: 8,
        minHeight: 60,
        minWidth:250,
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoading ? 0.5 : 1
      }, containerStyles]}
    disabled={isLoading}
    >
      <Text style={[{ color: 'white', fontSize: 20, fontWeight: 'bold' }, textStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton 