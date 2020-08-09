import React, { useState, useCallback } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
메;
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
  const [mapType, setMapType] = useState('mutedStandard');
  const [photoData, setPhotoData] = useState([]);
  const [photoLength, setPhotoLength] = useState(0);
  const [autoLocationStatus, setAutoLocationStatus] = useState(null);
  const [calloutReverse, setCallOutReverse] = useState(false);
  const [location, setLocation] = useState<ILocation>({
    latitude: 37.5326,
    longitude: 127.024612,
  });

  const fetchPhotos = async () => {
    await fetch('http://localhost:4000/photo/sboard', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setPhotoData(res);
        setPhotoLength(res.length);
      });
  };

  const changeMapType = () => {
    mapType === 'mutedStandard'
      ? setMapType('satellite')
      : setMapType('mutedStandard');
  };

  const trimDate = (str: string) => str.substr(0, str.indexOf('T'));

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [photoLength]),
  );

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { timeout: 3000 },
    );
  };

  const handleCalloutPress = () => {
    setCallOutReverse(!calloutReverse);
  };

  const turnOnAutoLocation = async () => {
    await getCurrentLocation();
    if (autoLocationStatus) {
      clearInterval(autoLocationStatus);
      setAutoLocationStatus(null);
    } else {
      let timer = setInterval(() => {
        getCurrentLocation();
      }, 1000);
      setAutoLocationStatus(timer);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        showsScale={true}
        showsBuildings={true}
        mapType={mapType}
        showsCompass={true}
        compassOffset={{ x: -10, y: 0 }}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={autoLocationStatus ? region : undefined}>
        <FocusAwareStatusBar
          barStyle={
            mapType === 'mutedStandard' ? 'dark-content' : 'light-content'
          }
        />
        <Marker
          pinColor="blue"
          style={{ zIndex: 999 }}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
        {photoData.map((el: PhotoDataElement, i) => {
          const { latitude, longitude, createdAt, description, filepath } = el;
          let lat = Number(latitude);
          let long = Number(longitude);
          return (
            <Marker
              onSelect={() =>
                setRegion({
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                })
              }
              key={i}
              coordinate={{
                latitude: lat,
                longitude: long,
              }}
              description={'map'}>
              <Callout
                onPress={() => handleCalloutPress()}
                tooltip={true}
                style={
                  calloutReverse
                    ? styles.markerCalloutReverse
                    : styles.markerCallout
                }>
                {calloutReverse ? (
                  <>
                    <Text style={styles.dateText}>{`${trimDate(
                      createdAt,
                    )}`}</Text>
                    <TextInput
                      editable={false}
                      multiline={true}
                      style={styles.descriptionTextView}>
                      <Text style={styles.descriptionText}>{description}</Text>
                    </TextInput>
                  </>
                ) : (
                  <Image
                    style={styles.calloutImage}
                    source={{ uri: filepath }}
                  />
                )}
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.changeMapTypeButtonContainer}>
        <MaterialCommunityIcons
          onPress={changeMapType}
          name={mapType === 'mutedStandard' ? 'satellite-variant' : 'map'}
          style={styles.changeMapTypeIcon}
        />
      </View>
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
  markerCallout: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  calloutImage: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').height * 0.3,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  markerCalloutReverse: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').height * 0.3,
    borderRadius: 10,
    backgroundColor: '#4EA1D3',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  dateText: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  descriptionTextView: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.6,
    borderTopColor: 'black',
    borderTopWidth: 2,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  descriptionText: {
    margin: 10,
    fontSize: 20,
    color: 'black',
  },
  changeMapTypeButtonContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
    bottom: 20,
    right: 80,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  changeMapTypeIcon: {
    color: 'white',
    fontSize: 20,
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  autoLocationIconOn: {
    color: 'red',
    fontSize: 20,
  },
  autoLocationIconOff: {
    color: 'white',
    fontSize: 20,
  },
  userMarker: {
    fontSize: 50,
    color: '#3355FF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  locationMarker: {
    fontSize: 50,
    color: 'red',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default Map;
