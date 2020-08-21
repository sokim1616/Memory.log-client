import React, { useCallback, useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import Server from '../utils/Server';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();
import {
  Avatar,
  Accessory,
  Overlay,
  Icon,
  Input,
  Button,
} from 'react-native-elements';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [imageSource, setImageSource] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusName, setStatusName] = useState('');
  const [userState, setUserState] = useState({});
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleName, setVisibleName] = useState(false);

  const toggleStatus = () => {
    setVisibleStatus(!visibleStatus);
  };

  const toggleName = () => {
    setVisibleName(!visibleName);
  };

  const options = {
    title: 'Load Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const getUserInfo = () => {
    return fetch(`http://${Server.server}/user/logininfo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setUserState(res[0]);
        setImageSource(res[0].profilepath);
      })
      .catch((err) => console.error(err));
  };
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [userState.length]),
  );
  const changeStatusMessage = () => {
    return fetch(`http://${Server.server}/user/status`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        statusmessage: statusMessage,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        toggleStatus();
        getUserInfo();
      });
  };

  const changeUserName = () => {
    // console.log(statusName);
    return fetch(`http://${Server.server}/user/username`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: statusName,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        toggleName();
        getUserInfo();
      });
  };

  const handleTextInput = (message) => {
    setStatusMessage(message);
  };

  const handleNameInput = (name) => {
    setStatusName(name);
  };

  const pickImage = () => {
    return new Promise((resolve, reject) => {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          reject(false);
        } else {
          setImageSource(response.origURL);
          resolve(response);
        }
      });
    });
  };

  const postImage = async () => {
    try {
      let { uri, fileName, origURL } = await pickImage();
      let formData = createForm(origURL, fileName);
      let url = `http://${Server.server}/user/profile`;
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
    } catch (e) {
      console.log(e);
    }
  };

  const alertSaveSucess = async (status) => {
    if (status === 200) {
      return Alert.alert(
        'Profile updated!',
        { text: 'OK', onPress: () => 'OK' },
        { cancelable: false },
      );
    } else {
      return Alert.alert(
        'Picture upload failed',
        'Please retry later!',
        { text: 'OK', onPress: () => 'OK' },
        { cancelable: false },
      );
    }
  };

  const createForm = (uri, fileName) => {
    let formData = new FormData();
    formData.append('img', {
      uri,
      name: fileName.replace('.JPG', '.jpg'),
      type: 'image/jpg',
      size: 3,
    });
    return formData;
  };

  return (
    <SafeAreaView style={styles.upperview}>
      {/* 위뷰시작 */}
      <View style={styles.upperview__left}>
        <View>
          <Avatar
            containerStyle={styles.upperview__left__photo}
            size={95}
            rounded={true}
            source={imageSource ? { uri: imageSource } : null}
          />
          <Accessory onTouchEnd={postImage} size={25} />
        </View>
      </View>
      <View style={styles.upperview__right}>
        <View style={styles.upperview__right__upper}>
          <View style={styles.upperview__right__username}>
            <Text style={styles.upperview__right__username__text}>
              {userState.username}
            </Text>
          </View>
          <View style={styles.upperview__right__username__right}>
            <Icon
              style={styles.upperview__right__username__right__icon}
              name="pencil-outline"
              type="material-community"
              size={20}
              onPress={toggleName}
            />
          </View>
        </View>
        <View style={styles.upperview__right__email}>
          <Text style={styles.upperview__right__email__text}>
            {userState.email}
          </Text>
        </View>
        <View style={styles.upperview__right__message}>
          <View style={styles.upperview__right__message__left}>
            <Text style={styles.upperview__right__message__left__text}>
              {userState.statusmessage}
            </Text>
          </View>
          <View style={styles.upperview__right__message__right}>
            <Icon
              style={styles.upperview__right__message__right__icon}
              name="pencil-outline"
              type="material-community"
              size={20}
              onPress={toggleStatus}
            />
          </View>

          {/* ----------------------------상태 메세지 변경 오버레이 시작---------------------------- */}

          <Overlay
            overlayStyle={styles.upperview__right__message__overlay}
            isVisible={visibleStatus}
            onBackdropPress={toggleStatus}>
            <View style={styles.overlay}>
              <View style={styles.overlay__title}>
                <Text style={styles.overlay__title__text}>
                  상태 메세지 변경
                </Text>
              </View>
              <View style={styles.overlay__textinput}>
                <Input
                  containerStyle={styles.overlay__message_textinput__container}
                  inputContainerStyle={styles.overlay__textinput__input}
                  inputStyle={{ fontSize: 20 }}
                  placeholder="상태 메세지를 입력하세요."
                  multiline={true}
                  maxLength={40}
                  onChangeText={handleTextInput}
                  value={statusMessage}
                />
              </View>
              <Text style={styles.overlay__textinput__legnth}>
                {statusMessage ? `${statusMessage.length} / 40` : '0 / 40'}
              </Text>
              <View style={styles.overlay__textinput__line} />
              <View style={styles.overlay__button}>
                <Button
                  containerStyle={styles.overlay__button__style}
                  buttonStyle={{
                    borderColor: '#E85A71',
                    backgroundColor: '#E85A71',
                    borderRadius: 20,
                  }}
                  title="취소"
                  titleStyle={{ color: 'white' }}
                  type="outline"
                  onPress={toggleStatus}
                />
                <Button
                  containerStyle={styles.overlay__button__style}
                  buttonStyle={{
                    borderColor: '#4EA1D3',
                    backgroundColor: '#4EA1D3',
                    borderRadius: 20,
                  }}
                  title="확인"
                  titleStyle={{ color: 'white' }}
                  type="outline"
                  onPress={changeStatusMessage}
                />
              </View>
            </View>
          </Overlay>

          {/* ----------------------------유저 이름 변경 오버레이 시작---------------------------- */}

          <Overlay
            overlayStyle={styles.upperview__right__message__overlay}
            isVisible={visibleName}
            onBackdropPress={toggleName}>
            <View style={styles.overlay}>
              <View style={styles.overlay__title}>
                <Text style={styles.overlay__title__text}>유저 이름 변경</Text>
              </View>
              <View style={styles.overlay__textinput}>
                <Input
                  containerStyle={styles.overlay__username_textinput__container}
                  inputContainerStyle={styles.overlay__textinput__input}
                  inputStyle={{ fontSize: 25 }}
                  placeholder="새로운 이름를 입력하세요."
                  multiline={true}
                  maxLength={7}
                  onChangeText={handleNameInput}
                  value={statusName}
                />
              </View>
              <Text style={styles.overlay__textinput__legnth}>
                {statusName ? `${statusName.length} / 7` : '0 / 7'}
              </Text>
              <View style={styles.overlay__textinput__line} />
              <View style={styles.overlay__button}>
                <Button
                  containerStyle={styles.overlay__button__style}
                  buttonStyle={{
                    borderColor: '#E85A71',
                    backgroundColor: '#E85A71',
                    borderRadius: 20,
                  }}
                  title="취소"
                  titleStyle={{ color: 'white' }}
                  type="outline"
                  onPress={toggleName}
                />
                <Button
                  containerStyle={styles.overlay__button__style}
                  buttonStyle={{
                    borderColor: '#4EA1D3',
                    backgroundColor: '#4EA1D3',
                    borderRadius: 20,
                  }}
                  title="확인"
                  titleStyle={{ color: 'white' }}
                  type="solid"
                  onPress={changeUserName}
                />
              </View>
            </View>
          </Overlay>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  upperview: {
    flex: 1,
    flexDirection: 'row',
  },
  upperview__left: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  upperview__left__photo: {
    shadowColor: '#000',
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginLeft: 0,
    // backgroundColor: '#3ed',
  },
  upperview__right: {
    flex: 7,
  },
  upperview__right__upper: {
    flex: 3,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 20,
    // backgroundColor: '#3ef',
  },
  upperview__right__username: {
    flex: 7,
    justifyContent: 'center',
  },
  upperview__right__username__text: {
    fontSize: 30,
  },
  upperview__right__username__right: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  upperview__right__username__right__icon: {
    marginTop: 5,
  },
  upperview__right__message: {
    flex: 5,
    flexDirection: 'row',
  },
  upperview__right__message__left: {
    flex: 8,
  },
  upperview__right__message__left__text: {
    fontSize: 16,
    marginTop: 5,
    height: 60,
    width: 225,
    lineHeight: 28,
    // backgroundColor: '#16a085',
  },
  upperview__right__message__right: {
    flex: 2,
  },
  upperview__right__message__right__icon: {
    marginTop: 5,
  },
  upperview__right__message__overlay: {
    height: 300,
    width: 300,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  overlay: {
    flex: 1,
  },
  overlay__title: {
    flex: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  overlay__title__text: { fontSize: 25, textAlign: 'center' },
  overlay__textinput: { flex: 6, justifyContent: 'center' },

  overlay__username_textinput__container: {
    height: 50,
    top: 18,
  },
  overlay__message_textinput__container: {
    // height: 50,
    top: 18,
  },
  overlay__textinput__input: { borderBottomColor: 'white' },
  overlay__textinput__legnth: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 10,
  },
  overlay__textinput__line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  overlay__button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  overlay__button__style: { width: 100 },
  upperview__right__email: {
    flex: 2,
  },
  upperview__right__email__text: {
    fontSize: 18,
  },
});

export default Profile;
