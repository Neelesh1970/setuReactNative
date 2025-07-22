import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms, s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Abha = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={[color.colorPrimary, color.colorSecondary]}
            locations={[0, 0.2, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.background}
          >
            {/* Content Section */}
            <View style={styles.contentContainer}>
              <View style={styles.star_group_body}>
                <Image source={Icons.star_group} style={styles.topRightIcon} />
              </View>
              <View style={styles.middleContainer}>
                <Image
                  source={require("./images/abhaLogo.png")}
                  style={styles.logo}
                />
                <Text style={styles.title}>
                  Do You Want Create Your Abha ID?
                </Text>
              </View>
              {/* Footer Navigation */}
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DashboardScreen")}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AbhaHome")}
                >
                  <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Abha;

const styles = StyleSheet.create({
  background: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "80%",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },

  star_group_body: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  topRightIcon: {
    width: s(40),
    height: s(40),
  },

  middleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: vs(60),
  },
  logo: {
    width: s(180),
    height: s(180),
    resizeMode: "contain",
  },
  title: {
    fontSize: s(16),
    fontWeight: width <= 400 ? "500" : "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#2372B5",
    paddingHorizontal: 20,
  },
  footerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
  },
  skipText: {
    fontSize: s(16),
    color: "#2372B5",
    fontWeight: width <= 400 ? "500" : "bold",
  },
  nextText: {
    fontSize: s(16),
    color: "#2372B5",
    fontWeight: width <= 400 ? "500" : "bold",
  },
});
