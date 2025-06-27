import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Button from '../../../Components/Button'

export default function ProductCard({ image, name, price }) {
    return (
        <View style={styles.ProductCardContainer}>
            <Image source={image} style={styles.image} />
            <Text style={styles.label}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            <Button
                title="Book Now"
                backgroundColor='#ff7847'
                buttonStyle={{
                    borderRadius: 50,
                    marginTop: 10,
                    marginBottom: 0,
                    width: '100%',
                    alignSelf: 'center'
                }}
                textColor='#fff'
            />
        </View>
    )
}