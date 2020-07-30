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

const FriendList: React.FC<{}> = () => {
  const [userState, setUserState] = useState({}); // 로그인 사용자의 정보
  const [followerList, setFollowerList] = useState([]); // 로그인 사용자의 인싸력 테스트

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
      getUserInfo();
      // getFollowerList();
    }, [userState]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 위뷰시작 */}
      <View style={styles.upper}>
        <Text>Username</Text>
        <Image source={{uri: userState.profilepath}} />
        <View>
          <Text>{userState.username}</Text>
          <Text>{userState.statusmessage}</Text>
        </View>
      </View>
      {/* 아래뷰시작 */}
      <View style={styles.lower}>
        <View>
          <Text>Friends</Text>
          <Icon onPress={searchIcon} name="search" size={20} color="black" />
        </View>
        <ScrollView>
          {followerList.map((
            ele,
            idx, // [{}, {}, {}]
          ) => (
            <View key={idx}>
              <Image source={{uri: ele.profilepath}} />
              <View>
                <Text>{ele.username}</Text>
                <Text>{ele.statusmessage}</Text>
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
  upper: {
    flex: 2,
  },
  lower: {
    flex: 8,
  },
});

export default FriendList;
