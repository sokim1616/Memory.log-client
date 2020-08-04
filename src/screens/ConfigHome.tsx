import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import ConfigButton from '../components/ConfigButton';
import Profile from '../components/Profile';
import {Button} from 'react-native-elements';
import About from '../components/About';

interface ConfigHomeProps {}
const ConfigHome: React.FC<ConfigHomeProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
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
        {/* <ConfigButton navigation={navigation} config="Logout" /> */}
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
  },
});

export default ConfigHome;
