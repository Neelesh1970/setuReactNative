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
} from "react-native";
import React, { useRef, useState } from "react";
import AppointmentCard from "../../Components/Appointment/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { PageIndicator } from "react-native-page-indicator";
import { Icons } from "../../assets/icons/Icons";

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
import { generateTimes } from "../../Component/Appointment/AppointmentTime";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";

import { screenWidth } from "../../utils/utils";

import GenericMedicineHeader from "../../Component/GenericMedicineHeader";
import Button from "../../Component/Button";
import ListHeader from "../../Component/ListHeader";
import ProductCell from "../../Component/ProductCell";
import Entypo from "@expo/vector-icons/Entypo";
import { productData, productMonsoon, billSummary } from "../../utils/utils";
import RatingBar from "../../Component/Appointment/RatingBar";

export default function SimilarProducts({ navigation }) {
  const { t } = useTranslation();
  const pagerRef = useRef(null);
  const [fav, setFav] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [reviewsRating, setReviewsRating] = useState(4.5);
  const [current, setCurrent] = useState(0);
  const [productDetailsShow, setProductDetailsShow] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.editBlue} />
      <GenericMedicineHeader
        onCartPress={() => null}
        cartButton
        searchButton
        onSearchPress={() => null}
        onIconPress={() => navigation.goBack()}
        titleContainer={{ alignItems: "center", marginStart: 0 }}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text}>More Products</Text>
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
    fontSize: ms(20),
    fontFamily: "bold",
    textAlign: "left",
  },
  gradient: {
    height: ms(210),
  },
});
