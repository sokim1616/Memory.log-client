import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninContainer from '../containers/SigninContainer';
import SignupContainer from '../containers/SignupContainer';
import Signout from '../screens/Signout';

type LoginStackParamList = {
  SigninContainer: undefined;
  SignupContainer: undefined;
  Signout: undefined;
};

const LoginStackNav = createStackNavigator<LoginStackParamList>();

const LoginStack: React.FC<{}> = () => {
  return (
    <LoginStackNav.Navigator initialRouteName="Signin">
      <LoginStackNav.Screen name="Log in" component={SigninContainer} />
      <LoginStackNav.Screen name="Sign up" component={SignupContainer} />
      <LoginStackNav.Screen name="Sign out" component={Signout} />
    </LoginStackNav.Navigator>
  );
};

export default LoginStack;
