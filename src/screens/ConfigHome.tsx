import React from 'react';
import {
  ScrollView,
  Text,
  View,
  SectionList,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ConfigButton from '../components/ConfigButton';
import Profile from '../components/Profile'
interface ConfigHomeProps { }
const ConfigHome: React.FC<ConfigHomeProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>
          My profile
        </Text>
        <Profile />
      </View>
        <ConfigButton navigation={navigation} config="Logout" />
        <ConfigButton config="something" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: 'Cochin',
    fontSize: 23,
    fontWeight: 'bold'
  }
})
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