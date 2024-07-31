import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Dimensions, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { View, Text, Button, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';

// import { images } from "../../constants";
import  FormField  from "@/components/FormField";
import { CheckBox } from 'react-native-elements';
// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";

const Form = () => {

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  
  const [isChecked, setChecked] = useState(false);


  // const { setUser, setIsLogged } = useGlobalContext();

  // const [isSubmitting, setSubmitting] = useState(false);
  // const [form, setForm] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const submit = async () => {
  //   if (form.username === "" || form.email === "" || form.password === "") {
  //     Alert.alert("Error", "Please fill in all fields");
  //   }

  //   setSubmitting(true);
  //   try {
  //     const result = await createUser(form.email, form.password, form.username);
  //     setUser(result);
  //     setIsLogged(true);

  //     router.replace("/home");
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >

          <Text className="text-2xl font-semibold text-black  font-psemibold text-center">
            Road Accident Report
          </Text>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A1
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 3}} className="mr-2">

              <FormField
                title="Division"
                placeholder="Enter your division"
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="No."
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A2
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 3}} className="mr-2">

              <FormField
                title="Station"
                placeholder="Enter your station"
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="No."
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A3
          </Text>

          <View>
            <View style={{ marginTop: 0}}>
              <Text className="text-sm text-black font-bold ml-3 mt-1">Select Date</Text>
              {/* <Button title="Open Date Picker"  onPress={() => setOpen(true)} /> */}
              <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} className={`w-full bg-yellow-300 rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-2`}>
                <Text className={`text-primary font-psemibold text-sm`}>
                  Open Date Picker
                </Text>
              </TouchableOpacity>
              <Text style={{ marginTop: 5 }} className="text-sm text-black ml-3">{date.toDateString()}</Text>
              {/* <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              /> */}

            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A4
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Time of accident
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Hour"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="Minute"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A5
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Unique ID number
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Division"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="Station"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="AR no."
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="Year"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A6
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Class of accident
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Fatal"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Grievous"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Non grievous"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Darriage only"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A7
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Urban or Rural
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Urban"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Rural"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A8
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Workday / Holiday
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Normal working day"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Normal Weekend"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Public holiday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Festive day"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Election day or 1st of May"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A9
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Days of week
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Sunday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Monday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Tuesday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Wednesday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Friday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Saturday"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A10
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Road number"
                placeholder="Enter your road number"
                otherStyles="w-full"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A11
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Road / Street name"
                placeholder="Enter road / street name"
                otherStyles="w-full"
              />
            </View>

          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A12
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Nearest, lower km post number"
                placeholder="Enter the nearest, lower km post"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A13
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Distance from nearest, lower km post in metres"
                placeholder="Enter the distance in metres"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A14
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Node number"
                placeholder="Enter the node number"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A15
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Link number"
                placeholder="Enter the link number"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A16
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Distance from node in metres"
                placeholder="Enter the distance from node in metres"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A17
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="East co-ordinate"
                placeholder="Enter the east co-ordinate"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A18
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="North co-ordinate"
                placeholder="Enter the north co-ordinate"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A19
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Collision type"
                placeholder="Enter the collision type"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A20
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Any second collision occurence
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="With other vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="With pedestrian"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="With Fixed object"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not Applicable"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A21
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Road surface condition
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Dry"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Wet"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Flooded with water"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Slippery surface(mud, oil, garbage, leaves)"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A22
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Weather
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Clear"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Cloudy"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Rain"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Fog / Mist"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A23
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Light condition
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Daylight"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Night, no street lighting"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Dusk, dawn"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Night, improper street lighting"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Night, good street lighting"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A24
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Type of location
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Stretch of road, no junction within 10 metres"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="4-leg junction"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="T-junction"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Y-junction"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Roundabout"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Multiple road junction"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Entrance, by-road"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Railroad crossing"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>


          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A25
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Type of location when pedestrian/s is/are involved
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="On pedestrian crossing"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Pedestrian crossing within 50 metres"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Pedestrian crossing beyond 50 metres"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Pedestrian over-pass bridge or under pass tunnel within 50 metres"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hit outside sidewalk"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hit on sidewalk"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hit on road without sidewalk"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Other"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A26
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Traffic control
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Police"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Traffic lights"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Stop sign / marking"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Give way sign / marking"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Controlled by traffic warden"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="No control"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Other"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A27
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Posted speed limit signs
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Yes"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="No"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A28
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="(Gazetted speed limit for light vehicles) kmph"
                placeholder="Enter the speed limit (light)"
                otherStyles="w-full"
            />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A29
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="(Gazetted speed limit for heavy vehicles) kmph"
                placeholder="Enter the speed limit (heavy)"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A30
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Action taken by police
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Prosecution initiated"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="No Prosecution"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Parties settled"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Offender unknown"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A31
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="Case number"
                placeholder="Enter the case number"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A32
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

            <FormField
                title="B report"
                placeholder="Enter the b report number"
                otherStyles="w-full"
              />

            </View>
            
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A33
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Casualties
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Fatal"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
            
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Grievous"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>

              <FormField
                title="Non Grievous"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            A34
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="For research purpose"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            -------------------------------------------------------------------------
          </Text>

          <View style={{flexDirection: 'row'}}>
            
          </View>


          <Text className="text-xl font-semibold text-black  font-psemibold">
            Traffic Element
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 3}} className="mr-2 mt-5">

              <FormField
                title="Traffic Element Number"
                placeholder="Enter the traffic element number"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E1
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Element type
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Car"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Dual purpose vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Lorry"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Cycle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Motor cycle, Moped"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Three wheeler"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Articulated vehicle, prime mover"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="SLTB bus"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Private bus"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Intercity bus"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Land vehicle / Tractor"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Animal drawn vehicle or rider on animal"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Pedestrian"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>


          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E2
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Vehicle Registration number"
                placeholder="WP CAE-4387"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E3
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Vehicle year of manufacture"
                placeholder="2010"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E4
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Age of vehicle"
                placeholder="14"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E5
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Vehicle Ownership
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Private vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Private company own vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Government vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Semi Government vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Service vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Police vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E6
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Direction of movement"
                placeholder="1"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E7
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Driver / Rider / Pedestrian sex
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Male"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Female"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E8
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Driver / Rider / Pedestrian age"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E9
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Driving License number"
                placeholder="B2605560"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E10
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Validity of driving license
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Valid license for the vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Without valid license for the vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Learner permit"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Probation license"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="International license"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E11
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Year of issue of Driving license"
                placeholder="2009"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E12
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2">

              <FormField
                title="Number of years since first issue of driving license"
                placeholder="0"
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E13 / E14
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Human pre crash factors contributing to accident
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Speeding"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Aggressive / negligent driving"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Error of judgement"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Influenced by alcohol / drugs"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Fatigue / fall asleep"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Disstracted / inattentiveness (handling radio, mobile phone, mental stress, etc."
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Poor eye sight"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Sudden illness"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Blinded by anothre vehicle / sun"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Others"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E15
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Pedestrian pre crash factor contributing to accident
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Unexpected pedestrian movement"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Disobey designated crossing"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Influenced by alcohol / drugs"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Poor visibility (clothing)"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Other"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E16
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Road pre crash factor contributing to accident
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Defective road surface, slippery road, pot holes, water puddles, large cracks, high or low sewer covers etc."
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Defective, absent or badly maintained road markings or signs"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Road works without adequate traffic control devices"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Weather conditions"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Poor street lighting"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Other"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E17
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Vehicle pre crash factor defects contributing to accident
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Brakes"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Tyres, wheels"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Steering"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Poor mechanical condition"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Overloaded or wrongly loaded vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Other"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E18
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Crash factor defects contributing to accident severity
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Hitting tree"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hitting pole / post"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hitting stone or boulder"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hitting road island, curb, etc."
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hitting barrier or guard rail"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hitting other fixed object"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Rolled over"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E19
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Other factors
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Avoiding maneuver"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Hit and run"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Road works"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Post crash violence"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Stolen vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E20
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Alcohol test
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="No alcohol or below legal limit"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Over legal limit"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not tested"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            E21
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Driver / Rider / Pedestrian at fault
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Yes"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="No"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            ----------------------------------------------------------------------------
          </Text>

          <Text className="text-xl font-semibold text-black  font-psemibold">
            Casuality Details
          </Text>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C1
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Traffic element number
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="If a driver or passenger casualty indicate the vehicle's element number in which the casuality travelled"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2  mt-2">

              <FormField
                title="If a pedestrian casualty indicate the element number for the pedestrian"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>


          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C2
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Severity according to penal code
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Fatal"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Grievous"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Non grievous"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C3
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Category
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Driver / Rider"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Pedestrian"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Passenger / pillion rider"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Passenger / pillion rider falling off vehicle"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Passenger entering or leaving bus"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C4
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Sex
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Male"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Female"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C5
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Age"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C6
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Protection
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Safety belt, worn"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Safety belt, not worn"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Helmet, worn"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Child restrain seat used"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Not known / NA"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            C7
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold">
            Hospitalized
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Injured and admitted to hospital at least 1 day"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <CheckBox
              title="Injured but not admitted to hospital or admitted less than 1 day"
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
          </View>

          <Text className="text-sm font-semibold text-green-600 mt-5 font-psemibold">
            --------------------------------------------------------------------
          </Text>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold mt-10">
            Collision Sketch
          </Text>

          <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} className={`w-full bg-yellow-300 rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-10`}>
              <Text className={`text-primary font-psemibold text-sm`}>
                  Upload Image
              </Text>
          </TouchableOpacity>

          <Text className="text-base font-semibold text-black ml-3 font-psemibold mt-10">
            Accident & additional information
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Description"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-base font-semibold text-black font-psemibold mt-10">
            The report has been prepared by the investigation Officer.
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Name"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-base font-semibold text-black  font-psemibold mt-10">
            This Report is certified to be correct by OIC (traffic).
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Name"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-base font-semibold text-black font-psemibold mt-10">
            Entering and Coding checked by coding clerk
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Name"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <Text className="text-base font-semibold text-black font-psemibold mt-10">
            Entering and Coding checked by OIC (Statistices Division)
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1}} className="mr-2 mt-2">

              <FormField
                title="Name"
                placeholder=""
                otherStyles="mt-0"
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} className={`w-full bg-green-300 rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-10 mb-10`}>
              <Text className={`text-primary font-psemibold text-sm`}>
                  Submit
              </Text>
          </TouchableOpacity>


          {/* <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  checkboxContainer: {
    marginTop: 0,
  },
});

export default Form