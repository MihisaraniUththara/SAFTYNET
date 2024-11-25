import { Modal, Button } from '@mui/material';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import { useState } from 'react';

interface MapScreenProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
  onClose: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ onLocationSelect, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSave = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.latitude, selectedLocation.longitude);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          onPress={handleMapPress}
        />
        <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: 10 }}>
          Save Location
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary" style={{ marginTop: 10 }}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

export default MapScreen;
