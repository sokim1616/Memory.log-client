/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface PhotoPreviewModalProps {
  handleModalVisibility: (ans: boolean) => void;
  currentImageData: string;
  changeButtonsVisibilityStatus: (
    ans: boolean,
  ) => { buttonsVisibilityStatus: true };
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  handleModalVisibility,
  currentImageData,
  changeButtonsVisibilityStatus,
  savePicture,
  visibility,
}) => {
  const [editModeStatus, setEditModeStatus] = useState(false);
  const [photoDescription, setPhotoDescription] = useState(
    '당신의 Memory.log...',
  );
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const { uri } = currentImageData;
  const memoField: Ref = React.createRef();

  const modalButtonTouchHandler = async (val) => {
    if (val === 'save') {
      savePicture(currentImageData, photoDescription);
    }
    changeButtonsVisibilityStatus(true);
    handleModalVisibility(false);
    setPhotoDescription('');
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
    <Modal
      animationIn="slideInDown"
      animationInTiming={500}
      animationOut="slideOutUp"
      animationOutTiming={500}
      isVisible={visibility}
      style={styles.modalContainer}>
      {/* ----------비회원 오버레이(모달창) 시작---------- */}
      <Overlay
        overlayStyle={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
        isVisible={visible}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1.5,
              flexDirection: 'row-reverse',
              marginTop: 50,
            }}>
            <Icon
              size={40}
              onPress={toggleOverlay}
              name="cancel"
              type="material"
              color="#ffffff"
            />
          </View>
          <View
            style={{
              flex: 0.5,
              width: 280,
              backgroundColor: 'rgba(255,255,255,0.75)',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'rgba(255,255,255,0.75)',
            }}>
            <Text style={{ fontSize: 25 }}>
              {'이 사진을 찍을 때,\n들었던 생각이나\n느꼈던 감정을 적어보세요.'}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View
            style={{
              flex: 0.35,
              width: 320,
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(255,255,255,0.75)',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'rgba(255,255,255,0.75)',
            }}>
            <Text style={{ fontSize: 25 }}>
              {'저장 버튼을 누른 뒤,\n추억저장소에서 확인해보세요.'}
            </Text>
          </View>
          <View style={{ flex: 0.7 }} />
        </View>
      </Overlay>
      {/* ----------비회원 오버레이(모달창) 끝---------- */}
      <View style={styles.blurBackground}>
        <Image
          style={styles.backgroundImage}
          resizeMethod="auto"
          resizeMode="cover"
          source={{ uri }}
        />
      </View>
      <Text style={styles.headerText}>Memory.log</Text>
      <View
        style={
          editModeStatus ? styles.imageContainerEditMode : styles.imageContainer
        }>
        <Image
          resizeMode="contain"
          resizeMethod="auto"
          style={styles.currentImage}
          source={{
            uri,
          }}
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
            color={'black'}
            size={35}
            style={{ alignSelf: 'center' }}
          />
        </View>
        <TextInput
          placeholder="당신의 Memory.log..."
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
        <Button
          buttonStyle={{
            width: 100,
            height: 50,
            borderWidth: 1,
            borderRadius: 25,
            borderColor: 'rgba(232, 90, 113, 0.5)',
            backgroundColor: 'rgba(232, 90, 113, 0.75)',
            // borderColor: 'rgba(255,255,255,0.5)',
            // backgroundColor: 'rgba(255,255,255,0.75)',
          }}
          title="취소"
          titleStyle={{ fontSize: 25, color: 'white' }}
          type="solid"
          onPress={() => modalButtonTouchHandler(null)}
        />
        <Button
          buttonStyle={{
            width: 100,
            height: 50,
            borderRadius: 25,
            borderColor: 'rgba(78, 161, 211, 0.5)',
            backgroundColor: 'rgba(78, 161, 211, 0.75)',
          }}
          title="저장"
          titleStyle={{ fontSize: 25 }}
          type="solid"
          onPress={() => modalButtonTouchHandler('save')}
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
    shadowColor: '#222222',
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
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.9,
    borderRadius: 0,
  },
  noteContainerEditMode: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.95,
    marginBottom: 20,
    borderRadius: 0,
  },
  noteLeftSide: {
    flex: 0.2,
    backgroundColor: 'white',
    borderRightColor: 'red',
    borderRightWidth: 3,
    borderTopLeftRadius: 0,
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
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
    // fontFamily: 'Lobster-Regular',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 30,
    fontSize: 24,
    // fontFamily: 'Lobster-Regular',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
    top: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: Dimensions.get('screen').width,
  },
});

export default PhotoPreviewModal;
