import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { CardItem } from "./CardItem";
import HemogramList from "./HemogramList";
import TableInfo from "./Tableinfo";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBarScreens from "../SearchBar";
import CartHeader from "../Cart/CartHeader";
import { ms } from "react-native-size-matters";
import { SimilarPackages } from "./Similarpackage";
import ToastService from "../../../../Utils/ToastService";
import { AddtoCart, CartDetailsAPi, FullBodyCheckupAPI, getSimilarpkgApi } from "../../../../Utils/api/bookTest";
import { cartDetailsSuccess } from "../../../../features/booktest/booktestSlice";
import { hideLoader, showLoader } from "../../../../Utils/Loader";
import { getItem } from "../../../../Utils/utils";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";





export const FullBodyInfoScreen = ({
  navigation, route
}) => {
  const tableData = [
    { id: "1", name: "John Doe", age: 25, gender: "Male" },
    { id: "2", name: "Jane Smith", age: 30, gender: "Female" },
    { id: "3", name: "Mark Taylor", age: 22, gender: "Male" },
    { id: "4", name: "Lisa Brown", age: 27, gender: "Female" },
  ];

  const [userID, setUserID] = useState(null);
  const [similarPackages, setSimilarPackages] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, [])


  const code = route?.params?.code
  const name = route?.params?.name
  const price = route?.params?.rate ?? 0



  console.log('code:', code)

  // const data = {
  //   "price": "4640",
  //   "packages_list": [
  //     {
  //       "packagename": "DIABETES",
  //       "child": [
  //         "AVERAGE BLOOD GLUCOSE (ABG)",
  //         "FASTING BLOOD SUGAR(GLUCOSE)",
  //         "HbA1c",
  //         "POSTPRANDIAL BLOOD SUGAR(GLUCOSE)"
  //       ]
  //     },
  //     {
  //       "packagename": "HORMONE",
  //       "child": [
  //         "FREE ANDROGEN INDEX",
  //         "TESTOSTERONE"
  //       ]
  //     },
  //     {
  //       "packagename": "HYPERTENSION",
  //       "child": [
  //         "ALDOSTERONE"
  //       ]
  //     },
  //     {
  //       "packagename": "INFERTILITY",
  //       "child": [
  //         "ANTI MULLERIAN HORMONE (AMH)",
  //         "FOLLICLE STIMULATING HORMONE (FSH)",
  //         "FREE TESTOSTERONE",
  //         "LUTEINISING HORMONE (LH)",
  //         "PROLACTIN (PRL)",
  //         "SEX HORMONE BINDING GLOBULIN (SHBG)"
  //       ]
  //     },
  //     {
  //       "packagename": "STEROID",
  //       "child": [
  //         "ANDROSTENEDIONE",
  //         "17-HYDROXYPROGESTERONE",
  //         "CORTISOL",
  //         "CORTICOSTERONE",
  //         "DEOXYCORTISOL",
  //         "DEHYDROEPIANDROSTERONE",
  //         "DHEA - SULPHATE (DHEAS)",
  //         "ESTRADIOL",
  //         "PROGESTERONE"
  //       ]
  //     },
  //     {
  //       "packagename": "THYROID",
  //       "child": [
  //         "TOTAL TRIIODOTHYRONINE (T3)",
  //         "TOTAL THYROXINE (T4)",
  //         "TSH - ULTRASENSITIVE"
  //       ]
  //     },
  //     {
  //       "packagename": "VITAMINS",
  //       "child": [
  //         "FOLATE",
  //         "VITAMIN D TOTAL",
  //         "VITAMIN D2",
  //         "VITAMIN D3",
  //         "VITAMIN B-12"
  //       ]
  //     }
  //   ]
  // }
  const [bodyInfo, setBodyInfo] = useState()


  const callCategoryInfo = async () => {
    showLoader();
    const data = {
      "user_id": userID,
      "code": code
    }
    try {
      const response = await FullBodyCheckupAPI(data);
      console.log('callGenderCategory fullbody info:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        setBodyInfo(response?.data)
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
    if (userID && userID != null && code && code != null) {
      console.log('userID:', userID)
      console.log('code:', code)
      callCategoryInfo()
    }
  }, [code, userID])

  const totaltest = () => {
    const totaltest = bodyInfo?.packages_list?.reduce((acc, pkg) => {
      return acc + (pkg?.child?.length || 0)
    }, 0)
    return totaltest
  }


  const callSimilarPkg = async () => {
    showLoader();
    const data = {
      "user_id": userID,
      "code": code
    }
    try {
      console.log('getSimilarpkgApi fullbody input:', data);

      const response = await getSimilarpkgApi(data);
      console.log('getSimilarpkgApi fullbody info:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        setSimilarPackages(response.data.data || []);
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from getSimilarpkgApi call:', error.response ? error.response.data : error.message);
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
    if (userID && code) {
      callSimilarPkg();
    }
  }, [userID, code]);

  // add to cart


  const handleCart = async (code,isNavigate = false) => {
    if (userID && userID != null) {
      AddtoCartAPI(code)
    }
  }



  const AddtoCartAPI = async (code,isNavigate) => {
    // showLoader();
    const data = {
      "productCode": code,
      "quantity": 1,
      'user_id': userID
    }

    try {
      console.log('AddtoCartAPI data input:', data);
      const response = await AddtoCart(data);
      console.log('AddtoCartAPI Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // dispatch(categoriesInfoSuccess({ data: response.data.data }));
        ToastService.showSuccess('Success!', response.data.message ?? "Added to the Cart!")
        navigation.navigate('CartScreen')
        // if (isNavigate) {
        //   navigation.navigate('CartScreen')
        // }
        CartDetails()
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from AddtoCartAPI call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', error.response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      // hideLoader();
    }
  }

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


  return (
    <View style={styles.screenContainer}>
      <CartHeader name="Full Body Checkup" showCart={true} />

      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{name}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this package</Text>
            <Text style={styles.description}>
              <Text style={styles.hilightDescription}>{name}</Text> is a preventive care, curative health checkup package that includes <Text style={styles.hilightDescription}>{totaltest()} parameters</Text> with essential blood.
            </Text>
          </View>

          <Text style={styles.HeadTitle}>Test included in this package</Text>
          <Text style={styles.SubheadTitile}>{totaltest()} Tests</Text>

          <HemogramList bodyInfo={bodyInfo} />

          <Text style={styles.SimilarPackages}>Similar Packages</Text>

          {similarPackages.length > 0 && similarPackages.map((item, index) => (
            <View key={index} style={styles.similarpkgcard} onPress={() => navigation.navigate("fullbodyinfo", { code: item.code })}>
              <View style={styles.similarpkgcardHeader}>
                <Text style={styles.similarpkgcardTitle}>{item.packageName}</Text>
                <TouchableOpacity>
                  {/* <FontAwesome name="chevron-circle-right" size={23} color="#134cf9" /> */}
                </TouchableOpacity>
              </View>
              <View style={styles.similarpkgtestList}>
                <Text style={styles.similarpkgtestItem}>
                  <Text style={styles.similarpkglinkText}>
                    {item.category
                      ? item.category
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")
                      : ''}
                  </Text>
                </Text>
              </View>
              <View style={styles.similarpkgcardFooter}>
                <Text style={styles.similarpkgprice}>₹{item.price}</Text>
                <TouchableOpacity style={styles.similarpkgcartButton} onPress={() => handleCart(item.code)}>
                  <Text style={styles.similarpkgcartButtonText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomcontainer}>
        <View style={styles.bottomtextContainer}>
          <Text style={styles.bottomlabel}>₹{bodyInfo?.price}</Text>
        </View>
        <TouchableOpacity style={styles.bottombutton}
        onPress={() => handleCart(code,true)}
        >
          <Text style={styles.bottombuttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,

  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: ms(50),
  },
  title: {
    fontSize: ms(19),
    fontWeight: "bold",
    marginBottom: ms(19),
    textAlign: 'left',
  },
  section: {
    marginBottom: ms(15),
  },
  sectionTitle: {
    fontSize: ms(18),
    fontWeight: "bold",
    marginBottom: ms(8),
    color: "#3E4F5F",
  },
  hilightDescription: {
    fontSize: ms(16),
    fontWeight: "bold",
    marginBottom: ms(8),
    color: "#3E4F5F",
  },
  description: {
    fontSize: ms(16),
    marginBottom: 8,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#929292",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: ms(10),
    color: "#000000",
  },
  cardDescription: {
    fontSize: 16,
    color: "#4B4B4B",
    marginLeft: ms(30),
    fontWeight: 'bold',
    opacity: 0.8
  },
  tableWrapper: {
    borderWidth: 2,

    borderRadius: 4,
    borderColor: "#CFCFCF",
    marginBottom: 20,
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#3E4F5F",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  rowText: {
    flex: 1,
    fontSize: ms(12),
    fontWeight: "bold",
    color: "#3E4F5F",
    textAlign: "center",
  },
  HeadTitle: {
    // paddingVertical: ms(5),
    fontSize: ms(16),
    fontWeight: "bold",
    color: "#000000",
  },
  SimilarPackages: {
    paddingVertical: ms(15),
    fontSize: ms(20),
    fontWeight: "bold",
    color: "#000000",
  },
  SubheadTitile: {
    color: '#545454',
    fontFamily: 'Roboto',
    fontSize: ms(15)
  },
  similarpkgcard: {
    backgroundColor: "#fff",
    borderRadius: ms(10),
    padding: ms(10),
    // margin: ms(10),
    marginBottom: ms(20),
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  similarpkgcardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ms(10),
    padding: ms(4),
  },
  similarpkgcardTitle: {
    fontSize: ms(16),
    fontWeight: "bold",
    color: "#140B41",
    fontFamily: 'Roboto',
    width: ms(250)
  },

  HeadTitle: {
    paddingVertical: ms(5),
    // paddingLeft: ms(14),
    fontSize: ms(20),
    fontWeight: "bold",
    color: "#140B41",
  },
  similarpkgtestList: {
    marginBottom: 15,
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  similarpkgtestItem: {
    fontSize: 14,
    color: "#3E4F5F",
    marginBottom: 3,
  },
  similarpkglinkText: {
    fontSize: ms(16)
    // color: "#0A3D91",
    // textDecorationLine: "underline",
  },
  similarpkgmoreTests: {
    color: "#2373B0",
    fontWeight: "bold",
  },
  similarpkgcardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  similarpkgprice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#140B41",
  },
  similarpkgcartButton: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#140B41",
    borderRadius: 5,
    paddingVertical: 5,
  },
  similarpkgcartButtonText: {
    color: "#1C57A5",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomcontainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bottomtextContainer: {
    flex: 1,
  },
  bottomlabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  bottombutton: {
    backgroundColor: "#0A4DA2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bottombuttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});

