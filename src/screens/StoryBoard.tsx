import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import StoryBoardModal from '../components/StoryBoardModal';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import StoryBoardPhoto from '../components/StoryBoardPhoto';
import Server from '../utils/Server';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface HomeTwoProps {}

const StoryBoard: React.FC<HomeTwoProps> = ({}) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [userState, setUserState] = useState({}); // 로그인 사용자의 정보
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteList, setDeleteList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [userState.length]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [dataLength]),
  );

  const deletePhotos = async (photos) => {
    for (let photo of photos) {
      let resp = await fetch(`http://${Server.server}/photo/dphoto`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filepath: photo,
        }),
      });
    }
    await fetchPhotos();
  };

  const handleDeleteIconPress = () => {
    if (!deleteMode) setDeleteMode(true);
    else {
      if (deleteList.length) {
        setDeleteList([]);
        Alert.alert(
          `사진 삭제`,
          `${deleteList.length}장의 사진을 지우시곘습니까 ?`,
          [
            {
              text: '예',
              onPress: () => {
                deletePhotos(deleteList);
              },
            },
            {
              text: '아니요',
            },
          ],
          {cancelable: false},
        );
      }
      setDeleteMode(!deleteMode);
    }
  };

  const handlePhotoTouch = (ele) => {
    if (deleteMode) return;
    ele ? activatePreview(ele) : null;
  };

  const handleAddToDeleteList = (path) => {
    if (deleteList.includes(path)) {
      let newList = deleteList.filter((el) => el !== path);
      setDeleteList(newList);
    } else {
      setDeleteList([...deleteList, path]);
    }
  };

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

  const getUserInfo = () => {
    return fetch('http://localhost:4000/user/logininfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setUserState(res[0]);
      })
      .catch((err) => console.error(err));
  };

  const activatePreview = (ele) => {
    setPreviewMode(!previewMode);
    setCurrentPhoto(ele);
  };

  return (
    <>
      <StoryBoardModal
        editable={true}
        setPreviewMode={setPreviewMode}
        previewMode={previewMode}
        currentPhoto={currentPhoto}
      />
      <FocusAwareStatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size="large"
            source={{uri: userState.profilepath}}
            containerStyle={styles.avatarContainer}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>나의 추억 저장소..</Text>
          </View>
          <TouchableOpacity
            onPress={handleDeleteIconPress}
            style={styles.deleteIconContainer}>
            <MaterialCommunityIcons
              name={deleteMode ? 'delete-empty' : 'delete'}
              style={styles.deleteIcon}
              color={'black'}
            />
            {deleteList.length ? (
              <View style={styles.deleteListCounterContainer}>
                <Text style={styles.deleteListCounter}>
                  {deleteList.length}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.photoScrollContainer}>
          {data.map((ele, i) => (
            <StoryBoardPhoto
              key={i}
              photo={ele}
              deleteMode={deleteMode}
              deleteList={deleteList}
              handlePhotoTouch={handlePhotoTouch}
              handleAddToDeleteList={handleAddToDeleteList}
            />
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
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    paddingLeft: 20,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  deleteIcon: {
    fontSize: 50,
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
  deleteListCounterContainer: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 1,
  },
  deleteListCounter: {
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default StoryBoard;
