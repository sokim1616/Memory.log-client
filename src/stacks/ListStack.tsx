import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';

//TODO: <Stack.Navigator> 만들기

const ListStack: React.FC<{}> = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Following_List</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
});

export default ListStack;
