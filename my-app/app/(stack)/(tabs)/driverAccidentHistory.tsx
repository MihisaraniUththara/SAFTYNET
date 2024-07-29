import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

// Define a type for the accident class
type AccidentClass = 'Fatal' | 'Grievous' | 'Non Grievous' | 'Damage Only';

// Temporary accident history data
const accidentHistory: { class: AccidentClass; date: string; division: string; station: string; arNo: string; }[] = [
  {
    class: 'Fatal',
    date: '2023-01-01',
    division: 'Division A',
    station: 'Station X',
    arNo: 'AR12345',
  },
  {
    class: 'Grievous',
    date: '2022-12-15',
    division: 'Division B',
    station: 'Station Y',
    arNo: 'AR54321',
  },
  {
    class: 'Non Grievous',
    date: '2021-11-10',
    division: 'Division C',
    station: 'Station Z',
    arNo: 'AR67890',
  },
  {
    class: 'Damage Only',
    date: '2020-10-05',
    division: 'Division D',
    station: 'Station W',
    arNo: 'AR09876',
  },
];

const circleColor: Record<AccidentClass, string> = {
  Fatal: '#ff4d4d', // Red
  Grievous: '#ffb84d', // Orange
  'Non Grievous': '#ffdb4d', // Yellow
  'Damage Only': '#66ff66', // Green
};

const AccidentHistoryCard: React.FC<{ accident: { class: AccidentClass; date: string; division: string; station: string; arNo: string; } }> = ({ accident }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.textContainer}>
        <Text style={styles.cardText}><Text style={styles.cardTextBold}>Date:</Text> {accident.date}</Text>
        <Text style={styles.cardText}><Text style={styles.cardTextBold}>Division:</Text> {accident.division}</Text>
        <Text style={styles.cardText}><Text style={styles.cardTextBold}>Station:</Text> {accident.station}</Text>
        <Text style={styles.cardText}><Text style={styles.cardTextBold}>AR No:</Text> {accident.arNo}</Text>
      </View>
      <View style={[styles.circle, { backgroundColor: circleColor[accident.class] }]}>
        <Text style={styles.circleText}>{accident.class}</Text>
      </View>
    </View>
  </View>
);

const DriverAccidentHistory: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('van');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Choose your vehicle:</Text>
        <Picker
          selectedValue={selectedVehicle}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
        >
          <Picker.Item label="Van" value="van" />
          <Picker.Item label="Bike" value="bike" />
          <Picker.Item label="Three-Wheeler" value="three-wheeler" />
        </Picker>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {accidentHistory.map((accident, index) => (
          <AccidentHistoryCard key={index} accident={accident} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: width - 20,
  },
  scrollViewContainer: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    width: width - 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  circleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardTextBold: {
    fontWeight: 'bold',
  },
});

export default DriverAccidentHistory;
