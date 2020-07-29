import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';



const FriendList: React.FC<{}> = () => {
    return (
        <SafeAreaView>
            {
                data.map((list, index) => (
                    <View
                        style={[
                            styles.list,
                            (index === 0) && { borderTopWidth: 0 },
                            (index % 2 === 1) && { backgroundColor: '#FFFF66' }
                        ]}
                    >
                        <Text>{list.name}</Text>
                    </View>
                ))
            }
        </ SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: 'black'
    }
});

const data = [
    {
        name: 'friend',
    },
    {
        name: 'list2',
    },
    {
        name: 'list3',
    },
    {
        name: 'list4',
    },
    {
        name: 'list5',
    },
]

export default FriendList;
