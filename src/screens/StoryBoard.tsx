import React, {useState, useEffect} from 'react';
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
interface HomeTwoProps {}
const StoryBoard: React.FC<HomeTwoProps> = (navigation) => {
  const [photos, getPhotos] = useState([]);
  const [data, setData] = useState([]);
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
  useEffect(() => {
    const getData = async () => {
      await fetch('http://localhost:4000/photo/sboard', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setData(res);
        });
    };
    getData();
  }, [data]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.photoScrollContainer}>
        {data.map((ele, i) => (
          <View key={i} style={styles.photoView}>
            <Image
              resizeMode="cover"
              style={styles.photo}
              source={{uri: ele.filepath}}
            />
          </View>
        ))}
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
