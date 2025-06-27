import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { moderateScale, ms } from "react-native-size-matters";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { FlatListSlider } from "react-native-flatlist-slider";
import Previews from "../../Utils/Previews";
import ListHeader from "../../Components/ListHeader";
import {
  medicalCategory,
  productPersonal,
  productStomach,
  screenWidth,
} from "../../Utils/utils";
import ProductCell from "../../Components/ProductCell";
import { productData, productMonsoon } from "../../Utils/utils";
import { LinearGradient } from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useState } from "react";

function GenericMedicineHome({ navigation }) {
  const { t } = useTranslation();
  const [showAllMedicalCat, setShowAllMedicalCat] = useState(false);
  const [showAllMonsoonEss, setShowAllMonsoonEss] = useState(false);
  const [showAllPersonalCare, setShowAllPersonalCare] = useState(false);
  const [showAllStomachCare, setShowAllStomachCare] = useState(false);

  const onCarrPress = () => {
    navigation.navigate("GenCartScreen");
  };
  const images = [
    {
      image: Icons.slider_1,
      desc: "Cost-Effectiveness",
      color_1: "#FF903E",
      color_2: "#FFD362",
    },
    {
      image: Icons.slider_2,
      desc: "Bioequivalence",
      color_1: "#027B7B",
      color_2: "#86BF84",
    },
    {
      image: Icons.slider_3,
      desc: "Antibiotics",
      color_1: "#425599",
      color_2: "#6F8EFF",
    },
  ];
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, value: null }); // Add a placeholder
      numberOfElementsLastRow++;
    }

    return data;
  };

  const handleHerbalMore = () => {
    navigation.navigate("ProductView");
  };

  // Toggle function for showing more or less
  const handleMoreMedicalCat = () => {
    setShowAllMedicalCat(!showAllMedicalCat);
  };

  const handleMoreMonsoonEss = () => {
    setShowAllMonsoonEss(!showAllMonsoonEss);
  };

  const handleMorePersonalCare = () => {
    setShowAllPersonalCare(!showAllPersonalCare);
  };

  const handleMoreStomachCare = () => {
    setShowAllStomachCare(!showAllStomachCare);
  };

  const handleProductDetails = (data) => {
    navigation.navigate("Product");
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: screenWidth / 3 - 32,
          marginTop: 5,
        }}
      >
        <Image
          source={item.image}
          style={{
            resizeMode: "cover",
            height: screenWidth / 3 - 22,
            width: screenWidth / 3 - 22,
            borderRadius: 4,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "medium",
            fontSize: ms(12),
            padding: 5,
            color: color.black,
          }}
        >
          {item.desc}
        </Text>
      </View>
    );
  };
  const renderItemSecond = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: screenWidth / 2 - 32,
          marginTop: 5,
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[color.gradient_2, color.gradient_1]}
          style={{
            height: screenWidth / 3 - 32,
            borderRadius: 6,
            width: screenWidth / 2 - 32,
            justifyContent: "center",
          }}
        >
          <Image
            source={index % 2 == 0 ? Icons.m_image_1 : Icons.m_image_2}
            style={{
              resizeMode: "contain",

              height: screenWidth / 3 - 42,
              width: screenWidth / 2 - 22,
            }}
          />
        </LinearGradient>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "regular",
            fontSize: ms(14),
            padding: 5,
            color: color.black,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };
  const renderPersonalCare = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: screenWidth / 4 - 15,
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[
            color.personal_care_background,
            color.personal_care_background,
          ]}
          style={{
            height: screenWidth / 3 - 32,
            borderRadius: 6,
            width: screenWidth / 4 - 15,
            justifyContent: "center",
          }}
        >
          <Image
            source={index % 2 == 0 ? Icons.p_image_1 : Icons.p_image_2}
            style={{
              resizeMode: "contain",

              height: screenWidth / 3 - 42,
              width: screenWidth / 4 - 15,
            }}
          />
        </LinearGradient>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "regular",
            fontSize: ms(12),
            padding: 5,
            color: color.black,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };
  const renderStomach = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: screenWidth / 4 - 15,
          marginBottom: ms(10),
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[color.stomach_gradient_2, color.stomach_gradient_1]}
          style={{
            height: screenWidth / 3,
            borderRadius: 6,
            width: screenWidth / 4 - 15,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              fontSize: ms(12),
              padding: 5,
              color: color.stomach_product,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Image
            source={item.image}
            style={{
              resizeMode: "contain",

              height: screenWidth / 3 - 42,
              width: screenWidth / 4 - 15,
            }}
          />
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <LoginHeader
        title={t("generic_medicine")}
        onIconPress={() => {
          navigation.goBack();
        }}
        isOptionMenu={true}
        optionMenuSrc={Icons.cart}
        onOptionPress={onCarrPress}
      />
      <ScrollView>
        <View style={{ padding: 0, flex: 1 }}>
          {/* <View
            style={{
              flexDirection: "row",
              borderColor: color.searchInputBorder,
              borderWidth: 1,
              backgroundColor: color.searchInputBackground,
              borderRadius: 14,
              padding: 5,
              marginTop: 16,
              marginStart: 16,
              marginEnd: 16,

              alignItems: "center",
            }}
          >
            <Image
              source={Icons.search_icon}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                resizeMode: "contain",
                marginStart: 8,
              }}
            />
            <TextInput
              style={{
                flex: 1,
                marginStart: 16,
                fontFamily: "poppinsRegular",
                fontSize: ms(14),
                alignSelf: "center",
                padding: 5,
              }}
              placeholder={t("search")}
            />
          </View> */}

<View
      style={{
        flexDirection: "row",
        borderColor: color.searchInputBorder,
        borderWidth: 1,
        backgroundColor: color.searchInputBackground,
        borderRadius: 14,
        padding: 5,
        marginTop: 16,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={Icons.send}
          style={{
            height: moderateScale(30),
            width: moderateScale(30),
            resizeMode: "contain",
            marginEnd: 8,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: moderateScale(14) }}>
            Home
          </Text>
          <Text style={{ fontSize: moderateScale(12), color: "gray" }}>
            Mystic House, Model Colony, Pune
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#1966B3",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 7,
        }}
        onPress={() => navigation.navigate("MyOrders")}
      >
        <Text
          style={{
            color: "white",
            fontSize: moderateScale(14),
            fontWeight: "bold",
          }}
        >
          My orders
        </Text>
      </TouchableOpacity>
    </View>

          <FlatListSlider
            data={images}
            component={<Previews />}
            indicator={true}
            indicatorContainerStyle={{ position: "absolute", bottom: 10 }}
            indicatorStyle={{
              height: moderateScale(5),
              width: moderateScale(20),
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: color.white,
              borderRadius: moderateScale(5),
            }}
            indicatorActiveWidth={moderateScale(20)}
            indicatorActiveColor={color.white}
            indicatorInActiveColor={color.trans}
          />
          <View style={{ padding: 16 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: color.order_now_background,
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 32,
                  width: 32,
                  marginStart: 5,
                  resizeMode: "contain",
                }}
                source={Icons.prescription}
              />
              <Text
                style={{
                  fontSize: ms(13),
                  fontFamily: "bold",
                  padding: 10,
                  marginStart: 2,
                  flex: 1,
                }}
              >
                {t("order_with_prescription")}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("UploadPrescription")}
              >
                <Text
                  style={{
                    borderRadius: ms(25),
                    backgroundColor: color.black,
                    color: color.white,
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingRight: 15,
                    paddingLeft: 15,
                    fontSize: ms(14),
                    fontFamily: "interSemiBold",
                  }}
                >
                  {t("order_now")}
                </Text>
              </TouchableOpacity>
            </View>
            <ListHeader
              headerTitle={t("medical_categories")}
              optionTitle={t(showAllMedicalCat ? "view_less" : "view_more")}
              onPressOption={handleMoreMedicalCat}
              icon={showAllMedicalCat ? "chevron-up" : "chevron-down"}
            />
            <FlatList
              data={
                showAllMedicalCat
                  ? medicalCategory
                  : medicalCategory.slice(0, 6)
              }
              renderItem={renderItem}
              numColumns={3}
            />
            <ListHeader
              headerTitle={t("herbal_range")}
              optionTitle={t("view_more")}
              onPressOption={handleHerbalMore}
            />
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
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("monsoon_essentials")}
              optionTitle={t(showAllMonsoonEss ? "view_less" : "view_more")}
              onPressOption={handleMoreMonsoonEss}
              icon={showAllMonsoonEss ? "chevron-up" : "chevron-down"}
            />
            <FlatList
              data={
                showAllMonsoonEss ? productMonsoon : productMonsoon.slice(0, 4)
              }
              renderItem={renderItemSecond}
              numColumns={2}
            />
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("capsules")}
              optionTitle={t("view_more")}
              onPressOption={handleHerbalMore}
            />
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
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("personal_care")}
              optionTitle={t(showAllPersonalCare ? "view_less" : "view_more")}
              onPressOption={handleMorePersonalCare}
              icon={showAllPersonalCare ? "chevron-up" : "chevron-down"}
            />
            <FlatList
              data={
                showAllPersonalCare
                  ? productPersonal
                  : productPersonal.slice(0, 4)
              }
              renderItem={renderPersonalCare}
              numColumns={4}
            />
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("herbal_range")}
              optionTitle={t("view_more")}
              onPressOption={handleHerbalMore}
            />
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
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("stomach_care")}
              optionTitle={t(showAllStomachCare ? "view_less" : "view_more")}
              onPressOption={handleMoreStomachCare}
              icon={showAllStomachCare ? "chevron-up" : "chevron-down"}
            />
            <FlatList
              data={
                showAllStomachCare ? productStomach : productStomach.slice(0, 4)
              }
              renderItem={renderStomach}
              numColumns={4}
            />
            <View
              style={{
                height: 2,
                backgroundColor: color.separator,
                width: "100%",
                marginTop: 10,
              }}
            />
            <ListHeader
              headerTitle={t("herbal_range")}
              optionTitle={t("view_more")}
              onPressOption={handleHerbalMore}
            />
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
          <View>
            <View
              style={{
                width: "100%",
                position: "absolute",
                top: 30,
                zIndex: 2,
                marginStart: 20,
              }}
            >
              <MaskedView
                maskElement={
                  <View style={styles.maskView}>
                    <Text style={styles.text}>{"One World\nOne Health"}</Text>
                  </View>
                }
              >
                <LinearGradient
                  colors={[color.colorPrimary, color.colorSecondary]}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </MaskedView>
            </View>
            <Image
              source={Icons.bottom_sep}
              style={{ width: screenWidth, height: ms(10) }}
            />
            <Image
              source={Icons.bottom_image}
              style={{
                height: screenWidth / 2,
                width: screenWidth,
                resizeMode: "contain",
                marginTop: 50,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: "cover",
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  maskView: {
    backgroundColor: "transparent",
    height: ms(100),
    alignItems: "flex-start",
    justifyContent: "center",
    width: ms(220),
  },
  text: {
    fontSize: ms(40),
    fontFamily: "bold",
    textAlign: "left",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  gradient: {
    height: ms(100),
  },
});
export default GenericMedicineHome;
