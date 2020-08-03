import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

interface HomeTwoProps {}
const Stack = createStackNavigator();
const StoryBoard: React.FC<HomeTwoProps> = ({}) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);

  const fetchPhotos = async () => {
    await fetch('http://localhost:4000/photo/sboard', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('aaaa', res);
        setData(res);
        setDataLength(res.length);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [dataLength]),
  );

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
