import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {SearchBar, ListItem} from 'react-native-elements';

const FriendSearch = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const updateSearch = (search) => {
    setSearch(search);
  };

  const onPressFollowIcon = () => {
    console.log('on pressed icon');
    console.log('on pressed icon', search);
    return fetch('http://localhost:4000/follow/rfollow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: search,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((follower) => console.log(follower))
      .catch((error) => {
        console.error(error);
      });
  };

  const onPressSearchIcon = () => {
    return fetch('http://localhost:4000/user/userinfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: search,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((user) => {
        setList([]);
        setList((prevState) => [...prevState, user]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperView}>
        <Text style={styles.upperView__title}>친구 찾기</Text>
        <View style={styles.upperView__lower}>
          <SearchBar
            containerStyle={styles.upperView__lower__search}
            placeholder="E-mail를 입력해 주세요."
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            platform="ios"
          />
          <Icon
            style={styles.upperView__lower__icon}
            name="search"
            size={40}
            color="black"
            onPress={onPressSearchIcon}
          />
        </View>
      </View>
      <View style={styles.midView} />
      <View style={styles.lowerView}>
        <Text style={styles.lowerView__title}>검색 결과</Text>
        <View>
          {list.map((ele, i) => (
            <ListItem
              key={i}
              leftAvatar={{source: {uri: 'https://picsum.photos/400/400'}}}
              title={ele.username}
              subtitle={ele.statusmessage}
              bottomDivider
              rightIcon={{
                name: 'ios-person-add-sharp',
                type: 'ionicon',
                onPress: onPressFollowIcon,
              }}
              containerStyle={styles.lowerView__friend}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 2,
  },
  upperView__title: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  upperView__lower: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  upperView__lower__search: {
    marginLeft: 35,
    marginRight: 50,
  },
  upperView__lower__icon: {
    marginTop: 25,
    marginRight: 50,
    // backgroundColor: '#D3D3D3',
  },
  midView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  lowerView: {
    flex: 8,
  },
  lowerView__title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  lowerView__friend: {
    marginTop: 5,
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  lowerView__friend__title: {
    fontSize: 20,
  },
});

export default FriendSearch;
