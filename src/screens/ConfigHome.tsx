import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import ConfigButton from '../components/ConfigButton';
import Profile from '../components/Profile';
import { Button } from 'react-native-elements';
import About from '../components/About'

interface ConfigHomeProps { }
const ConfigHome: React.FC<ConfigHomeProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.25 }}>
        <View style={{ flex: 0.3, paddingLeft: 10 }}>
          <Text style={styles.title}>내 프로필</Text>
        </View>
        <View style={{ flex: 0.7, paddingHorizontal: 10 }}>
          <Profile />
        </View>
      </View>
      <View style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
        <View style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
          <About />
        </View>
        <View style={{ flex: 0.25 }}>
          <ConfigButton navigation={navigation} config="Logout" />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    // fontFamily: 'Lobster-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ConfigHome;

