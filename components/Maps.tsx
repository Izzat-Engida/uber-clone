import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const Maps = () => {
  const region = {
    latitude: 9.03,
    longitude: 38.74,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        mapType="standard"
        showsUserLocation={true} 
      />
    </View>
  );
};

export default Maps;