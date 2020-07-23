import React from 'react';
import {Dimensions, SafeAreaView, Button, Text, StyleSheet} from 'react-native';

interface SignoutProps {}

const Signout: React.FC<SignoutProps> = ({loginProps}) => {
  const {changeLogin} = loginProps;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Signout</Text>
      <Button onPress={() => changeLogin(false)} title="signout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default Signout;
