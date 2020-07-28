import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {StatusBar} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
MaterialCommunityIcons.loadFont();

interface CameraProps {
  navigation: {};
}

const Camera: React.FC<CameraProps> = ({navigation, camProps}) => {
  const {changeButtonsVisibilityStatus} = camProps;
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

  const getLocation = () => {
    let geoOptions = {
      maximumAge: 3000,
      enableHighAccuracy: true,
    };
    Geolocation.getCurrentPosition(
      async (position: GeolocationResponse) => {
        await setLocation(position.coords);
      },
      () => console.error(error),
      geoOptions,
    );
    console.log(location);
  };

  const takePicture = async () => {
    if (camera) {
      try {
        getLocation();
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
        console.log(data);
        setCurrentImageData(data);
        changeButtonsVisibilityStatus(false);
        setPreviewMode(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const savePicture: (data: TakePictureResponse) => void = async ({
    uri,
    height,
    width,
  }) => {
    let saved = await CameraRoll.save(uri, {album: 'MemoryLog'});
    console.log('saved: ', saved);
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
      onTouchEnd={({nativeEvent}) => {
        setAutoFocusPointOfInterest({
          x: nativeEvent.pageX,
          y: nativeEvent.pageY,
        });
      }}>
      <View style={styles.headerContainer}>
        <StatusBar barStyle="light-content" />
      </View>
      {previewMode ? null : (
        <View style={styles.cameraContainer}>
          <RNCamera
            // onTap={() => camera.resumePreview()}
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
        {previewMode ? (
          <PhotoPreviewModal
            camera={camera}
            savePicture={savePicture}
            changeButtonsVisibilityStatus={changeButtonsVisibilityStatus}
            currentImageData={currentImageData}
            handleModalVisibility={setPreviewMode}
          />
        ) : (
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
        )}
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
  },
  flashStatusIcon: {
    fontSize: 30,
  },
  reverseCameraButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 30,
  },
  cameraFrontVariantIcon: {
    fontSize: 30,
  },
  cameraContainer: {
    height: Dimensions.get('screen').width,
    borderWidth: 3,
    borderColor: '#2e2e2e',
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
