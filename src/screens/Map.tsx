import React, {useState, useCallback} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface ILocation {
  latitude: number;
  longitude: number;
}

interface PhotoDataElement {
  latitude: string;
  longitude: string;
  filepath: string;
}

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [photoData, setPhotoData] = useState([]);
  const [autoLocationStatus, setAutoLocationStatus] = useState(null);
  const [calloutReverse, setCallOutReverse] = useState(false);
  const [location, setLocation] = useState<ILocation>({
    latitude: 37.5326,
    longitude: 127.024612,
  });

  useFocusEffect(
    useCallback(
      () => async () => {
        await fetch('http://localhost:4000/photo/sboard', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('aaaa', res);
            setPhotoData(res);
          });
      },
      [],
    ),
  );

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(location);
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {timeout: 3000},
    );
  };

  const handleCalloutPress = (coords) => {
    setCallOutReverse(!calloutReverse);
    setRegion({...coords});
  };

  const turnOnAutoLocation = () => {
    if (autoLocationStatus) {
      clearInterval(autoLocationStatus);
      setAutoLocationStatus(null);
    } else {
      let timer = setInterval(() => {
        getCurrentLocation();
      }, 1000);
      setAutoLocationStatus(timer);
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        mapType="mutedStandard"
        showsCompass={true}
        compassOffset={{x: -10, y: 0}}
        style={{flex: 1}}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}>
        <Marker
          pinColor="blue"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          description={'here is your location'}
          // image={{uri: 'https://i.ibb.co/nnV730F/maxresdefault.png'}}
        />
        {photoData.map((el: PhotoDataElement, i) => {
          return (
            // Math.random 제거해야됨
            <Marker
              key={i}
              coordinate={{
                latitude: Number(el.latitude) + Math.random() * 10,
                longitude: Number(el.longitude) + Math.random() * 10,
              }}
              description={'map'}>
              <Callout
                onPress={() =>
                  handleCalloutPress({
                    latitude: Number(el.latitude) + Math.random() * 10,
                    longitude: Number(el.longitude) + Math.random() * 10,
                  })
                }
                tooltip={false}
                style={styles.markerCallout}>
                {calloutReverse ? (
                  <>
                    <Text>{el.description}</Text>
                    <Text>{el.createdAt}</Text>
                  </>
                ) : (
                  <Image
                    style={styles.calloutImage}
                    source={{uri: el.filepath}}
                  />
                )}
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.autoLocationIconContainer}>
        <MaterialCommunityIcons
          onPress={turnOnAutoLocation}
          name="navigation"
          style={
            autoLocationStatus
              ? styles.autoLocationIconOn
              : styles.autoLocationIconOff
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  autoLocationIconContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
    bottom: 20,
    right: 20,
  },
  markerCallout: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutImage: {
    width: 140,
    height: 140,
  },
  autoLocationIconOn: {
    color: 'red',
    fontSize: 20,
  },
  autoLocationIconOff: {
    color: 'white',
    fontSize: 20,
  },
});

export default Map;
