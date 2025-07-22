import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrderFailure = ({ navigation }) => {

    const orderplaceData = useSelector((state) => state.bookTest.orderplaceData);

    return (
        <View style={styles.container}>
            <Text style={styles.failureText}>Order Placement Failed!</Text>
            {/* <Text style={styles.orderIdText}>Order ID: {orderplaceData?.orderId}</Text> */}

           
            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                    navigation.goBack()
                    // {
                    //     index: 0,
                    //     routes: [{ name: 'HomeScreen' }], 
                    // }
                }}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    failureText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#dc3545', 
        marginBottom: 50,
        textAlign: 'center',
    },
    orderIdText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1C57A5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%', 
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OrderFailure;
