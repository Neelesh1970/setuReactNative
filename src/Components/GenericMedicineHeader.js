import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { Icons } from "../assets/icons/Icons";
import { ms, vs } from "react-native-size-matters";
import { color } from "../assets/colors/Colors";
import DropShadow from "react-native-drop-shadow";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenWidth } from "../Utils/utils";

export default function GenericMedicineHeader({
  title,
  name,
  onPressNavigation,
  titleContainer,
  onIconPress,
  searchButton,
  cartButton,
  onSearchPress,
  onCartPress,
  onProfilePress,
  containerStyle,
  cartButtonStyle,
  searchButtonStyle,
  searchImageStyle,
  cartImageStyle,
  titleTextStyle,
  backIconStyle,
  cartImageSrc = Icons.cart,
  searchImageSrc = Icons.medicine_search,
  cartItemsNo,
}) {
  return (
    <SafeAreaView>
      <DropShadow style={styles.shadowProp}>
        <View style={[styles.headerContainer, containerStyle]}>
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            <Image
              source={Icons.back_icon}
              style={[styles.icon, backIconStyle]}
            />
          </TouchableOpacity>

          <View style={[styles.titleContainer, titleContainer]}>
            <Text
              style={[styles.title, titleTextStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>

          {searchButton && !cartButton ? (
            <TouchableOpacity
              onPress={onSearchPress}
              style={styles.rightButtonStyle}
            >
              <Image
                source={Icons.medicine_search}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          ) : searchButton && cartButton ? (
            <View
              style={{
                gap: ms(20),
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={onSearchPress}
                style={[styles.rightButtonStyle, searchButtonStyle]}
              >
                <Image
                  source={searchImageSrc}
                  style={[{ width: ms(30), height: ms(30) }, searchImageStyle]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onCartPress}
                style={[styles.rightButtonStyle, cartButtonStyle]}
              >
                <Image
                  source={cartImageSrc}
                  style={[{ width: ms(30), height: ms(30) }, cartImageStyle]}
                />
                {cartItemsNo && (
                  <>
                    <View
                      style={{
                        backgroundColor: color.red,
                        borderRadius: 10,
                        height: ms(13),
                        width: ms(13),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        right: ms(0),
                        top: ms(0),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(8),
                          color: color.white,
                        }}
                      >
                        {cartItemsNo}
                      </Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholderView} />
          )}
        </View>

        <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
      </DropShadow>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    justifyContent: "space-between",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(30),
    height: ms(30),
    //backgroundColor: "orange",
  },
  icon: {
    width: ms(6.5),
    height: ms(13),
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginStart: ms(30),
    // marginHorizontal: 10,
    // backgroundColor: "yellow",
  },
  title: {
    fontSize: ms(16),
    fontFamily: "medium",
    color: color.black,
    textAlign: "center",
  },
  rightButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: ms(30),
    width: ms(30),
  },
  rightButtonText: {
    fontFamily: "medium",
    color: color.editBlue,
  },
  placeholderView: {
    width: 30, // This matches the width of the iconContainer to maintain alignment
  },
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
