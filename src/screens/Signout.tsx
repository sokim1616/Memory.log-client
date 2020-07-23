import React from 'react';
import {SafeAreaView, Text} from 'react-native';

interface SignoutProps {}

const Signout: React.FC<SignoutProps> = ({}) => {
  return (
    <SafeAreaView>
      <Text>Signout</Text>
    </SafeAreaView>
  );
};

export default Signout;
