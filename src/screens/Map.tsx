import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/src/styles/colors';

// declare const global: {HermesInternal: null | {}};

const Map: React.FC<{}> = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Map</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});

export default Map;
