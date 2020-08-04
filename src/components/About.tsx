import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Overlay, Tile} from 'react-native-elements';
interface AboutProps {}
const About: React.FC<AboutProps> = () => {
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView style={{flex: 0.75, paddingTop: 10, paddingLeft: 10}}>
      <View style={{flex: 0.75, paddingTop: 10, paddingLeft: 10}}>
        <Text style={styles.title}>About</Text>
        <Button
          title="About using this App"
          style={{paddingTop: 50, paddingRight: 30}}
          onPress={toggleModal}
        />
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={toggleModal}>
          <View style={{flex: 0.5}}>
            <Tile
              titleStyle={{color: 'black'}}
              containerStyle={{justifyContent: 'center'}}
              imageSrc={{
                uri: 'https://picsum.photos/300/300',
              }}
              imageContainerStyle={{
                width: 325,
                height: 325,
                marginLeft: 2.5,
                borderRadius: 5,
              }}
              title="Simple 3 Steps to making your memory everlasting"
              featured
              caption="Memory.log"
            />
          </View>
        </Overlay>
        <Button
          title="Meet Our Crew"
          style={{paddingTop: 50, paddingRight: 30}}
          onPress={() => console.log('hello')}
        />
        <Button
          title="Questions & Concerns"
          style={{paddingTop: 50, paddingRight: 30}}
          onPress={() => console.log('hola')}
        />
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
});

export default About;
