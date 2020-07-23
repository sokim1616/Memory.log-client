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
    borderRadius: 40,
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
  },
  tostMessage: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Toast;
