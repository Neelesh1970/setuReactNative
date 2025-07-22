import React from "react";
import {
  Alert,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { moderateScale, ms } from "react-native-size-matters";
import { DASHBOARD_BOTTOM } from "../../Utils/constant";
import HomeScreen from "./HomeScreen";
import Schedule from "./Schedule";
import SetuChat from "./SetuChat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import ReportScreen from "../Reports/ReportScreen";
import { ReportsHome } from "../Reports";

const Screen1 = () => {
  return <View style={styles.screen1}></View>;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};
const Screen3 = () => {
  return <View style={styles.screen3} />;
};

const Screen4 = () => {
  return <View style={styles.screen4} />;
};

export default function DashboardScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const onProfileClick = () => {
    navigation.navigate("Profile");
  };

  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";
    let text = "";
    let iconStyle = styles.unSelectedIcon;
    let textColor = color.white;

    switch (routeName) {
      case DASHBOARD_BOTTOM.HOME:
        icon = Icons.dashboard_home;
        iconStyle =
          routeName === selectedTab
            ? styles.selectedIcon
            : styles.unSelectedIcon;
        text = t("home");
        break;
      case DASHBOARD_BOTTOM.CALENDAR:
        icon = Icons.dashboard_calendar_new;
        iconStyle =
          routeName === selectedTab
            ? styles.calendarSelected
            : styles.calendarUnselected;
        text = t("schedule");
        break;
      case DASHBOARD_BOTTOM.REPORT:
        icon = Icons.dashboard_report;
        iconStyle =
          routeName === selectedTab
            ? styles.reportSelected
            : styles.reportUnselected;
        text = t("report");
        break;
      case DASHBOARD_BOTTOM.ROBO:
        icon = Icons.dashboard_robo;
        iconStyle =
          routeName === selectedTab
            ? styles.chatbotSelected
            : styles.chatbotUnselected;
        text = t("setuchat");
        break;
    }

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={icon} style={iconStyle} />
        <Text
          style={{
            color: color.white,
            fontFamily: "medium",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {text}
        </Text>
      </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        {/* <NavigationContainer independent={true}> */}
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={65}
          circleWidth={55}
          bgColor={color.bottomViewColor}
          initialRouteName={DASHBOARD_BOTTOM.HOME}
          borderTopLeftRight
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("SosHome")}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  HELP
                </Text>
                {/* <Image source={Icons.dashboard_sos} style={styles.centerSOS} /> */}
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBarExpo.Screen
            name={t("home")}
            options={{ headerShown: false }}
            position="LEFT"
            component={() => <HomeScreen mainNavigation={navigation} />}
          />
          <CurvedBottomBarExpo.Screen
            name={t("report")}
            options={{ headerShown: false }}
            position="LEFT"
            component={() => <ReportsHome mainNavigation={navigation} />}
          />
          <CurvedBottomBarExpo.Screen
            name={t("schedule")}
            options={{ headerShown: false }}
            component={() => <Schedule mainNavigation={navigation} />}
            position="RIGHT"
          />

          <CurvedBottomBarExpo.Screen
            name={t("setuchat")}
            options={{ headerShown: false }}
            component={() => <SetuChat mainNavigation={navigation} />}
            position="RIGHT"
          />
        </CurvedBottomBarExpo.Navigator>
        {/* </NavigationContainer> */}
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA080E",
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  screen3: {
    flex: 1,
    backgroundColor: "#ff5733",
  },
  screen4: {
    flex: 1,
    backgroundColor: "#DAF7A6",
  },
  selectedIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  unSelectedIcon: {
    height: ms(20),
    width: ms(20),
  },
  centerSOS: {
    height: ms(58),
    width: ms(58),
  },
  calendarSelected: {
    height: ms(26),
    width: ms(26),
  },
  calendarUnselected: {
    height: ms(26),
    width: ms(26),
  },
  reportSelected: {
    height: ms(28),
    width: ms(28),
  },
  reportUnselected: {
    height: ms(26),
    width: ms(26),
  },
  chatbotSelected: {
    height: ms(25),
    width: ms(25),
  },
  chatbotUnselected: {
    height: ms(26),
    width: ms(26),
  },
});