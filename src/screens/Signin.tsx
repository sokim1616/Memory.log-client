import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import Toast from '../components/Toast';

interface LoginProps {
  loginStatus: boolean;
}

const Signin: React.FC<LoginProps> = ({loginProps}) => {
  const {changeLogin, navigation} = loginProps;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputInFocus, setInputInFocus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  let usernameFieldRef: Ref = React.createRef();
  let passwordFieldRef: Ref = React.createRef();

  const handleSubmit: () => null = () => {
    let body = JSON.stringify({username, password});
    if (!username.length || !password.length) {
      Alert.alert(
        'Empty Fields',
        'You must provide both username and password to log in',
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
    } else if (username.match(/[^\s-_a-zA-Z0-9]/)) {
      Alert.alert(
        'Invalid Username',
        'Username can only contain alphanumeric characters.',
        {text: 'OK', onPress: () => console.log('hi')},
        {cancelable: false},
      );
      return;
    }
    usernameFieldRef.current.blur();
    passwordFieldRef.current.blur();
    fetch('http://localhost:4000/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }).then((resp) => {
      if (resp.status === 205) {
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
      case 'username':
        setUsername(input);
        break;
      case 'password':
        setPassword(input);
    }
  };

  const blurAll = () => {
    passwordFieldRef.current.blur();
    usernameFieldRef.current.blur();
  };

  // TODO: Animationa implementation
  // const [labelOpacity, setOpacity] = useState(new Animated.Value(1));

  // const fadeOut = () => {
  //   Animated.timing(labelOpacity, {
  //     toValue: 0,
  //     easing: Easing.back(),
  //     duration: 200,
  //   }).start();
  // };

  // const fadeIn = () => {
  //   Animated.timing(labelOpacity, {
  //     toValue: 1,
  //     easing: Easing.back(),
  //     duration: 200,
  //   }).start();
  // };

  return (
    <SafeAreaView onTouchStart={blurAll} style={styles.container}>
      <Text style={styles.header}>Memory.Log...in?</Text>
      <View style={styles.inputContainer}>
        <Text
          style={
            inputInFocus === 'username'
              ? styles.inputLabelFocused
              : styles.inputLabelBlurred
          }>
          Username
        </Text>
        <TextInput
          ref={usernameFieldRef}
          style={styles.inputField}
          onFocus={() => setInputInFocus('username')}
          onBlur={() => setInputInFocus('')}
          placeholder="Username"
          onChangeText={(input) => handleInput(input, 'username')}
          selectTextOnFocus={true}
          textContentType="username"
          selectionColor="lightgreen"
          clearButtonMode="unless-editing"
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
        <Text onPress={() => navigation.navigate('Sign up')}>Sign Up?</Text>
      </View>
      {toastMessage ? (
        <Toast
          handlePress={() => {
            setToastMessage('');
            usernameFieldRef.current.clear();
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
    flex: 0.2,
    paddingTop: 130,
    paddingHorizontal: 30,
    textAlignVertical: 'bottom',
    fontSize: 35,
  },
  inputContainer: {
    flex: 0.14,
    marginTop: 10,
    // borderWidth: 3,
  },
  inputLabelFocused: {
    flex: 0.2,
    marginLeft: 25,
    marginTop: 10,
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
    marginTop: 10,
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
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 50,
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
});

export default Signin;
