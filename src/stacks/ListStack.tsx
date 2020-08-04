import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FriendList from '../screens/FriendList';
import FriendSearch from '../screens/FriendSearch';
import FriendStoryBoard from '../screens/FriendStoryBoard';

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          shadowOpacity: 0,
        },
        headerTitle: '   Memory.log   ',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'Lobster-Regular',
          fontSize: 24,
        },
      }}>
      <Stack.Screen name="FriendList" component={FriendList} />
      <Stack.Screen name="FriendSearch" component={FriendSearch} />
      <Stack.Screen name="FriendStoryBoard" component={FriendStoryBoard} />
    </Stack.Navigator>
  );
};

export default ListStack;
