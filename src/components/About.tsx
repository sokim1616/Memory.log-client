import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Overlay, Tile } from 'react-native-elements';


interface AboutProps { }
const About: React.FC<AboutProps> = () => {
    const [visible, setVisible] = useState(false)
    const toggleModal = () => {
        setVisible(!visible)
    }
    return (
        <SafeAreaView style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
            <View style={{ flex: 0.75, paddingTop: 10, paddingLeft: 10 }}>
                <Text style={styles.title}>About</Text>
                <Button title="About to Use this App" style={{ paddingTop: 50, paddingRight: 30 }}
                    onPress={toggleModal}
                />
                <Overlay isVisible={visible} onBackdropPress={toggleModal} >
                    <View style={{ flex: 0.5 }}>
                        <Tile titleStyle={{color: 'black'}} containerStyle={{}}
                        imageSrc={{uri: `https://images.unsplash.com/photo-1579103614960-2e61a5a027a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80`}}
                        title='Simple 3 Steps to making your memory everlasting'
                        featured
                        caption="Memory.log"
                        >
                        </Tile>

                    </View>
                </Overlay>
                <Button title="Meet Our Crew" style={{ paddingTop: 50, paddingRight: 30 }}
                    onPress={() => console.log('hello')}
                />
                <Button title="Question & Concerns" style={{ paddingTop: 50, paddingRight: 30 }}
                    onPress={() => console.log('hola')}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Lobster-Regular',
        fontSize: 26,
        fontWeight: 'bold'
    }
})
export default About;