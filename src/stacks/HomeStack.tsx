import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeOne from '../screens/HomeOne';
import HomeTwo from '../screens/HomeTwo';
import HomeThree from '../screens/HomeThree';

const HomeStackNav = createStackNavigator();

const HomeStack: React.FC<{}> = () => {
  return (
    <HomeStackNav.Navigator initialRouteName="HomeOne">
      <HomeStackNav.Screen name="HomeOne" component={HomeOne} />
      <HomeStackNav.Screen name="HomeTwo" component={HomeTwo} />
      <HomeStackNav.Screen name="HomeThree" component={HomeThree} />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
