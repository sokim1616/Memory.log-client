import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { Avatar } from 'react-native-elements';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

interface HomeTwoProps {
  route;
}

const FriendStoryBoard: React.FC<HomeTwoProps> = ({ route }) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [friend, setFriend] = useState({});
  const { friendId } = route.params;

  const getFriendInfo = async () => {
    await fetch('http://localhost:4000/user/userinfobyid', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: friendId }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setFriend(res);
      });
  };

  const fetchPhotos = async () => {
    await fetch('http://localhost:4000/photo/fboard', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: friendId }),
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

  useFocusEffect(
    useCallback(() => {
      getFriendInfo();
    }, [friend.length]),
  );

  return (
    <>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <StoryBoardModal
        editable={false}
        setPreviewMode={setPreviewMode}
        previewMode={previewMode}
        currentPhoto={currentPhoto}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size="large"
            source={{ uri: friend.profilepath }}
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: { width: 2.5, height: 2.5 },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.headerText}>너의 추억 저장소..</Text>
          </View>
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
                source={{ uri: ele.filepath }}
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  headerText: {
    // fontFamily: 'Lobster-Regular',
    fontSize: 30,
    paddingLeft: 20,
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
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  photo: {
    flex: 1,
    height: Dimensions.get('screen').height / 8 - 12,
    borderRadius: 10,
    borderColor: 'blue',
  },
});

export default FriendStoryBoard;
