import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

import HomeStackContainer from './src/containers/HomeStackContainer';
import Map from './src/screens/Map';

import ConfigStackContainer from './src/containers/ConfigStackContainer';
import StoryBoardStack from './src/stacks/StoryBoardStack';
import LoginStack from './src/stacks/LoginStack';
import ListStack from './src/stacks/ListStack';
import { GoogleSignin } from '@react-native-community/google-signin';

const googleSigninConfigure = async () => {
  await GoogleSignin.configure({
    webClientId:
      '1016803348653-4rp34s6osjbodua826bjebe427m60568.apps.googleusercontent.com',
    offlineAccess: false,
  });
};

const AppTab = createMaterialBottomTabNavigator();

interface AppProps {
  loginStatus: boolean;
}

const App: React.FC<AppProps> = ({ loginStatus, buttonsVisibilityStatus }) => {
  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
    <>
      <NavigationContainer>
        {loginStatus === false ? (
          <LoginStack />
        ) : (
          <AppTab.Navigator
            labeled={false}
            barStyle={{
              backgroundColor: 'black',
            }}
            initialRouteName="Home"
            shifting={true}
            inactiveColor={buttonsVisibilityStatus ? '#555555' : 'black'}
            activeColor={buttonsVisibilityStatus ? 'white' : 'black'}>
            <AppTab.Screen
              name="ListStack"
              component={ListStack}
              options={{
                // tabBarColor: '#ad9d9d',
                tabBarLabel: 'list',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="format-list-bulleted"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <AppTab.Screen
              name="Map"
              component={Map}
              options={{
                // tabBarColor: 'lightblue',
                tabBarLabel: 'Map',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="map" color={color} size={26} />
                ),
              }}
            />
            <AppTab.Screen
              name="Home"
              component={HomeStackContainer}
              options={{
                tabBarColor: 'black',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    style={styles.mainButton}
                    name="camera"
                    color={color}
                    size={40}
                  />
                ),
              }}
            />
            <AppTab.Screen
              name="StoryBoard"
              component={StoryBoardStack}
              options={{
                // tabBarColor: '#ad9d9d',
                tabBarLabel: 'StoryBoard',
                tabBarIcon: ({ color }) => (
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
                // tabBarColor: '#838383',
                tabBarLabel: 'Config',
                tabBarIcon: ({ color }) => (
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
  mainButton: {
    alignContent: 'center',
    textAlign: 'center',
    width: 60,
    height: 60,
  },
});
const mapStateToProps = (state: {
  loginReducer: { loginStatus: boolean };
  cameraReducer: { buttonsVisibilityStatus: boolean };
}) => ({
  loginStatus: state.loginReducer.loginStatus,
  buttonsVisibilityStatus: state.cameraReducer.buttonsVisibilityStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<{ type: string; loginStatus: boolean }>,
) => {
  return {
    changeLogin: (status: boolean) => dispatch(changeUserLoginStatus(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
