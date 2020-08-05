import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {ListItem, Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';
import FriendSearch from '../screens/FriendSearch';
import FriendStoryBoard from '../screens/FriendStoryBoard';

const FriendList = ({navigation}) => {
  const [userState, setUserState] = useState([]); // 로그인 사용자의 정보
  const [followerList, setFollowerList] = useState([]); // 로그인 사용자의 인싸력 테스트
  const [visible, setVisible] = useState(false);
  const [unFollowId, setUnfollowId] = useState('');
  const toggleOverlay = (id) => {
    setVisible(!visible);
    console.log(id);
    setUnfollowId('');
    setUnfollowId(id);
  };
  const requestUnFollow = (id) => {
    console.log('pressed :', id);
    return fetch('http://localhost:4000/follow/ufollow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('로그인유저팔로우리스트 :', res);
        getFollowerList();
        toggleOverlay();
      })
      .catch((err) => console.error(err));
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
        console.log('로그인유저정보 :', res);
        setUserState(res);
      })
      .catch((err) => console.error(err));
  };
  const getFollowerList = () => {
    return fetch('http://localhost:4000/follow/friend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('팔로워정보 :', res);
        setFollowerList(res);
      })
      .catch((err) => console.error(err));
  };
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [userState.length]),
  );
  useFocusEffect(
    useCallback(() => {
      getFollowerList();
    }, [followerList.length]),
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* 위뷰시작 */}
      <Text style={styles.upperView__text}>내 프로필</Text>
      <View style={styles.divideline} />
      <View style={styles.upperView}>
        {userState.map((ele, i) => (
          <ListItem
            key={i}
            leftAvatar={{
              source: {uri: 'https://picsum.photos/300/300'},
              size: 'large',
              containerStyle: {
                shadowColor: '#000',
                shadowOffset: {width: 2.5, height: 2.5},
                shadowOpacity: 1,
                shadowRadius: 3,
              },
            }}
            title={ele.username}
            subtitle={ele.statusmessage}
            titleStyle={styles.upperView__title}
            subtitleStyle={styles.upperView__subtitle}
          />
        ))}
      </View>
      <View style={styles.divideline} />
      {/* 미드뷰시작 */}
      <View style={styles.midView}>
        <Text style={styles.midView__text}>친구 목록</Text>
        <Icon
          style={styles.midView__icon}
          onPress={() => navigation.navigate(FriendSearch)}
          name="search"
          size={40}
          color="black"
        />
      </View>
      {/* 아래뷰시작 */}
      <View style={styles.divideline} />
      <View style={styles.lowerView}>
        <ScrollView>
          {followerList.map((ele, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                source: {uri: 'https://picsum.photos/300/300'},
                size: 'large',
                containerStyle: {
                  shadowColor: '#000',
                  shadowOffset: {width: 2.5, height: 2.5},
                  shadowOpacity: 1,
                  shadowRadius: 3,
                },
              }}
              title={ele.username}
              subtitle={ele.statusmessage}
              titleStyle={styles.lowerView__title}
              subtitleStyle={styles.lowerView__subtitle}
              onPress={() =>
                navigation.navigate('FriendStoryBoard', {
                  friendId: ele.id,
                })
              }
              rightIcon={{
                name: 'ios-person-remove-sharp',
                type: 'ionicon',
                size: 30,
                containerStyle: {marginRight: 5},
                onPress: () => toggleOverlay(ele.id),
              }}
              bottomDivider
            />
          ))}
        </ScrollView>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayStyle}>
        <View style={styles.overlayStyle__body}>
          <View style={styles.overlayStyle__upper}>
            <Text style={styles.overlayStyle__upper__text}>
              이 친구와 추억 공유를{'\n'} 그만하시겠습니까?
            </Text>
          </View>
          <View style={styles.overlayStyle__lower}>
            <Button
              style={styles.overlayStyle__lower__button}
              title="취소"
              type="outline"
              onPress={toggleOverlay}
            />
            <Button
              style={styles.overlayStyle__lower__button}
              title="확인"
              type="outline"
              onPress={() => requestUnFollow(unFollowId)}
            />
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  divideline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  upperView: {
    flex: 2,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    // backgroundColor: '#3EA944',
  },
  upperView__text: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  upperView__title: {
    position: 'relative',
    fontSize: 30,
    bottom: 40,
    // backgroundColor: '#3ef',
  },
  upperView__subtitle: {
    position: 'absolute',
    fontSize: 18,
    bottom: -50,
    width: 290,
    height: 80,
    lineHeight: 25,
    // backgroundColor: '#f39c12',
  },
  midView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#9FA93E',
  },
  midView__text: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginLeft: 20,
    // backgroundColor: '#C70039',
  },
  midView__icon: {
    marginRight: 20,
    marginTop: 1,
    // backgroundColor: '#3E5DA9',
  },
  lowerView: {
    flex: 7.5,
    // backgroundColor: '#3EA9A1',
  },
  lowerView__title: {
    position: 'absolute',
    fontSize: 30,
    bottom: 7,
  },
  lowerView__subtitle: {
    position: 'absolute',
    fontSize: 16,
    bottom: -40,
    height: 40,
    // backgroundColor: '#3ed',
  },
  overlayStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 200,
    width: 300,
  },
  overlayStyle__body: {
    flex: 1,
  },
  overlayStyle__upper: {
    flex: 7,
  },
  overlayStyle__upper__text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 25,
    lineHeight: 40,
  },
  overlayStyle__lower: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  overlayStyle__lower__button: {
    width: 80,
    height: 50,
  },
});
export default FriendList;
