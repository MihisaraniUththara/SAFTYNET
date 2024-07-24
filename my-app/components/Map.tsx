import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const tips = [
  "Always be aware of your surroundings",
  "Keep your belongings close",
  "Avoid poorly lit areas at night"
];

const weathers = [
  { condition: "Sunny", temperature: "25°C", iconName: "sun" },
  { condition: "Partly Cloudy", temperature: "22°C", iconName: "cloud-sun" },
  { condition: "Rainy", temperature: "18°C", iconName: "cloud-showers-heavy" }
];

const Map: React.FC = () => {
  const region = {
    latitude: 7.2906,
    longitude: 80.6337,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const origin = { latitude: 7.2906, longitude: 80.6337 }; // Kandy
  const destination = { latitude: 6.9497, longitude: 80.7891 }; // Nuwara Eliya

  const coordinates = [
    { latitude: 7.2906, longitude: 80.6337 },
    { latitude: 6.9497, longitude: 80.7891 },
  ];

  const [currentSafetyTip, setCurrentSafetyTip] = useState(tips[0]);
  const [currentAccidentTip, setCurrentAccidentTip] = useState("");
  const [currentWeather, setCurrentWeather] = useState(weathers[0]);
  const [cursorPosition, setCursorPosition] = useState(origin);

  const intervalRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Safety tips rotation interval
    const safetyTipInterval = setInterval(() => {
      setCurrentSafetyTip((prevTip) => {
        const nextIndex = (tips.indexOf(prevTip) + 1) % tips.length;
        return tips[nextIndex];
      });
    }, 5000);

    // Weather update interval
    const weatherInterval = setInterval(() => {
      setCurrentWeather((prevWeather) => {
        const nextIndex = (weathers.indexOf(prevWeather) + 1) % weathers.length;
        return weathers[nextIndex];
      });
    }, 15000);

    // Accident-prone area tip interval
    const accidentTipInterval = setInterval(() => {
      setCurrentAccidentTip("Accident-prone area is ahead");
      setTimeout(() => {
        setCurrentAccidentTip("");
      }, 5000);
    }, 10000);

    // Animation for cursor movement
    const animationStart = Date.now();
    const animationDuration = 120000; // Cursor animation duration in ms
    const animateCursor = () => {
      const now = Date.now();
      const elapsedTime = now - animationStart;
      const t = Math.min(elapsedTime / animationDuration, 1);

      const newLat = origin.latitude + t * (destination.latitude - origin.latitude);
      const newLon = origin.longitude + t * (destination.longitude - origin.longitude);

      setCursorPosition({ latitude: newLat, longitude: newLon });

      if (t < 1) {
        requestAnimationFrame(animateCursor);
      }
    };
    requestAnimationFrame(animateCursor);

    // Store intervals in ref to clear on unmount
    intervalRefs.current = [safetyTipInterval, accidentTipInterval, weatherInterval];

    return () => {
      intervalRefs.current.forEach(clearInterval);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={origin} title="Origin" />
          <Marker coordinate={destination} title="Destination" />
          <Polyline coordinates={coordinates} strokeColor="#000" strokeWidth={3} />
          <Marker coordinate={cursorPosition} title="Moving Cursor" />
        </MapView>
      </View>
      <View style={styles.tipContainer}>
        <SafetyTipCard tip={currentSafetyTip} />
        {currentAccidentTip !== "" && (
          <AccidentTipCard tip={currentAccidentTip} />
        )}
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{currentWeather.condition}</Text>
          <FontAwesome5
            name={currentWeather.iconName}
            size={24}
            color={
              currentWeather.condition === 'Sunny' ? '#FFD700' :
              currentWeather.condition === 'Partly Cloudy' ? 'cyan' :
              currentWeather.condition === 'Rainy' ? 'blue' :
              'black'
            }
          />
          <Text style={styles.weatherText}>{currentWeather.temperature}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SafetyTipCard: React.FC<{ tip: string }> = ({ tip }) => (
  <View style={[styles.tipCard, styles.safetyTipCard]}>
    <Text style={styles.tipCardText}>{tip}</Text>
  </View>
);

const AccidentTipCard: React.FC<{ tip: string }> = ({ tip }) => (
  <View style={[styles.tipCard, styles.accidentTipCard]}>
    <Text style={styles.tipCardText}>{tip}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tipContainer: {
    position: 'absolute',
    top: 70,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  tipCard: {
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyTipCard: {
    backgroundColor: '#66BB6A', // Green background for safety tips
  },
  accidentTipCard: {
    backgroundColor: '#EF5350',
    marginTop: 10 // Red background for accident-prone tips
  },
  tipCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Map;
