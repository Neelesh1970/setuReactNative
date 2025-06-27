import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import SearchBarScreens from "../SearchBar";
import { ms } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import styles from "./style";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, { Image as SvgImage } from "react-native-svg";
import { use } from "i18next";
import CartHeader from "../Cart/CartHeader";
import { Icons } from "../../../assets/icons/Icons";
import Button from "../../../Components/Button";
import Loader, { hideLoader, showLoader } from "../../../Utils/Loader";
import { cartDetailsSuccess, categoriesSuccess, setisComefromBookAppoint } from "../../../features/agriculture/agricultureSlice";
import { CartDetailsApi, categoriesApi, fertilizerListing } from "../../../Utils/api/Agriculture";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../../Utils/utils";
import ToastService from "../../../Utils/ToastService";
import { callconsultApi } from "../../../Utils/api/Agriculture";


export const AgricultureScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const [hubExpanded, setHubExpanded] = useState(false);
  const { width } = Dimensions.get('window');
  const [activeTest, setActiveTest] = useState('');
  const [userID, setUserID] = useState(null);
  const categoriesData = useSelector((state) => state.agriculture.categoriesData);
  const dispatch = useDispatch();

  const Data = ['Moisture', 'Organic Carbon (OC)', 'Instant Results', 'pH', 'Electrical Conductivity (EC)', 'Temperature', 'Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)']

  console.log('categoriesData:', categoriesData);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, [])

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const toggleHubExpand = () => {
    setHubExpanded(!hubExpanded);
  };
  const scrollViewRefFemale = useRef(null);
  const scrollViewRefMen = useRef(null);

  const scrollToPositionFemale = () => {
    if (scrollViewRefFemale.current) {
      scrollViewRefFemale.current.scrollTo({ x: ms(337), animated: true });
    }
  };

  const scrollToPositionMen = () => {
    if (scrollViewRefMen.current) {
      scrollViewRefMen.current.scrollTo({ x: ms(337), animated: true });
    }
  }


  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


  const CartDetails = async () => {

    const data = {
      'user_id': userID
    }
    try {
      console.log('CartDetails data input:', data);
      const response = await CartDetailsApi(data);
      console.log('CartDetails Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(cartDetailsSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from CartDetails call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      // hideLoader();
    }
  }


  const callCategory = async () => {
    showLoader();
    // const data = {
    //   "productType": "profile"
    // }
    try {
      const response = await fertilizerListing();
      console.log('callCategory Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from callCategory call:', error.response ? error.response.data : error.response.data.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }



  useEffect(() => {
    callCategory()
    if (userID && userID != null) {
      CartDetails()
    }
  }, [userID])



  const callCounsultAPI = async () => {
    showLoader();
    const data = {
      "user_id": userID,
      "type": "agriculture"
    }
    try {
      console.log('callCounsultAPI data input:', data);
      const response = await callconsultApi(data);
      console.log('callCounsultAPI Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // dispatch(categoriesSuccess({ data: response.data.data }));
        ToastService.showSuccess('Success!', response.data.message || "Thank you setu team will reach out soon!")
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from callCategory call:', error.response ? error.response.data : error.response.data.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }


  // const testCategoriesBackup = [
  //   "Potassium ( K )",
  //   "Temperature",
  //   "Electrical Conducticity ( EC )",
  //   "Instant Results",
  //   "Nitrogen ( N )",
  //   "Phosphorus ( P )",
  //   "Moisture",
  //   "Organic Carbon ( OC )",
  //   "pH",
  // ];

  //   [
  //     {
  //         "id": 1,
  //         "name": "Subsidized Fertiliser"
  //     },
  //     {
  //         "id": 2,
  //         "name": "Nano Fertiliser"
  //     }
  // ]

  // const testCategories = []
  const testCategories = useMemo(() => {
    return categoriesData && categoriesData?.length > 0
      ? categoriesData?.map((data) => ({ name: data?.name, image: require("../../../assets/images/Primary_Nutrients.png"), id: data?.id }))
      : []
  }, [categoriesData]);

  console.log('testCategories:', testCategories);


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
      youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
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
      youtubeLink: 'https://youtu.be/A8qTRBc8Bws?si=T5Ckkbx9za5kQpv6'
    },
  ]


  // Function to open YouTube link
      const openYouTube = (url) => {
          if (url) {
              Linking.openURL(url).catch(err => console.error("Couldn't open URL:", err));
          }
      };
  

  const sections = Array.from({ length: 10 });

  const cartItems = Array.from({ length: 5 });

  const handleTest = (category) => {
    setActiveTest(category)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <CartHeader name="Agriculture" showCart={true} showOrderIcon={true}/>
      <Loader />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBarScreens />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/soil_test.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.headingText}>{t("soil_testing_appointment_booking")}</Text>
          <Text style={styles.subHeadingText}>{t("soil_testing_appointment_booking_sub_heading")}</Text>

          <View style={styles.buttonContainer}>
            {Data?.map((category, index) => (
              <View
                key={index}
                style={[
                  styles.customButton,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.42)"
                  }
                ]}
              >
                <Text style={styles.buttonText}>{category}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => {
              dispatch(setisComefromBookAppoint({data: true}));
              // if (!selectedCategory) {
              //   ToastService.showError("Please select a test before proceeding.");
              //   return;
              // }
              // navigation.navigate("Categories", { Test: true }); 
              navigation.navigate("AgroScreenSlotDetails");
            }}
          >
            <Text style={styles.newButtonText}>Book Test</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.horizontalLine}></View>

        {/* // Section 2 (Browse by Categories) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Categories</Text>
          <Text style={styles.description}>
            "Explore a curated list of categories to quickly find Fertilizers that suit your needs."
          </Text>
        </View>

        {/* Browse by Categories Section */}
        <ScrollView vertical={true} style={{ height: expanded ? 'auto' : ms(235) }}>
          <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
            {testCategories?.map((category, index) => (
              <TouchableOpacity key={index} style={styles.BowserCategorycontainer}
                onPress={() => navigation.navigate("Categories", { category: category?.id ,Test: false})}
              >
                <Image
                  source={category.image}
                  style={styles.BowserCategorybg}
                  resizeMode="cover"
                />
                <Text style={styles.BowserCategoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={toggleExpand} style={{ marginBottom: 10 }}>
          <FontAwesome name="chevron-circle-down" size={30} color="#140B41" />
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>


        {/* // Section 3 (Knowledge Hub*/}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Hub</Text>
          <Text style={styles.description}>
            "Explore curated insights, resources, and expert perspectives in our Knowledge Hub."
          </Text>
        </View>

        <ScrollView style={[styles.knowledgesection, { height: hubExpanded ? 'auto' : ms(200) }]} vertical={true} >
          {
            hubCategories.map((category, index) => (
              <TouchableOpacity key={category.id} style={styles.knowledgeContainer} onPress={() => openYouTube(category.youtubeLink)}>
                <Image source={category.image} style={styles.Image1} />

                <View style={styles.knowledgeDesc}>
                  <Text style={styles.label}>{category.name}</Text>
                  <Text style={styles.desc}>{category.desc}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("KnowledgeHub", { categories: hubCategories })}
        // onPress={toggleHubExpand}
        >
          <FontAwesome name="chevron-circle-down" size={30} color="#140B41" />
        </TouchableOpacity>

        <View style={styles.horizontalLine}></View>

        {/* Talk to an Expert */}
        <View style={styles.expertSection}>
          <Text style={styles.sectionTitle}>Talk to an Expert</Text>
          <Text style={styles.expertDesc}>Get advice from agricultural experts. Whether you’re facing challenges with crop diseases or need tips on sustainable farming, our experts are here to help you navigate the complexities of modern agriculture.</Text>
          <Text style={styles.experQuote}>Don’t miss this opportunity to improve your farming practices and increase your productivity. Connect with us today!</Text>

          <Button
            title="Consult Now"
            backgroundColor='#DE3F35'
            buttonStyle={{
              width: '80%',
              borderRadius: 8,
              marginTop: 20,
              marginBottom: 5,
              alignSelf: 'center',
            }}
            onPress={callCounsultAPI}
            textColor='#fff'
          />

        </View>

        {/* AgriTech at */}
        <View style={styles.imageContainerFooter}>
          <Text style={styles.headingText1}>AgriTech at</Text>
          <Text style={styles.headingText1}>Your Fingertips</Text>
          <Image
            source={require('../../../assets/images/agritech.png')}
            style={styles.agritechImage}
          />
        </View>
      </View >
    </ScrollView >
  );
};
