/*
 * TODO:
 * 이 파일에서는 스크린 폴더에 있는 친구목록에 관련한
 * 모든 파일들을 불러와준 뒤, 스택 별로 뿌려줍니다.
 *
 * 친구리스트에 필요한 기본 화면 1개, 스크린화면 4개
 *
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FriendList from '../screens/FriendList';
import FriendSearch from '../screens/FriendSearch';

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          shadowOpacity: 0,
        },
        headerTitle: 'F r i e n d L i s t',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'Lobster-Regular',
          fontSize: 24,
        },
      }}>
      <Stack.Screen name="FriendList" component={FriendList} />
      <Stack.Screen name="FriendSearch" component={FriendSearch} />
    </Stack.Navigator>
  );
};

export default ListStack;
