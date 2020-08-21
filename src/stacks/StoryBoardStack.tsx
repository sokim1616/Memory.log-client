import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoryBoardContainer from '../containers/StoryBoardContainer';

const StoryBoardStackNav = createStackNavigator();

interface HomeTwoProps {}

const StoryBoardStack: React.FC<HomeTwoProps> = () => {
  return (
    <StoryBoardStackNav.Navigator
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
      <StoryBoardStackNav.Screen
        name="StoryBoard"
        component={StoryBoardContainer}
      />
    </StoryBoardStackNav.Navigator>
  );
};

export default StoryBoardStack;
