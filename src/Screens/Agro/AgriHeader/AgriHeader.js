import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalize } from '../../../Utils/normalize';

export default function AgriHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>Setu Agriculture</Text>
            <Icon name="shopping-cart" size={24} color="#51c0a5" style={styles.icon} />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#c9c5c5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(15)
    },
    textHeading: {
        fontSize: normalize(16),
        fontWeight: 'bold'
    }
})