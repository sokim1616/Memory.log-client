import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeOne from './HomeOne';
import HomeTwo from './HomeTwo';
import HomeThree from './HomeThree';

// declare const global: {HermesInternal: null | {}};

const HomeStackNav = createStackNavigator();

const HomeStack: React.FC<{}> = () => {
  return (
    <HomeStackNav.Navigator initialRouteName="HomeOne">
      <HomeStackNav.Screen name="HomeOne" component={HomeOne} />
      <HomeStackNav.Screen name="HomeTwo" component={HomeTwo} />
      <HomeStackNav.Screen name="HomeThree" component={HomeThree} />
      {/* <View style={styles.container}> */}
      {/* <Text style={{color: 'black', fontWeight: 'bold'}}>HOME</Text> */}
      {/* </View> */}
    </HomeStackNav.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeStack;
