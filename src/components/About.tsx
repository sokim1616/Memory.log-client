import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Linking, Alert } from 'react-native';
import { Button, Overlay, SocialIcon, ListItem } from 'react-native-elements';
// import email from 'react-native-email'
import Mailer from 'react-native-mail'
// import TouchableScale from 'react-native-touchable-scale';
// import LinearGradient from 'react-native-linear-gradient';

interface AboutProps { }
const About: React.FC<AboutProps> = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };
  const toggleModal2 = () => {
    setShow(!show);
  }
  const toggleModal3 = () => {
    setShow2(!show2);
  }

  const handleEmail = () => {
    Mailer.mail({
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
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
        ],
        { cancelable: true }
      )
    });
  }

  return (
    <SafeAreaView style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
      <View style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
        <Text style={styles.title}>About</Text>
        <Button
          title="About using this App"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal}
        />
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={toggleModal}>
          <View style={{ flex: 0.5 }}>

          </View>
        </Overlay>
        <Button
          title="Meet Our Crew"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal2}
        />
        <Overlay
          overlayStyle={styles.overlay2}
          isVisible={show}
          onBackdropPress={toggleModal2}>
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 1.5, fontSize: 25, fontFamily: 'Cochin' }}>
              {'\n'}   Meet our crew, {'\n'}            "The Travel-Makers!"
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
            <View style={{ flex: 8 }}>
              <View style={{ flex: 2.5 }}>
                <ListItem
                  leftAvatar={{ source: { uri: 'https://picsum.photos/300/300' }, size: 'large' }}
                  title="김소현"
                  rightIcon={{ name: 'github', type: 'entypo' }}
                  subtitle="일해라잉?"
                  bottomDivider
                />
              </View>
              <View style={{ flex: 2.5 }}>
                <ListItem
                  leftAvatar={{ source: { uri: 'https://picsum.photos/300/300' }, size: 'large' }}
                  title="김현규"
                  rightIcon={{ name: 'github', type: 'entypo' }}
                  subtitle="그만...!!"
                  bottomDivider
                />
              </View>
              <View style={{ flex: 2.5 }}>
                <ListItem
                  leftAvatar={{ source: { uri: 'https://picsum.photos/300/300' }, size: 'large' }}
                  title="경두현"
                  rightIcon={{ name: 'github', type: 'entypo' }}
                  subtitle="그만...!!"
                  bottomDivider
                />
              </View>
              <View style={{ flex: 2.5 }}>
                <ListItem
                  leftAvatar={{ source: { uri: 'https://picsum.photos/300/300' }, size: 'large' }}
                  title="변민우"
                  rightIcon={{ name: 'github', type: 'entypo' }}
                  subtitle="그만...!!"
                  bottomDivider
                />
              </View>
            </View>
          </View>
        </Overlay>
        {/* //! 3번째 부분 시작 */}
        <Button
          title="Questions & Concerns"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal3}
        />
        <Overlay
          overlayStyle={styles.overlay2}
          isVisible={show2}
          onBackdropPress={toggleModal3}>
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 0.2, fontSize: 28, fontFamily: 'Cochin' }}>
              {'\n'} If you have any questions   {'\n'}  or concerns contact 😀
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
            <View style={{ flex: 0.6 }}>
              <Button title="Send Mail" onPress={handleEmail} />
            </View>
            <View style={{ flex: 0.22 }}>
              <Text style={{ fontSize: 23, fontFamily: 'Cochin' }}>
                Thanks for using our App, and{'\n'} We hope you keep every bits {'\n'}and pieces of your Memory
              </Text>
            </View>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 26,
    fontWeight: 'bold',
  },
  overlay: {
    width: 350,
    height: 350,
    borderRadius: 5,
  },
  overlay2: {
    width: 340,
    height: 600,
    borderRadius: 5,
    justifyContent: 'center',
  }
});

export default About;
