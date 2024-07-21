import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
 iconName,
  iconSize = 20,
  iconColor = "#7D7D7D",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 px-4 ${otherStyles}`}>
      <Text className="text-base text-[#7D7D7D] font-pmedium">{title}</Text>

      <View className="w-full h-16 px-10  rounded-2xl border-2 border-[#E5E5E5] focus:border-secondary flex flex-row items-center">
      
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B "
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
{iconName && <Ionicons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 2 }} />}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;