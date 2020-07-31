import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import ConfigButton from '../components/ConfigButton';
import Profile from '../components/Profile';
interface ConfigHomeProps {}
const ConfigHome: React.FC<ConfigHomeProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.25}}>
        <View style={{flex: 0.2, paddingLeft: 10}}>
          <Text style={styles.title}>My profile</Text>
        </View>
        <View style={{flex: 0.8, paddingHorizontal: 10}}>
          <Profile />
        </View>
      </View>
      <View style={{flex: 0.7}}>
        <ConfigButton navigation={navigation} config="Logout" />
        {/* <ConfigButton config="something" /> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
// const options = {
//   title: 'Load Photo',
//   customButtons: [
//     { name: 'button_id_1', title: 'CustomButton 1' },
//     { name: 'button_id_2', title: 'CustomButton 2' }
//   ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
// ImagePicker.showImagePicker(options, (response) => {
//   console.log('Response = ', response);
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   } else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   } else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//     Alert.alert(response.customButton);
//   } else {
//     // You can also display the image using data:
//     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//     setImageSource(response.uri);
//   }
// });
export default ConfigHome;
