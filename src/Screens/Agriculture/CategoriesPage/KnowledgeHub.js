import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import CartHeader from '../Cart/CartHeader'
import styles from './styles'
import { Icons } from '../../../assets/icons/Icons'

export default function KnowledgeHub({ route, navigation }) {

    const hubCategories = [
                {
                    id: 1,
                    name: 'Understanding Soil Health',
                    desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
                    image: Icons.soil_health,
                    youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
                },
                {
                    id: 2,
                    name: 'Optimizing Crop Yield',
                    desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
                    image: Icons.crop_yeild,
                    youtubeLink: 'https://youtu.be/vHRfC735zI8?si=X5FVKabPoCDB5mlq'
                },
                {
                    id: 3,
                    name: 'Understanding Soil Health',
                    desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
                    image: Icons.soil_health,
                    youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
                },
                {
                    id: 4,
                    name: 'Optimizing Crop Yield',
                    desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
                    image: Icons.crop_yeild,
                    youtubeLink: 'https://youtu.be/vHRfC735zI8?si=X5FVKabPoCDB5mlq'
                },
                {
                    id: 5,
                    name: 'Understanding Soil Health',
                    desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
                    image: Icons.soil_health,
                    youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
                },
                {
                    id: 6,
                    name: 'Optimizing Crop Yield',
                    desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
                    image: Icons.crop_yeild,
                    youtubeLink: 'https://youtu.be/vHRfC735zI8?si=X5FVKabPoCDB5mlq'
                },
                {
                    id: 7,
                    name: 'Understanding Soil Health',
                    desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
                    image: Icons.soil_health,
                    youtubeLink: 'https://youtu.be/vHRfC735zI8?si=X5FVKabPoCDB5mlq'
                },
                {
                    id: 8,
                    name: 'Optimizing Crop Yield',
                    desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
                    image: Icons.crop_yeild,
                    youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
                },
            ]

    // Function to open YouTube link
    const openYouTube = (url) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't open URL:", err));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <CartHeader name="Agriculture" showCart={true} />
            <View style={styles.benefitContainer}>
                <Text style={styles.benefittitle}>Knowledge Hub</Text>
            </View>
            <ScrollView style={styles.knowledgesection} vertical={true} >
                {hubCategories.map((category) => (
                    <TouchableOpacity 
                        key={category.id} 
                        style={styles.knowledgeContainer}
                        onPress={() => openYouTube(category.youtubeLink)} // Call function here
                    >
                        <Image source={category.image} style={styles.Image1} />
                        <View style={styles.knowledgeDesc}>
                            <Text style={styles.label}>{category.name}</Text>
                            <Text style={styles.desc}>{category.desc}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ScrollView >
    );
}






















// import { View, Text, ScrollView, TouchableOpacity, Image, Linking} from 'react-native'
// import React from 'react'
// import CartHeader from '../Cart/CartHeader'
// import styles from './styles'
// import { Icons } from '../../../assets/icons/Icons'

// export default function KnowledgeHub({route, navigation}) {

   

//     const hubCategories = [
//         {
//             id: 1,
//             name: 'Understanding Soil Health',
//             desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
//             image: Icons.soil_health,
//             youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
//         },
//         {
//             id: 2,
//             name: 'Optimizing Crop Yield',
//             desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
//             image: Icons.crop_yeild,
//             youtubeLink: ''
//         },
//         {
//             id: 3,
//             name: 'Understanding Soil Health',
//             desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
//             image: Icons.soil_health,
//             youtubeLink: ''
//         },
//         {
//             id: 4,
//             name: 'Optimizing Crop Yield',
//             desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
//             image: Icons.crop_yeild,
//             youtubeLink: ''
//         },
//         {
//             id: 5,
//             name: 'Understanding Soil Health',
//             desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
//             image: Icons.soil_health,
//             youtubeLink: ''
//         },
//         {
//             id: 6,
//             name: 'Optimizing Crop Yield',
//             desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
//             image: Icons.crop_yeild,
//             youtubeLink: ''
//         },
//         {
//             id: 7,
//             name: 'Understanding Soil Health',
//             desc: 'Delve into the essential aspects of soil health, learn how to assess it, and discover practical ways to enhance the fertility of your farmland.',
//             image: Icons.soil_health,
//             youtubeLink: ''
//         },
//         {
//             id: 8,
//             name: 'Optimizing Crop Yield',
//             desc: 'Explore advanced techniques and strategies to maximize your crop yield, including pest management, irrigation, and nutrient optimization.',
//             image: Icons.crop_yeild,
//             youtubeLink: ''
//         },
//     ]

//     return (
//         // <ScrollView contentContainerStyle={styles.scrollContent}>
//         //     <CartHeader name="Agriculture" showCart={true} />
//         //     <View style={styles.benefitContainer}>
//         //         <Text style={styles.benefittitle}>Knowledge Hub</Text>
//         //     </View>
//         //     <ScrollView style={styles.knowledgesection} vertical={true} >
//         //         {
//         //             hubCategories?.map((category, index) => (
//         //                 <View key={category.id} style={styles.knowledgeContainer}>
//         //                     <Image source={category?.image} style={styles.Image1} />

//         //                     <View style={styles.knowledgeDesc}>
//         //                         <Text style={styles.label}>{category?.name}</Text>
//         //                         <Text style={styles.desc}>{category?.desc}</Text>
//         //                     </View>
//         //                 </View>
//         //             ))
//         //         }
//         //     </ScrollView>

//         // </ScrollView >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//             <CartHeader name="Agriculture" showCart={true} />
//             <View style={styles.benefitContainer}>
//                 <Text style={styles.benefittitle}>Knowledge Hub</Text>
//             </View>
//             <ScrollView style={styles.knowledgesection} vertical={true} >
//                 {hubCategories?.map((category) => (
//                     <TouchableOpacity 
//                         key={category.id} 
//                         style={styles.knowledgeContainer}
//                         onPress={() => openYouTube(category.youtubeLink)}
//                     >
//                         <Image source={category?.image} style={styles.Image1} />
//                         <View style={styles.knowledgeDesc}>
//                             <Text style={styles.label}>{category?.name}</Text>
//                             <Text style={styles.desc}>{category?.desc}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//         </ScrollView >
//     )
// }