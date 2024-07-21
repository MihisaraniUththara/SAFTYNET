import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Button } from 'react-native';


const accidents = [
  { id: '1', time: '08:45 AM', location: 'Main St & 2nd Ave', severity: 'High', status: 'New' },
  { id: '2', time: '09:10 AM', location: 'Elm St & 4th Ave', severity: 'Medium', status: 'In-progress' },
  // ...more accidents
];

const AccidentItem = ({ accident, onPress }) => (
  <TouchableOpacity onPress={() => onPress(accident)} style={tw`p-4 border-b border-gray-200`}>
    <Text style={`text-lg font-semibold`}>{accident.location}</Text>
    <Text style={`text-sm text-gray-600`}>Time: {accident.time}</Text>
    <Text style={`text-sm text-gray-600`}>Severity: {accident.severity}</Text>
    <Text style={`text-sm text-gray-600`}>Status: {accident.status}</Text>
  </TouchableOpacity>
);

const AccidentsPage = () => {
  const handleAccidentPress = (accident) => {
    // Navigate to detailed view or handle the press
  };

  return (
    <View style={`flex-1 bg-gray-100`}>
      <View style={`p-4 bg-blue-500`}>
        <Text style={`text-xl text-white font-bold`}>SafetyNet</Text>
      </View>
      <ScrollView style={`flex-1`}>
        <FlatList
          data={accidents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AccidentItem accident={item} onPress={handleAccidentPress} />
          )}
        />
      </ScrollView>
      <View style={`p-4 bg-white`}>
        <Button title="Accept All Alerts" onPress={() => { /* Accept all alerts */ }} />
        <Button title="View All Reports" onPress={() => { /* Navigate to reports */ }} />
      </View>
    </View>
  );
};

export default AccidentsPage;
