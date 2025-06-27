import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AgriHeader from './AgriHeader/AgriHeader'
import { styles } from './styles'
import ProductCard from './ProductCard/ProductCard'
import { ScrollView } from 'react-native-virtualized-view'
import { Icons } from '../../assets/icons/Icons'
import Button from '../../Components/Button'

export default function AgriScreen() {
    const DATA = [
        {
            id: 1,
            image: Icons.doctor,
            name: 'Organic Fertilizer',
            price: '$15.99',
        },
        {
            id: 2,
            image: Icons.doctor,
            name: 'Gardening Tools',
            price: '$29.99',
        },
        {
            id: 3,
            image: Icons.doctor,
            name: 'Protection Net',
            price: '$12.99',
        },
        {
            id: 4,
            image: Icons.doctor,
            name: 'Irrigation System',
            price: '$49.99',
        },
    ]
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <AgriHeader />

                <View style={styles.body} >

                    {/* Soil Testing Appointment */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.textLabel}>Soil Testing Appointment Booking</Text>
                        <Text style={styles.textDescription}>Schedule your soil test to get detailed insights and recommendations for your farm.</Text>
                        <Button
                            title="Book Now"
                            backgroundColor='#ff7847'
                            buttonStyle={{
                                width: '35%',
                                borderRadius: 50,
                                marginTop: 20,
                                marginBottom: 10
                            }}
                            textColor='#fff'
                        />
                    </View>

                    {/* Agriculture Product Catalog */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.textLabel}>Agriculture Product Catalog</Text>
                        <View style={styles.productCardmainContainer}>
                            {
                                DATA.map((item, i) => {
                                    return (
                                        <ProductCard key={i} image={item.image} name={item.name} price={item.price} />
                                    )
                                })
                            }
                        </View>
                        <Button
                            title="View All Products"
                            backgroundColor='#ff7847'
                            buttonStyle={{
                                width: '100%',
                                borderRadius: 50,
                                marginTop: 20,
                                alignSelf: 'center',
                                marginBottom: 10
                            }}
                            textColor='#fff'
                        />
                    </View>

                    {/* Knowledge Hub */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.textLabel}>Knowledge Hub</Text>
                        <View style={styles.knowledgeContainer}>
                            <Image source={Icons.doctor_lady} style={styles.Image1} />

                            <View style={styles.knowledgeDesc}>
                                <Text style={styles.label}>Understanding Soil Health</Text>
                                <Text style={styles.desc}>Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.</Text>
                            </View>
                        </View>
                        <View style={styles.knowledgeContainer}>
                            <Image source={Icons.cop} style={styles.Image1} />

                            <View style={styles.knowledgeDesc}>
                                <Text style={styles.label}>Optimizing Crop Yield</Text>
                                <Text style={styles.desc}>Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Talk to an Expert */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.textLabel}>Talk to an Expert</Text>
                        <View style={styles.expertContainer}>
                            <View style={styles.expertDesc}>
                                <Text style={styles.desc}>Get advice from agricultural experts. Whether you're facing challenges with crop diseases or need tips on sustainable farming, our experts are here to help you navigate the complexities of modern agriculture.</Text>
                                <Text style={styles.desc}>Don't miss this opportunity to improve your farming practices and increase your productivity. Connect with us today!</Text>
                            </View>
                            <Button
                                title="Consult Now"
                                backgroundColor='#ff7847'
                                buttonStyle={{
                                    width: '25%',
                                    borderRadius: 50,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                }}
                                textColor='#fff'
                            />
                        </View>
                    </View>
                </View>


            </SafeAreaView>
        </ScrollView >
    )
}