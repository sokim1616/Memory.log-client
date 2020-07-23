import React from 'react';
import SignoutContainer from '../containers/SignoutContainer';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet, Dimensions} from 'react-native';
import ConfigHome from '../screens/ConfigHome';

interface ConfigStackProps {}

const ConfigStackNav = createStackNavigator<ConfigStackParamList>();

const ConfigStack: React.FC<ConfigStackProps> = ({configProps}) => {
  const {loginStatus, changeLogin} = configProps;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <ConfigStackNav.Navigator
        initialRouteName="ConfigHome"
        screenOptions={{
          headerStyle: {backgroundColor: '#cf3c3c'},
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <ConfigStackNav.Screen name="ConfigHome" component={ConfigHome} />
        <ConfigStackNav.Screen name="SignOut" component={SignoutContainer} />
      </ConfigStackNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  configScrollView: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: 'grey',
  },
});

export default ConfigStack;
