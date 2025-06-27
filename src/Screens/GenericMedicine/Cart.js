import { StatusBar , ScrollView} from "react-native";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import { moderateScale, ms } from "react-native-size-matters";
import CartItem from "./CartItem";
import ListHeader from "../../Components/ListHeader";
import { productData, productMonsoon, billSummary } from "../../Utils/utils";
import ProductCell from "../../Components/ProductCell";
import Button from "../../Components/Button";
import BillSummaryRow from "../../Components/BillSummaryRow";
import React, { useState, useRef, useCallback } from "react";
import UploadPresSheet from "./UploadPresSheet";
import ConfirmDeliverySheet from "./ConfirmDeliverySheet";
import ConfirmMobileSheet from "./ConfirmMobileSheet";
function GenCartScreen({ navigation }) {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const confirmDeliveryRef = useRef(null);
  const confirmMobileRef = useRef(null);
  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleDeliverySheet = () => {
    confirmDeliveryRef.current?.snapToIndex(0);
  };
  const handleMobileSheet = () => {
    confirmMobileRef.current?.snapToIndex(0);
  };

  const handleProductDetails = (data) => {
    navigation.navigate("Product");
  };

  const data = [
    {
      name: "For Liver Protection, Appetite & Liver Care",
      qty: "Bottle of 200 ml",
      price: "₹220",
      discount_price: "₹192",
      discount: "5%off",
      cart_count: 1,
    },
    {
      name: "For Liver Protection, Appetite & Liver Care",
      qty: "Bottle of 100 ml",
      price: "₹110",
      discount_price: "₹92",
      discount: "5%off",
      cart_count: 1,
    },
  ];
  const renderItem = ({ item }) => {
    return <CartItem item={item} />;
  };

  return (
    <View style={{ backgroundColor: color.light_background, flex: 1 }}>
      <StatusBar backgroundColor={color.editBlue} />

      <GenericMedicineHeader
        title={t("cart")}
        searchButton
        containerStyle={{ backgroundColor: color.white }}
        onIconPress={() => navigation.goBack()}
        onSearchPress={() => navigation.navigate("SearchView")}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 16,
                backgroundColor: color.white,
              }}
            >
              <Image
                source={Icons.cart_vehicle}
                style={{ height: ms(45), width: ms(45) }}
              />
              <View style={{ marginStart: 10 }}>
                <Text
                  style={{
                    fontSize: ms(14),
                    fontFamily: "regular",
                    color: color.black,
                  }}
                >
                  {t("delivery_by")}
                </Text>
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: ms(15),
                    color: color.delivery_date_green,
                  }}
                >
                  {"11-12 august"}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: color.grey,
                height: 1,

                marginStart: 16,
                marginEnd: 16,
              }}
            />
            <View
              style={{
                backgroundColor: color.white,
                paddingStart: 16,
                paddingEnd: 16,
              }}
            >
              <FlatList
                data={data}
                renderItem={renderItem}
                style={{ marginBottom: 20, marginTop: 20 }}
              />
            </View>
            <ListHeader
              headerTitle={t("last_minute_buys")}
              option={false}
              containerStyle={{ paddingStart: 16, paddingEnd: 16 }}
            />
            <View
              style={{
                backgroundColor: color.white,
                paddingStart: 16,
                paddingEnd: 16,
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
                backgroundColor: color.white,
                paddingStart: 16,
                paddingEnd: 16,
              }}
            >
              <ListHeader
                option={false}
                headerTitle={t("bill_summary")}
                headerStyle={{ fontSize: ms(16) }}
              />
              {JSON.parse(billSummary).map((item) => {
                return <BillSummaryRow item={item} />;
              })}
              <View style={{ height: 10 }} />
            </View>
            <View style={{ height: 30 }} />
          </View>
        </ScrollView>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: color.white,
            paddingStart: 16,
            paddingEnd: 16,
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={Icons.send}
            style={{
              height: moderateScale(35),
              width: moderateScale(35),
              resizeMode: "contain",
            }}
          />
          <View style={{ marginStart: 10, flex: 1 }}>
            <Text
              style={{
                fontSize: ms(14),
                fontFamily: "bold",
                color: color.black,
              }}
            >
              {"Home"}
            </Text>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: ms(10),
                color: color.grey,
              }}
            >
              {"KM Park, Model Colony, Pune"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseAddress")}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: ms(14),
                color: color.colorPrimary,
                marginEnd: 10,
              }}
            >
              {t("change")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: color.cart_sep }} />
        <View
          style={{
            flexDirection: "row",
            paddingStart: 16,
            paddingEnd: 16,
            height: moderateScale(60),
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: ms(16),
                fontFamily: "regular",
                color: color.black,
              }}
            >
              {"₹192"}
            </Text>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: ms(12),
                color: color.colorPrimary,
              }}
            >
              {t("see_bill_summary")}
            </Text>
          </View>
          <Button
            title={t("continue")}
            backgroundColor={color.colorPrimary}
            buttonStyle={{
              flex: 1,
              marginBottom: 0,
              marginStart: 0,
              marginEnd: 0,
              borderRadius: ms(10),
            }}
            textColor={color.white}
            onPress={handleSnapPress}
          />
        </View>
      </View>
      <UploadPresSheet
        sheetRef={sheetRef}
        navigation={navigation}
        onContinueClick={handleDeliverySheet}
        onEditClick={handleMobileSheet}
      />
      <ConfirmDeliverySheet
        sheetRef={confirmDeliveryRef}
        navigation={navigation}
      />
      <ConfirmMobileSheet sheetRef={confirmMobileRef} navigation={navigation} />
    </View>
  );
}
export default GenCartScreen;
