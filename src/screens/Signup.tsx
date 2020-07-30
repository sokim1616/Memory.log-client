import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import Toast from '../components/Toast';
import {StackNavigationProp} from '@react-navigation/stack';
import {emailCheck} from '../utils/emailCheck';
import {SafeAreaView} from 'react-native-safe-area-context';

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
        'Empty Fields',
        'All fields must be filled in',
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
    } else if (!email.match(emailCheck)) {
      Alert.alert(
        'Invalid E-mail Adress',
        'Please input a correct e-mail address',
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
        setToastMessage('Success! Press To Log In');
      } else if (resp.status === 409) {
        setToastMessage('User already exists. Please try another e-mail.');
      } else {
        setToastMessage('Sorry cannot process your request now');
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
    <SafeAreaView onTouchStart={blurAll} style={styles.container}>
      <View style={keyboardUp ? {display: 'none'} : styles.header}>
        <Text style={styles.headerText}>Please sign up!</Text>
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
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
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

          <TextInput
            ref={emailFieldRef}
            style={styles.inputField}
            onFocus={() => setInputInFocus('email')}
            onBlur={() => setInputInFocus('')}
            placeholder="Email"
            onChangeText={(input) => handleInput(input, 'email')}
            selectTextOnFocus={true}
            textContentType="emailAddress"
            selectionColor="lightgreen"
            clearButtonMode="unless-editing"
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            keyboardType="email-address"
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
            enablesReturnKeyAutomatically={true}
          />
        </View>
      </View>

      <View style={styles.buttonSection}>
        <View
          style={styles.logInButtonContainer}
          onTouchEnd={() => {
            handleSubmit();
          }}>
          <Text style={styles.logInButton}>Sign Up!</Text>
        </View>
        <View style={styles.signupButton}>
          <Text onPress={() => navigation.navigate('Signin')}>
            Already have an account?
          </Text>
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
    flex: 0.3,
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    fontSize: 30,
    // borderWidth: 4,
  },
  headerText: {
    fontSize: 30,
    // borderWidth: 3,
  },
  inputSection: {
    flex: 1,
    // borderWidth: 3,
  },
  inputContainer: {
    flex: 1,
    // borderWidth: 3,
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
  buttonSection: {
    flex: 1,
    // borderWidth: 3,
  },
  logInButtonContainer: {
    alignItems: 'center',
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

export default Signup;
