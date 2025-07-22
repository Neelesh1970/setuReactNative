import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import DropShadow from "react-native-drop-shadow";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { screenWidth } from "../../Utils/utils";
import Button from "../../Components/Button";
import { useTranslation } from "react-i18next";
import Feather from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import Slider from "@react-native-community/slider";
import LinearGradient from 'react-native-linear-gradient';
import CustomSlider from "../../Components/Job/CustomSlider";
import DeviceInfo from "react-native-device-info";
import Toast from "react-native-toast-message";

export default function OrderTrackingSheet({ sheetRef, navigation }) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [value, setValue] = useState(0);

  const [viewWidth, setViewWidth] = useState("");
  const [childViewWidth, setChildViewWidth] = useState("");
  const currentValue = 78;
  const isTablet = DeviceInfo.isTablet();

  // Dynamically set snap points based on the device type
  const snapPoints = useMemo(() => [isTablet ? "40%" : "30%"], [isTablet]);

  const handleSheetChanges = useCallback((index) => {
    setIsSheetOpen(index !== -1); // Sheet is open if index is not -1
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef]);

  const CustomHandle = () => {
    return (
      <View style={styles.customHandleContainer}>
        <View style={styles.customHandle} />
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handleSliderChange = (sliderValue) => {
    setValue(sliderValue * 100);
  };

  const customFooter = () => {
    return (
      <>
        <LinearGradient
          colors={[
            color.order_tracking_gradient_1,
            color.order_tracking_gradient_2,
          ]}
          style={styles.gradientStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        ></LinearGradient>
      </>
    );
  };

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={-1} // Closed by default
        handleComponent={CustomHandle}
        containerStyle={{ bottom: 50 }}
        style={[styles.bottomSheet, { marginBottom: 100 }]}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
        footerComponent={customFooter}
        detached={true}
        bottomInset={ms(46)}
        onDismiss={() => setIsSheetOpen(false)}
        enableDynamicSizing={true}
        animationConfigs={{
          duration: 400, // Duration for the animation
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View>
            <TouchableOpacity
              onPress={() => handleClosePress()}
              style={{
                position: "absolute",
                right: 0,

                zIndex: 4,
              }}
            >
              <View style={styles.handleContainer}>
                <Image
                  source={Icons.bottom_sheet_close} // Replace with your icon path
                  style={styles.handleIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: color.editBlue,
                paddingHorizontal: ms(10),
                paddingVertical: ms(5),
                flexDirection: "row",
                gap: ms(20),
              }}
            >
              <Text style={styles.orderTitleText}>
                {t("order_tracking_id") + " - SHrEe02"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  Clipboard.setStringAsync("SHrEe02").then(() => {
                    Toast.show({
                      type: "tomatoToast",
                      text1: "Text copied",
                      position: "bottom",
                      // And I can pass any custom props I want
                    });
                  });
                }}
              >
                <Image
                  source={Icons.order_copy}
                  style={{ width: ms(12), height: ms(12) }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.subTitleContainer}>
              <View>
                <Text style={styles.subTitlesText}>{t("shipped_via")}</Text>
                <Text style={styles.subStatusText}>UPS</Text>
              </View>

              <View>
                <Text style={styles.subTitlesText}>{t("status")}</Text>
                <Text style={styles.subStatusText}>In Transit</Text>
              </View>

              <View>
                <Text style={styles.subTitlesText}>{t("expected")}</Text>
                <Text style={styles.subStatusText}>Friday, September 02</Text>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: ms(25),
                marginTop: ms(10),
              }}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                console.log(width);
                setViewWidth(width);
              }}
            >
              <CustomSlider
                min={0}
                max={100}
                initialValue={currentValue}
                onValueChange={(value) => console.log("Slider Value:", value)}
                _sliderWidth={screenWidth - ms(70)}
                containerStyle={{ height: ms(60) }}
                isGradient
                popImage={Icons.order_tracking_thumb}
                popImageStyle={{
                  height: ms(9),
                  width: ms(9),
                  resizeMode: "contain",
                }}
                thumbStyle={{
                  height: ms(9),
                  width: ms(9),
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  position: "absolute",
                  start: 0,
                  end: 0,
                  top: ms(5),
                }}
              >
                <View
                  style={{
                    width: ms(54),
                    height: ms(54),
                    // position: "absolute",
                    backgroundColor: color.white,
                    borderWidth: ms(2),
                    borderColor:
                      currentValue >= 0 ? color.editBlue : color.grey,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    // top: ms(5),
                    // left: ms(5),
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        currentValue >= 0
                          ? color.order_tracking_blue
                          : color.grey,
                      width: ms(42),
                      height: ms(42),
                      borderRadius: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={Icons.order_placed}
                      style={{
                        width: ms(26),
                        height: ms(26),

                        tintColor: color.white,
                      }}
                      resizeMode="center"
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: ms(54),
                    height: ms(54),
                    // position: "absolute",
                    backgroundColor: color.white,
                    borderWidth: ms(2),
                    borderColor:
                      currentValue >= 50
                        ? color.in_transit_yellow_2
                        : color.grey,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    // top: ms(5),
                    // left: "45%",
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        currentValue >= 50
                          ? color.in_transit_yellow
                          : color.grey,
                      width: ms(42),
                      height: ms(42),
                      borderRadius: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={Icons.in_transit}
                      style={{
                        width: ms(26),
                        height: ms(26),

                        tintColor: color.white,
                      }}
                      resizeMode="center"
                    />
                  </View>
                </View>

                <Image
                  source={
                    currentValue >= 100
                      ? Icons.order_done_tick
                      : Icons.order_remain_tick
                  }
                  style={{
                    width: ms(42),
                    height: ms(42),
                    // position: "absolute",
                    top: ms(5),
                    // right: ms(5),
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: ms(8),
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: color.black,

                      fontFamily: "bold",
                      fontSize: ms(10),
                    }}
                  >
                    {t("order_placed")}
                  </Text>
                  <Text
                    style={{
                      color: color.black,

                      fontFamily: "medium",
                      fontSize: ms(9),
                    }}
                  >
                    12-08-2024
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    // start: viewWidth / 2 - ms(childViewWidth - ms(40)),
                    // start: 0,
                    // end: 0,

                    // position: "absolute",
                  }}
                  onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    console.log(width, "OF child");
                    setChildViewWidth(width);
                  }}
                >
                  <Text
                    style={{
                      color: color.black,
                      fontFamily: "bold",

                      fontSize: ms(10),
                    }}
                  >
                    {t("in_transit")}
                  </Text>
                  <Text
                    style={{
                      color: color.black,

                      fontFamily: "medium",
                      fontSize: ms(9),
                    }}
                  >
                    12-08-2024
                  </Text>
                </View>
                <Text
                  style={{
                    color: color.black,
                    fontFamily: "bold",
                    fontSize: ms(10),
                  }}
                >
                  {t("completed")}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={{}}>
            <LinearGradient
              colors={[
                color.order_tracking_gradient_1,
                color.order_tracking_gradient_2,
              ]}
              style={styles.gradientStyle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            ></LinearGradient>
          </View> */}
        </BottomSheetView>
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: ms(-20),
            zIndex: 4,
          }}
        >
          <Image
            source={Icons.order_truck}
            style={{ width: ms(56), height: ms(56) }}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
  },
  customHandleContainer: {
    alignItems: "center",
  },
  customHandle: {
    backgroundColor: color.colorPrimary,
    height: 0,
    width: 0,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // alignItems: "center",
  },
  titleText: {
    marginVertical: 15,
    marginStart: 25,
    fontFamily: "medium",
    fontSize: ms(14),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    width: 35,
    height: 31,
  },
  buttonText: {
    marginTop: 3,
    fontFamily: "bold",
    fontSize: ms(11),
    color: color.colorPrimary,
    textAlign: "center",
  },
  dropShadow: {
    shadowColor: "#00000030",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },

  pinCodeinput: {
    paddingStart: 10,
    //  paddingEnd: 50,
    height: 40,
    width: 150,
    marginTop: 15,
    borderWidth: 1,
    fontFamily: "medium",
    fontSize: ms(12),
    borderColor: color.grey,
    borderRadius: 6,
  },

  input: {
    paddingStart: 10,
    //  paddingEnd: 50,
    height: 40,
    //width: 150,
    marginTop: 15,
    borderWidth: 1,
    fontFamily: "medium",
    borderColor: color.grey,
    fontSize: ms(12),
    borderRadius: 6,
  },

  addressTypeButton: {
    width: ms(79),
    height: ms(30),
    borderWidth: 1,
    borderColor: color.black,
    borderRadius: 25,
    justifyContent: "center",
  },
  addressTypeText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.black,
    textAlign: "center",
  },

  selectedButton: {
    backgroundColor: color.black,
  },
  selectedText: {
    color: color.white,
  },

  handleContainer: {
    // backgroundColor: color.grey,
    width: ms(30),
    height: ms(25),
    borderRadius: 100,
    // borderWidth: 1,
    marginEnd: ms(5),
    alignItems: "center",
    justifyContent: "center",
  },
  handleIcon: {
    width: ms(14),
    height: ms(14),
    tintColor: color.white,
  },

  errorText: {
    color: "red",
    fontSize: ms(10),
    fontFamily: "medium",
    marginTop: ms(5),
  },

  orderTitleText: {
    fontFamily: "regular",
    fontSize: ms(10),
    color: color.white,
  },

  subTitlesText: {
    fontFamily: "bold",
    fontSize: ms(10),
    color: color.white,
  },
  subStatusText: {
    fontFamily: "bold",
    fontSize: ms(13),
    color: color.white,
  },

  subTitleContainer: {
    backgroundColor: color.order_tracking_blue,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
  },
  gradientStyle: {
    height: ms(6),
  },
});
