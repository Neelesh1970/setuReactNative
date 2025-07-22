import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  RefreshControl,
  Alert
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
import { cartDetailsSuccess, categoriesSuccess, genderCategoriesSuccess } from "../../../../features/booktest/booktestSlice";
import Loader, { hideLoader, showLoader } from "../../../../Utils/Loader";
import { callGenderCategoryApi, CartDetailsAPi, categoriesApi } from "../../../../Utils/api/bookTest";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ToastService from "../../../../Utils/ToastService";
import { getItem } from "../../../../Utils/utils";
import { LayoutAnimation } from "react-native";



const BookTestScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { width } = Dimensions.get('window');
  const [scrollX, setScrollX] = useState(0);
  const [userID, setUserID] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, [])

  const screenWidth = Dimensions.get("window").width;
  const CARD_WIDTH = screenWidth * 0.45;
  const SCROLL_STEP = CARD_WIDTH * 2;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const scrollViewRefFemale = useRef(null);
  const scrollViewRefMen = useRef(null);

  const categoriesData = useSelector((state) => state.bookTest.categoriesData);
  const genderCategoriesDataa = useSelector((state) => state.bookTest.genderCategoriesData);


  console.log("genderCategoriesDataa", genderCategoriesDataa)
  const dispatch = useDispatch()


  const scrollToPositionFemale = () => {
    if (scrollViewRefFemale.current) {
      setScrollX((prevX) => {
        const newX = prevX + SCROLL_STEP;
        scrollViewRefFemale.current.scrollTo({ x: newX, animated: true });
        return newX;
      });
    }
  };

  console.log("categoriesData", categoriesData)

  const scrollToPositionMen = () => {
    if (scrollViewRefMen.current) {
      setScrollX((prevX) => {
        const newX = prevX + SCROLL_STEP;
        scrollViewRefMen.current.scrollTo({ x: newX, animated: true });
        return newX;
      });
    }
  };

  const categories = [
    { id: 1, name: "Full Body Checkups", image: require("../../../../assets/images/catagory/image1.png") },
    { id: 2, name: "Diabetes Screening Packages", image: require("../../../../assets/images/diabetes.png") },
    { id: 3, name: "Cardiac Health Checkups", image: require("../../../../assets/images/cardiac.png") },
    { id: 4, name: "Kidney Health Packages", image: require("../../../../assets/images/kidney.png") },
    { id: 5, name: "Liver Health Packages", image: require("../../../../assets/images/liver.png") },
    { id: 6, name: "Cancer Screening Packages", image: require("../../../../assets/images/cancer.png") },
    { id: 7, name: "Cardiac Health Checkups", image: require("../../../../assets/images/cardiac.png") },
    { id: 8, name: "Kidney Health Packages", image: require("../../../../assets/images/kidney.png") },
    { id: 9, name: "Liver Health Packages", image: require("../../../../assets/images/liver.png") },
    { id: 10, name: "Cancer Screening Packages", image: require("../../../../assets/images/cancer.png") },
    { id: 11, name: "Cardiac Health Checkups", image: require("../../../../assets/images/cardiac.png") },
    { id: 12, name: "Kidney Health Packages", image: require("../../../../assets/images/kidney.png") },
    {}
  ];

  const imagePaths = [
    { id: 1, image: require("../../../../assets/images/catagory/image1.png") },
    { id: 2, image: require("../../../../assets/images/catagory/image2.png") },
    { id: 3, image: require("../../../../assets/images/catagory/image3.png") },
    { id: 4, image: require("../../../../assets/images/catagory/image4.png") },
    { id: 5, image: require("../../../../assets/images/catagory/image5.png") }
  ]
  console.log(imagePaths);

  // const testCategories = useMemo(() => {
  //   return categoriesData && categoriesData.length > 0
  //     ? categoriesData.map((data, index) => ({
  //       name: data,
  //       image: imagePaths[index % imagePaths.length].image,
  //     }))
  //     : [];
  // }, [categoriesData]);


  // const sections = Array.from({ length: 10 });


  const testCategories = useMemo(() => {
    return categoriesData?.length > 0
      ? categoriesData.map((data, index) => ({
        name: data,
        image: imagePaths[index % imagePaths.length].image,
      }))
      : [];
  }, [categoriesData]);


  const cartItems = Array.from({ length: 5 });

  const callCategory = async () => {
    showLoader();
    const data = {
      "productType": "profile",
      'user_id': userID
    }
    try {
      const response = await categoriesApi(data);
      console.log('callCategory Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from callCategory call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }


  const callGenderCategory = async () => {
    showLoader();
    const data = {
      'user_id': userID
    }
    try {
      const response = await callGenderCategoryApi(data);
      console.log('callGenderCategory Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(genderCategoriesSuccess({ data: response.data.GenderListing }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from callGenderCategory call:', error.response ? error.response.data : error.message);
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
    if (userID && userID != null) {
      CartDetails()
      callCategory()
      callGenderCategory()
    }
  }, [userID, refreshing])

  const CartDetails = async () => {
    // showLoader();
    const data = {
      // "productType": "profile",
      // "category": category?.name
      'user_id': userID
    }
    try {
      console.log('CartDetails data input:', data);
      const response = await CartDetailsAPi(data);
      console.log('CartDetails Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(cartDetailsSuccess({ data: response.data.data }));
      } else {
        // Alert.alert(response.data.message || "Something Went Wrong");
      }
    } catch (error) {
      console.log('Error from CartDetails call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        // Alert.alert(error.response.data.message);
      } else {
        // Alert.alert("An error occurred. Please try again later.");
      }
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
    if (userID && userID != null) {
      CartDetails()
    }
  }, [userID])

  const [selectedCategory, setSelectedCategory] = useState(null);

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory((prevCategory) =>
  //     prevCategory?.name === category?.name ? null : category
  //   );
  // };


  // const handleCategorySelect = (category) => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   setSelectedCategory((prevCategory) =>
  //     prevCategory?.name === category?.name ? null : category
  //   );
  // };

  const handleCategorySelect = useCallback(
    (category) => {
      if (selectedCategory?.name !== category?.name) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedCategory(category);
      } else {
        setSelectedCategory(null);
      }
    },
    [selectedCategory]
  );

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']}
          tintColor={'#00ff00'}
        />
      }>
      <Loader />
      <CartHeader name="Book Test" showCart={true} showOrderIcon={true}/>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBarScreens />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../assets/images/booktestbg.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.headingText}>{t("lab_tests_at_your_Doorstep")}</Text>
          <Text style={styles.subHeadingText}>{t("lab_tests_at_your_Doorstep_sub_heading")}</Text>
          <View style={styles.buttonContainer}>
            {testCategories?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.customButton,
                  selectedCategory?.name === category?.name && styles.activeButton,
                ]}
                onPress={() => { handleCategorySelect(category) }}
              >
                <Text style={styles.buttonText}>
                  {category?.name
                    ? category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()
                    : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.newButton}
            // onPress={() => navigation.navigate("HealthPackageCard", { category: selectedCategory })}>
            onPress={() => {
              if (!selectedCategory) {
                // Alert.alert("Selection Required", "Please select a test before proceeding.");
                ToastService.showError("Please select a test before proceeding.")
              }
              else {
                navigation.navigate("HealthPackageCard", { category: selectedCategory });
              }
            }}
          >
            <Text style={styles.newButtonText}>Book Test</Text>
          </TouchableOpacity>

          <Image
            source={require("../../../../assets/images/doctor-taking-patients-temperature1.png")}
            style={styles.overlayImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.boxcontainer}>
          <View style={styles.box}>
            <Image source={require('../../../../assets/images/total-quality-management_184970721.png')} style={styles.boxImage} />
            <Text style={styles.boxText}>Certified Equipment and Processes</Text>
          </View>

          <View style={styles.box}>
            <Image source={require('../../../../assets/images/professional_122518811.png')} style={styles.boxImage} />
            <Text style={styles.boxText}>Trained Professionals</Text>
          </View>

          <View style={styles.box}>
            <Image source={require('../../../../assets/images/clarity_144630781.png')} style={styles.boxImage} />
            <Text style={styles.boxText}>Transparency in Services</Text>
          </View>
        </View>

        <View style={styles.horizontalLine}></View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Categories</Text>
          <Text style={styles.description}>
            "Explore a curated list of categories to quickly find and book the
            medical tests or health packages that suit your needs."
          </Text>
        </View>

        <ScrollView vertical={true} style={{ height: expanded ? 'auto' : ms(235) }}>
          <View style={[{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
            {testCategories?.map((category, index) => (
              <TouchableOpacity key={index} style={styles.BowserCategorycontainer} onPress={() => navigation.navigate("HealthPackageCard", { category: category, image: category?.image })}>
                <Image
                  source={category?.image}
                  style={styles.BowserCategorybg}
                  resizeMode="cover"
                />
                <Text style={styles.BowserCategoryText}>
                  {category?.name.charAt(0).toUpperCase() + category?.name.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={toggleExpand} style={{ marginBottom: 10 }}>
          <FontAwesome name="chevron-circle-down" size={30} color="#140B41" />
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Checkups for Women</Text>
          <Text style={styles.description}>
            "Tailored health packages focusing on women's unique health needs, including hormonal, reproductive, and general wellness screenings."
          </Text>
        </View>
        <View style={[{ flexDirection: 'row', position: 'relative' }]}>
          <ScrollView horizontal={true} style={{ width: expanded }} ref={scrollViewRefFemale}>
            <View style={[{ flexDirection: 'row', backgroundColor: '#ffffff', padding: ms(10) }]}>
              {genderCategoriesDataa?.['Women'].map((item, index) => (
                <View key={index} style={styles.RecommendedCheckupContainer}>
                  <View style={styles.RecommendedCheckupContainer1}>
                    <Image
                      // source={require('../../../../assets/images/checkupwomrn1.png')}
                      source={{ uri: item?.image }}
                      style={styles.RecommendedCheckupContainerImage}
                      resizeMode="contain"
                    />
                  </View>

                  <TouchableOpacity style={styles.RecommendedCheckupButton} onPress={() => navigation.navigate("HealthPackageCard", { data: item })}>
                    <Text style={styles.RecommendedCheckupText}>
                      {item?.ageGroup
                        ? item.ageGroup.charAt(0).toUpperCase() + item.ageGroup.slice(1).toLowerCase()
                        : ""} Years

                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={{ position: 'absolute', bottom: '45%', right: '0%' }}>
            <FontAwesome name="chevron-circle-right" size={30} color="#140B41" onPress={scrollToPositionFemale} />
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine}></View>

        {/* // Section 3 (Recommended Checkups for  Men*/}


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Checkups for Men</Text>
          <Text style={styles.description}>
            "Comprehensive health packages designed to address Men's specific health concerns across all life stages."
          </Text>
        </View>
        <View style={[{ flexDirection: 'row', position: 'relative' }]}>
          <ScrollView horizontal={true} style={{ width: expanded }} ref={scrollViewRefMen}>
            <View style={[{ flexDirection: 'row', backgroundColor: '#ffffff', padding: ms(10) }]}>
              {genderCategoriesDataa?.['Men']?.map((item, index) => (
                <View key={index} style={styles.RecommendedCheckupContainer}>
                  <View style={styles.RecommendedCheckupContainer1}>
                    <Image
                      // source={require('../../../../assets/images/checkman.png')}
                      source={{ uri: item?.image }}
                      // source={{ uri: "https://www.thyrocare.com/images/menWomenCheckups/men/under25.webp" }}
                      style={styles.RecomChkupContainerImageMen}
                      resizeMode="contain"
                    />
                  </View>

                  <TouchableOpacity style={styles.RecommendedCheckupButton} onPress={() => navigation.navigate("HealthPackageCard", { data: item })}>
                    <Text style={styles.RecommendedCheckupText}>{item?.ageGroup?.toUpperCase()} Years</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={{ position: 'absolute', bottom: '45%', right: '0%' }}>
            <FontAwesome name="chevron-circle-right" size={30} color="#140B41" onPress={scrollToPositionMen} />
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine}></View>

        {/* <View style={styles.toppackages}>
          <View style={styles.row}>
            <Image
              source={require('../../../../assets/images/safe.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.leftText}>100%Safe & Hygienic</Text>
            <Text style={styles.rightText}>India’s Trusted Labs</Text>
          </View>

          <Text style={styles.heading}>Top Packages</Text>
          <Text style={styles.subText}>Tailored to meet your unique need</Text>
        </View> */}

        {/* <View style={styles.horizontalLine}></View> */}

        {/* <View style={styles.Cart}>
          <Text style={styles.Carttitle}>Aarogyam Full Body Platinum</Text>
          <Text style={styles.CartsubText}>Includes 145 Tests</Text>
          <Text style={styles.Cartprice}>₹ 8499</Text>
          <Text style={styles.Cartprovider}>Thyrocare Technologi..</Text>
          <TouchableOpacity style={styles.Cartbutton}>
            <Text style={styles.CartbuttonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View> */
        }
        {/* <ScrollView horizontal={true} style={{ height: expanded }}>
          <View style={{ flexDirection: 'row' }}>
            {cartItems?.map((_, index) => (
              <View key={index} style={styles.Cart}>
                <View style={styles.CartText}>
                  <Text style={styles.Carttitle}>Aarogyam Full Body Platinum</Text>
                  <Text style={styles.CartsubText}>Includes 145 Tests</Text>
                  <Text style={styles.Cartprice}>₹ 8499</Text>
                  <Text style={styles.Cartprovider}>Thyrocare Technologi..</Text>
                </View>
                <TouchableOpacity
                  style={styles.Cartbutton}
                >
                  <Text style={styles.CartbuttonText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView> */}
        <View style={styles.horizontalLine}></View>

        <View style={styles.imageContainerFooter}>
          <Text style={styles.headingText1}>Wellness</Text>
          <Text style={styles.headingText1}>Begins with You</Text>
          <Image
            source={require('../../../../assets/images/booktestfoot.png')}
            style={styles.fullWidthImage}
            resizeMode="cover"
          />
        </View>
      </View >
    </ScrollView >
  );
};
export default BookTestScreen;