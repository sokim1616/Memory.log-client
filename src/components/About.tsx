/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  Animated,
  Linking,
} from 'react-native';
import {Button, Overlay, ListItem} from 'react-native-elements';
import Mailer from 'react-native-mail';

interface AboutProps {}
const About: React.FC<AboutProps> = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const opacity = useState(new Animated.Value(0))[0];

  const fadeInText = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const escapeToggleModal1 = () => {
    setVisible1(!visible1);
  };
  const escapeToggleModal2 = () => {
    setVisible2(!visible2);
  };
  const escapeToggleModal3 = () => {
    setVisible3(!visible3);
  };
  const escapeToggleModal4 = () => {
    setVisible4(!visible4);
  };
  const escapeToggleModal5 = () => {
    setVisible5(!visible5);
  };

  const toggleModal1 = () => {
    setVisible1(!visible1);
    setVisible2(!visible2);
  };
  const toggleModal2 = () => {
    setVisible2(!visible2);
    setVisible3(!visible3);
  };
  const toggleModal3 = () => {
    setVisible3(!visible3);
    setVisible4(!visible4);
  };
  const toggleModal4 = () => {
    setVisible4(!visible4);
    setVisible5(!visible5);
  };
  const toggleModal5 = () => {
    setShow(!show);
  };

  const handleEmail = () => {
    Mailer.mail(
      {
        subject: 'Send Email',
        recipients: ['support@example.com'],
        ccRecipients: ['supportCC@example.com'],
        bccRecipients: ['supportBCC@example.com'],
        body: '<b>A Bold Body</b>',
        isHTML: true,
        // * attach 는 첨부파일이 있는 경우에만 사용
        // attachments: [{
        //   path: '',  // The absolute path of the file from which to read data.
        //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        //   // mimeType - use only if you want to use custom type
        //   name: '',   // Optional: Custom filename for attachment
        // }]
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <View
        style={{
          flex: 0.2,
        }}>
        <Text style={styles.title}>정보</Text>
        <View style={styles.divideline} />
      </View>
      <View
        style={{
          flex: 0.8,
          justifyContent: 'space-around',
          marginHorizontal: 50,
          paddingTop: 30,
          // backgroundColor: '#D3F801',
        }}>
        <Button
          title="HOW TO USE"
          onPress={escapeToggleModal1}
          raised
          buttonStyle={{
            backgroundColor: 'orange',
          }}
        />
        {/* ---------------------오버레이1 시작---------------------*/}
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible1}
          onBackdropPress={escapeToggleModal1}>
          <View onTouchStart={toggleModal1} style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/start.png')}
              style={styles.image}>
              <View style={{flex: 8.5, justifyContent: 'center'}}>
                {fadeInText()}
                <Animated.View style={{opacity}}>
                  <Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        fontFamily: 'Lobster-Regular',
                        color: '#ffffff',
                        lineHeight: 50,
                        textAlign: 'center',
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 10,
                      }}>
                      Memory.log
                    </Text>
                    <Text>{'   '}</Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        lineHeight: 50,
                        textAlign: 'center',
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      와 함께 {'\n'} 추억을 저장하는 방법😘
                    </Text>
                  </Text>
                </Animated.View>
              </View>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Lobster-Regular',
                    color: '#ffffff',
                    lineHeight: 0,
                    textAlign: 'center',
                    marginBottom: -15,
                  }}>
                  Memory.log
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Overlay>
        {/* ---------------------오버레이2 시작---------------------*/}
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible2}
          onBackdropPress={escapeToggleModal2}>
          <View onTouchStart={toggleModal2} style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/morning.png')}
              style={styles.image}>
              <View style={{flex: 3, justifyContent: 'center', marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  STEP 1
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  추억을 저장하고 싶은 {'\n'} 장소로 이동해 볼까요?
                </Text>
              </View>
              <View style={{flex: 7, justifyContent: 'center'}} />
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Lobster-Regular',
                    color: '#ffffff',
                    lineHeight: 0,
                    textAlign: 'center',
                  }}>
                  Memory.log
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Overlay>
        {/* ---------------------오버레이3 시작---------------------*/}
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible3}
          onBackdropPress={escapeToggleModal3}>
          <View onTouchStart={toggleModal3} style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/noon.png')}
              style={styles.image}>
              <View style={{flex: 4, justifyContent: 'center', marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  STEP 2
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  여행을 하면서 {'\n'} 소중한 순간을 {'\n'} 담아주세요.
                </Text>
              </View>
              <View style={{flex: 4.5, justifyContent: 'center'}} />
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Lobster-Regular',
                    color: '#ffffff',
                    lineHeight: 0,
                    textAlign: 'center',
                    marginBottom: -12,
                  }}>
                  Memory.log
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Overlay>
        {/* ---------------------오버레이4 시작---------------------*/}
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible4}
          onBackdropPress={escapeToggleModal4}>
          <View onTouchStart={toggleModal4} style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/evening.png')}
              style={styles.image}>
              <View style={{flex: 4, justifyContent: 'center', marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  STEP 3
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 50,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  당신이 느낀 {'\n'} 그 순간의 감정... {'\n'} 글로 남겨주세요.
                </Text>
              </View>
              <View style={{flex: 4.5, justifyContent: 'center'}} />
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Lobster-Regular',
                    color: '#ffffff',
                    lineHeight: 0,
                    textAlign: 'center',
                    marginBottom: -12,
                  }}>
                  Memory.log
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Overlay>
        {/* ---------------------오버레이5 시작---------------------*/}
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible5}
          onBackdropPress={escapeToggleModal5}>
          <View onTouchStart={escapeToggleModal5} style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/end.png')}
              style={styles.image}>
              <View style={{flex: 8.5, justifyContent: 'center'}}>
                {fadeInText()}
                <Animated.View style={{opacity}}>
                  <Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        fontFamily: 'Lobster-Regular',
                        color: '#ffffff',
                        lineHeight: 50,
                        textAlign: 'center',
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 10,
                      }}>
                      Memory.log
                    </Text>
                    <Text>{'   '}</Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        lineHeight: 50,
                        textAlign: 'center',
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      와 함께 {'\n'} 떠나실 준비 되셨나요?
                    </Text>
                  </Text>
                </Animated.View>
              </View>
              <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Lobster-Regular',
                    color: '#ffffff',
                    lineHeight: 0,
                    textAlign: 'center',
                    marginBottom: -15,
                  }}>
                  Memory.log
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Overlay>

        {/* ---------------------팀원소개 시작---------------------*/}

        <Button
          title="Travel-Maker"
          onPress={toggleModal5}
          raised
          buttonStyle={{backgroundColor: 'purple'}}
        />
        <Overlay
          overlayStyle={styles.overlay2}
          isVisible={show}
          onBackdropPress={toggleModal5}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: -20,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  fontFamily: 'Lobster-Regular',
                  height: '100%',
                  paddingTop: 20,
                  // backgroundColor: '#4ef',
                }}>
                Team Travel-Maker{'\n'}
              </Text>
              {/* <Text
                style={{
                  fontSize: 25,
                }}>
                팀원 소개
              </Text> */}
            </View>
            <View style={{borderBottomColor: 'black', borderBottomWidth: 2}} />
            <View
              style={{
                flex: 8,
                justifyContent: 'center',
              }}>
              <ListItem
                leftAvatar={{
                  source: require('../assets/image/slaver.jpg'),
                  size: 'large',
                  containerStyle: {
                    shadowColor: '#000',
                    shadowOffset: {width: 2.5, height: 2.5},
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  },
                }}
                title="김소현"
                titleStyle={{fontWeight: 'bold'}}
                rightIcon={{
                  name: 'github',
                  type: 'antdesign',
                  onPress: () =>
                    Linking.openURL('https://github.com/sokim1616'),
                }}
                subtitle={`노예상인 ${'\n'}FULL-STACK${'\n'}sokim1616@gmail.com`}
                subtitleStyle={{paddingTop: 5}}
                topDivider
                bottomDivider
              />
              <ListItem
                leftAvatar={{
                  source: require('../assets/image/slave_1.jpg'),
                  size: 'large',
                  containerStyle: {
                    shadowColor: '#000',
                    shadowOffset: {width: 2.5, height: 2.5},
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  },
                }}
                title="김현규"
                titleStyle={{fontWeight: 'bold'}}
                rightIcon={{
                  name: 'github',
                  type: 'antdesign',
                  onPress: () =>
                    Linking.openURL('https://github.com/khgkimhyungyu'),
                }}
                subtitle={`노예1 ${'\n'}FRONT-END${'\n'}yolo.fabian.k@gmail.com`}
                subtitleStyle={{
                  paddingTop: 5,
                  width: 175,
                }}
                bottomDivider
              />
              <ListItem
                leftAvatar={{
                  source: require('../assets/image/slave_2.jpeg'),
                  size: 'large',
                  containerStyle: {
                    shadowColor: '#000',
                    shadowOffset: {width: 2.5, height: 2.5},
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  },
                }}
                title="경두현"
                titleStyle={{fontWeight: 'bold'}}
                rightIcon={{
                  name: 'github',
                  type: 'antdesign',
                  onPress: () =>
                    Linking.openURL('https://github.com/kyung-douhyun'),
                }}
                subtitle={
                  <Text style={{paddingTop: 5, width: 175}}>
                    <Text>노예2{'\n'}</Text>
                    <Text>FULL-STACK{'\n'}</Text>
                    <Text style={{fontSize: 13.5}}>
                      douhyun.kyung@gmail.com
                    </Text>
                  </Text>
                }
                bottomDivider
              />
              <ListItem
                leftAvatar={{
                  source: require('../assets/image/slave_3.png'),
                  size: 'large',
                  containerStyle: {
                    shadowColor: '#000',
                    shadowOffset: {width: 2.5, height: 2.5},
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  },
                }}
                title="변민우"
                titleStyle={{fontWeight: 'bold'}}
                rightIcon={{
                  name: 'github',
                  type: 'antdesign',
                  onPress: () =>
                    Linking.openURL('https://github.com/bombamong'),
                }}
                subtitle={`노예3${'\n'}FRONT-END${'\n'}bmwismw@gmail.com`}
                subtitleStyle={{
                  paddingTop: 5,
                  width: 175,
                }}
                bottomDivider
              />
            </View>
          </View>
        </Overlay>
        <Button
          title="Q&A"
          onPress={handleEmail}
          raised
          buttonStyle={{backgroundColor: 'black'}}
        />
        <View />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 5,
  },
  divideline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  overlay: {
    width: 340,
    height: 600,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  overlay2: {
    width: 340,
    height: 550,
    borderRadius: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  overlay3: {
    width: 340,
    height: 550,
    borderRadius: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
export default About;
