import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import Server from '../utils/Server';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface CameraProps {
  navigation: {};
  camProps: {};
}

const Camera: React.FC<CameraProps> = ({ camProps }) => {
  const { changeButtonsVisibilityStatus } = camProps;
  let camera: RNCamera;
  const [flashStatus, setFlashStatus] = useState(
    RNCamera.Constants.FlashMode.off,
  );
  const [cameraType, toggleCameraType] = useState(RNCamera.Constants.Type.back);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentImageData, setCurrentImageData] = useState({});
  const [pointOfInterest, setAutoFocusPointOfInterest] = useState({
    x: 0.5,
    y: 0.5,
  });
  const [location, setLocation] = useState({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  });

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      let geoOptions = {
        maximumAge: 3000,
        enableHighAccuracy: true,
      };
      Geolocation.getCurrentPosition(
        async (position: GeolocationResponse) => {
          await setLocation(position.coords);
          resolve(true);
        },
        () => {
          console.error(error);
          reject(false);
        },
        geoOptions,
      );
    });
  };

  const takePicture = async () => {
    if (camera) {
      try {
        getLocation();
        const photoOptions = {
          quality: 0.5,
          base64: false,
          pauseAfterCapture: 'true',
        };
        const data = await camera.takePictureAsync(photoOptions);
        setCurrentImageData(data);
        changeButtonsVisibilityStatus(false);
        setPreviewMode(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const savePicture: (data: TakePictureResponse) => boolean = async (
    { uri },
    description,
  ) => {
    await CameraRoll.save(uri, { album: 'MemoryLog' });
    let photo = await CameraRoll.getPhotos({
      first: 1,
      groupTypes: 'Album',
      groupName: 'MemoryLog',
    });
    let formData = createForm(photo, description);
    let url = `http://${Server.server}/photo/upload`;
    let options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      credentials: 'include',
      body: formData,
    };
    let response = await fetch(url, options);
    alertSaveSucess(response.status);

    return true;
  };

  const alertSaveSucess = async (status) => {
    if (status === 201) {
      return Alert.alert(
        'Picture upload success!',
        'Check out your storyboard!',
        { text: 'OK', onPress: () => 'OK' },
        { cancelable: false },
      );
    } else {
      return Alert.alert(
        'Picture upload failed',
        "I'm sorry😭",
        { text: 'OK', onPress: () => 'OK' },
        { cancelable: false },
      );
    }
  };

  const createForm = (photo, description) => {
    let formData = new FormData();
    formData.append('img', {
      uri: photo.edges[0].node.image.uri,
      name: `${photo.edges[0].node.timestamp}.jpg`,
      type: 'image/jpg',
      size: 2,
    });
    formData.append('location', location.longitude);
    formData.append('location', location.latitude);
    formData.append('description', description);
    return formData;
  };

  const toggleFlash = () => {
    flashStatus === RNCamera.Constants.FlashMode.off
      ? setFlashStatus(RNCamera.Constants.FlashMode.on)
      : setFlashStatus(RNCamera.Constants.FlashMode.off);
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
      onTouchEnd={({ nativeEvent }) => {
        setAutoFocusPointOfInterest({
          x: nativeEvent.pageX,
          y: nativeEvent.pageY,
        });
      }}>
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={styles.headerContainer} />
      {previewMode ? null : (
        <View style={styles.cameraContainer}>
          <RNCamera
            ref={(ref) => (camera = ref)}
            useNativeZoom={true}
            style={styles.camera}
            type={cameraType}
            flashMode={flashStatus}
            captureAudio={false}
            autoFocusPointOfInterest={pointOfInterest}
          />
        </View>
      )}
      <View style={styles.footerContainer}>
        <PhotoPreviewModal
          visibility={previewMode}
          camera={camera}
          savePicture={savePicture}
          changeButtonsVisibilityStatus={changeButtonsVisibilityStatus}
          currentImageData={currentImageData}
          handleModalVisibility={setPreviewMode}
        />
        <>
          <View style={styles.captureContainer}>
            <View onTouchEnd={toggleFlash} style={styles.flashLightButton}>
              <MaterialCommunityIcons
                name={flashStatus ? 'flash' : 'flash-off'}
                style={styles.flashStatusIcon}
                color={'white'}
              />
            </View>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={styles.capture}>
              <MaterialCommunityIcons
                name="circle-slice-8"
                color={'darkred'}
                size={80}
              />
            </TouchableOpacity>
            <View style={styles.reverseCameraButton}>
              <MaterialCommunityIcons
                name="camera-front-variant"
                style={styles.cameraFrontVariantIcon}
                onPress={() => handleToggle()}
                color={'white'}
              />
            </View>
          </View>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  headerContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  flashLightButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    shadowColor: '#ffffff',
  },
  flashStatusIcon: {
    fontSize: 30,
  },
  reverseCameraButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 30,
    shadowColor: '#ffffff',
  },
  cameraFrontVariantIcon: {
    fontSize: 30,
  },
  cameraContainer: {
    height: Dimensions.get('screen').width,
    // borderWidth: 3,
    // borderColor: '#2e2e2e',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  captureContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    margin: 10,
  },
});

export default Camera;
