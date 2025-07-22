import { StatusBar } from "react-native";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import { moderateScale, ms } from "react-native-size-matters";
import CartItem from "./CartItem";
import ListHeader from "../../Components/ListHeader";
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view";
import {
  productData,
  productMonsoon,
  billSummary,
  screenWidth,
} from "../../Utils/utils";
import ProductCell from "../../Components/ProductCell";
import Button from "../../Components/Button";
import BillSummaryRow from "../../Components/BillSummaryRow";
import React, { useState, useRef, useCallback } from "react";
import UploadPresSheet from "./UploadPresSheet";
import ConfirmDeliverySheet from "./ConfirmDeliverySheet";
import ConfirmMobileSheet from "./ConfirmMobileSheet";
import LoginHeader from "../../Components/LoginHeader";
import ProductViewCard from "../../Components/ProductViewCard";
import DropShadow from "react-native-drop-shadow";
import AllfilterBottomSheet from "./AllfilterBottomSheet";
import SortBottomSheet from "./SortBottomSheet";
function ProductView({ navigation }) {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const sortRef = useRef(null);
  const confirmMobileRef = useRef(null);

  const data = [
    {
      name: "Himalaya Wellness Himalaya Tulasi Tablets | Helps Relieve Cough and Cold",
      tablets: "60",

      stars: "4.4",
      ratings: "264",
      delivery: "Get by 10pm, Tomorrow ",
      price: "₹220",
      discount_price: "₹192",

      curr_price: "₹216",
      og_price: "₹240",
      discount: "5% off",
      product_img: Icons.himalya_tulsi,
    },
    {
      name: "Himalaya Wellness Himalaya Tulasi Tablets | Helps Relieve Cough and Cold",
      tablets: "60",

      stars: "4.3",
      ratings: "264",
      delivery: "Get by 10pm, Tomorrow ",
      price: "₹220",
      discount_price: "₹192",

      curr_price: "₹216",
      og_price: "₹240",
      discount: "5% off",
      product_img: Icons.cough_syrup,
    },
    {
      name: "Himalaya Wellness Himalaya Tulasi Tablets | Helps Relieve Cough and Cold",
      tablets: "60",

      stars: "4.3",
      ratings: "264",
      delivery: "Get by 10pm, Tomorrow ",
      price: "₹220",
      discount_price: "₹192",

      curr_price: "₹216",
      og_price: "₹240",
      discount: "5% off",
      product_img: Icons.cough_syrup,
    },
    {
      name: "Himalaya Wellness Himalaya Tulasi Tablets | Helps Relieve Cough and Cold",
      tablets: "60",

      stars: "4.3",
      ratings: "264",
      delivery: "Get by 10pm, Tomorrow ",
      price: "₹220",
      discount_price: "₹192",

      curr_price: "₹216",
      og_price: "₹240",
      discount: "5% off",
      product_img: Icons.cough_syrup,
    },
  ];
  const onCarrPress = () => {
    navigation.navigate("GenCartScreen");
  };

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 25 }}>
      <ProductViewCard {...item} />
    </View>
  );

  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleSortPress = () => {
    sortRef.current?.snapToIndex(0);
  };

  const handleSearch = () => {
    console.log("Reaching here ");
    console.log(navigation);
    navigation.navigate("SearchView");
  };

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />
      <GenericMedicineHeader
        title={t("Cough and cold")}
        titleTextStyle={{ color: color.white }}
        backIconStyle={{ tintColor: color.white }}
        searchButton
        cartButton
        cartButtonStyle={{ backgroundColor: color.editBlue }}
        searchButtonStyle={{ backgroundColor: color.editBlue }}
        containerStyle={{
          backgroundColor: color.editBlue,
          paddingStart: ms(15),
          paddingEnd: ms(25),
        }}
        onIconPress={handleBack}
        onSearchPress={handleSearch}
        onCartPress={() => navigation.navigate("GenCartScreen")}
        searchImageSrc={Icons.search_icon}
        cartImageSrc={Icons.cart_product}
        searchImageStyle={{
          width: ms(18),
          height: ms(18),
          tintColor: color.white,
        }}
        cartImageStyle={{
          width: ms(25),
          height: ms(25),
          tintColor: color.white,
        }}
        cartItemsNo={4}
      />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 25 }}>
            <Image
              style={{
                width: "100%",
                height: screenWidth / 2,
                borderRadius: 6,
                resizeMode: "contain",
              }}
              source={Icons.move}
            />

            <View
              style={{
                flexDirection: "row",

                gap: ms(20),
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: color.button_grey,
                  borderRadius: 30,
                  borderWidth: 1,
                  paddingHorizontal: ms(10),
                  paddingVertical: ms(5),
                  flexDirection: "row",
                  alignItems: "center",
                  height: ms(30),
                  gap: ms(10),
                }}
                onPress={handleSortPress}
              >
                <Text style={{ fontFamily: "regular", fontSize: ms(12) }}>
                  {t("sort")}
                </Text>
                <Image
                  source={Icons.arrows}
                  style={{ width: ms(14), height: ms(13) }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderColor: color.button_grey,
                  borderRadius: 34,
                  borderWidth: 1,
                  paddingHorizontal: ms(10),
                  paddingVertical: ms(5),
                  marginBottom: ms(20),
                  flexDirection: "row",
                  alignItems: "center",
                  gap: ms(10),
                }}
                onPress={handleSnapPress}
              >
                <Text style={{ fontFamily: "regular", fontSize: ms(12) }}>
                  {t("all_filters")}
                </Text>
                <Image
                  source={Icons.setting}
                  style={{ width: ms(14), height: ms(13) }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => (
              <View style={styles.separator}>
                <Image source={Icons.dashed} style={styles.footerImage} />
              </View>
            )}
            ListFooterComponent={() => <View style={{ height: ms(25) }}></View>}
          />
        </View>

        <View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: ms(30),

              zIndex: 4,
              marginStart: ms(20),
            }}
          >
            <MaskedView
              maskElement={
                <View style={styles.maskView}>
                  <Text style={styles.text}>
                    {"A better\nTomorrow\nStarts Today"}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={[
                  color.color_gradient_product_1,
                  color.color_gradient_product_3,
                ]}
                style={styles.gradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
              />
            </MaskedView>
          </View>
          <Image
            source={Icons.bottom_sep}
            style={{ width: screenWidth, height: ms(10) }}
          />
          <Image
            source={Icons.product_view_bottom_img}
            style={{
              height: screenWidth / 1.8,
              width: screenWidth,
              resizeMode: "contain",
              marginTop: ms(100),
            }}
          />
        </View>
      </ScrollView>
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: -1, height: -1 },
          shadowOpacity: 0.6,
          shadowRadius: 2,
        }}
      >
        <View
          style={{
            elevation: 5,
            paddingHorizontal: ms(25),
            flexDirection: "row", // Ensure children are arranged horizontally
            justifyContent: "space-between", // Distribute space between children
            alignItems: "center", // Align items vertically in the center
            width: "100%",
            backgroundColor: color.white,
            // Ensure the container takes up the full width of its parent
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingVertical: ms(20),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(10),
                  color: color.colorPrimary,
                }}
              >
                2 items
              </Text>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(14),
                  color: color.colorPrimary,
                }}
              >
                ₹ 350
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "green",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Button
                title={t("view_cart")}
                backgroundColor={color.colorPrimary}
                textStyle={styles.buttonText}
                buttonStyle={styles.buttonStyle}
                onPress={() => navigation.navigate("GenCartScreen")}
              />
            </View>
          </View>
        </View>
      </DropShadow>

      <AllfilterBottomSheet sheetRef={sheetRef} navigation={navigation} />
      <SortBottomSheet sheetRef={sortRef} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp_image: {
    shadowColor: "#404040",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    justifyContent: "center",
  },
  searchContainer: {
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: color.grey,
    backgroundColor: color.white,
    flexDirection: "row",
    padding: ms(10),
    alignItems: "center",
    height: ms(40),
  },
  headerText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.colorPrimary,
  },
  separator: {
    marginVertical: 20,
  },
  flatListContent: {
    paddingTop: ms(20),
  },

  footerContainer: {
    paddingVertical: ms(10),
  },
  footerImage: {
    width: screenWidth,

    height: ms(3), // Adjust the height as per your requirement
  },

  footerContainer: {
    paddingVertical: ms(10),
    backgroundColor: color.white, // Make sure the footer has the same background color as the main view
    borderTopWidth: 1, // Optional: Add a border at the top of the footer
    borderTopColor: color.grey, // Optional: Set the border color
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: ms(25),
    alignItems: "center",
  },

  buttonText: {
    fontSize: ms(14),
    color: color.white,
  },
  buttonStyle: {
    paddingHorizontal: ms(10),
    marginStart: 0,
    marginBottom: 0,
    marginEnd: 0,
    borderRadius: 10,
    width: ms(145),
    height: ms(44),
  },

  maskView: {
    backgroundColor: "transparent",
    height: ms(200),
    alignItems: "flex-start",
    //justifyContent: "center",
    width: screenWidth / 1.2,
  },
  text: {
    fontSize: ms(40),
    fontFamily: "superBold",
    textAlign: "left",
  },
  gradient: {
    height: ms(200),
  },
});

export default ProductView;
