import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
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
  screenWidth,
} from "../../Utils/utils";
import ProductCell from "../../Components/ProductCell";
import { LinearGradient } from 'react-native-linear-gradient';;
import Slider from "@react-native-community/slider";
import { t } from "i18next";
import Button from "../../Components/Button";
import OrderTrackingSheet from "./OrderTrackingSheet";
import CustomSlider from "../../Components/Job/CustomSlider";

export default function OnGoing({ route, navigation }) {
  const [value, setValue] = useState(75);
  const [viewWidth, setViewWidth] = useState(0);
  const { page } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };
  const sheetRef = useRef(null);
  const onCloseBottomSheet = () => {
    navigation.goBack();
  };
  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const data = {
    status: "onGoing",
    delivery: "Arriving",
    deliveryDate: "Tommorow",
    productImg: Icons.order_medicine,
    orderInfo: "",
    orderStatus: "Ordered at 11.32 AM",
    sliderValue: 0,
  };

  const CancelledData = {
    status: "Cancelled",
    delivery: "Cancelled",
    deliveryDate: "Today",

    orderInfo:
      "Order cancelled. If you’ve paid online, refund will be initiated shortly",
  };

  const handleSliderChange = (sliderValue) => {
    setValue(sliderValue * 100);
  };

  const SummaryRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text
        style={{
          color: color.profileGrey,
          fontFamily: "medium",
          fontSize: ms(12),
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: color.profileGrey,
          fontFamily: "medium",
          fontSize: ms(12),
        }}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <OrderHeader title={"My Orders"} onIconPress={handleGoBack} />
      <ScrollView>
        <View style={{}}>
          {page === "onGoing" && (
            <>
              <View style={{ width: "100%", height: ms(296) }}>
                <Image
                  source={Icons.ongoing_top_bg}
                  style={{ width: "100%", height: ms(256) }}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.containerStyle}>
                <LinearGradient
                  colors={[
                    color.order_green_gradient_1,
                    color.order_green_gradient_2,
                  ]}
                  style={styles.gradientStyle}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.container}>
                    <View style={styles.onTimeView}>
                      <Text style={styles.onTimeText}>{t("on_time")}</Text>
                    </View>

                    <View style={styles.deliveryInfoView}>
                      <View style={styles.deliveryTextContainer}>
                        <Text style={styles.deliveryText}>{data.delivery}</Text>
                        <Text style={styles.deliveryDateText}>
                          {data.deliveryDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>

                {
                  <>
                    <View
                      style={{
                        marginHorizontal: ms(25),
                        marginTop: ms(10),
                      }}
                      onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setViewWidth(width);
                      }}
                    >
                      {/* <Slider
                        style={{ width: "100%", height: ms(30) }}
                        //   minimumValue={0}
                        //   maximumValue={3}
                        // disabled
                        value={value ? value / 100 : 0} // Use data's specific slider value
                        onValueChange={(value) => handleSliderChange(value)}
                        //   step={2}
                        maximumTrackTintColor="#000000"
                        thumbImage={Icons.popImage}
                        minimumTrackTintColor={color.order_green}
                      /> */}
                      <CustomSlider
                        min={0}
                        max={100}
                        initialValue={value}
                        onValueChange={() => {}}
                        _sliderWidth={viewWidth - ms(42)}
                      />
                      <Image
                        source={
                          value >= 0
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
                          value >= 50
                            ? Icons.order_done_tick
                            : Icons.order_remain_tick
                        }
                        style={{
                          width: ms(18),
                          height: ms(18),
                          position: "absolute",

                          left: viewWidth > 0 ? viewWidth / 2 - ms(9) : "50%",
                        }}
                      />

                      <Image
                        source={
                          value >= 100
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
                        marginBottom: ms(15),
                        marginTop: ms(10),
                      }}
                    >
                      <Text
                        style={{
                          color:
                            value >= 0
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
                            value >= 50
                              ? color.order_green
                              : color.tracking_text_grey,
                          fontFamily: "regular",
                          fontSize: ms(10),
                        }}
                      >
                        {t("shipped")}
                      </Text>
                      <Text
                        style={{
                          color:
                            value >= 100
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
                }

                <View style={{ flexDirection: "row" }}>
                  {data.status === "onGoing" && (
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
                          paddingVertical: ms(15),
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
                          paddingVertical: ms(15),
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
                </View>
              </View>
            </>
          )}

          {page === "Cancelled" && (
            <>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: color.order_border_color,
                  marginTop: ms(15),
                  borderRadius: ms(8),
                  backgroundColor: color.white,
                  marginHorizontal: ms(30),
                  elevation: ms(10),
                  marginBottom: ms(15),
                }}
              >
                <LinearGradient
                  colors={[
                    color.order_grey_gradient_1,
                    color.order_grey_gradient_2,
                  ]}
                  style={{
                    borderTopLeftRadius: ms(8),
                    borderTopRightRadius: ms(8),
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginStart: ms(15),
                      gap: ms(10),
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: color.order_grey,
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
                        {CancelledData.status}
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
                      <View
                        style={{
                          flexDirection: "row",
                          gap: ms(5),
                          paddingVertical: ms(10),
                        }}
                      >
                        <Text
                          style={{
                            color: color.black,
                            fontFamily: "medium",
                            fontSize: ms(14),
                          }}
                        >
                          {CancelledData.delivery}
                        </Text>
                        <Text
                          style={{
                            color: color.black,
                            fontFamily: "superBold",
                            fontSize: ms(14),
                          }}
                        >
                          {CancelledData.deliveryDate}
                        </Text>
                      </View>
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
                  <Text
                    style={{
                      color: color.order_info_grey,
                      fontFamily: "medium",
                      fontSize: ms(12),

                      flex: 1,
                    }}
                  >
                    {CancelledData.orderInfo}
                  </Text>
                </View>

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
                      {t("reorder")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <View
            style={{
              borderWidth: ms(4),
              borderColor: color.order_border_sep,
              paddingVertical: ms(10),
            }}
          >
            <View style={{ marginHorizontal: ms(30) }}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(18),
                }}
              >
                {t("item_ordered")}
              </Text>

              {page === "onGoing" && (
                <View
                  style={{
                    backgroundColor: color.order_item_bg,
                    alignSelf: "flex-start",
                    padding: ms(5),
                    paddingHorizontal: ms(10),
                    borderRadius: ms(4),
                    marginTop: ms(8),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),
                    }}
                  >
                    {t("item_ready_to_be_shipped")}
                  </Text>
                </View>
              )}

              <View
                style={{
                  marginTop: ms(10),

                  flexDirection: "row",
                  gap: ms(10),
                }}
              >
                <View
                  style={{
                    width: ms(54),
                    height: ms(54),
                    borderWidth: 1,
                    borderColor: color.suffixgrey,
                    borderRadius: ms(8),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Icons.order_medicine}
                    style={{ width: ms(38), height: ms(38) }}
                    resizeMode="center"
                  />
                </View>
                <View style={{ flex: 1, gap: ms(1) }}>
                  <Text
                    style={{
                      color: color.black,
                      fontFamily: "bold",
                      fontSize: ms(12),
                    }}
                  >
                    {"Evion 400mg Capsule with Vitamin for Cellular Health "}
                  </Text>
                  <Text
                    style={{
                      color: color.order_info_grey,
                      fontFamily: "medium",
                      fontSize: ms(11),
                    }}
                  >
                    {"1 strip of 20 capsules"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: ms(30), marginTop: ms(15) }}>
            <Text
              style={{
                color: color.black,
                fontFamily: "bold",
                fontSize: ms(18),
              }}
            >
              {t("bill_summary")}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: color.black,
                  fontFamily: "bold",
                  fontSize: ms(11),
                  flex: 1,
                }}
                numberOfLines={1}
              >
                Evion 400 mg Capsule with Vitamin E for Cellullar capsule
              </Text>

              <Text
                style={{
                  color: color.searchInputBorder,
                  fontFamily: "medium",
                  fontSize: ms(11),
                  textDecorationLine: "line-through",
                  marginEnd: ms(4),
                }}
              >
                ₹86.28
              </Text>
              <Text
                style={{
                  color: color.colorPrimary,
                  fontFamily: "medium",
                  fontSize: ms(11),
                }}
              >
                ₹80.00
              </Text>
            </View>
            <Text
              style={{
                color: color.black,
                fontFamily: "regular",
                fontSize: ms(11),
                marginTop: ms(1),
              }}
            >
              1Strip of 20 capsule
            </Text>

            <View
              style={{
                width: "100%",
                backgroundColor: color.bill_summary_grey,
                height: ms(1),
                marginVertical: ms(10),
              }}
            />
            <View style={{ gap: ms(5) }}>
              <SummaryRow label={t("item_total")} value="₹80.00" />
              <SummaryRow label={t("shipping_fee")} value="₹79.00" />
              <SummaryRow label={t("other_services")} value="₹4.00" />
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: color.bill_summary_grey,
                height: ms(1),
                marginVertical: ms(10),
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "bold", fontSize: ms(18) }}>
                {t("bill_total")}
              </Text>
              <Text style={{ fontFamily: "bold", fontSize: ms(18) }}>
                ₹163.00
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: color.bill_summary_grey,
                height: ms(1),
                marginVertical: ms(10),
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "bold", fontSize: ms(14) }}>
                {t("to_be_paid")}
              </Text>
              <Text style={{ fontFamily: "bold", fontSize: ms(14) }}>
                ₹163.00
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: color.bill_summary_grey,
                height: ms(1),
                marginVertical: ms(10),
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  color: color.appointment_grey,
                }}
              >
                {t("payment_mode")}
              </Text>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  color: color.appointment_grey,
                }}
              >
                {"COD"}
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: color.bill_summary_grey,
                height: ms(1),
                marginVertical: ms(10),
              }}
            />

            <Text
              style={{
                fontFamily: "medium",
                fontSize: ms(13),
                color: color.appointment_grey,
              }}
            >
              {page === "onGoing"
                ? t("download_invoice_from_here")
                : page === "Cancelled"
                ? t("order_cancel_as_per_req_txt")
                : ""}
            </Text>

            {page === "onGoing" && (
              <Button
                title={t("pay_online")}
                backgroundColor={color.colorPrimary}
                buttonStyle={{
                  flex: 1,
                  marginBottom: 0,
                  marginStart: 0,
                  marginEnd: 0,
                  borderRadius: ms(8),
                  marginTop: ms(20),
                  marginBottom: ms(10),
                }}
                textColor={color.white}
                //  onPress={handleSnapPress}
              />
            )}
          </View>

          {page === "Cancelled" && (
            <View
              style={{
                borderWidth: ms(2),
                marginTop: ms(10),
                borderColor: color.order_border_sep,
              }}
            />
          )}

          {page === "onGoing" && (
            <>
              <View
                style={{
                  borderWidth: ms(4),
                  borderColor: color.order_border_sep,
                  paddingTop: ms(10),
                  paddingBottom: ms(5),
                }}
              >
                <View style={{ marginHorizontal: ms(25) }}>
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: ms(18),
                      color: color.black,
                    }}
                  >
                    {t("order_info")}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: ms(8),
                      marginTop: ms(10),
                    }}
                  >
                    <Image
                      source={Icons.on_going_location}
                      style={{ width: ms(38), height: ms(38) }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: color.subtitleGrey,
                          fontFamily: "medium",
                          fontSize: ms(12),
                        }}
                      >
                        {t("address")}
                      </Text>
                      <Text style={{ fontFamily: "medium", fontSize: ms(12) }}>
                        (Mystic House Model Colony, Pune - 411016)
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      backgroundColor: color.bill_summary_grey,
                      height: ms(1),
                      marginVertical: ms(10),
                    }}
                  />

                  <View style={{ gap: ms(10), marginTop: ms(8) }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(12),
                          color: color.profileGrey,
                        }}
                      >
                        {t("order_id")}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(12),
                        }}
                      >
                        {"P0223546988754145445"}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(12),
                          color: color.profileGrey,
                        }}
                      >
                        {t("order_date")}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(12),
                        }}
                      >
                        {"21 Aug, 11:26 AM"}
                      </Text>
                    </View>

                    <Button
                      title={t("cancel_order")}
                      backgroundColor={color.white}
                      buttonStyle={{
                        flex: 1,
                        marginBottom: 0,
                        marginStart: 0,
                        marginEnd: 0,
                        borderRadius: ms(8),
                        marginTop: ms(20),
                        marginBottom: ms(10),
                        borderWidth: 1,
                        borderColor: color.searchInputBorder,
                      }}
                      textColor={color.colorPrimary}
                      //  onPress={handleSnapPress}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: color.ongoing_bottom_bg,
                  paddingVertical: ms(15),
                  marginHorizontal: ms(25),
                  borderRadius: ms(8),
                  marginTop: ms(8),
                  flex: 1,
                  justifyContent: "center",
                  marginBottom: ms(30),
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    fontFamily: "bold",
                    fontSize: ms(16),
                    zIndex: 4,
                    paddingHorizontal: ms(15),
                  }}
                >
                  We Ensure the customer receives accurate delivery
                  confirmation, tracking information, and contact details for
                  support, along with the package in good condition and any
                  necessary return instructions.
                </Text>
                <View
                  style={{
                    height: ms(152),

                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <Image
                    source={Icons.verified}
                    style={{ width: ms(152), height: ms(152) }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <OrderTrackingSheet
        sheetRef={sheetRef}
        navigation={navigation}
        onClose={onCloseBottomSheet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },

  containerStyle: {
    borderWidth: 1,
    borderColor: color.order_border_color,
    backgroundColor: color.white,
    top: 0,
    right: 0,
    left: 0,
    marginTop: ms(110),
    borderRadius: ms(8),
    marginHorizontal: ms(30),
    position: "absolute",
    elevation: 4,
  },

  gradientStyle: {
    borderTopLeftRadius: ms(8),
    borderTopRightRadius: ms(8),
  },
  container: {
    flexDirection: "row",
    marginStart: ms(15),
  },
  onTimeView: {
    backgroundColor: color.order_green,
    paddingHorizontal: ms(10),
    paddingVertical: ms(2),
    borderRadius: ms(45),
    alignSelf: "center",
  },
  onTimeText: {
    color: color.white,
    fontFamily: "medium",
    fontSize: ms(12),
  },
  deliveryInfoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: ms(10),
    alignItems: "center",
    paddingVertical: ms(10),
  },
  deliveryTextContainer: {
    flexDirection: "row",
    gap: ms(5),
  },
  deliveryText: {
    color: color.black,
    fontFamily: "medium",
    fontSize: ms(14),
  },
  deliveryDateText: {
    color: color.black,
    fontFamily: "superBold",
    fontSize: ms(14),
  },
});
