import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();
import Geolocation, { PositionError } from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps'

//TODO: <Stack.Navigator> 만들기
const Map: React.FC<{}> = () => {
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  });
  const [authState, setAuth] = useState('denied');
  const getUserLocation = async () => {
    console.log(authState);
    if (authState !== 'granted') {
      let auth = await Geolocation.requestAuthorization('whenInUse');
      setAuth(auth);
    }
    if (authState !== 'granted') return;
    if (authState === 'granted') {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLocation(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };
  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      showsUserLocation={true}>

      <View style={styles.buttonView}>
        <MaterialCommunityIcons
          onPress={getUserLocation}
          name="home"
          color={'white'}
          size={26}
        />
      </View>
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }}
        //Todo: here go
        // * 1. 마커에 사진띄우기, 2. 마커별로 map구현
        description={"here your location"}
      // image={{uri:'https://i.ibb.co/nnV730F/maxresdefault.png'}}
      >
      </Marker>
    </MapView>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 30,
    right: 10,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;
