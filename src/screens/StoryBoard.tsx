import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import StoryBoardModal from '../components/StoryBoardModal';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

interface HomeTwoProps {}

const StoryBoard: React.FC<HomeTwoProps> = ({}) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const fetchPhotos = async () => {
    await fetch('http://localhost:4000/photo/sboard', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        let resLength = res.length;
        if (resLength % 4 !== 0) {
          for (let i = 0; i < 4 - (resLength % 4); i++) {
            res.push('');
          }
        }
        setData(res);
        setDataLength(res.length);
      });
  };

  const activatePreview = (ele) => {
    setPreviewMode(!previewMode);
    setCurrentPhoto(ele);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [dataLength]),
  );

  return (
    <>
      <StoryBoardModal
        setPreviewMode={setPreviewMode}
        previewMode={previewMode}
        currentPhoto={currentPhoto}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>나의 추억 저장소..</Text>
        </View>
        <ScrollView contentContainerStyle={styles.photoScrollContainer}>
          {data.map((ele, i) => (
            <TouchableOpacity
              onPress={() => (ele ? activatePreview(ele) : null)}
              key={i}
              style={styles.photoView}>
              <Image
                resizeMode="cover"
                style={styles.photo}
                source={{uri: ele.filepath}}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  headerText: {
    // fontFamily: 'Lobster-Regular',
    fontSize: 30,
    // fontWeight: 'bold',
  },
  photoScrollView: {
    flex: 1,
  },
  photoScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  photoView: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
    minWidth: Dimensions.get('window').width / 4 - 18,
    maxWidth: 93,
    shadowColor: '#ff5555',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2.5},
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  photo: {
    flex: 1,
    height: Dimensions.get('screen').height / 8 - 12,
    borderRadius: 5,
    borderColor: 'blue',
  },
});

export default StoryBoard;
