import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';

const FriendList = () => {
  const [userState, setUserState] = useState({
    id: 1,
    email: 'z1@gmail.com',
    username: 'zombie',
    password: 12345678,
    profilepath: '',
    statusmessage:
      '내가 바로 팀장 김소현이다. 다 덤벼 이자식들아!! 빠다 맞아봤냐?',
  }); // 로그인 사용자의 정보
  const [followerList, setFollowerList] = useState([
    {
      id: 1,
      userId: 1,
      followId: 2,
      username: 'zombie',
      profilepath: require('../assets/image/dafault_profile.jpg'),
      statusmessage: '육호?',
    },
    {
      id: 2,
      userId: 2,
      followId: 1,
      username: 'kim',
      profilepath: require('../assets/image/dafault_profile.jpg'),
      statusmessage: '칠호?',
    },
    {
      id: 3,
      userId: 1,
      followId: 3,
      username: 'lee',
      profilepath: require('../assets/image/dafault_profile.jpg'),
      statusmessage: '팔호?',
    },
    {
      id: 4,
      userId: 3,
      followId: 1,
      username: 'park',
      profilepath: require('../assets/image/dafault_profile.jpg'),
      statusmessage:
        '왜요왜요왜요왜요왜요왜요왜요왜요왜요왜요왜요왜요왜요왜요?',
    },
  ]); // 로그인 사용자의 인싸력 테스트

  const getUserInfo = () => {
    return fetch('http://localhost:4000/user/info')
      .then((res) => res.json())
      .then((user) => {
        console.log(user), setUserState(user);
      })
      .catch((err) => console.error(err));
  };

  const getFollowerList = () => {
    return fetch('http://localhost:4000/follow/friend')
      .then((res) => res.json())
      .then((res) => setFollowerList(res))
      .catch((err) => console.error(err));
  };

  const searchIcon = () => {
    console.log('clicked search button');
  };

  useFocusEffect(
    useCallback(() => {
      // getUserInfo();
      // getFollowerList();
    }, [userState]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 위뷰시작 */}
      <View style={styles.upperContainer}>
        <Image
          style={styles.userImage}
          source={require('../assets/image/dafault_profile.jpg')}
        />
        <View style={styles.userContentContainer}>
          <Text style={styles.userName}>{userState.username}</Text>
          <Text style={styles.userStatus}>{userState.statusmessage}</Text>
        </View>
      </View>
      {/* 아래뷰시작 */}
      <View style={styles.lowerContainer}>
        <View style={styles.lowerHeader}>
          <Text style={styles.lowerHeaderTitle}>Friends</Text>
          <Icon
            style={styles.lowerHeaderSearch}
            onPress={searchIcon}
            name="search"
            size={30}
            color="black"
          />
        </View>
        <ScrollView style={styles.lowerBody}>
          {followerList.map((ele, idx) => (
            <View style={styles.lowerBodyFriend} key={idx}>
              <Image style={styles.friendImage} source={ele.profilepath} />
              <View style={styles.friendContentContainer}>
                <Text style={styles.friendName}>{ele.username}</Text>
                <Text style={styles.friendStatus}>{ele.statusmessage}</Text>
              </View>
              <View>{true ? <Text>Unfollow</Text> : <Text>Accept</Text>}</View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 2.5,
    flexDirection: 'row',
  },
  userImage: {
    flex: 4,
    width: 50,
    height: 180,
  },
  userContentContainer: {
    flex: 5,
    borderRadius: 1,
    backgroundColor: '#eaeaea',
  },
  userName: {
    flex: 5,
    textAlign: 'center',
    fontSize: 50,
  },
  userStatus: {
    flex: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
    marginHorizontal: 10,
  },
  lowerContainer: {
    flex: 7.5,
    // backgroundColor: '#e3e3',
  },
  lowerHeader: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3',
  },
  lowerHeaderTitle: {
    marginLeft: 20,
    fontSize: 25,
  },
  lowerHeaderSearch: {
    marginRight: 50,
  },
  lowerBody: {
    flex: 9.9,
    backgroundColor: '#55A93E',
  },
  lowerBodyFriend: {
    flex: 1,
    flexDirection: 'row',
  },
  friendImage: {
    flex: 4,
    width: 50,
    height: 150,
  },
  friendContentContainer: {
    flex: 6,
    justifyContent: 'space-around',
  },
  friendName: {
    // flex: 5,
    fontSize: 25,
  },
  friendStatus: {
    // flex: 5,
    fontSize: 25,
  },
});

export default FriendList;
