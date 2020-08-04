import React from 'react';
import {Dimensions, SafeAreaView, Button, Text, StyleSheet} from 'react-native';
import Server from '../utils/Server';

interface SignoutProps {}

const Signout: React.FC<SignoutProps> = ({loginProps}) => {
  const {changeLogin} = loginProps;

  const requestSignout: () => void = async () => {
    console.log(Server.server);
    let url = `http://${Server.server}/user/signout`;
    let options = {
      method: 'POST',
      // mode: 'cors',
      // credentials: 'include',
    };
    await fetch(url, options).then((res) => {
      if (res.status === 200 || res.status === 400) {
        changeLogin(false);
      } else {
        throw new Error('bad signout request');
      }
    });
  };

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
