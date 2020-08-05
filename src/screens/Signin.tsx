/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Animated,
} from 'react-native';
import Toast from '../components/Toast';
import {Button, Input, Icon, SocialIcon} from 'react-native-elements';
import {LinearGradient} from 'react-native-linear-gradient';
import {emailCheck} from '../utils/emailCheck';

import {GoogleSignin} from '@react-native-community/google-signin';

interface LoginProps {
  loginStatus: boolean;
}

const Signin: React.FC<LoginProps> = ({loginProps}) => {
  const {changeLogin, navigation} = loginProps;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputInFocus, setInputInFocus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  async function googlesignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
      setIsLoggedIn(true);
      changeLogin(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
    }
  }

  let emailFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();

  //username ==>
  const handleSubmit: () => void = () => {
    let body = JSON.stringify({email, password});
    if (!email.length || !password.length) {
      Alert.alert(
        // 'Empty Fields',
        `이메일과 비밀번호를 확인 후,${'\n'}다시 시도해 주시기 바랍니다.`,
        {
          text: 'OK',
          onPress: () => console.log('hi'),
        },
        {cancelable: false},
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
        {cancelable: false},
      );
      passwordFieldRef.current.clear();
      passwordFieldRef.current.focus();
      return;
    } else if (!email.match(emailCheck)) {
      Alert.alert(
        'Invalid E-mail Address',
        'Please input a correct e-mail address.',
        {text: 'OK', onPress: () => console.log('hi')},
        {cancelable: false},
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
        setTimeout(() => changeLogin('true'), 1000);
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
        <Text style={styles.header}>Memory.log...in</Text>

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
                  color="#ceced0"
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
                <Icon name="lock" type="material-community" color="#ceced0" />
              }
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonContainer__buttonTextStyle}
            title="로그인"
            type="outline"
            onPress={() => {
              handleSubmit();
              blurAll();
            }}
          />
          <Button
            style={styles.buttonContainer__buttonTextStyle}
            title="회원가입"
            type="solid"
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
        <View style={styles.socialLogin}>
          <SocialIcon
            title="Sign In With Google"
            button
            light={true}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderColor: 'rgba(192, 76, 60, 1)',
              borderWidth: 2,
            }}
            type="google"
            onPress={googlesignIn}
          />
          <SocialIcon
            title="Sign In With Facebook"
            button
            light={true}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderColor: 'rgba(80, 103, 175, 1)',
              borderWidth: 2,
            }}
            type="facebook"
            // onPress={signIn}
          />
          <SocialIcon
            title="Sign In With Instagram"
            button
            light={true}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderColor: 'rgba(80, 103, 175, 1)',
              borderWidth: 2,
            }}
            type="instagram"
            // onPress={signIn}
          />
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
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundImage: {flex: 1, height: '110%', resizeMode: 'cover'},
  header: {
    flex: 0.1,
    color: 'white',
    fontFamily: 'Lobster-Regular',
    alignSelf: 'center',
    marginTop: 150,
    paddingHorizontal: 30,
    textAlignVertical: 'bottom',
    fontSize: 35,
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  inputContainer: {
    flex: 0.4,
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
    flex: 0.15,
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
    width: 80,
  },
  socialLogin: {flex: 0.3},
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
