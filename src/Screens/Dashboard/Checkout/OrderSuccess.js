import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrderSuccess = ({ navigation }) => {
    const orderplaceData = useSelector((state) => state.bookTest.orderplaceData);
    const activeModule = useSelector((state) => state.auth.activeModule);

    return (
        <View style={styles.container}>
            <Text style={styles.successText}>Order Placed Successfully! 🎉</Text>
            <Text style={styles.orderIdText}>Order ID: #{orderplaceData?.orderId}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DashboardScreen' }],
                    });
                }}
                
            >
                <Text style={styles.buttonText}>Go to Home</Text>
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
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745', // Green color for success
        marginBottom: 20,
        textAlign: 'center',
    },
    orderIdText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1C57A5', // Blue color
        padding: 15,
        borderRadius: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OrderSuccess;











// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';

// const OrderSuccess = ({ navigation }) => {

//     const orderplaceData = useSelector((state) => state.bookTest.orderplaceData);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.failureText}>Order Place successfully!</Text>
//             <Text style={styles.orderIdText}>Order ID: {orderplaceData?.orderId}</Text>

//             <TouchableOpacity
//                 style={[styles.button, styles.cancelButton]}
//                 onPress={() => {
//                     navigation.reset({
//                         index: 0,
//                         routes: [{ name: 'HomeScreen' }], 
//                     });
//                 }}
//             >
//                 <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         padding: 20,
//     },
//     failureText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#dc3545', // Red color for failure
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     orderIdText: {
//         fontSize: 18,
//         color: '#333',
//         marginBottom: 40,
//         textAlign: 'center',
//     },
//     button: {
//         backgroundColor: '#1C57A5',
//         padding: 15,
//         borderRadius: 10,
//         marginBottom: 20,
//         width: '80%', // Ensure button width is consistent
//     },
//     cancelButton: {
//         backgroundColor: '#6c757d', // Gray color for cancel button
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default OrderSuccess;
