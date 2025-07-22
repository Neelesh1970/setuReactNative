import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useSelector } from 'react-redux';

const AgriOrderSuccess = ({ navigation }) => {
    const orderplaceData = useSelector((state) => state.bookTest.orderplaceData);
    const activeModule = useSelector((state) => state.auth.activeModule);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2, 
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, 
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => startAnimation()); 
        };

        startAnimation();
    }, []);

    return (
        <View style={styles.container}>
            {/* Animated Image */}
            <Animated.Image
                source={require('../../assets/images/cosultsuccess.png')}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
                resizeMode="contain"
            />

            <Text style={styles.successText}>Consultation Book Successfully!</Text>
            <Text style={styles.successTextgreeting}>Thank You..</Text>
            <Text style={styles.successTextSub}>
                We appreciate your trust. Our experts will reach out soon!
            </Text>

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
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 25,
        textAlign: 'center',
    },
    successTextgreeting: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 25,
        textAlign: 'center',
    },
    successTextSub: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#979797',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1C57A5',
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

export default AgriOrderSuccess;