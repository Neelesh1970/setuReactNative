import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
  Alert,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import SearchBarScreens from "../SearchBar";
import { BlogCardPage } from "./BlogCardPage";
import { CardItem } from "./CardItem";
import { ms, s, verticalScale, vs } from "react-native-size-matters";
import CartHeader from "../Cart/CartHeader";
import Loader, { hideLoader, showLoader } from "../../../../Utils/Loader";
import { callGendercategoriesInfoApi, categoriesInfoApi } from "../../../../Utils/api/bookTest";
import { categoriesInfoSuccess } from "../../../../features/booktest/booktestSlice";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../../../Utils/ToastService";



export const HealthPackageCard = ({ navigation, route }) => {
  const { category = '' } = route?.params;
  const { data = '' } = route?.params
  const { image = '' } = route?.params

  console.log("HealthPackageCard category", category)
  console.log("HealthPackageCard data", data)


  const categoriesInfoData = useSelector((state) => state.bookTest.categoriesInfoData);
  const dispatch = useDispatch()


  const categoriesInfo = async () => {
    showLoader();
    const data = {
      // "apiKey": "9apaag9y2s@mw71fcih7njogitsgkpce.zwzzkchbdtao)JICtGNJig==",
      "productType": "profile", 
      "category": category?.name
    }
    try {
      console.log('categoriesInfoApi data input:', data);
      const response = await categoriesInfoApi(data);
      console.log('categoriesInfoApi Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesInfoSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from categoriesInfoApi call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  const gendercategoriesInfo = async () => {
    showLoader();
    const dataa = {
      "genderType": data?.genderType,
      "age_group": data?.ageGroup
    }
    try {
      console.log('gendercategoriesInfo data input:', dataa);
      const response = await callGendercategoriesInfoApi(dataa);
      console.log('gendercategoriesInfo Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesInfoSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from gendercategoriesInfo call:', error.response ? error.response.data : error.message);
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
    if (category && category?.name) {
      categoriesInfo()
    }
  }, [category])

  useEffect(() => {
    if (data && data?.genderType && data?.ageGroup) {
      gendercategoriesInfo()
    }
  }, [data])


  const categoriesData = [
    { id: 1, name: "FREEDOM HEALTHY PACKAGE 2021", price: 1200 },
    { id: 2, name: "FREEDOM HEALTHY PACKAGE 2022", price: 1500 },
    { id: 3, name: "FREEDOM HEALTHY PACKAGE 2023", price: 1700 },
    { id: 4, name: "FREEDOM HEALTHY PACKAGE 2024", price: 2000 },
  ];

  const CategoriesInfo = useMemo(() => {
    return categoriesInfoData && categoriesInfoData?.length > 0
      ? categoriesInfoData
      : []
  }, [categoriesInfoData]);

  const DeaseaseGroup = useMemo(() => {
    return categoriesInfoData && categoriesInfoData?.length > 0
      ? `${categoriesInfoData?.[0]?.diseaseGroup}`
      : 'N/A'
  }, [categoriesInfoData]);

  console.log("CategoriesInfo", CategoriesInfo)

  return (
    <View style={styles.screenContainer}>
      <CartHeader name={category?.name ?? data?.ageGroup?.toUpperCase()} showCart={true} />
      <Loader />
      <SearchBarScreens />
      <View style={styles.container}>
        <ScrollView Style={styles.scrollContent}>
          {/* First Card */}
          <View style={styles.cardWithImage}>
            <Image
              source={image}
            />
            {/* <HR_1  style={styles.cardImage} /> */}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{category?.name ?? data?.ageGroup?.toUpperCase()} CHECKUPS</Text>
              <Text style={styles.cardSubtitle}>
                Curated by Doctors for you
              </Text>
            </View>
          </View>
          <Text style={styles.HeadTitle}>Recommended Packages</Text>
          {
            Array.isArray(CategoriesInfo) && CategoriesInfo?.length > 0 && CategoriesInfo?.map((item, index) => (
              <CardItem key={index} navigation={navigation} categoriesData={item} />
            ))
          }
          <View style={styles.centeredText}>
            <Text style={styles.HeadTitle}>Health Tips</Text>
          </View>

          {/* <BlogCardPage /> */}
          <BlogCardPage />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: ms(10),
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: ms(5),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: ms(10),
    padding: ms(15),
    margin: ms(10),
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ms(10),
    padding: ms(4),
  },
  cardTitle: {
    fontSize: ms(16),
    fontWeight: "bold",
    color: "#140B41",
    paddingLeft: ms(14),

  },
  HeadTitle: {
    paddingTop: ms(10),
    paddingBottom: ms(10),
    paddingLeft: 14,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#000000",
  },
  testList: {
    marginBottom: 15,
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  testItem: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  linkText: {
    color: "#0A3D91",
    textDecorationLine: "underline",
  },
  moreTests: {
    color: "#0A3D91",
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cartButton: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderColor: "#140B41",
    borderRadius: 5,
    paddingVertical: 5,
  },
  cartButtonText: {
    color: "#1C57A5",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardWithImage: {
    width: "100%",
    height: 140,
    paddingHorizontal: 10,
    backgroundColor: "#F0F7FF",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  cardImage: {
    width: 130,
    height: 110,
    borderRadius: 10,
    // marginRight: 15,
  },
  textContainer: {
    flex: 1,
    top: -25
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#444",
    paddingLeft: ms(14),
  },
  centeredText: {
    alignItems: "center",
    justifyContent: "center",
  },
});

