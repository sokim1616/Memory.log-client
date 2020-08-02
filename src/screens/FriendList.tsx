import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';
import FriendSearch from '../screens/FriendSearch';

const FriendList = ({navigation}) => {
  const [userState, setUserState] = useState([]); // 로그인 사용자의 정보
  const [followerList, setFollowerList] = useState([]); // 로그인 사용자의 인싸력 테스트

  const requestUnFollow = (id) => {
    console.log('pressed :', id);
    // return fetch('http://localhost:4000/follow/ufollow', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({id}),
    //   credentials: 'include',
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log('로그인유저팔로우리스트 :', res);
    //   })
    //   .catch((err) => console.error(err));
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
      <Text style={styles.upperView__text}>나의 정보</Text>
      <View style={styles.divideline} />
      <View style={styles.upperView}>
        {userState.map((ele, i) => (
          <ListItem
            key={i}
            leftAvatar={{
              source: {uri: 'https://picsum.photos/300/300'},
              size: 'large',
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
              }}
              title={ele.username}
              subtitle={ele.statusmessage}
              titleStyle={styles.lowerView__title}
              subtitleStyle={styles.lowerView__subtitle}
              rightIcon={{
                name: 'ios-person-remove-sharp',
                type: 'ionicon',
                size: 30,
                containerStyle: {marginRight: 5},
                onPress: () => requestUnFollow(ele.id),
              }}
              bottomDivider
            />
          ))}
        </ScrollView>
      </View>
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
    marginLeft: 20,
    marginTop: 10,
  },
  upperView__title: {
    position: 'relative',
    fontSize: 40,
    bottom: 25,
  },
  upperView__subtitle: {
    position: 'absolute',
    fontSize: 18,
    bottom: -10,
  },
  midView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#9FA93E',
  },
  midView__text: {
    fontSize: 30,
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
    position: 'relative',
    fontSize: 40,
    bottom: 25,
  },
  lowerView__subtitle: {
    position: 'absolute',
    fontSize: 18,
    bottom: -10,
  },
});

export default FriendList;
