import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CartHeader from '../Cart/CartHeader'
import styles from './styles'
import Button from '../../../Components/Button'

export default function ProductDetails( {route}) {
// const {Product} = route.params;

const { product } = route.params;

console.log("Received product data:", product);


    const benefitsData = [
        {
            id: '1',
            icon: require("../../../assets/images/plant1.png"),
            text: 'Composite Nutrition for plant growth',
        },
        {
            id: '2',
            icon: require("../../../assets/images/plant2.png"),
            text: 'Ensures rapid root growth and aids in the growth of the plant',
        },
        {
            id: '3',
            icon: require("../../../assets/images/plant3.png"),
            text: 'Helps develop healthier stem and makes the yield greener',
        },
    ];

    const CategoriesData = [
        {
            id: 1,
            name: 'DAP 18-46-0',
            description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
            currentPrice: '₹4000',
            originalPrice: '₹4500',
        },
        {
            id: 2,
            name: 'DAP 18-46-0',
            description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
            currentPrice: '₹4000',
            originalPrice: '₹4500',
        },
    ]

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <CartHeader name="Primary Nutrients" showCart={true} />

            <View style={styles.productDetailsContainer}>
                <View style={styles.productRow}>
                    <Image
                        source={require("../../../assets/images/product_image.png")} 
                        style={styles.productDetailsImage}
                    />

                    <View style={styles.productDetails}>
                        <Text style={styles.productTitle}>{product?.product_name}</Text>
                        <Text style={styles.nutrientHeading}>Product Nutrients</Text>

                        <View style={styles.nutrientRow}>
                            <View style={[styles.nutrientBadge, styles.nitrogenBadge]}>
                                <Text style={styles.nutrientText}>N</Text>
                                <Text style={styles.nutrientSubText}>Nitrogen</Text>
                            </View>
                            <View style={[styles.nutrientBadge, styles.phosphorusBadge]}>
                                <Text style={styles.nutrientText}>P</Text>
                                <Text style={styles.nutrientSubText}>Phosphorus</Text>
                            </View>
                        </View>

                        <View style={styles.pricedetailsContainer}>
                            <Button
                                title="Buy Now"
                                backgroundColor='#1C57A5'
                                buttonStyle={{
                                    width: '40%',
                                    borderRadius: 8,
                                    marginBottom: 5,
                                    marginStart: 0,
                                }}
                                textStyle={{ fontSize: 13 }}
                                textColor='#fff'
                            />
                            <Text style={styles.currentDetailsPrice}>₹{product?.mrp_inclusive_gst}</Text>
                            {/* <Text style={styles.originalDetailsPrice}>₹4500</Text> */}
                        </View>
                    </View>
                </View>


                {/* Product Description */}
                <Text style={styles.productDetailsDescription}>{product?.description}</Text>
            </View>

            {/* Key Benefits */}
            <View style={styles.benefitContainer}>
                <Text style={styles.benefittitle}>Key Benefits</Text>
                <View style={styles.benefitsRow}>
                    {benefitsData.map((benefit) => (
                        <View key={benefit.id} style={styles.benefitCard}>
                            <View style={styles.benefitIconContainer}>
                                <Image source={benefit.icon} style={styles.benefitIcon} />
                            </View>
                            <Text style={styles.benefitText}>{benefit.text}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* How to Use DAP 18-46-0 */}
            <View style={styles.DAPcontainer}>
                <Image
                    source={require("../../../assets/images/plant4.png")}
                    style={styles.DAPimage}
                    resizeMode="cover"
                />
                <View style={styles.DAPDetailsContainer}>
                    <Text style={styles.DAPtitleText}>How to Use {product?.product_name}</Text>
                    <Text style={styles.DAPdescriptionText}>{product?.description}</Text>
                    {/* <Text style={styles.DAPdescriptionText}>
                        DAP can be applied either during pre-sowing cultivation, tilling, or during the sowing of crops.
                    </Text>
                    <Text style={styles.DAPdescriptionText}>
                        The dosage should be as per the crop and soil (As per general recommendation for the State). It is advised not to use DAP on standing crops.
                        It should be applied near the seeds as the DAP dissolves in the soil and provides temporary alkalization of the PH of the soil, thus helping in
                        better absorption of fertilizers in the early crop growth cycle.
                    </Text> */}
                </View>
            </View>

            {/* Other Products */}
            {/* <View style={styles.benefitContainer}>
                <Text style={styles.benefittitle}>Other Products</Text>
            </View> */}

            {/* <View style={styles.horizontalLine}></View> */}

            {/* {
                CategoriesData.map((category, index) => (
                    <>
                        <View key={category.id} style={styles.container}>
                            <View
                                style={styles.productRow}
                            >
                                <Image
                                    source={require("../../../assets/images/product_image.png")}
                                    style={styles.productImage}
                                />

                                <View style={styles.productDetails}>
                                    <Text style={styles.productTitle}>{category.name}</Text>
                                    <Text style={styles.productDescription}>
                                        {category.description}
                                        <Text style={styles.moreInfo}> Know More</Text>
                                    </Text>

                                    <View style={styles.priceRow}>
                                        <Text style={styles.currentPrice}>{category.currentPrice}</Text>
                                        <Text style={styles.originalPrice}>{category.originalPrice}</Text>
                                    </View>
                                </View>
                            </View>

                            <Button
                                title="Buy Now"
                                backgroundColor='#1C57A5'
                                buttonStyle={{
                                    width: '100%',
                                    borderRadius: 8,
                                    marginTop: 20,
                                    marginBottom: 5,
                                    alignSelf: 'center',
                                }}
                                textColor='#fff'
                            />
                        </View>
                        <View style={styles.horizontalLine}></View>
                    </>
                ))
            } */}

        </ScrollView>
    )
}