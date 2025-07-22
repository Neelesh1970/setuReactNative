import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  TextInput,
  StatusBar
  
} from "react-native";
import React, { useRef, useState } from "react";
import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { PageIndicator } from "react-native-page-indicator";
import { Icons } from "../../assets/icons/Icons";
import FilterBottomSheet from "./FilterBottomSheet";
import CustomTextInput from "../../Components/CustomTextInput";
import MaskedView from "@react-native-masked-view/masked-view";
import PagerView from "react-native-pager-view";
import { AirbnbRating, Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating-widget";
import * as Progress from "react-native-progress";
import Share from "react-native-share";

import {
  ms,
  s,
  verticalScale,
  moderateScale,
  vs,
  mvs,
} from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generateTimes } from "../../Components/Appointment/AppointmentTime";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from 'react-native-linear-gradient';;

import { screenWidth } from "../../Utils/utils";

import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import Button from "../../Components/Button";
import ListHeader from "../../Components/ListHeader";
import ProductCell from "../../Components/ProductCell";
import Entypo from "react-native-vector-icons/Entypo";
import { productData, productMonsoon, billSummary } from "../../Utils/utils";
import RatingBar from "../../Components/Appointment/RatingBar";

export default function Product({ navigation }) {
  const { t } = useTranslation();
  const pagerRef = useRef(null);
  const [fav, setFav] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [reviewsRating, setReviewsRating] = useState(4.5);
  const [current, setCurrent] = useState(0);
  const [productDetailsShow, setProductDetailsShow] = useState(false);
  const [isReadExpanded, setIsReadExpanded] = useState(false);

  const ratingsData = [
    { label: "5 stars", rating: 0.8, colorRating: color.rating_green },
    { label: "4 stars", rating: 0.6, colorRating: color.rating_orange },
    { label: "3 stars", rating: 0.4, colorRating: color.rating_orange },
    { label: "2 stars", rating: 0.2, colorRating: color.rating_orange },
    { label: "1 stars", rating: 0.1, colorRating: "red" }, // Direct color value
  ];
  const handleFav = () => {
    setFav(!fav);
  };

  const handleShare = async () => {
    console.log("HEre is th sare");
    try {
      const result = await Share.open({
        title: "Share via",
        message: "Check out this medicine!",
      });

      if (result.action === Share.sharedAction) {
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Cancelled", "Share action was cancelled.");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
      Alert.alert("Error", "Failed to share content.");
    }
  };

  const handleProductDetials = () => {
    setProductDetailsShow(!productDetailsShow);
  };

  const handleToggle = () => {
    setIsReadExpanded(!isReadExpanded);
  };

  const handleCartPress = () => {
    navigation.navigate("GenCartScreen");
  };
  const handleProductDetails = (data) => {
    navigation.push("Product");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />
      <GenericMedicineHeader
        onCartPress={handleCartPress}
        cartButton
        searchButton
        onSearchPress={() => null}
        onIconPress={() => navigation.goBack()}
        titleContainer={{ alignItems: "center", marginStart: 0 }}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: screenWidth / vs(1.1),
              height: screenWidth / vs(1.1),
              backgroundColor: color.product_grey,
              borderRadius: ms(13),
              padding: ms(10),
              marginTop: ms(15),
              paddingTop: ms(50),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", right: ms(15), top: vs(20) }}>
              <TouchableOpacity onPress={handleFav}>
                <Image
                  source={fav ? Icons.heart_fill : Icons.heart_icon}
                  style={{
                    width: vs(20),
                    height: vs(20),
                    tintColor: fav ? color.red : color.black,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                right: ms(15),
                top: vs(55),

                zIndex: 2,
              }}
            >
              <TouchableOpacity
                onPress={handleShare}
                style={{
                  padding: 2,
                }}
              >
                <Image
                  source={Icons.share}
                  style={{
                    width: vs(18),
                    height: vs(18),
                    tintColor: color.black,
                  }}
                />
              </TouchableOpacity>
            </View>
            <PagerView
              ref={pagerRef}
              style={{
                width: "100%",
                height: "100%",
              }}
              initialPage={0}
              scrollEnabled
              orientation={"horizontal"}
              onPageSelected={(e) => {
                setCurrent(e.nativeEvent.position);
              }}
            >
              <View
                key={"1"}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.image_1}
                  style={{
                    width: ms(247),
                    height: ms(241),
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                key={"2"}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.image_2}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                key={"3"}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.image_1}
                  style={{
                    width: "85%",
                    height: "85%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            </PagerView>
            <PageIndicator
              count={3}
              current={current}
              activeColor={color.colorPrimary}
            />
          </View>
        </View>

        <View style={{ marginHorizontal: vs(15), marginTop: vs(10) }}>
          <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
            Himalaya Liv.52 Syrup | For Liver Protection, Appetite & Liver Care
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(10),
              color: color.product_green,
            }}
          >
            By Himalaya Wellness
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: vs(3),
            }}
          >
            <StarRating
              rating={rating}
              onChange={(newRating) => setRating(newRating)}
              starSize={vs(16)} // Adjust the size of the stars
              starStyle={{ marginEnd: vs(5), marginStart: 0 }}
            />

            <Text
              style={{
                fontFamily: "regular",
                color: color.grey,
                fontSize: ms(10),
              }}
            >
              (99 {t("ratings")})
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-between",
              marginTop: 5,
              height: ms(50),
            }}
          >
            <View
              style={{
                marginTop: vs(5),
                gap: ms(5),
              }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.grey,
                  fontSize: ms(10),
                }}
              >
                {t("inclusive_all_taxes")}
              </Text>
              <View style={{ flexDirection: "row", gap: ms(10) }}>
                <Text
                  style={{
                    fontFamily: "regular",
                    color: color.grey,
                    fontSize: ms(10),
                  }}
                >
                  {"MRP "}
                  <Text
                    style={{
                      fontFamily: "regular",
                      color: color.grey,
                      fontSize: ms(10),
                      textDecorationLine: "line-through",
                    }}
                  >
                    {"₹200"}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: "regular",
                    color: color.green,
                    fontSize: ms(10),
                  }}
                >
                  {"5% OFF"}
                </Text>
              </View>
            </View>

            <View>
              <Button
                title={t("add_to_cart")}
                backgroundColor={color.button_green}
                textColor={color.white}
                textStyle={{ fontFamily: "bold", fontSize: ms(14) }}
                buttonStyle={{ width: ms(105), height: ms(39) }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: ms(10),
                alignItems: "baseline",
              }}
            >
              <Text
                style={{
                  fontFamily: "bold",

                  fontSize: ms(16),
                }}
              >
                ₹ 192.00
              </Text>

              <Text
                style={{
                  fontFamily: "regular",
                  color: color.grey,
                  fontSize: ms(10),
                }}
              >
                ₹2.01/ml
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: ms(5),
                alignItems: "center",
                marginEnd: ms(10),
              }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  color: color.grey,
                  fontSize: ms(10),
                }}
              >
                {t("min_qty") + ":2"}
              </Text>
              <Image
                source={Icons.question_mark}
                style={{ width: ms(18), height: ms(18) }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            borderTopWidth: ms(4),
            borderBottomWidth: ms(4),
            borderColor: color.consult_bg,
            marginTop: ms(15),
            paddingHorizontal: ms(25),
            paddingVertical: ms(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,

              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                color: color.grey,
                fontSize: ms(10),
              }}
            >
              {t("delivery_by")}
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                color: color.black,
                fontSize: ms(12),
              }}
            >
              Tomorrow, 11:00am - 10:00 pm
            </Text>
          </View>

          <View
            style={{
              backgroundColor: color.product_line,
              width: "100%",
              height: 1,
              marginVertical: ms(10),
            }}
          />

          <View style={{ flexDirection: "row", gap: ms(5) }}>
            <Text
              style={{
                fontFamily: "medium",
                color: color.grey,
                fontSize: ms(10),
              }}
            >
              {t("non_returnable")}
            </Text>
            <TouchableOpacity onPress={handleToggle}>
              <Text
                style={{
                  fontFamily: "medium",
                  color: color.colorPrimary,
                  fontSize: ms(10),
                  textDecorationLine: "underline",
                }}
              >
                {isReadExpanded ? t("read_less") : t("read_more")}
              </Text>
            </TouchableOpacity>
          </View>

          {isReadExpanded && (
            <Text style={styles.additionalText}>
              Some products are classified as non-returnable due to their nature
              or regulatory requirements. This typically includes items such as
              perishable goods, personalized products, and certain types of
              health and hygiene items. Once purchased, these items cannot be
              returned or exchanged, so please review your purchase carefully
              before finalizing your order. For more information about our
              return policy and which items are non-returnable, please visit our
              return policy page. If you have any questions or concerns about
              your purchase, please contact our customer service team for
              assistance.
            </Text>
          )}
        </View>

        <ListHeader
          headerTitle={t("similar_products")}
          option={true}
          headerStyle={{ fontSize: ms(14), fontFamily: "bold" }}
          optionTitle={t("view_more")}
          containerStyle={{
            paddingStart: ms(16),
            paddingEnd: ms(16),
            marginTop: vs(5),

            height: vs(25),
          }}
          onPressOption={() => navigation.navigate("SimilarProducts")}
        />
        <View
          style={{
            backgroundColor: color.white,
            paddingStart: ms(16),
            paddingEnd: ms(16),
          }}
        >
          <FlatList
            horizontal
            data={productData}
            renderItem={(item) => {
              return (
                <ProductCell
                  data={item}
                  onPressProduct={handleProductDetails}
                />
              );
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            borderTopWidth: ms(4),
            borderBottomWidth: ms(4),
            borderColor: color.consult_bg,
            marginTop: ms(15),
            paddingHorizontal: ms(30),
            paddingVertical: ms(15),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: ms(5),
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                color: color.black,
                fontSize: ms(14),
              }}
            >
              {t("product_details")}
            </Text>
            <TouchableOpacity
              style={{ padding: ms(5) }}
              onPress={handleProductDetials}
            >
              <Entypo
                name={productDetailsShow ? "chevron-up" : "chevron-down"}
                size={ms(20)}
                color={color.product_down}
                style={{ marginStart: ms(5) }}
              />
            </TouchableOpacity>
          </View>

          {productDetailsShow ? (
            <View style={{ marginTop: ms(20), gap: ms(10) }}>
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                {t("exp_on_or_after") + " 27/07/2025"}
              </Text>
              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(12),
                }}
              >
                {t("brand") + " HIMALAYA"}
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>

        <View
          style={{ paddingHorizontal: ms(25), gap: ms(10), marginTop: ms(15) }}
        >
          <Text
            style={{
              fontFamily: "medium",
              color: color.black,
              fontSize: ms(14),
            }}
          >
            {t("ratings")}
          </Text>

          <View
            style={{
              backgroundColor: color.rating_bg,
              flexDirection: "row",
              borderRadius: ms(8),
              padding: ms(10),
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: color.grey,
                  fontSize: ms(14),
                }}
              >
                {reviewsRating}/
              </Text>
              <Text
                style={{
                  fontFamily: "bold",
                  color: color.grey,
                  fontSize: ms(10),
                }}
              >
                5
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                flex: 1,
                marginStart: ms(15),
                alignItems: "center",
              }}
            >
              <StarRating
                rating={reviewsRating}
                onChange={(reviewsRating) => setReviewsRating(reviewsRating)}
                starSize={vs(16)} // Adjust the size of the stars
                starStyle={{ marginEnd: vs(5), marginStart: 0 }}
                //  enableHalfStar
                // enableSwiping // Custom style for the stars
              />

              <Text
                style={{
                  fontFamily: "regular",
                  color: color.black,
                  fontSize: ms(10),
                }}
              >
                99 {t("ratings")}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: ms(5) }}>
            {ratingsData.map((data, index) => (
              <RatingBar
                key={index}
                label={data.label}
                rating={data.rating}
                colorRating={data.colorRating}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.grey,
            height: ms(2),
            marginVertical: ms(15),
          }}
        />

        <View
          style={{
            marginHorizontal: ms(15),
            flexDirection: "row",

            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "medium",
                color: color.colorPrimary,
                fontSize: ms(12),

                flexWrap: "wrap",
              }}
            >
              1 {t("item_in_cart")}
            </Text>
          </View>
          <View style={{ flex: 3, height: ms(40) }}>
            <Button
              title={t("view_cart")}
              textColor={color.white}
              backgroundColor={color.colorPrimary}
              buttonStyle={{ paddingHorizontal: 10, height: ms(40) }}
            />
          </View>
        </View>

        <View style={{ marginTop: ms(15) }}>
          <View
            style={{
              width: "100%",
              position: "absolute",
              //  backgroundColor: "yellow",
              height: screenWidth / vs(1.3),
              bottom: screenWidth / 10,
              zIndex: 2,
              marginStart: ms(20),
            }}
          >
            <MaskedView
              maskElement={
                <View style={styles.maskView}>
                  <Text style={styles.text}>
                    {"Your health is\n our main\n priority"}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={[color.gradient_7, color.gradient_8]}
                style={styles.gradient}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
            </MaskedView>
          </View>
          <Image
            source={Icons.bottom_sep}
            style={{
              width: screenWidth,
              height: ms(10),
            }}
          />
          <View
            style={{
              height: screenWidth / 2,
              width: screenWidth,
              marginTop: vs(70),
              //   backgroundColor: "green",
              alignItems: "flex-end",
            }}
          >
            <Image
              source={Icons.delivery_bg}
              style={{
                height: screenWidth / 2,
                width: screenWidth / 2,
                flex: 1,
                alignItems: "center",
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  maskView: {
    backgroundColor: "transparent",
    height: ms(210),
    alignItems: "flex-start",
    justifyContent: "center",
    width: ms(303),
  },
  text: {
    marginStart: ms(5),
    marginTop: 35,
    fontSize: ms(40, 0.7),
    fontFamily: "superBold",
    textAlign: "left",
  },
  gradient: {
    height: ms(210),
  },

  additionalText: {
    fontFamily: "medium",
    color: "grey", // Or another color for additional text
    fontSize: ms(10),
    marginTop: ms(5),
  },
});
