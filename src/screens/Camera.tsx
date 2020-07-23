import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {StatusBar} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface CameraProps {
  navigation: {};
}

const Camera: React.FC<CameraProps> = ({navigation}) => {
  let camera: RNCamera;
  const [pointOfInterest, setAutoFocusPointOfInterest] = useState({
    x: 0.5,
    y: 0.5,
  });
  const [cameraType, toggleCameraType] = useState(RNCamera.Constants.Type.back);
  const [location, setLocation] = useState({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  });

  const takePicture = async () => {
    if (camera) {
      try {
        let geoOptions = {
          maximumAge: 3000,
          enableHighAccuracy: true,
        };
        Geolocation.getCurrentPosition(
          async (position) => {
            await setLocation(position.coords);
          },
          () => console.error(error),
          geoOptions,
        );
        console.log(location);
        const photoOptions = {
          quality: 1,
          base64: true,
          location,
          writeExif: {
            GPSLatitude: location.latitude,
            GPSLongitude: location.longitude,
            GPSAltitude: location.altitude,
          },
          exif: true,
          pauseAfterCapture: 'true',
        };
        const data = await camera.takePictureAsync(photoOptions);
        console.log(Object.keys(data));
        CameraRoll.save(data.uri, {album: 'MemoryLog'}).then(() =>
          console.log('complete'),
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleToggle = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      toggleCameraType(RNCamera.Constants.Type.front);
    } else {
      toggleCameraType(RNCamera.Constants.Type.back);
    }
  };

  return (
    <View
      style={styles.container}
      onTouchEnd={({nativeEvent}) => {
        setAutoFocusPointOfInterest({
          x: nativeEvent.pageX,
          y: nativeEvent.pageY,
        });
      }}>
      <StatusBar barStyle="light-content" />
      <RNCamera
        onTap={() => camera.resumePreview()}
        ref={(ref) => {
          camera = ref;
        }}
        useNativeZoom={true}
        style={styles.camera}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        autoFocusPointOfInterest={pointOfInterest}>
        <View style={styles.reverseCameraButton}>
          <MaterialCommunityIcons
            name="camera-front-variant"
            style={{fontSize: 40}}
            title="Reverse"
            onPress={() => handleToggle()}
          />
        </View>
        <View style={styles.catpureContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeTwo')}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> Home2 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <MaterialCommunityIcons
              name="circle-slice-8"
              color={'darkred'}
              size={80}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeThree')}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> Home3 </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  catpureContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  capture: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    margin: 10,
  },
  reverseCameraButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});

export default Camera;
