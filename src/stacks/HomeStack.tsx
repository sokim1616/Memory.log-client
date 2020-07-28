import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraContainer from '../containers/CameraContainer';

const HomeStackNav = createStackNavigator();

const HomeStack: React.FC<{}> = ({homeStackProps}) => {
  const {buttonsVisibilityStatus} = homeStackProps;

  return (
    <HomeStackNav.Navigator
      initialRouteName="Camera"
      screenOptions={{
        headerStyle: {backgroundColor: '#838383'},
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStackNav.Screen
        options={{
          headerStyle: {
            backgroundColor: 'black',
            shadowOpacity: 0,
          },
          headerTitle: 'Memory.Log',
          headerTintColor: buttonsVisibilityStatus ? 'white' : 'black',
          headerTitleStyle: {
            fontFamily: 'Lobster-Regular',
            fontSize: 24,
          },
        }}
        name="Camera"
        component={CameraContainer}
      />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
