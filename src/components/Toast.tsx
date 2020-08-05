import React from 'react';
import {Dimensions, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {} from 'react-native-gesture-handler';

interface ToastProps {
  message: string;
  handlePress: () => void;
}

const Toast: React.FC<ToastProps> = ({message, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.toastContainer}>
      <Text style={styles.tostMessage}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flex: 0.3,
    minWidth: Dimensions.get('window').width * 0.8,
    maxWidth: Dimensions.get('window').width * 0.9,
    minHeight: Dimensions.get('window').height * 0.08,
    position: 'absolute',
    // borderWidth: 0.5,
    borderRadius: 5,
    bottom: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgb(85,135,216)',
    paddingHorizontal: 20,
  },
  tostMessage: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default Toast;
