import React, {useState} from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
interface ProfileProps {
}
const Profile: React.FC<ProfileProps> = ({}) => {
    const [userState, setUserState] = useState({
        id: 1,
        username: 'zombie',
        email: 'z1@gmail.com',
        password: 12345678,
        profilepath: '',
        statusmessage:''
    })
    return (
        <SafeAreaView style={styles.container}>
        {/* 위뷰시작 */}
        <View style={styles.upperContainer}>
          <Image
            style={styles.userImage}
            source={require('../assets/image/dafault_profile.jpg')}
          />
          <View style={styles.userContentContainer}>
            <Text style={styles.userName}>{userState.username}</Text>
            <Text style={styles.userStatus}>{userState.statusmessage}</Text>
          </View>
        </View>
        </SafeAreaView>
    );
}
const options = {
  title: 'Load Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    Alert.alert(response.customButton);
  } else {
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    setImageSource(response.uri);
  }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    upperContainer: {
      flex: 2.5,
      flexDirection: 'row',
    },
    userImage: {
      flex: 4,
      width: 50,
      height: 180,
    },
    userContentContainer: {
      flex: 5,
      borderRadius: 1,
      backgroundColor: '#eaeaea',
    },
    userName: {
      flex: 5,
      textAlign: 'center',
      fontSize: 50,
    },
    userStatus: {
      flex: 5,
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 0,
      marginHorizontal: 10,
    },
});

export default Profile;

// * 프로필에 관한것