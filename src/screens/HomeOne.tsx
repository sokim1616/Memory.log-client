import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

interface HomeOneProps {
  navigation: {};
}

const HomeOne: React.FC<HomeOneProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, fontWeight: 'bold'}}>HomeOne</Text>
      <Button title="homeTwo" onPress={() => navigation.navigate('HomeTwo')} />
      <Button
        title="homeThree"
        onPress={() => navigation.navigate('HomeThree')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeOne;
