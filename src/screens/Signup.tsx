/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import Toast from '../components/Toast';
import {StackNavigationProp} from '@react-navigation/stack';
import {Input, Icon, Button} from 'react-native-elements';
import {emailCheck} from '../utils/emailCheck';

interface SignupProps {
  loginProps: {
    navigation: StackNavigationProp<T, T>;
    changeLogin: () => void;
  };
}

const Signup: React.FC<SignupProps> = ({loginProps}) => {
  const {navigation, changeLogin} = loginProps;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [inputInFocus, setInputInFocus] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  let usernameFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();
  let emailFieldRef: Ref = React.createRef();

  const handleSubmit: () => void = () => {
    let body = JSON.stringify({username, password, email});
    if (!username.length || !password.length || !email.length) {
      Alert.alert(
        '오류',
        `모든 항목을 작성 후, ${'\n'} 회원가입을 눌러주세요.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (!username) usernameFieldRef.current.focus();
              else if (!email) emailFieldRef.current.focus();
              else passwordFieldRef.current.focus();
            },
          },
        ],
        {cancelable: false},
      );
      return;
    } else if (password.length < 8) {
      Alert.alert(
        '오류',
        '비밀번호는 8글자 이상이여야 합니다.',
        [
          {
            text: 'OK',
            onPress: () => {
              passwordFieldRef.current.clear();
              passwordFieldRef.current.focus();
            },
          },
        ],
        {cancelable: false},
      );
      return;
    } else if (username.match(/[^\s-_a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)) {
      Alert.alert(
        '오류',
        '올바른 형식의 이름을 적어주세요.',
        [
          {
            text: 'OK',
            onPress: () => {
              usernameFieldRef.current.clear();
              usernameFieldRef.current.focus();
            },
          },
        ],
        {cancelable: false},
      );
      return;
    } else if (!email.match(emailCheck)) {
      Alert.alert(
        '오류',
        '올바른 형식의 이메일을 적어주세요.',
        [
          {
            text: 'OK',
            onPress: () => {
              emailFieldRef.current.clear();
              emailFieldRef.current.focus();
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }
    submitSignUp(body);
  };

  const submitSignUp = async (body) => {
    let resp = await fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (resp.status === 200) {
      setToastMessage(
        '회원가입이 성공적으로 완료되었습니다.\n클릭 시, 로그인 페이지로 이동합니다.',
      );
      setTimeout(() => {
        navigation.navigate('Signin');
      }, 2500);
    } else if (resp.status === 409) {
      setToastMessage(
        `이미 존재하는 이메일입니다.${'\n'}다른 이메일을 작성해 주세요.`,
      );
    } else {
      setToastMessage('죄송합니다. 현재는 회원가입을 진행할 수 없습니다.');
    }
  };

  const handleInput: (input: string, inputType: string) => void = (
    input,
    inputType,
  ) => {
    switch (inputType) {
      case 'username':
        setUsername(input);
        break;
      case 'password':
        setPassword(input);
        break;
      case 'email':
        setEmail(input);
        break;
    }
  };

  const blurAll = () => {
    passwordFieldRef.current.blur();
    emailFieldRef.current.blur();
    usernameFieldRef.current.blur();
  };

  return (
    <View onTouchStart={blurAll} style={styles.container}>
      <ImageBackground
        source={require('../assets/image/end.png')}
        style={styles.backgroundImage}
        blurRadius={10}>
        <View style={styles.header}>
          <Text style={styles.headerText}>회원 가입</Text>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelFocused}>
              <Text>{inputInFocus === 'username' ? '이름' : ''}</Text>
            </View>
            <Input
              ref={usernameFieldRef}
              style={styles.inputField}
              onFocus={() => setInputInFocus('username')}
              onBlur={() => setInputInFocus('')}
              placeholder="이름"
              onChangeText={(input) => handleInput(input, 'username')}
              selectTextOnFocus={true}
              textContentType="username"
              selectionColor="lightgreen"
              clearButtonMode="unless-editing"
              enablesReturnKeyAutomatically={true}
              autoCapitalize="none"
              leftIcon={
                <Icon name="user" type="simple-line-icon" color="grey" />
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelFocused}>
              <Text>{inputInFocus === 'email' ? '이메일' : ''}</Text>
            </View>
            <Input
              ref={emailFieldRef}
              style={styles.inputField}
              onFocus={() => setInputInFocus('email')}
              onBlur={() => setInputInFocus('')}
              placeholder="이메일"
              onChangeText={(input) => handleInput(input, 'email')}
              selectTextOnFocus={true}
              textContentType="emailAddress"
              selectionColor="lightgreen"
              clearButtonMode="unless-editing"
              enablesReturnKeyAutomatically={true}
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
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelFocused}>
              <Text>{inputInFocus === 'password' ? '패스워드' : ''}</Text>
            </View>
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
              enablesReturnKeyAutomatically={true}
              leftIcon={
                <Icon name="lock" type="material-community" color="grey" />
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Button
              containerStyle={{
                marginVertical: 20,
                borderWidth: 1,
                borderColor: 'rgb(85,135,216)',
                borderRadius: 50,
                backgroundColor: 'rgba(255,255,255,0.25)',
              }}
              title="회원가입"
              type="clear"
              raised
              onPress={handleSubmit}
            />
          </View>
          <View>
            <Button
              containerStyle={{
                marginVertical: 20,
                borderWidth: 1,
                borderColor: 'rgb(85,135,216)',
                borderRadius: 50,
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
              title="뒤로가기"
              type="clear"
              raised
              onPress={() => navigation.navigate('Signin')}
            />
          </View>
        </View>
        <Toast
          handlePress={() => {
            setToastMessage('');
            blurAll();
          }}
          message={toastMessage}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    height: '110%',
    resizeMode: 'cover',
  },
  header: {
    flex: 0.1,
    paddingTop: 100,
    paddingHorizontal: 30,
    alignItems: 'center',
    fontSize: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputSection: {
    flex: 0.3,
    marginHorizontal: 20,
    justifyContent: 'space-around',
  },
  inputContainer: {
    flex: 1,
  },
  inputLabelFocused: {
    height: 20,
    justifyContent: 'center',
    paddingLeft: 15,
    fontSize: 14,
    color: 'black',
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  inputField: {
    flex: 6 / 10,
    textAlign: 'left',
    maxHeight: 50,
    paddingLeft: 15,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 30,
    backgroundColor: 'white',
    fontSize: 18,
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  buttonContainer: {
    flex: 0.6,
    marginHorizontal: 50,
    justifyContent: 'center',
  },
  devLoginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'lightblue',
    width: 50,
    height: 50,
  },
});

export default Signup;
