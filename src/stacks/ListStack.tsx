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

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'black',
            shadowOpacity: 0,
          },
          headerTitle: 'Memory.log',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'Lobster-Regular',
            fontSize: 24,
          },
        }}
        name="FriendList"
        component={FriendList}
      />
    </Stack.Navigator>
  );
};

export default ListStack;
