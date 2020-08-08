import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  Share,
} from 'react-native';
import { Avatar } from 'react-native-elements';
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
  const [selectionList, setSelectionList] = useState([]);
  const [shareMode, setShareMode] = useState(false);

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

  const handleShareIconPress = async () => {
    setSelectionList([]);
    if (deleteMode) {
      setDeleteMode(false);
    }
    setShareMode(!shareMode);
    if (selectionList.length) {
      console.log(selectionList);
    }
  };

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
    if (shareMode) {
      setShareMode(false);
    }
    if (!deleteMode) {
      setDeleteMode(true);
    } else {
      if (selectionList.length) {
        setSelectionList([]);
        Alert.alert(
          '사진 삭제',
          `${selectionList.length}장의 사진을 지우시곘습니까 ?`,
          [
            {
              text: '예',
              onPress: () => {
                deletePhotos(selectionList);
              },
            },
            { text: '아니요' },
          ],
          { cancelable: false },
        );
      }
      setDeleteMode(!deleteMode);
    }
  };

  const handlePhotoTouch = (ele) => {
    if (deleteMode || shareMode) {
      return;
    }
    ele ? activatePreview(ele) : null;
  };

  const handleAddToSelectionList = async (path, mode) => {
    if (mode === 'delete') {
      if (selectionList.includes(path)) {
        let newList = selectionList.filter((el) => el !== path);
        setSelectionList(newList);
      } else {
        setSelectionList([...selectionList, path]);
      }
    } else {
      setSelectionList([path]);
      try {
        const result = await Share.share({
          url: path,
        });
        console.log(result);
        if (result.action === Share.sharedAction) {
          Alert.alert(
            '사진 공유!',
            '사진이 공유 되었습니다!',
            [{ text: '예' }],
            {
              cancelable: false,
            },
          );
        } else if (result.action === Share.dismissedAction) {
          null;
        } else {
          Alert.alert(
            '사진 공유!',
            '사진이 공유를 실패했습니다.',
            [{ text: '예' }],
            {
              cancelable: false,
            },
          );
        }
        setSelectionList([]);
        setShareMode(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchPhotos = async () => {
    await fetch(`http://${Server.server}/photo/sboard`, {
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
    return fetch(`http://${Server.server}/user/logininfo`, {
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
            source={{ uri: userState.profilepath }}
            containerStyle={styles.avatarContainer}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>나의 추억 저장소..</Text>
          </View>
        </View>
        <ScrollView
          fadingEdgeLength={100}
          contentContainerStyle={styles.photoScrollContainer}>
          {data.map((ele, i) => (
            <StoryBoardPhoto
              key={i}
              photo={ele}
              shareMode={shareMode}
              deleteMode={deleteMode}
              selectionList={selectionList}
              handlePhotoTouch={handlePhotoTouch}
              handleAddToSelectionList={handleAddToSelectionList}
            />
          ))}
        </ScrollView>
        <View style={styles.utilButtonsContainer}>
          {/* <Button onPress={onShare} title="Share" /> */}
          <TouchableOpacity
            onPress={handleShareIconPress}
            style={styles.shareIconContainer}>
            <MaterialCommunityIcons
              name={'share-variant'}
              style={styles.shareIcon}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteIconPress}
            style={styles.deleteIconContainer}>
            <MaterialCommunityIcons
              name={deleteMode ? 'delete-empty' : 'delete'}
              style={styles.deleteIcon}
              color={'black'}
            />
            {selectionList.length && deleteMode ? (
              <View style={styles.deleteListCounterContainer}>
                <Text style={styles.deleteListCounter}>
                  {selectionList.length}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
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
    paddingLeft: 10,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 2.5, height: 2.5 },
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

  photoScrollView: {
    flex: 1,
  },
  photoScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderColor: 'black',
  },
  utilButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    borderWidth: 3,
  },
  shareIconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderWidth: 3,
  },
  shareIcon: {
    fontSize: 30,
    color: 'white',
  },
  deleteIconContainer: {
    // position: 'absolute',
    // top: 15,
    // right: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  deleteIcon: {
    fontSize: 30,
    color: 'white',
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
