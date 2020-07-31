import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

interface ConfigButtonProps {}

const ConfigButton: React.FC<ConfigButtonProps> = ({config, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SignOut')}
      style={styles.configButtonContainer}>
      <Text style={styles.configButtonContent}>{config}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  configButtonContainer: {
    flex: 1,
    paddingLeft: 20,
    minHeight: Dimensions.get('screen').height * 0.1,
    justifyContent: 'center',
  },
  configButtonContent: {
    fontSize: 16,
  },
});

export default ConfigButton;
