import React, { useCallback, useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Accessory,
  Overlay,
  Icon,
  Input,
  Button,
} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
MaterialCommunityIcons.loadFont();
interface ProfileProps {}
const Profile: React.FC<ProfileProps> = ({}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userState, setUserState] = useState({});
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const options = {
    title: 'Load Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const getUserInfo = () => {
    return fetch('http://localhost:4000/user/logininfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('로그인유저정보 :', res);
        setUserState(res[0]);
      })
      .catch((err) => console.error(err));
  };
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [userState.length]),
  );
  const changeStatusMessage = () => {
    console.log(statusMessage);
    return fetch('http://localhost:4000/user/status', {
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
        toggleOverlay();
        getUserInfo();
      });
  };
  const handleTextInput = (message) => {
    setStatusMessage(message);
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
    <SafeAreaView style={styles.upperview}>
      {/* 위뷰시작 */}
      <View style={styles.upperview__left}>
        <View style={styles.upperview__left__photo}>
          <Avatar
            size="large"
            rounded={true}
            source={{
              uri: 'https://picsum.photos/300/300',
            }}>
            <Accessory onTouchEnd={pickImage} size={25} />
          </Avatar>
        </View>
      </View>
      <View style={styles.upperview__right}>
        <View style={styles.upperview__right__username}>
          <Text style={styles.upperview__right__username__text}>
            {userState.username}
          </Text>
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
              onPress={toggleOverlay}
            />
          </View>
          <Overlay
            overlayStyle={styles.upperview__right__message__overlay}
            isVisible={visible}
            onBackdropPress={toggleOverlay}>
            <View style={styles.overlay}>
              <View style={styles.overlay__title}>
                <Text style={styles.overlay__title__text}>
                  상태 메세지 변경
                </Text>
              </View>
              <View style={styles.overlay__textinput}>
                <Input
                  containerStyle={styles.overlay__textinput__container}
                  inputContainerStyle={styles.overlay__textinput__input}
                  inputStyle={{ fontSize: 25 }}
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
                  title="취소"
                  type="outline"
                  onPress={toggleOverlay}
                />
                <Button
                  containerStyle={styles.overlay__button__style}
                  title="확인"
                  type="solid"
                  onPress={changeStatusMessage}
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
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginLeft: -21.5,
    // backgroundColor: '#3ed',
  },
  upperview__right: {
    flex: 7,
  },
  upperview__right__username: {
    flex: 3,
    flexDirection: 'column',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 20,
    justifyContent: 'center',
  },
  upperview__right__username__text: {
    fontSize: 30,
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
  },
  overlay: { flex: 1 },
  overlay__title: {
    flex: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  overlay__title__text: { fontSize: 30, textAlign: 'center' },
  overlay__textinput: { flex: 6 },
  overlay__textinput__container: {},
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
  overlay__button__style: {width: 100},
  upperview__right__email: {
    flex: 2,
  },
  upperview__right__email__text: {
    fontSize: 15,
  },
});
export default Profile;