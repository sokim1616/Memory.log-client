/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  Keyboard,
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
  const [keyboardUp, setKeyboardUp] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardUp(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardUp(false);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  });

  let usernameFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();
  let emailFieldRef: Ref = React.createRef();

  //TODO: handle e-mail
  const handleSubmit: () => null = () => {
    let body = JSON.stringify({username, password, email});
    if (!username.length || !password.length || !email.length) {
      Alert.alert(
        `모든 항목을 작성 후, ${'\n'} 회원가입을 눌러주세요.`,
        {
          text: 'OK',
          onPress: () => console.log('hi'),
        },
        {cancelable: false},
      );
      !username.length
        ? usernameFieldRef.current.focus()
        : passwordFieldRef.current.focus();
      return;
    } else if (password.length < 8) {
      Alert.alert(
        '잘못된 비밀번호',
        '비밀번호는 8글자 이상이여야 합니다.',
        {
          text: 'OK',
          onPress: () => console.log('hi'),
        },
        {cancelable: false},
      );
      passwordFieldRef.current.clear();
      passwordFieldRef.current.focus();
      return;
    } else if (username.match(/[^\s-_a-zA-Z0-9]/)) {
      Alert.alert(
        '잘못된 이름',
        '이름은 영어로만 작성 가능합니다.',
        {text: 'OK', onPress: () => console.log('hi')},
        {cancelable: false},
      );
      return;
    } else if (!email.match(emailCheck)) {
      Alert.alert(
        '잘못된 이메일',
        '올바른 이메일 형식으로 작성 주세요.',
        {text: 'OK', onPress: () => console.log('hi')},
        {cancelable: false},
      );
      return;
    }
    usernameFieldRef.current.blur();
    passwordFieldRef.current.blur();
    fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }).then((resp) => {
      if (resp.status === 200) {
        setToastMessage(`회원가입이 성공적으로 완료되었습니다.${'\n'}
        클릭 시, 로그인 페이지로 이동합니다.`);
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
    });
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
        <View style={keyboardUp ? {display: 'none'} : styles.header}>
          <Text style={styles.headerText}>회원 가입</Text>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <View
              style={
                inputInFocus === 'username'
                  ? styles.inputLabelFocused
                  : styles.inputLabelBlurred
              }>
              <Text>Name</Text>
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
                <Icon name="user" type="simple-line-icon" color="#ceced0" />
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={
                inputInFocus === 'email'
                  ? styles.inputLabelFocused
                  : styles.inputLabelBlurred
              }>
              <Text>Email</Text>
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
                  color="#ceced0"
                />
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={
                inputInFocus === 'password'
                  ? styles.inputLabelFocused
                  : styles.inputLabelBlurred
              }>
              <Text>Password</Text>
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
                <Icon name="lock" type="material-community" color="#ceced0" />
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
        {toastMessage ? (
          <Toast
            handlePress={() => {
              setToastMessage('');
              blurAll();
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
    flex: 2 / 10,
    justifyContent: 'center',
    marginBottom: 5,
    fontSize: 14,
    color: 'black',
    minWidth: Dimensions.get('window').width - 90,
    // borderWidth: 3,
  },
  inputLabelBlurred: {
    flex: 2 / 10,
    justifyContent: 'center',
    marginBottom: 5,
    fontSize: 14,
    color: 'transparent',
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
