/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import Server from '../utils/Server';
import Toast from '../components/Toast';
import { Button, Input, Icon, SocialIcon, Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { emailCheck } from '../utils/emailCheck';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
interface LoginProps {
  loginStatus: boolean;
}
const Signin: React.FC<LoginProps> = ({ loginProps }) => {
  const { changeLogin, navigation } = loginProps;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputInFocus, setInputInFocus] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  let emailFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();

  const googlesignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await googleSinup(userInfo.user);
    } catch (error) {
      // when user cancels sign in process,
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when in progress already
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Process in progress');
        // when play services not available
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services are not available');
        // some other error
      } else {
        Alert.alert('Something else went wrong. \n Please try again.');
      }
    }
  };

  const googleSinup = async ({ email, id, photo, name }) => {
    let resp = await fetch(`http://${Server.server}/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: id,
        username: name,
        profilepath: photo,
      }),
    });
    if (resp.status === 200) {
      setToastMessage('로그인에 성공하였습니다.');
      await googleSignin({ email, id });
    } else if (resp.status === 409) {
      await googleSignin({ email, id });
    } else {
      setToastMessage('죄송합니다. 현재는 구글로그인을 진행할 수 없습니다.');
    }
  };

  const googleSignin = async ({ email, id }) => {
    let resp = await fetch(`http://${Server.server}/user/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: id }),
    });
    if (resp.status === 200) {
      setToastMessage('로그인에 성공하였습니다.');
      setTimeout(() => changeLogin(true), 1000);
    } else {
      setToastMessage('Unathorized. Please check your username and password.');
    }
  };

  const handleSubmit: () => void = () => {
    let body = JSON.stringify({ email, password });
    if (!email.length || !password.length) {
      Alert.alert(
        'Empty Fields',
        `이메일과 비밀번호를 확인 후,${'\n'}다시 시도해 주시기 바랍니다.`,
        {
          text: 'OK',
          onPress: () => console.log('hi'),
        },
        { cancelable: false },
      );
      !email.length
        ? emailFieldRef.current.focus()
        : passwordFieldRef.current.focus();
      return;
    } else if (password.length < 8) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters.',
        {
          text: 'OK',
          onPress: () => console.log('hi'),
        },
        { cancelable: false },
      );
      passwordFieldRef.current.clear();
      passwordFieldRef.current.focus();
      return;
    } else if (!email.match(emailCheck)) {
      Alert.alert(
        'Invalid E-mail Address',
        'Please input a correct e-mail address.',
        { text: 'OK', onPress: () => console.log('hi') },
        { cancelable: false },
      );
      return;
    }
    blurAll();
    fetch('http://localhost:4000/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }).then((resp) => {
      if (resp.status === 200) {
        setToastMessage('로그인에 성공하였습니다.');
        setTimeout(() => changeLogin(true), 1000);
      } else {
        setToastMessage(
          'Unathorized. Please check your username and password.',
        );
      }
    });
  };
  const handleInput: (input: string, inputType: string) => void = (
    input,
    inputType,
  ) => {
    switch (inputType) {
      case 'email':
        setEmail(input);
        break;
      case 'password':
        setPassword(input);
    }
  };
  const blurAll = () => {
    passwordFieldRef.current.blur();
    emailFieldRef.current.blur();
  };

  return (
    <View onTouchStart={blurAll} style={styles.container}>
      <ImageBackground
        source={require('../assets/image/morning.png')}
        style={styles.backgroundImage}
        blurRadius={10}>
        <View style={styles.header}>
          <View
            style={styles.textContainer}
            onTouchStart={() => {
              handleSubmit();
              blurAll();
            }}>
            <Text style={styles.headerText}>Memory.{'\n'}log</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text
              style={
                inputInFocus === '이메일'
                  ? styles.inputLabelFocused
                  : styles.inputLabelBlurred
              }>
              E-mail
            </Text>
            <Input
              ref={emailFieldRef}
              style={styles.inputField}
              onFocus={() => setInputInFocus('이메일')}
              onBlur={() => setInputInFocus('')}
              placeholder="이메일"
              onChangeText={(input) => handleInput(input, 'email')}
              selectTextOnFocus={true}
              textContentType="emailAddress"
              selectionColor="lightgreen"
              clearButtonMode="unless-editing"
              autoCapitalize="none"
              keyboardType="email-address"
              leftIcon={
                <Icon
                  name="email-outline"
                  type="material-community"
                  color="grey"
                />
              }
            />
          </View>
          <View>
            <Text
              style={
                inputInFocus === 'password'
                  ? styles.inputLabelFocused
                  : styles.inputLabelBlurred
              }>
              Password
            </Text>
            <Input
              ref={passwordFieldRef}
              style={styles.inputField}
              onFocus={() => setInputInFocus('password')}
              onBlur={() => setInputInFocus('')}
              placeholder="비밀번호"
              onChangeText={(input) => handleInput(input, 'password')}
              selectTextOnFocus={true}
              secureTextEntry={true}
              textContentType="password"
              selectionColor="lightgreen"
              clearButtonMode="unless-editing"
              autoCapitalize="none"
              leftIcon={
                <Icon name="lock" type="material-community" color="grey" />
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonContainer__buttonTextStyle}
            title="회원가입"
            titleStyle={{ color: 'black' }}
            type="clear"
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            style={styles.buttonContainer__buttonTextStyle}
            title="로그인"
            titleStyle={{ color: 'black' }}
            type="clear"
            onPress={() => {
              handleSubmit();
              blurAll();
            }}
          />
        </View>
        <View style={styles.socialLogin}>
          <SocialIcon
            title="Sign In With Google"
            button
            type="google"
            onPress={googlesignIn}
          />
          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
          // onPress={signIn}
          />
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              height: 55,
              width: 400,
              left: 7,
              top: 7.5,
              borderRadius: 50,
            }}>
            <SocialIcon
              title="Sign In With Instagram"
              fontStyle={{ height: 50, top: -3, left: -10 }}
              iconStyle={{ height: 70, width: 50, top: 2, left: 25 }}
              button
              style={{
                backgroundColor: 'transparent',
              }}
              type="instagram"
            // onPress={signIn}
            />
          </LinearGradient>
        </View>
        <View
          onTouchStart={() => {
            setEmail('z1@gmail.com');
            setPassword('12345678');
            handleSubmit();
          }}
          style={styles.devLoginButton}>
          <Text>개발용 로그인</Text>
        </View>
        {toastMessage ? (
          <Toast
            handlePress={() => {
              setToastMessage('');
              emailFieldRef.current.clear();
              passwordFieldRef.current.clear();
            }}
            message={toastMessage}
          />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  backgroundImage: { flex: 1, height: '110%', resizeMode: 'cover' },
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 125,
  },
  textContainer: {
    borderWidth: 3.5,
    borderColor: 'black',
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    top: -10,
    left: 5,
    textAlignVertical: 'bottom',
  },
  inputContainer: {
    flex: 3.5,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 50,
    // backgroundColor: '#3ef',
    // borderWidth: 3,
  },
  inputLabelFocused: {
    flex: 0.2,
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 5,
    minHeight: 20,
    maxHeight: 20,
    fontSize: 14,
    color: 'black',
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  inputLabelBlurred: {
    flex: 0.2,
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 5,
    minHeight: 20,
    maxHeight: 20,
    fontSize: 14,
    color: 'transparent',
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  inputField: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 60,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 30,
    backgroundColor: 'white',
    fontSize: 18,
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  buttonContainer: {
    flex: 1.5,
    // width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 50,
    // backgroundColor: '#ef2',
  },
  // buttonContainer__buttonStyle: {
  //   marginTop: 20,
  //   borderWidth: 0.5,
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   borderColor: 'grey',
  // },
  buttonContainer__buttonTextStyle: {
    width: 100,
    borderWidth: 1,
    // borderColor: 'rgb(85,135,216)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  socialLogin: { flex: 3 },
  devLoginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'lightblue',
    width: 50,
    height: 50,
  },
});
export default Signin;
