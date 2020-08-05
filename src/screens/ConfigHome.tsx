/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import Profile from '../components/Profile';
import {Button} from 'react-native-elements';
import About from '../components/About';
import Server from '../utils/Server';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

interface ConfigHomeProps {}

const ConfigHome: React.FC<ConfigHomeProps> = ({loginProps}) => {
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
      <FocusAwareStatusBar barStyle={'light-content'} />
      <Text style={styles.title}>내 프로필</Text>
      <View style={styles.divideline} />
      <View style={styles.upperView}>
        <Profile />
      </View>
      <View style={styles.divideline} />
      <View style={styles.midView}>
        <About />
      </View>
      <View style={styles.divideline} />
      <View style={styles.lowerView}>
        <Button
          onPress={requestSignout}
          title="LOGOUT"
          raised
          containerStyle={{marginTop: 30}}
          buttonStyle={{
            backgroundColor: 'rgba(255,0,0,0.75)',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  divideline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  upperView: {
    flex: 2,
  },
  midView: {
    flex: 6,
  },
  lowerView: {
    flex: 2,
    marginHorizontal: 50,
  },
});

export default ConfigHome;
