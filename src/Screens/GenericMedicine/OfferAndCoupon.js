import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import LoginHeader from "../../Components/LoginHeader";
import DropShadow from "react-native-drop-shadow";
import { ms } from "react-native-size-matters";
import { StatusBar } from "react-native";
import { t } from "i18next";
import { screenHeight, screenWidth } from "../../Utils/utils";
import SVGRotate from "../../Components/SVGRotate";
import DashedLine from "react-native-dashed-line";

// transform: [{ rotate: "270deg" }],
function OfferAndCoupon({ navigation }) {
  const data = [
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
    {
      coupon_code: "WELCOME50",
      coupon_percentage: "50% OFF",
      save_price: "Save ₹100 on this order!",
      coupon_description:
        "Use code WELCOME50 & get 50% off on your 1st order above ₹160. Maximum discount: ₹100",
    },
  ];

  const CouponDots = () => {
    return (
      <View
        style={{
          height: ms(12),
          width: ms(12),
          borderRadius: ms(6),
          backgroundColor: color.coupon_dot,
          marginTop: ms(5),
          marginBottom: ms(5),
        }}
      />
    );
  };

  const renderCouponItem = ({ item }) => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(<CouponDots />);
    }

    return (
      <DropShadow
        style={{
          padding: ms(10),
          shadowColor: "#00000025",
          shadowOffset: { width: 0, height: ms(3) },
          shadowOpacity: 0.3,
          shadowRadius: ms(2),
        }}
      >
        <View style={{ minHeight: screenWidth / 2.8 }}>
          <View style={{ flexDirection: "row", marginStart: ms(5.5) }}>
            <View
              style={{
                backgroundColor: color.editBlue,
                borderTopLeftRadius: ms(14),
                borderBottomLeftRadius: ms(14),
                width: screenWidth / 7,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <SVGRotate
                text={item.coupon_percentage}
                height={screenWidth / 2.8}
                width={screenWidth / 5.5}
                rotate_deg={270}
                style={{
                  fontFamily: "bold",
                  color: color.white,
                  fontSize: ms(19),
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: ms(14),
                borderBottomRightRadius: ms(14),
                backgroundColor: color.white,
                padding: ms(10),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: ms(16),
                    color: color.black,
                  }}
                >
                  {item.coupon_code}
                </Text>
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: ms(16),
                    color: color.black,
                    color: color.editBlue,
                  }}
                >
                  {t("copy")}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(14),
                  marginTop: ms(2),
                  color: color.coupon_save,
                }}
              >
                {item.save_price}
              </Text>
              <DashedLine
                dashLength={ms(5)}
                dashThickness={ms(1)}
                dashGap={ms(3)}
                dashColor={color.dash_sep}
                style={{ marginTop: ms(8), marginBottom: ms(8) }}
              />
              <Text
                style={{
                  fontSize: ms(12),
                  fontFamily: "medium",
                  color: color.appointment_grey,
                  flex: 1,
                }}
              >
                {item.coupon_description}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dots}
          </View>
        </View>
      </DropShadow>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.coupon_background }}>
      <StatusBar backgroundColor={color.editBlue} />
      <View style={{ flex: 1 }}>
        <DropShadow style={styles.shadowProp}>
          <View
            style={{
              height: ms(55),
              flexDirection: "row",
              backgroundColor: color.editBlue,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
              <Image
                source={Icons.back_icon}
                style={styles.icon}
                tintColor={color.white}
              />
            </TouchableOpacity>
            <Text
              style={{
                position: "absolute",
                width: "100%",
                color: color.white,
                fontFamily: "medium",
                fontSize: ms(18),
                alignSelf: "center",
                textAlign: "center",
                zIndex: 0,
              }}
            >
              {t("offers_coupons")}
            </Text>
          </View>
        </DropShadow>
        <View style={{ backgroundColor: color.white, padding: ms(20) }}>
          <View
            style={{
              borderRadius: ms(10),
              borderWidth: 1,
              borderColor: color.grey,
              padding: ms(10),
              marginStart: ms(5),
              marginEnd: ms(5),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                flex: 1,
                paddingStart: ms(10),
                fontFamily: "medium",
                fontSize: ms(14),
              }}
              placeholder={t("enter_coupon_code")}
              placeholderTextColor={color.appointment_grey}
            />
            <TouchableOpacity style={{ paddingEnd: ms(10) }}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(13),
                  color: color.profileGrey,
                }}
              >
                {t("apply")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            padding: ms(20),
            fontFamily: "bold",
            color: color.black,
            fontSize: ms(16),
          }}
        >
          {t("best_coupon")}
        </Text>
        <FlatList
          data={data}
          renderItem={renderCouponItem}
          style={{ paddingStart: ms(10), paddingEnd: ms(10) }}
        />
      </View>
    </SafeAreaView>
  );
}
export default OfferAndCoupon;
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: ms(3) },
    shadowOpacity: 0.4,
    shadowRadius: ms(2),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(40),
    height: ms(40),
    zIndex: 1,
  },
  icon: {
    width: ms(6.5),
    height: ms(13),
  },
});
