import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, Overlay, SocialIcon, ListItem, Tile } from 'react-native-elements';
import Mailer from 'react-native-mail'
import Modal from 'react-native-modal';
import { white, black } from 'react-native-paper/lib/typescript/src/styles/colors';


interface AboutProps { }

const About: React.FC<AboutProps> = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  // const [modalUp, setModalUp] = useState(false)

  // const modalThrow = () => {
  //   setModalUp(!modalUp)
  // }

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
        <Text style={styles.title}>여기는앱정보입니다</Text>
        <Button
          title="Memory.log 앱 사용법"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal}
          buttonStyle={{ backgroundColor: "orange" }}
        />
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={toggleModal}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.2, borderBottomColor: 'black', borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 28, fontFamily: 'Cochin', justifyContent: 'center', textAlign: 'center' }}>
                "Simple 3 Steps to making your {'\n'} Memory everlasting"
            </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={{
                paddingLeft: 3,
                fontSize: 28,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 3,
                marginTop: 30,
                fontFamily: 'Cochin',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                Login in advancd
              </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={{
                paddingLeft: 3,
                fontSize: 25,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 3,
                marginTop: 30,
                fontFamily: 'Cochin',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                Take a photo during your trip
              </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={{
                paddingLeft: 3,
                fontSize: 25,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 3,
                marginTop: 30,
                fontFamily: 'Cochin',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                Write a short log & save ❗️
              </Text>
            </View>
            <View style={{ flex: 0.2, borderTopColor: 'black', borderTopWidth: 1 }}>
              <Text style={{ fontSize: 28, fontFamily: 'Cochin', justifyContent: 'center', textAlign: 'center', paddingTop: 20 }}>
                Now it's in your {'\n'} "Memory storage❗️ "
              </Text>
            </View>
          </View>
        </Overlay>
        <Button
          title="Travel-Maker 소개"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal2}
          buttonStyle={{ backgroundColor: "purple" }}
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
        <Button
          title="Q&A"
          style={{ paddingTop: 50, paddingRight: 30 }}
          onPress={toggleModal3}
          buttonStyle={{ backgroundColor: "black" }}
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
        <View>

        </View>
      </View>
    </SafeAreaView >
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
    width: 340,
    height: 600,
    borderRadius: 5,
    justifyContent: 'center'
  },
  overlay2: {
    width: 340,
    height: 600,
    borderRadius: 5,
    justifyContent: 'center',
  }
});

export default About;
