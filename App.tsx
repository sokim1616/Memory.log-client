import React, {useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

import HomeStack from './src/stacks/HomeStack';
import Map from './src/stacks/Map';
import StoryBoard from './src/stacks/StoryBoard';

const AppTab = createMaterialBottomTabNavigator();

interface AppProps {}

Dimensions.addEventListener('change', () => {});

const App: React.FC<AppProps> = () => {
  return (
    <NavigationContainer>
      <AppTab.Navigator
        barStyle={{backgroundColor: 'black'}}
        initialRouteName="Home"
        inactiveColor="white"
        shifting={true}
        activeColor="yellow">
        <AppTab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarColor: 'black',
            tabBarBadge: true,
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <AppTab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarColor: 'darkviolet',
            tabBarLabel: 'Map',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />
            ),
          }}
        />
        <AppTab.Screen
          name="StoryBoard"
          component={StoryBoard}
          options={{
            tabBarColor: 'darkgreen',
            tabBarLabel: 'StoryBoard',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="image" color={color} size={26} />
            ),
          }}
        />
      </AppTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
