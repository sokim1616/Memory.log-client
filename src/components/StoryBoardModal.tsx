import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface StoryBoardModalProps {
  currentPhoto: {};
  previewMode: boolean;
  setPreviewMode: () => void;
}

const StoryBoardwModal: React.FC<StoryBoardModalProps> = ({
  currentPhoto,
  previewMode,
  setPreviewMode,
}) => {
  return (
    <Modal
      animationIn="slideInDown"
      animationInTiming={500}
      animationOut="slideOutUp"
      animationOutTiming={500}
      isVisible={previewMode}
      style={styles.modalContainer}>
      <View style={styles.blurBackground} />
      <Text style={styles.headerText}>Memory.log</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.goBackButtonContainer}>
          <MaterialCommunityIcons
            onPress={() => setPreviewMode(false)}
            name={'arrow-left-circle-outline'}
            style={styles.goBackButton}
          />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          resizeMethod="auto"
          style={styles.currentImage}
          source={{uri: currentPhoto.filepath}}
        />
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.noteLeftSide} />
        <TextInput
          editable={false}
          defaultValue={currentPhoto.description}
          multiline={true}
          style={styles.noteRightSide}
        />
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
  headerText: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    top: 40,
    fontFamily: 'Lobster-Regular',
  },
  blurBackground: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  imageContainer: {
    flex: 1,
    marginTop: 100,
    margin: 30,
    width: Dimensions.get('screen').width * 0.8,
  },
  goBackButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 1,
    color: 'white',
    zIndex: 1,
    backgroundColor: 'white',

    borderRadius: 40,
  },
  goBackButton: {
    color: 'black',
    fontSize: 30,
  },
  currentImage: {
    flex: 1,
    opacity: 1,
    shadowColor: '#eeeeee',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  noteContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 40,
    marginBottom: 80,
  },
  noteLeftSide: {
    flex: 0.2,
    backgroundColor: 'lightyellow',
    borderRightColor: 'red',
    borderRightWidth: 3,
    borderTopLeftRadius: 15,
    shadowColor: 'darkred',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  noteRightSide: {
    flex: 0.8,
    backgroundColor: 'lightyellow',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
    // fontFamily: 'Lobster-Regular',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'darkred',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  noteRightSideEditMode: {
    flex: 0.8,
    backgroundColor: 'lightyellow',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
    // fontFamily: 'Lobster-Regular',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'darkred',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  buttonsContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: Dimensions.get('screen').width,
  },
  saveButton: {
    marginTop: 80,
    flex: 0.25,
    height: 40,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    shadowColor: '#222222',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  cancelButton: {
    marginTop: 80,
    flex: 0.25,
    height: 40,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'lightcoral',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightcoral',
    shadowColor: '#222222',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  buttonText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
  },
});

export default StoryBoardwModal;
