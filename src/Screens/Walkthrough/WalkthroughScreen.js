import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
} from "react-native";
import { StatusBar } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { screenHeight, screenWidth } from "../../Utils/utils";
import { ms, verticalScale, moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import WalPkhroughreviews from "./WalPkhroughreviews";
import { FlatListSlider } from "react-native-flatlist-slider";
import PagerView from "react-native-pager-view";
import React, { useRef, useEffect, useState } from "react";
import { PageIndicator } from "react-native-page-indicator";
import MaskedView from "@react-native-masked-view/masked-view";
// import GradientText from "../../Components/GradientText";

function Walkthrough({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const pagerRef = useRef(null);
  const [showImage, setShowImage] = useState(false);

  
 
  const handleredirectLogin = () => {
    if (current === 0) {
      navigation.navigate("Login");
    }
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
  return (
    <View
      style={{
        backgroundColor: color.white,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={color.editBlue} barStyle="light-content" />
      <Image
        source={Icons.walkthrough_back}
        style={{
          height: screenHeight,
          width: screenWidth,
          resizeMode: "stretch",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          top: 0,
          start: 0,
          end: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <View
            style={{
              width: "90%",
              height: "70%",

              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PagerView
              ref={pagerRef}
              style={{
                width: "100%",
                height: "100%",
              }}
              initialPage={0}
              scrollEnabled={true}
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
                  source={Icons.w_slider_1}
                  style={{
                    width: "100%",
                    height: "100%",
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
                  source={Icons.w_slider_2}
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
                  source={Icons.w_slider_3}
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
        <View style={{ flex: 0.4 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: ms(20),
                color: color.white,
              }}
            >
              {t("find_your_doctor_online")}
            </Text>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: ms(14),
                color: color.white,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {t("walkthrough_description")}
            </Text>
          </View>
          {current == 2 ? (
            <View
              style={{
                padding: 10,
                margin: 10,
                minHeight: ms(60),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  minHeight: ms(35),
                  width: "70%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  backgroundColor: color.white,
                }}
                onPress={() => {
                  navigation.navigate("Login");
                  // navigation.navigate("FindDoctor");
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontFamily: "bold",
                    fontSize: ms(16),
                    textAlign: "center",

                    color: color.editBlue,
                  }}
                >
                  {t("get_started")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                margin: 10,
                minHeight: ms(60),
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (current == 1) {
                    pagerRef.current?.setPage(0);
                    setCurrent(0);
                  }
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontFamily: "bold",
                    fontSize: ms(16),
                    textAlign: "center",
                  }}
                  onPress={handleredirectLogin}
                >
                  {current === 0 ? t("skip") : t("back")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (current == 0 || current == 1) {
                    pagerRef.current?.setPage(current + 1);
                    setCurrent((value) => value++);
                  }
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontFamily: "bold",
                    fontSize: ms(16),
                    textAlign: "center",
                  }}
                >
                  {t("next")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes it a circle
    backgroundColor: "blue",
  },
  maskView: {
    backgroundColor: "transparent",
    height: ms(35),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: ms(16),
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    height: ms(35),
  },
});

export default Walkthrough;
