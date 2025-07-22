import React from 'react'
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env'
import { Text } from 'react-native'

const index = () => {
    console.log(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
    return (
        <Text>index</Text>
    )
}

export default index