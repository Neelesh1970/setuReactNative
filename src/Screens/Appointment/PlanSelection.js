//import { LinearGradient } from 'react-native-linear-gradient';;
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  Button,
} from "react-native";
import { screenHeight, screenWidth } from "../../Utils/utils";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { FlatListSlider } from "react-native-flatlist-slider";
import {
  Svg,
  Circle,
  Path,
  Defs,
  Stop,
  LinearGradient,
  G,
  Rect,
  Use,
} from "react-native-svg";
import DeviceInfo from "react-native-device-info";
import DropShadow from "react-native-drop-shadow";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  Value3D,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ms, moderateScale } from "react-native-size-matters";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import TempSvg from "../../assets/images/temp_big.svg";
import GradientBackGround from "../../Components/GradientBackground";

function PlanSelection({ navigation }) {
  const scale = useSharedValue(0.5);
  const textScale = useSharedValue(0.1);
  const place = useSharedValue(-200);
  // const sliderPlace = useSharedValue(-screenWidth);
  const sliderPlace = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const isTablet = DeviceInfo.isTablet();

  const images = [
    {
      name: "BASIC PLANS",
      price: "₹ 599",
      duration: "3 MONTH",
      options: [
        {
          isAvailable: true,
          option_desc: "Description 1",
          id: 1,
        },
        {
          isAvailable: true,
          option_desc: "Description 2",
          id: 2,
        },
        {
          isAvailable: true,
          option_desc: "Description 3",
          id: 3,
        },
        {
          isAvailable: true,
          option_desc: "Description 4",
          id: 4,
        },
        {
          isAvailable: false,
          option_desc: "Description 5",
          id: 5,
        },
        {
          isAvailable: false,
          option_desc: "Description 6",
          id: 6,
        },
      ],
    },
    {
      name: "STANDARD",
      price: "₹ 999",
      duration: "6 MONTH",
      options: [
        {
          isAvailable: true,
          option_desc: "Description 1",
          id: 1,
        },
        {
          isAvailable: true,
          option_desc: "Description 2",
          id: 2,
        },
        {
          isAvailable: true,
          option_desc: "Description 3",
          id: 3,
        },
        {
          isAvailable: true,
          option_desc: "Description 4",
          id: 4,
        },
        {
          isAvailable: false,
          option_desc: "Description 5",
          id: 5,
        },
        {
          isAvailable: false,
          option_desc: "Description 6",
          id: 6,
        },
      ],
    },
    {
      name: "PREMIUM",
      price: "₹ 1200",
      duration: "1 YEAR",
      options: [
        {
          isAvailable: true,
          option_desc: "Description 1",
          id: 1,
        },
        {
          isAvailable: true,
          option_desc: "Description 2",
          id: 2,
        },
        {
          isAvailable: true,
          option_desc: "Description 3",
          id: 3,
        },
        {
          isAvailable: true,
          option_desc: "Description 4",
          id: 4,
        },
        {
          isAvailable: true,
          option_desc: "Description 5",
          id: 5,
        },
        {
          isAvailable: true,
          option_desc: "Description 6",
          id: 6,
        },
      ],
    },
  ];
  const xml = `<svg width="100%" height="100%"  fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47715 0 0 4.47715 0 10V81C0 85.4183 3.58172 89 8 89H83C87.4183 89 90.9068 85.3746 91.8594 81.0603C95.0368 66.67 106.654 56 120.5 56C134.346 56 145.963 66.67 149.141 81.0603C150.093 85.3746 153.582 89 158 89H232C236.418 89 240 85.4183 240 81V10C240 4.47715 235.523 0 230 0H10Z" fill="url(#paint0_linear_233_474)"/>
  <defs>
  <linearGradient id="paint0_linear_233_474" x1="-90.5" y1="111.806" x2="430.264" y2="-9.19978" gradientUnits="userSpaceOnUse">
  <stop stop-color="#85DCFC"/>
  <stop offset="1" stop-color="#2372B5"/>
  </linearGradient>
  </defs>
  </svg>`;
  const cornerRadius = ms(10);
  const width = screenWidth - ms(120);
  const height = width / 2.5;

  const curveDepth = 50;
  //const width = ms(100 * 2);
  const d = `   M ${cornerRadius} 0
  H ${width - cornerRadius}
  Q ${width} 0, ${width} ${cornerRadius}
  V ${height - cornerRadius}
  Q ${width} ${height}, ${width - cornerRadius} ${height}
  H ${cornerRadius}
  Q 0 ${height}, 0 ${height - cornerRadius}
  V ${cornerRadius}
  Q 0 0, ${cornerRadius} 0
  Z`;

  //my
  // H ${width / 2 + ms(50)}
  // Q ${width / 2 + ms(50)} ${height}, ${width / 2 + ms(50)} ${height}
  // V ${height / 2}
  // H ${width / 2 - ms(50)}
  // V ${height}

  // old
  // M ${cornerRadius} 0
  // H ${width - cornerRadius}
  // Q ${width} 0, ${width} ${cornerRadius}
  // V ${height - cornerRadius}
  // Q ${width} ${height}, ${width - cornerRadius} ${height}
  // H ${cornerRadius}
  // Q 0 ${height}, 0 ${height - cornerRadius}
  // V ${cornerRadius}
  // Q 0 0, ${cornerRadius} 0
  // Z

  const generatePath = () => {
    const cornerRadius = ms(10);

    //  const innerHeight = height - 8;
    //  const innerWidth = width - 8;

    const path = ` M${(100 / 2400) * width} 0.5
    C${(44.7715 / 2400) * width} 0.5 0 ${(45.2715 / 891) * height} 0 ${
      (100.5 / 891) * height
    }
    V${(810.5 / 891) * height}
    C0 ${(854.683 / 891) * height} ${(35.8172 / 2400) * width} ${
      (890.5 / 891) * height
    } ${(80 / 2400) * width} ${(890.5 / 891) * height}
    H${(830 / 2400) * width}
    C${(874.183 / 2400) * width} ${(890.5 / 891) * height} ${
      (909.068 / 2400) * width
    } ${(854.246 / 891) * height} ${(918.594 / 2400) * width} ${
      (811.103 / 891) * height
    }
    C${(950.368 / 2400) * width} ${(667.2 / 891) * height} ${
      (1066.54 / 2400) * width
    } ${(560.5 / 891) * height} ${(1205 / 2400) * width} ${
      (560.5 / 891) * height
    }
    C${(1343.46 / 2400) * width} ${(560.5 / 891) * height} ${
      (1459.63 / 2400) * width
    } ${(667.2 / 891) * height} ${(1491.41 / 2400) * width} ${
      (811.103 / 891) * height
    }
    C${(1500.93 / 2400) * width} ${(854.246 / 891) * height} ${
      (1535.82 / 2400) * width
    } ${(890.5 / 891) * height} ${(1580 / 2400) * width} ${
      (890.5 / 891) * height
    }
    H${(2320 / 2400) * width}
    C${(2364.18 / 2400) * width} ${(890.5 / 891) * height} ${
      (2400 / 2400) * width
    } ${(854.683 / 891) * height} ${(2400 / 2400) * width} ${
      (810.5 / 891) * height
    }
    V${(100.5 / 891) * height}
    C${(2400 / 2400) * width} ${(45.2715 / 891) * height} ${
      (2355.23 / 2400) * width
    } 0.5 ${(2300 / 2400) * width} 0.5
    H${(100 / 2400) * width}Z`;

    return path;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: place.value }],
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: textScale.value }],
    };
  });
  const sliderAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sliderPlace.value }],
    };
  });
  const startScaleAnimation = () => {
    scale.value = 0.4;
    place.value = -800;
    textScale.value = 0.1;
    withSequence(
      (scale.value = withTiming(1, {
        duration: 900,
        easing: Easing.linear,
      })),
      (place.value = withTiming(40, { duration: 900 }))
    );

    // Scale up
  };
  const startTextAnimation = () => {
    textScale.value = withTiming(1, { duration: 900 });
  };
  const startSliderAnimation = () => {
    sliderPlace.value = screenWidth + 100;
    sliderPlace.value = withTiming(0, { duration: 1500 });
  };
  const originalWidth = 500;
  const originalHeight = 500;
  const aspectRatio = originalWidth / originalHeight;
  useEffect(() => {
    startScaleAnimation();
    startTextAnimation();
    setTimeout(() => {
      startSliderAnimation();
    }, 0);
  }, []);

  const PlanOptions = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          minHeight: ms(24),
        }}
      >
        <Image
          style={{ height: ms(12), width: ms(12), resizeMode: "contain" }}
          source={item.isAvailable ? Icons.check_circle : Icons.x_circle}
        />
        <Text
          style={{
            flex: 1,
            fontFamily: "regular",
            fontSize: ms(11),
            marginStart: 10,
            color: color.black,
          }}
        >
          {item.option_desc}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: color.white,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ImageBackground
        source={Icons.background_image}
        // Background Linear Gradient
        //colors={[color.select_plan_color_2, color.select_plan_color_1]}
        style={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          resizeMode: "cover",
        }}
      >
        <Animated.Text style={[style.textStyle, textAnimatedStyle]}>
          {t("choose_your_plan")}
        </Animated.Text>
        <Animated.View style={[style.imageContainer, animatedStyle]}>
          <Image source={Icons.doctor_group} style={[style.box]} />
        </Animated.View>
        {/* <TouchableOpacity
          style={{ position: "absolute" }}
          onPress={() => {
            startScaleAnimation();
            startTextAnimation();
            setTimeout(() => {
              startSliderAnimation();
            }, 500);
          }}
        >
          <Text>Press</Text>
        </TouchableOpacity> */}
      </ImageBackground>
      <Animated.View style={[style.sliderStyle, sliderAnimation]}>
        <Carousel
          vertical={false}
          width={screenWidth}
          height={screenHeight / 2.1}
          loop={false}
          snapEnabled={true}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.82,
            parallaxScrollingOffset: ms(150),
          }}
          style={{
            width: screenWidth,
          }}
          data={images}
          renderItem={({ item, index }) => (
            <DropShadow style={style.shadowProp}>
              <View
                style={{
                  height: screenHeight / 2.1,
                  marginLeft: ms(60),
                  marginRight: ms(60),
                  backgroundColor: color.white,
                  borderRadius: ms(12),
                }}
              >
                <Svg style={{ flex: 1 }}>
                  <Defs>
                    <LinearGradient
                      id="grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <Stop offset="0%" stopColor="#85DCFC" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#2372B5" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Path d={generatePath()} fill="url(#grad)" />
                </Svg>
                <View
                  style={{
                    height: isTablet ? ms(74) : ms(54),
                    width: isTablet ? ms(74) : ms(54),
                    borderRadius: isTablet ? ms(40) : ms(30),
                    position: "absolute",
                    //top: isTablet ? width / 2.5 - ms(44) : width / 2.5 - ms(34),
                    //right: isTablet ? width / 2 - ms(37) : width / 2 - ms(28),
                    top: isTablet
                      ? height - ms(74) / 2 - ms(5)
                      : height - ms(54) / 2 - ms(5),
                    right: isTablet
                      ? width / 2 - ms(74) / 2 - ms(1)
                      : width / 2 - ms(54) / 2 - ms(1),
                    backgroundColor: color.white,
                    borderColor: color.grey,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: ms(13),
                      color: color.colorPrimary,
                    }}
                    numberOfLines={1}
                  >
                    {item.price}
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    right: 0,
                    left: 0,
                    top: 0,
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: ms(16),
                      color: color.white,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: ms(11),
                      color: color.white,
                      marginTop: 5,
                    }}
                  >
                    {item.duration}
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    right: 0,
                    left: 0,
                    top: height + ms(20),
                    padding: 16,

                    bottom: 0,
                  }}
                >
                  <ScrollView style={{ width: "100%", flex: 1 }}>
                    <View style={{}}>
                      {item.options.map((option) => {
                        return <PlanOptions item={option} key={option.id} />;
                      })}
                    </View>
                  </ScrollView>
                  <TouchableOpacity>
                    <GradientBackGround
                      title={"choose plan"}
                      containerStyle={{
                        minHeight: ms(30),
                        borderRadius: ms(20),
                      }}
                      textStyle={{ paddingRight: 20, paddingLeft: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </DropShadow>
          )}
        />
      </Animated.View>
    </View>
  );
}
const style = StyleSheet.create({
  imageContainer: {
    width: screenWidth,
    alignItems: "center",
  },
  box: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "bold",
    fontSize: ms(20),
    color: color.black,
    marginTop: ms(60),
  },
  sliderStyle: {
    position: "absolute",
    top: screenHeight / 2.3,
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
export default PlanSelection;
