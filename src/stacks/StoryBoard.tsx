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
  
  //! 18 - 34 는 없어지는 코드, ---> 서버에서 사진 가져오는 코드로 
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
  //!
  // TODO: fetch 를 서버로 부터 받는것으로 수정해야합니다.
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
         {/* data mapping 여기서 */}
        {/* // * data.map */}
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

// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// const StoryBoard = () => {
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('https://localhost:4000/photo/rboard')
//        method: 'get'
//        body: {}
//       .then((response) => response.json())
//       .then((json) => setData(json.movies))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? <ActivityIndicator/> : (
//         <FlatList
//           data={data}
//           keyExtractor={({ id }, index) => id}
//           renderItem={({ item }) => (
//             <Text>{item.title}, {item.releaseYear}</Text>
//           )}
//         />
//       )}
//     </View>
//   );
// };
// export default StoryBoard