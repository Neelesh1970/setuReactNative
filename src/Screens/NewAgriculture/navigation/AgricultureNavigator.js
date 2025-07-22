import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../../assets/icons/Icons';
import { color } from '../../../assets/colors/Colors';
import { DASHBOARD_BOTTOM } from '../../../Utils/constant';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';

// Import screens
import AgricultureHomeScreen from '../AgricultureHomeScreen';
import ScheduleScreen from '../../Dashboard/Schedule';
import SetuChatScreen from '../../Dashboard/SetuChat';
import ReportScreen from '../../Reports/ReportScreen';
import HomeScreen from '../../Dashboard/HomeScreen';

const Stack = createStackNavigator();

// Main Tab Navigator
function MainTabs() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";
    let text = "";
    let iconStyle = styles.unSelectedIcon;

    switch (routeName) {
      case 'Home':
        icon = Icons.dashboard_home;
        iconStyle = routeName === selectedTab ? styles.selectedIcon : styles.unSelectedIcon;
        text = t("home");
        break;
      case 'Schedule':
        icon = Icons.dashboard_calendar_new;
        iconStyle = routeName === selectedTab ? styles.calendarSelected : styles.calendarUnselected;
        text = t("schedule");
        break;
      case 'Report':
        icon = Icons.dashboard_report;
        iconStyle = routeName === selectedTab ? styles.reportSelected : styles.reportUnselected;
        text = t("report");
        break;
      case 'Chat':
        icon = Icons.dashboard_robo;
        iconStyle = routeName === selectedTab ? styles.chatbotSelected : styles.chatbotUnselected;
        text = t("setuchat");
        break;
    }

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={icon} style={iconStyle} />
        <Text style={styles.tabText}>{text}</Text>
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
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={65}
          circleWidth={55}
          bgColor={color.bottomViewColor}
          initialRouteName="Home"
          borderTopLeftRight
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Emergency")}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                  HELP
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBarExpo.Screen
            name="Home"
            options={{ headerShown: false }}
            position="LEFT"
            component={AgricultureHomeScreen}
          />
          <CurvedBottomBarExpo.Screen
            name="Report"
            options={{ headerShown: false }}
            position="LEFT"
            component={ReportScreen}
          />
          <CurvedBottomBarExpo.Screen
            name="Schedule"
            options={{ headerShown: false }}
            component={ScheduleScreen}
            position="RIGHT"
          />
          <CurvedBottomBarExpo.Screen
            name="Chat"
            options={{ headerShown: false }}
            component={SetuChatScreen}
            position="RIGHT"
          />
        </CurvedBottomBarExpo.Navigator>
      </View>
    </SafeAreaView>
  );
}

const AgricultureNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* You can add modal screens or other stack screens here */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: color.bottomViewColor,
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA080E',
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
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: color.white,
    fontFamily: 'medium',
    fontSize: 12,
    marginTop: 4,
  },
  // Icon styles
  unSelectedIcon: {
    width: 24,
    height: 24,
    tintColor: color.white,
    opacity: 0.7,
  },
  selectedIcon: {
    width: 26,
    height: 26,
    tintColor: color.white,
    opacity: 1,
  },
  calendarUnselected: {
    width: 26,
    height: 26,
    tintColor: color.white,
    opacity: 0.7,
  },
  calendarSelected: {
    width: 28,
    height: 28,
    tintColor: color.white,
    opacity: 1,
  },
  reportUnselected: {
    width: 26,
    height: 26,
    tintColor: color.white,
    opacity: 0.7,
  },
  reportSelected: {
    width: 28,
    height: 28,
    tintColor: color.white,
    opacity: 1,
  },
  chatbotUnselected: {
    width: 26,
    height: 26,
    tintColor: color.white,
    opacity: 0.7,
  },
  chatbotSelected: {
    width: 28,
    height: 28,
    tintColor: color.white,
    opacity: 1,
  },
});

export default AgricultureNavigator;
