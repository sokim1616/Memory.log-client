import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninContainer from '../containers/SigninContainer';
import SignupContainer from '../containers/SignupContainer';
import Camera from '../screens/Camera';

type LoginStackParamList = {
  SigninContainer: undefined;
  SignupContainer: undefined;
  Signout: undefined;
};

const LoginStackNav = createStackNavigator<LoginStackParamList>();

const LoginStack: React.FC<{}> = () => {
  return (
    <LoginStackNav.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: 'black',
        //   shadowOpacity: 0,
        // },
        // headerTitle: '   Memory.log   ',
        // headerTintColor: 'white',
        // headerTitleStyle: {
        //   fontFamily: 'Lobster-Regular',
        //   fontSize: 24,
        // },
      }}>
      <LoginStackNav.Screen name="Signin" component={SigninContainer} />
      <LoginStackNav.Screen name="Signup" component={SignupContainer} />
      <LoginStackNav.Screen name="camera" component={Camera} />
    </LoginStackNav.Navigator>
  );
};

export default LoginStack;
