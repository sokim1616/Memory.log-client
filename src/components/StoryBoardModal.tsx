import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Server from '../utils/Server';
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
  editable,
}) => {
  const [memoOnFocus, setMemoOnFocus] = useState(false);
  const [memo, setMemo] = useState('');
  let memoField: Ref = React.createRef();

  useEffect(() => {
    setMemo(currentPhoto.description);
    memoField = React.createRef();
  }, [currentPhoto.description]);

  const handleKeyboardIconPress = () => {
    if (memoOnFocus) {
      memoField.current.blur();
      setMemoOnFocus(false);
    } else {
      memoField.current.focus();
      setMemoOnFocus(true);
    }
  };
  const handleStatusUpdate = async () => {
    currentPhoto.description = memo;
    const res = await fetch(`http://${Server.server}/photo/uboard`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...currentPhoto,
      }),
      credentials: 'include',
    });
    alertSaveSucess(res.status);
  };

  const alertSaveSucess = async (status) => {
    if (status === 200) {
      return Alert.alert(
        'Description updated!',
        'Photo description was updated',
        [
          {
            text: 'OK',
            onPress: handleKeyboardIconPress,
          },
        ],
        { cancelable: false },
      );
    } else {
      return Alert.alert(
        'Update fail',
        'Photo description update failed',
        [
          {
            text: 'Retry',
            onPress: async () => await handleStatusUpdate(),
          },
          {
            text: 'Cancel',
            onPress: handleKeyboardIconPress,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  };
  return (
    <Modal
      animationIn="slideInDown"
      animationInTiming={500}
      animationOut="slideOutUp"
      animationOutTiming={500}
      isVisible={previewMode}
      style={styles.modalContainer}>
      <View style={styles.blurBackground}>
        <Image
          resizeMode="cover"
          resizeMethod="auto"
          blurRadius={5}
          style={styles.currentImageBackground}
          source={{ uri: currentPhoto.filepath }}
        />
      </View>
      {!memoOnFocus ? (
        <>
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
              resizeMode="cover"
              resizeMethod="auto"
              style={styles.currentImage}
              source={{ uri: currentPhoto.filepath }}
            />
          </View>
        </>
      ) : null}
      <KeyboardAvoidingView
        behavior="padding"
        style={memoOnFocus ? styles.noteContainerEdit : styles.noteContainer}>
        <View style={styles.noteLeftSide}>
          {editable ? (
            <>
              <TouchableOpacity onPress={handleKeyboardIconPress}>
                <MaterialCommunityIcons
                  name={
                    memoOnFocus ? 'keyboard-off-outline' : 'keyboard-outline'
                  }
                  color={'black'}
                  size={35}
                  style={styles.keyboardButton}
                />
              </TouchableOpacity>
              <Text style={styles.maxLength}>
                {memo ? `${memo.length} / 90` : '0 / 90'}
              </Text>
              {memo !== currentPhoto.description ? (
                <TouchableOpacity
                  onPress={handleStatusUpdate}
                  style={styles.saveButton}>
                  <Text style={{ fontSize: 16 }}>Save</Text>
                </TouchableOpacity>
              ) : null}
            </>
          ) : null}
        </View>
        <TextInput
          ref={memoField}
          editable={editable}
          onChangeText={(text) => setMemo(text)}
          onFocus={() => setMemoOnFocus(true)}
          defaultValue={currentPhoto.description}
          multiline={true}
          maxLength={90}
          style={styles.noteRightSide}
        />
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
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
  backgroundImage: {
    flex: 1,
    height: '200%',
    resizeMode: 'contain',
  },
  editModalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
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
  currentImageBackground: {
    flex: 1,
    opacity: 1,
  },
  imageContainer: {
    flex: 1,
    marginTop: 100,
    margin: 30,
    width: Dimensions.get('screen').width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
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
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  noteContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    width: Dimensions.get('screen').width * 0.8,
    borderTopLeftRadius: 15,
    marginBottom: 80,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  noteContainerEdit: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    width: Dimensions.get('screen').width,
    borderTopLeftRadius: 15,
    marginVertical: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  noteLeftSide: {
    flex: 0.2,
    backgroundColor: 'lightyellow',
    borderRightColor: 'red',
    borderRightWidth: 3,
    borderTopLeftRadius: 15,
  },
  noteRightSide: {
    flex: 0.8,
    backgroundColor: 'lightyellow',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 30,
    fontSize: 24,
    // fontFamily: 'Lobster-Regular',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
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
  },
  buttonsContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: Dimensions.get('screen').width,
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
  keyboardButton: {
    alignSelf: 'center',
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 1,
  },
  saveButton: {
    alignSelf: 'center',
    marginVertical: -50,
    width: 50,
    height: 25,
    padding: 3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'lightblue',
    backgroundColor: 'lightblue',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  maxLength: {
    alignSelf: 'center',
    marginVertical: 20,
    padding: 3,
    paddingBottom: 59,
  },
});

export default StoryBoardwModal;
