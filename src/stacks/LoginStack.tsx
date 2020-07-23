import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninContainer from '../containers/SigninContainer';
import SignupContainer from '../containers/SignupContainer';

type LoginStackParamList = {
  SigninContainer: undefined;
  SignupContainer: undefined;
  Signout: undefined;
};

const LoginStackNav = createStackNavigator<LoginStackParamList>();

const LoginStack: React.FC<{}> = () => {
  return (
    <LoginStackNav.Navigator initialRouteName="Signin">
      <LoginStackNav.Screen name="Signin" component={SigninContainer} />
      <LoginStackNav.Screen name="Signup" component={SignupContainer} />
    </LoginStackNav.Navigator>
  );
};

export default LoginStack;
