import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

interface HomeTwoProps { }

const StoryBoard: React.FC<HomeTwoProps> = (navigation) => {
  const [photos, getPhotos] = useState([]);
  
  //!
  // TODO: fetch 를 서버로 부터 받는것으로 수정해야합니다.
  const fetchPhotos = async () => {
    try {
      let camPhotos = await CameraRoll.getPhotos({
        first: 1000,
        groupTypes: 'Album',
        groupName: 'MemoryLog',
        include: ['location'],
      });
      for (let photo of camPhotos.edges) {
        console.log(photo.node.location);
      }
      getPhotos(camPhotos.edges);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const photoUpdate = async () => {
      let camPhotos = await CameraRoll.getPhotos({
        first: 1000,
        groupTypes: 'Album',
        groupName: 'MemoryLog',
        include: ['location'],
      });
      getPhotos(camPhotos.edges);
    };
    photoUpdate();
    const cleanup = () => {
      getPhotos(null);
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.photoScrollContainer}>
        {photos.map((photo, i) => {
          return (
            <View style={styles.photoView}>
              <Image
                resizeMode="cover"
                key={i}
                style={styles.photo}
                source={{ uri: photo.node.image.uri }}
              />
            </View>
          );
        })}
      </ScrollView>
      {/* <Text style={{fontSize: 50, fontWeight: 'bold'}}>HomeTwo</Text>
      <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      <Button
        title="homeThree"
        onPress={() => navigation.navigate('HomeThree')}
      /> */}
      {/* //! get Photos 버튼삭제 */}
      {/* <Button title="get photos" onPress={() => fetchPhotos()} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  photoScrollView: {
    flex: 1,
  },
  photoScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  photoView: {
    flex: 0.25,
    flexDirection: 'row',
    minWidth: Dimensions.get('window').width / 4 - 1,
    maxWidth: 93,
    minHeight: Dimensions.get('window').height / 7 - 12,
    maxHeight: 104,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  photo: {
    flex: 1,
    margin: 2,
    minWidth: Dimensions.get('window').width / 4 - 12 - 2,
    maxWidth: 100 - 10,
    minHeight: Dimensions.get('window').height / 7 - 12 - 2,
    maxHeight: 104 - 2,
  },
});

export default StoryBoard;


// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import {white} from 'react-native-paper/lib/typescript/src/styles/colors';

// //TODO: <Stack.Navigator> 만들기

// const StoryBoard: React.FC<{}> = () => {
//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={{color: 'black', fontWeight: 'bold'}}>StoryBoard</Text>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'lightblue',
//   },
// });

// export default StoryBoard;
