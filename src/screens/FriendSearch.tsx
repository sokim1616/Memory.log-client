import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';
import { grey100 } from 'react-native-paper/lib/typescript/src/styles/colors';

const FriendSearch = () => {
  const [friendState, setFriendState] = useState({
    id: 1,
    email: 'z1@gmail.com',
    username: 'zombie',
    profilepath: '',
    statusmessage:
      '내가 바로 직원 경두현이다. 사장 나와!!',
  }); // 로그인 사용자의 정보



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

  // useFocusEffect(
  //   useCallback(() => {
  //     getUserInfo();
  //     getFollowerList();
  //   }, [userState]),
  // );

  return (
    <SafeAreaView style={styles.container}>
      {/* 위뷰시작 */}
      <View>
        <Text style={styles.upperHeaderTitle}>Search for your friend</Text>
      </View>
      <View style={styles.upperContainer}>
        <TextInput style={styles.textContainer}
      onChangeText={text => onChangeText(text)} />
          <Icon
            style={styles.lowerHeaderSearch}
            onPress={() => navigation.navigate(FriendSearch)}
            name="search"
            size={30}
            color="black"></Icon>
      </View>
      {/* 아래뷰시작 */}
      <View style={styles.lowerContainer}>
        <View style={styles.lowerHeader}>
          <Text style={styles.lowerHeaderTitle}>Friends</Text>
        </View>
        <View style={styles.lowerBody}>
        {/* {followerList.map((ele, idx) => (
            <View style={styles.lowerBodyFriend} key={idx}>
              <Image style={styles.friendImage} source={ele.profilepath} />
              <View style={styles.friendContentContainer}>
                <Text style={styles.friendName}>{ele.username}</Text>
                <Text style={styles.friendStatus}>{ele.statusmessage}</Text>
              </View>
              <TouchableOpacity style={styles.friendState}>
                {true ? <Text>Unfollow</Text> : <Text>Accept</Text>}
              </TouchableOpacity>
            </View>
          ))} */}
        </View>
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
  textContainer: {
    flex: 1,
    marginTop: 30,
    height: 0.5,
    borderColor: 'gray',
    borderWidth: 30,
  },
  upperHeaderTitle: {
    marginLeft: 20,
    paddingTop: 8,
    fontSize: 25,
    backgroundColor: '#f3f3',
  },
  userImage: {
    flex: 3,
    width: 50,
    height: 170,
  },
  userContentContainer: {
    flex: 5,
    borderRadius: 1,
    backgroundColor: '#eaeaea',
  },
  userName: {
    flex: 5,
    //textAlign: 'center',
    fontSize: 40,
    paddingLeft: 10,
  },
  userStatus: {
    flex: 5,
    //textAlign: 'center',
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
    paddingTop: 8,
    fontSize: 25,
  },
  lowerHeaderSearch: {
    marginRight: 30,
    paddingTop: 10,
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
    flex: 3,
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
    fontSize: 20,
  },
  friendState: {
    justifyContent: 'space-around',
    paddingRight: 20,
  },
});

export default FriendSearch;