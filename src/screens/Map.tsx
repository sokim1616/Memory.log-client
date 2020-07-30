import React, {useState, useCallback} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {changeCameraScreenStatus} from 'src/actions';
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
        console.log('aaaa', res);
        setPhotoData(res);
        setPhotoLength(res.length);
      });
  };

  const changeMapType = () => {
    mapType === 'mutedStandard'
      ? setMapType('satellite')
      : setMapType('mutedStandard');
  };

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [photoLength]),
  );

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(location);
        const {latitude, longitude} = position.coords;
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
      {timeout: 3000},
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
      <StatusBar barStyle="dark-content" />
      <MapView
        showsScale={true}
        showsBuildings={true}
        mapType={mapType}
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
          const {latitude, longitude, createdAt, description, filepath} = el;
          return (
            // Math.random 제거해야됨
            <Marker
              onSelect={() =>
                setRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                })
              }
              key={i}
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude),
              }}
              description={'map'}>
              <Callout
                onPress={() =>
                  handleCalloutPress({
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                  })
                }
                tooltip={false}
                style={styles.markerCallout}>
                {calloutReverse ? (
                  <>
                    <Text>{description}</Text>
                    <Text>{createdAt}</Text>
                  </>
                ) : (
                  <Image style={styles.calloutImage} source={{uri: filepath}} />
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
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutImage: {
    width: 140,
    height: 140,
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
