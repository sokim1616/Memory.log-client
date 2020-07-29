import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Toast from '../components/Toast';
import {emailCheck} from '../utils/emailCheck';

interface LoginProps {
  loginStatus: boolean;
}

const Signin: React.FC<LoginProps> = ({loginProps}) => {
  const {changeLogin, navigation} = loginProps;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputInFocus, setInputInFocus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  let emailFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();

  //username ==>
  const handleSubmit: () => void = () => {
    let body = JSON.stringify({email, password});
    if (!email.length || !password.length) {
      Alert.alert(
        'Empty Fields',
        'You must provide both email and password to log in',
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
        'Invalid E-mail Adress',
        'Please input a correct e-mail address',
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
        setToastMessage('Success! Press To Continue');
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
    <SafeAreaView onTouchStart={blurAll} style={styles.container}>
      <Text style={styles.header}>Memory.Log...in?</Text>
      <View style={styles.inputContainer}>
        <Text
          style={
            inputInFocus === 'email'
              ? styles.inputLabelFocused
              : styles.inputLabelBlurred
          }>
          E-mail
        </Text>
        <TextInput
          ref={emailFieldRef}
          style={styles.inputField}
          onFocus={() => setInputInFocus('email')}
          onBlur={() => setInputInFocus('')}
          placeholder="E-mail"
          onChangeText={(input) => handleInput(input, 'email')}
          selectTextOnFocus={true}
          textContentType="emailAddress"
          selectionColor="lightgreen"
          clearButtonMode="unless-editing"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text
          style={
            inputInFocus === 'password'
              ? styles.inputLabelFocused
              : styles.inputLabelBlurred
          }>
          Password
        </Text>
        <TextInput
          ref={passwordFieldRef}
          style={styles.inputField}
          onFocus={() => setInputInFocus('password')}
          onBlur={() => setInputInFocus('')}
          placeholder="Password"
          onChangeText={(input) => handleInput(input, 'password')}
          selectTextOnFocus={true}
          secureTextEntry={true}
          textContentType="password"
          selectionColor="lightgreen"
          clearButtonMode="unless-editing"
          autoCapitalize="none"
        />
      </View>
      <View
        style={styles.logInButtonContainer}
        onTouchEnd={() => {
          handleSubmit();
          blurAll();
        }}>
        <Text style={styles.logInButton}>Log In!</Text>
      </View>
      <View style={styles.signupButton}>
        <Text onPress={() => navigation.navigate('Signup')}>Sign Up?</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 0.1,
    paddingTop: 50,
    paddingHorizontal: 30,
    textAlignVertical: 'bottom',
    fontSize: 35,
    // borderWidth: 3,
  },
  inputContainer: {
    flex: 0.2,
    marginTop: 10,
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
  logInButtonContainer: {
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 30,
    backgroundColor: 'white',
    borderColor: 'grey',
  },
  logInButton: {
    color: 'black',
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  signupButton: {
    marginTop: 20,
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

export default Signin;
