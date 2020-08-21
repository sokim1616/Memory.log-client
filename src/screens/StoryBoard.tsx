/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
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
import { Avatar, Overlay, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

interface HomeTwoProps {}

const StoryBoard: React.FC<HomeTwoProps> = ({ loginProps }) => {
  const { isGuest } = loginProps;
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [userState, setUserState] = useState({}); // 로그인 사용자의 정보
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectionList, setSelectionList] = useState([]);
  const [shareMode, setShareMode] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
        if (resLength % 2 !== 0) {
          for (let i = 0; i < 2 - (resLength % 2); i++) {
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
      {/* ----------비회원 오버레이(모달창) 시작---------- */}
      <Overlay
        overlayStyle={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
        isVisible={visible && isGuest}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              marginTop: 50,
            }}>
            <Icon
              size={40}
              onPress={toggleOverlay}
              name="cancel"
              type="material"
              color="#ffffff"
            />
          </View>
          <View
            style={{
              flex: 0.5,
              width: 280,
              backgroundColor: 'rgba(255,255,255,0.75)',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'rgba(255,255,255,0.75)',
            }}>
            <Text style={{ fontSize: 25 }}>
              {'방금 찍은 사진이\n추억저장소에 저장 됐어요.'}
            </Text>
          </View>
          <View style={{ flex: 2 }} />
          <View
            style={{
              flex: 0.5,
              width: 310,
              alignSelf: 'center',
              backgroundColor: 'rgba(255,255,255,0.75)',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'rgba(255,255,255,0.75)',
            }}>
            <Text style={{ fontSize: 25 }}>
              {'이 사진의 추억을 보고 싶으면\n클릭을 해보세요.'}
            </Text>
          </View>
          <View style={{ flex: 2 }} />
        </View>
      </Overlay>
      {/* ----------비회원 오버레이(모달창) 끝---------- */}
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
