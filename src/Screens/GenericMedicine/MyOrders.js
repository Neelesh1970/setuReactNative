import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { color } from "../../assets/colors/Colors";
import { StatusBar } from "react-native";
import OrderHeader from "../../Components/OrderHeader";
import { ms, vs } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import ListHeader from "../../Components/ListHeader";
import DropShadow from "react-native-drop-shadow";
import {
  productData,
  productMonsoon,
  billSummary,
} from "../../Utils/utils";
import { screenWidth } from '../../Utils/utils';
import ProductCell from "../../Components/ProductCell";
import LinearGradient from "react-native-linear-gradient";

import Slider from "@react-native-community/slider";
import { t } from "i18next";
import OrderTrackingSheet from "./OrderTrackingSheet";
import CustomSlider from "../../Components/Job/CustomSlider";

export default function MyOrders({ navigation }) {
  const [value, setValue] = useState(Array(5).fill(0));
  const [viewWidth, setViewWidth] = useState(0);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const sheetRef = useRef(null);

  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const data = [
    {
      status: "onGoing",
      delivery: "Arriving",
      deliveryDate: "Tommorow",
      productImg: Icons.order_medicine,
      orderInfo: "",
      orderStatus: "Ordered at 11.32 AM",
      sliderValue: 0,
    },
    {
      status: "Cancelled",
      delivery: "Cancelled",
      deliveryDate: "Today",
      productImg: Icons.order_medicine,
      orderInfo:
        "Order cancelled. If you’ve paid online, refund will be initiated shortly",
      orderStatus: "Cancelled on 12-08-2024 at 11.11 AM",
    },
    {
      status: "Delivered",
      delivery: "",
      productImg: Icons.order_medicine,
      orderInfo: "Your order has been delivered",
      orderStatus: "Order Delivered on 15-08-2024 at 01:12 PM",
    },
    {
      status: "Delivered",
      delivery: "",
      productImg: Icons.order_medicine,
      orderInfo: "Your order has been delivered",
      orderStatus: "Order Delivered on 15-08-2024 at 01:12 PM",
    },
  ];

  const handleSliderChange = (sliderValue, index) => {
    // Create a copy of the current array or fill missing values with 0

    const updatedValues = [...value];

    // Ensure that if the index does not exist, we initialize it with the new value
    updatedValues[index] = sliderValue * 100; // Example: sliderValue scaled

    console.log("Updated value at index", index, ":", updatedValues[index]);

    // Update state with the updated values array
    setValue(updatedValues);
  };

  const renderItem = ({ item, index }) => {
    let gradientColors = [];
    // const currentValue = value[index];
    const currentValue = 38;

    let statusColor = "";
    if (item.status === "onGoing") {
      gradientColors = [
        color.order_green_gradient_1,
        color.order_green_gradient_2,
      ];
    } else if (item.status === "Cancelled") {
      gradientColors = [
        color.order_grey_gradient_1,
        color.order_grey_gradient_2,
      ];
    } else if (item.status === "Delivered") {
      gradientColors = [
        color.order_blue_gradient_1,
        color.order_blue_gradient_2,
      ];
    }

    if (item.status === "onGoing") {
      statusColor = color.order_green;
    } else if (item.status === "Cancelled") {
      statusColor = color.order_grey;
    } else if (item.status === "Delivered") {
      statusColor = color.colorPrimary;
    }

    return (
      <View style={{ marginHorizontal: ms(25) }}>
        <View
          style={{
            backgroundColor: color.order_status_bg,
            padding: ms(5),
            paddingHorizontal: ms(10),
            alignSelf: "center",
            borderRadius: ms(26),
          }}
        >
          <Text
            style={{
              color: color.order_status_black,
              fontFamily: "medium",
              fontSize: ms(12),
            }}
          >
            {item.orderStatus}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: color.order_border_color,
            marginTop: ms(15),
            borderRadius: ms(8),
          }}
        >
          <LinearGradient
            colors={gradientColors}
            style={{ borderTopLeftRadius: ms(8), borderTopRightRadius: ms(8) }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ flexDirection: "row", marginStart: ms(15) }}>
              <View
                style={{
                  backgroundColor: statusColor,
                  paddingHorizontal: ms(10),
                  paddingVertical: ms(2),
                  borderRadius: ms(45),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontFamily: "medium",
                    fontSize: ms(12),
                  }}
                >
                  {item.status === "onGoing" ? t("on_time") : item.status}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  paddingHorizontal: ms(10),
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: ms(5) }}>
                  <Text
                    style={{
                      color: color.black,
                      fontFamily: "medium",
                      fontSize: ms(14),
                    }}
                  >
                    {item.delivery}
                  </Text>
                  <Text
                    style={{
                      color: color.black,
                      fontFamily: "superBold",
                      fontSize: ms(14),
                    }}
                  >
                    {item.deliveryDate}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{ padding: ms(10) }}
                  onPress={() =>
                    navigation.navigate(
                      item.status !== "delivered" ? "OnGoing" : "",
                      { page: item.status }
                    )
                  }
                >
                  <Image
                    source={Icons.my_orders_right_icon}
                    style={{ width: ms(8), height: ms(25) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              marginTop: ms(10),
              marginHorizontal: ms(15),
              flexDirection: "row",
              gap: ms(10),
              marginBottom: ms(10),
            }}
          >
            <View
              style={{
                width: ms(76),
                height: ms(76),
                borderWidth: 1,
                borderColor: color.suffixgrey,
                borderRadius: ms(8),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={Icons.order_medicine}
                style={{ width: ms(60), height: ms(60) }}
                resizeMode="center"
              />
            </View>
            <Text
              style={{
                color: color.order_info_grey,
                fontFamily: "medium",
                fontSize: ms(12),

                flex: 1,
              }}
            >
              {item.orderInfo}
            </Text>
          </View>

          {item.status === "onGoing" && (
            <>
              <View
                style={{
                  marginHorizontal: ms(25),
                }}
                onLayout={(event) => {
                  const { width } = event.nativeEvent.layout;
                  console.log(width);
                  setViewWidth(width);
                }}
              >
                {/* <Slider
                  style={{ width: "100%", height: ms(30) }}
                  //   minimumValue={0}
                  //   maximumValue={3}
                  disabled
                  value={value[index] ? value[index] / 100 : 0} // Use item's specific slider value
                  onValueChange={(value) => handleSliderChange(value, index)}
                  //   step={2}
                  maximumTrackTintColor="#000000"
                  thumbImage={Icons.popImage}
                  minimumTrackTintColor={color.order_green}
                /> */}

                <CustomSlider
                  min={0}
                  max={100}
                  initialValue={currentValue}
                  onValueChange={(value) => console.log("Slider Value:", value)}
                  _sliderWidth={screenWidth - ms(130)}
                />

                <Image
                  source={
                    currentValue >= 0
                      ? Icons.order_done_tick
                      : Icons.order_remain_tick
                  }
                  style={{
                    width: ms(18),
                    height: ms(18),
                    position: "absolute",

                    left: ms(5),
                  }}
                />

                <Image
                  source={
                    currentValue >= 50
                      ? Icons.order_done_tick
                      : Icons.order_remain_tick
                  }
                  style={{
                    width: ms(18),
                    height: ms(18),
                    position: "absolute",
                    left: viewWidth > 0 ? viewWidth / 2 - ms(9) : "50%",
                    // left: "49%",
                  }}
                />

                <Image
                  source={
                    currentValue >= 100
                      ? Icons.order_done_tick
                      : Icons.order_remain_tick
                  }
                  style={{
                    width: ms(18),
                    height: ms(18),
                    position: "absolute",

                    right: ms(5),
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginStart: ms(25),
                  marginEnd: ms(22),
                  marginBottom: ms(8),
                  marginTop: ms(10),
                }}
              >
                <Text
                  style={{
                    color:
                      currentValue >= 0
                        ? color.order_green
                        : color.tracking_text_grey,

                    fontFamily: "regular",
                    fontSize: ms(10),
                  }}
                >
                  {t("placed")}
                </Text>
                <Text
                  style={{
                    color:
                      currentValue >= 50
                        ? color.order_green
                        : color.tracking_text_grey,
                    fontFamily: "regular",
                    marginStart: "2%",
                    fontSize: ms(10),
                  }}
                >
                  {t("shipped")}
                </Text>
                <Text
                  style={{
                    color:
                      currentValue >= 100
                        ? color.order_green
                        : color.tracking_text_grey,
                    fontFamily: "regular",
                    fontSize: ms(10),
                  }}
                >
                  {t("delivered")}
                </Text>
              </View>
            </>
          )}

          <View style={{ flexDirection: "row" }}>
            {item.status === "onGoing" && (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",

                  borderTopWidth: 1,
                  borderTopColor: color.order_border_color,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRightColor: color.order_border_color,
                    borderRightWidth: 1,

                    flex: 1,
                    alignItems: "center",
                    paddingVertical: ms(10),
                  }}
                  onPress={handleSnapPress}
                >
                  <Text
                    style={{
                      color: color.colorPrimary,
                      fontFamily: "medium",
                      fontSize: ms(14),
                    }}
                  >
                    {t("track_order")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,

                    alignItems: "center",
                    paddingVertical: ms(10),
                  }}
                >
                  <Text
                    style={{
                      color: color.colorPrimary,
                      fontFamily: "medium",
                      fontSize: ms(14),
                      textAlign: "center",
                    }}
                  >
                    {t("pay_online")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status !== "onGoing" && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",

                  borderTopWidth: 1,
                  borderTopColor: color.order_border_color,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: ms(10),
                  }}
                >
                  <Text
                    style={{
                      color: color.colorPrimary,
                      fontFamily: "medium",
                      fontSize: ms(14),
                    }}
                  >
                    {item.status === "Cancelled"
                      ? t("reorder")
                      : t("order_again")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <OrderHeader title={"My Orders"} onIconPress={handleGoBack} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{ height: ms(55) }}></View>}
      />
      <OrderTrackingSheet
        sheetRef={sheetRef}
        navigation={navigation}
        // onClose={onCloseBottomSheet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    marginVertical: ms(25),
  },
  separator: {
    borderWidth: ms(2.2),
    marginBottom: ms(15),
    marginTop: ms(10),
    borderColor: color.order_border_sep,
  },
  footerSpace: {
    marginBottom: vs(100),
  },
});
