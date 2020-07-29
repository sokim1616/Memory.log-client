import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface PhotoPreviewModalProps {
  handleModalVisibility: (ans: boolean) => void;
  currentImageData: string;
  changeButtonsVisibilityStatus: (
    ans: boolean,
  ) => {buttonsVisibilityStatus: true};
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  handleModalVisibility,
  currentImageData,
  changeButtonsVisibilityStatus,
  savePicture,
}) => {
  const [editModeStatus, setEditModeStatus] = useState(false);
  const [photoDescription, setPhotoDescription] = useState(
    "What's on your mind? ",
  );
  const {uri} = currentImageData;
  const memoField: Ref = React.createRef();

  const modalButtonTouchHandler = async (val) => {
    let ans = '';
    if (val === 'save') {
      ans = savePicture(currentImageData, photoDescription);
    }
    let wait = ans === 'OK' ? 0 : 1500;
    setTimeout(() => {
      changeButtonsVisibilityStatus(true);
      handleModalVisibility(false);
    }, wait);
  };

  const handleKeyboardIconPress = () => {
    if (editModeStatus) {
      memoField.current.blur();
      setEditModeStatus(false);
    } else {
      memoField.current.focus();
      setEditModeStatus(true);
    }
  };

  return (
    <Modal isVisible={true} style={styles.modalContainer}>
      <View style={styles.blurBackground}>
        <Image
          style={styles.backgroundImage}
          resizeMethod="auto"
          resizeMode="cover"
          source={{uri}}
        />
      </View>
      <View
        style={
          editModeStatus ? styles.imageContainerEditMode : styles.imageContainer
        }>
        <Image
          resizeMode="contain"
          resizeMethod="auto"
          style={styles.currentImage}
          source={{uri}}
        />
      </View>
      <View
        style={
          editModeStatus ? styles.noteContainerEditMode : styles.noteContainer
        }>
        <View style={styles.noteLeftSide}>
          <MaterialCommunityIcons
            onPress={handleKeyboardIconPress}
            name={editModeStatus ? 'keyboard-off-outline' : 'keyboard-outline'}
            color={'blue'}
            size={35}
            style={{alignSelf: 'center'}}
          />
        </View>
        <TextInput
          placeholder="What's on your mind?"
          ref={memoField}
          multiline={true}
          style={
            editModeStatus ? styles.noteRightSideEditMode : styles.noteRightSide
          }
          onTouchEnd={() => setEditModeStatus(true)}
          onChangeText={(text) => setPhotoDescription(text)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View
          style={styles.cancelButton}
          onTouchEnd={() => modalButtonTouchHandler(null)}>
          <Text>Cancel</Text>
        </View>
        <View
          style={styles.saveButton}
          onTouchEnd={() => modalButtonTouchHandler('save')}>
          <Text>Save</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.6,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  backgroundImage: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 60,
    width: Dimensions.get('screen').width * 0.6,
    margin: 30,
  },
  imageContainerEditMode: {
    flex: 0.3,
    paddingTop: 60,
    width: Dimensions.get('screen').width * 0.6 * 0.4,
    margin: 30,
  },
  currentImage: {
    flex: 1,
    opacity: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  noteContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    // borderWidth: 3,
    width: Dimensions.get('screen').width * 0.9,
  },
  noteContainerEditMode: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    // borderWidth: 3,
    width: Dimensions.get('screen').width * 0.95,
    marginBottom: 20,
  },
  noteLeftSide: {
    flex: 0.2,
    backgroundColor: 'lightyellow',
    borderRightColor: 'red',
    borderRightWidth: 3,
  },
  noteRightSide: {
    flex: 0.8,
    backgroundColor: 'lightyellow',
    flexDirection: 'column',
    // borderWidth: 3,
    // borderColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
  },
  noteRightSideEditMode: {
    flex: 0.8,
    backgroundColor: 'lightyellow',
    flexDirection: 'column',
    // borderWidth: 3,
    // borderColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: Dimensions.get('screen').width,
  },
  saveButton: {
    marginTop: 80,
    flex: 0.3,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  cancelButton: {
    marginTop: 80,
    flex: 0.3,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default PhotoPreviewModal;
