import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

import HomeStack from './src/stacks/HomeStack';
import Map from './src/screens/Map';

import ConfigStackContainer from './src/containers/ConfigStackContainer';
import StoryBoard from './src/stacks/StoryBoard';
import LoginStack from './src/stacks/LoginStack';

const AppTab = createMaterialBottomTabNavigator();

interface AppProps {
  loginStatus: boolean;
}

const App: React.FC<AppProps> = ({loginStatus}) => {
  return (
    <>
      <NavigationContainer>
        {loginStatus === false ? (
          <LoginStack />
        ) : (
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
                tabBarColor: '#838383',
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
                tabBarColor: '#d9adad',
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
                tabBarColor: '#ad9d9d',
                tabBarLabel: 'StoryBoard',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="image"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <AppTab.Screen
              name="Config"
              component={ConfigStackContainer}
              options={{
                tabBarColor: '#838383',
                tabBarLabel: 'Config',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="cog" color={color} size={26} />
                ),
              }}
            />
          </AppTab.Navigator>
        )}
      </NavigationContainer>
    </>
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
const mapStateToProps = (state: {loginReducer: {loginStatus: boolean}}) => ({
  loginStatus: state.loginReducer.loginStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<{type: string; loginStatus: boolean}>,
) => {
  return {
    changeLogin: (status: boolean) => dispatch(changeUserLoginStatus(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
