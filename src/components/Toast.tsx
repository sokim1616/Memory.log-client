import React from 'react';
import {Dimensions, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

interface ToastProps {
  message: string;
  handlePress: () => void;
}

const Toast: React.FC<ToastProps> = ({message, handlePress}) => {
  return (
    <Modal
      animationIn="bounceInUp"
      animationInTiming={500}
      animationOut="bounceOutDown"
      animationOutTiming={500}
      backdropColor="transparent"
      isVisible={message ? true : false}>
      <TouchableOpacity onPress={handlePress} style={styles.toastContainer}>
        <Text style={styles.tostMessage}>{message}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    borderRadius: 50,
    bottom: 60,
    width: 350,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(36,69,83,0.75)',
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
