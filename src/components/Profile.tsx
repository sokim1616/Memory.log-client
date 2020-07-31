import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
MaterialCommunityIcons.loadFont();

interface ProfileProps {}

// {
//   "id": 5,
//   "username": "zombie",
//   "email": "z1@gmail.com",
//   "password": "12345678",
//   "profilepath": "./image/dafault_profile.jpg",
//   "statusmessage": "지금 어떠신가요...?",
//   "createdAt": "2020-07-29T05:07:58.000Z",
//   "updatedAt": "2020-07-29T05:07:58.000Z"
// }

const Profile: React.FC<ProfileProps> = ({}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userState, setUserState] = useState({
    id: 5,
    username: 'zombie',
    email: 'z1@gmail.com',
    password: '12345678',
    profilepath: './image/dafault_profile.jpg',
    statusmessage: '지금 어떠신가요...?',
  });

  const options = {
    title: 'Load Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleEditButtonPress = () => {
    onEdit ? setOnEdit(false) : setOnEdit(true);
  };

  const handleTextInput = (text) => {
    setStatusMessage(text);
  };

  const handleStatusSubmit = () => {
    setUserState({...userState, statusmessage: statusMessage});
    setOnEdit(false);
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        setImageSource(response.uri);
      }
    });
    //fetch -->
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 위뷰시작 */}
      <View style={styles.leftImageContainer}>
        <View
          onTouchEnd={pickImage}
          style={styles.userImagePickButtonContainer}>
          <MaterialCommunityIcons
            name={'plus-circle'}
            style={styles.userImagePickButtonIcon}
          />
        </View>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={styles.userImage}
          source={
            imageSource
              ? {uri: imageSource}
              : require('../assets/image/dafault_profile.jpg')
          }
        />
      </View>
      <View style={styles.rightContentContainer}>
        <View style={styles.userNameTextContainer}>
          <Text style={styles.userNameText}>{userState.username}</Text>
        </View>
        <View style={styles.userStatusTextContainer}>
          <Modal
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationOutTiming={500}
            isVisible={onEdit}
            style={styles.editModal}>
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.editModalAvoidKeyView}>
              <View style={styles.editModalTextInputContainer}>
                <View style={styles.editModalTextInputHeaderContainer}>
                  <Text style={styles.editModalTextInputHeaderText}>
                    Status Message
                  </Text>
                </View>
                <TextInput
                  style={styles.editModalTextInput}
                  onChangeText={handleTextInput}
                  defaultValue={userState.statusmessage}
                  multiline={true}
                  maxLength={60}
                />
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    {statusMessage ? `${statusMessage.length} / 60` : '0 / 60'}
                  </Text>
                </View>
                <View
                  onTouchEnd={handleStatusSubmit}
                  style={styles.submitButtonContainer}>
                  <MaterialCommunityIcons
                    name={'check-circle'}
                    style={styles.submitButton}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
          <Text style={styles.userStatusText}>{userState.statusmessage}</Text>
          <View
            onTouchEnd={handleEditButtonPress}
            style={styles.userStatusUpdateButtonContainer}>
            <MaterialCommunityIcons
              name={'pencil-outline'}
              style={styles.userStatusUpdateButtonIcon}
            />
          </View>
        </View>
        <View style={styles.userEmailTextContainer}>
          <Text style={styles.userEmailText}>{userState.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: '#dddddd',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  leftImageContainer: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  userImage: {
    flex: 1,
    width: Dimensions.get('screen').width * 0.27,
  },
  userImagePickButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    padding: 3,
  },
  userImagePickButtonIcon: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  rightContentContainer: {
    flex: 0.7,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  userNameTextContainer: {
    flex: 0.3,
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    justifyContent: 'center',
    paddingLeft: 7,
  },
  userStatusTextContainer: {
    flex: 0.35,
    justifyContent: 'center',
    paddingLeft: 7,
  },
  userEmailTextContainer: {
    flex: 0.35,
    justifyContent: 'center',
    paddingLeft: 7,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'Cochin',
  },
  userStatusText: {
    fontSize: 16,
    fontFamily: 'Cochin',
  },
  userEmailText: {
    fontSize: 16,
    fontFamily: 'Cochin',
  },
  userStatusUpdateButtonContainer: {
    position: 'absolute',
    right: 10,
  },
  userStatusUpdateButtonIcon: {
    fontSize: 24,
  },
  editModal: {
    flex: 1,
    zIndex: 1,
  },
  editModalAvoidKeyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalTextInputContainer: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.35,
    width: Dimensions.get('screen').width * 0.75,
    height: Dimensions.get('screen').height * 0.23,
  },
  editModalTextInputHeaderContainer: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
  },
  editModalTextInputHeaderText: {
    fontSize: 20,
  },
  editModalTextInput: {
    flex: 0.8,
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.6,
    fontSize: 20,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  counterText: {
    fontSize: 12,
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  submitButton: {
    fontSize: 22,
  },
});

export default Profile;

// * 프로필에 관한것
