import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Camera from '../screens/Camera';
import Map from '../screens/Map';
import HomeThree from '../screens/HomeThree';

const HomeStackNav = createStackNavigator();

const HomeStack: React.FC<{}> = () => {
  return (
    <HomeStackNav.Navigator
      initialRouteName="HomeOne"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStackNav.Screen name="Camera" component={Camera} />
      <HomeStackNav.Screen name="HomeTwo" component={Map} />
      <HomeStackNav.Screen name="HomeThree" component={HomeThree} />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
