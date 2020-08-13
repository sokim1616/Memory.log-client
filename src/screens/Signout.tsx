import React from 'react';
import {Alert, SafeAreaView, Button, Text, StyleSheet} from 'react-native';
import Server from '../utils/Server';
import {GoogleSignin} from '@react-native-community/google-signin';


interface SignoutProps {}

const Signout: React.FC<SignoutProps> = ({loginProps}) => {
  const {changeLogin} = loginProps;

  const requestSignout: () => void = async () => {
    let url = `http://${Server.server}/user/signout`;
    let options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    };
    await fetch(url, options).then((res) => {
      if (res.status === 200 || res.status === 400) {
        signOut();
        changeLogin(false);
      } else {
        throw new Error('bad signout request');
      }
    });
  };

   const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString())
    }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text>Signout</Text>
      <Button onPress={async () => await requestSignout()} title="signout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default Signout;