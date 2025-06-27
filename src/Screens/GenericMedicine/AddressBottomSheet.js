import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
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

export default function AddressBottomSheet({ sheetRef, onClose, navigation }) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedAddressType, setSelectedAddressType] = useState("Home");
  const snapPoints = useMemo(() => ["70%"], []);

  const handleSheetChanges = useCallback((index) => {
    setIsSheetOpen(index !== -1); // Sheet is open if index is not -1
    if (index === -1) {
      setPinCode("");
      setHouseNo("");
      setRecipientName("");
      setPhoneNumber("");
      setErrors({}); // Reset selected option when sheet is closed
    }
  }, []);
  const handleClosePress = useCallback(() => {
    setPinCode("");
    setHouseNo("");
    setRecipientName("");
    setPhoneNumber("");
    setErrors({});
    sheetRef.current?.close();
    onClose();
  }, [sheetRef]);

  const CustomHandle = () => {
    return (
      <View style={styles.customHandleContainer}>
        <View style={styles.customHandle} />
      </View>
    );
  };

  const handleInputChange = (field, value) => {
    // Clear the specific field error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));

    // Update the specific field value with number-only validation for pinCode and phoneNumber
    if (field === "pinCode") setPinCode(value.replace(/[^0-9]/g, ""));
    if (field === "houseNo") setHouseNo(value);
    if (field === "recipientName") setRecipientName(value);
    if (field === "phoneNumber") setPhoneNumber(value.replace(/[^0-9]/g, ""));
  };

  const validateFields = () => {
    let tempErrors = {};

    if (!pinCode) {
      tempErrors.pinCode = t("pincode_required");
    } else if (pinCode.length !== 6) {
      tempErrors.pinCode = t("pincode_must_be_6_digit");
    }
    if (!houseNo) tempErrors.houseNo = t("house_no_required");
    if (!recipientName) tempErrors.recipientName = t("recipient_name_required");
    if (!phoneNumber) tempErrors.phoneNumber = t("phone_number_required");
    else if (!/^\d{10}$/.test(phoneNumber))
      tempErrors.phoneNumber = t("phone_number_invalid");

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
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
  const handleAddressTypeChange = (type) => {
    setSelectedAddressType(type);
  };

  const handleSaveAddress = () => {
    if (validateFields()) {
      // Proceed to save the address
      handleClosePress();
    } else {
    }
  };
  
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={-1} // Closed by default
        handleComponent={CustomHandle}
        style={styles.bottomSheet}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onDismiss={() => setIsSheetOpen(false)}
        enableDynamicSizing={true}
        animationConfigs={{
          duration: 400, // Duration for the animation
        }}
      >
        <BottomSheetScrollView>
          <BottomSheetView style={styles.contentContainer}>
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
                  source={Icons.bottom_sheet_close}
                  style={styles.handleIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.titleText}>{t("add_address_details")}</Text>

            <View
              style={{
                borderColor: color.grey,
                borderTopWidth: 1.5,
                borderBottomWidth: 1.5,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Image
                source={Icons.location}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
              <View style={{}}>
                <Text style={{ fontFamily: "medium", fontSize: ms(14) }}>
                  F.C. Road
                </Text>
                <Text style={{ fontFamily: "regular", fontSize: ms(10) }}>
                  Shivajinagar, Pune, Maharashtra, India
                </Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <BottomSheetTextInput
                style={styles.pinCodeinput}
                placeholder={t("pincode") + "*"}
                value={pinCode}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("pinCode", text)}
                maxLength={6}
              />
              {errors.pinCode && (
                <Text style={styles.errorText}>{errors.pinCode}</Text>
              )}
              <BottomSheetTextInput
                style={styles.input}
                placeholder={t("house_no_floor_building_name") + "*"}
                value={houseNo}
                onChangeText={(text) => handleInputChange("houseNo", text)}
              />
              {errors.houseNo && (
                <Text style={styles.errorText}>{errors.houseNo}</Text>
              )}
              <BottomSheetTextInput
                style={styles.input}
                placeholder={t("recipitent_name") + "*"}
                value={recipientName}
                onChangeText={(text) =>
                  handleInputChange("recipientName", text)
                }
              />
              {errors.recipientName && (
                <Text style={styles.errorText}>{errors.recipientName}</Text>
              )}
              <BottomSheetTextInput
                style={styles.input}
                placeholder={t("phone_number") + "*"}
                value={phoneNumber}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                maxLength={10}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(14),
                  marginStart: 20,
                  marginVertical: 15,
                }}
              >
                {t("address_name_and_type")}
              </Text>

              <View style={{ marginStart: 20, flexDirection: "row", gap: 15 }}>
                {[t("home"), t("office"), t("other")].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.addressTypeButton,
                      selectedAddressType === type && styles.selectedButton,
                    ]}
                    onPress={() => handleAddressTypeChange(type)}
                  >
                    <Text
                      style={[
                        styles.addressTypeText,
                        selectedAddressType === type && styles.selectedText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginEnd: 30, marginStart: 10, marginTop: 60 }}>
                <Button
                  backgroundColor={color.colorPrimary}
                  textColor={color.white}
                  title={t("save_address")}
                  buttonStyle={{ width: "100%", borderRadius: ms(10) }}
                  onPress={handleSaveAddress}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetScrollView>
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
    height: 4,
    width: 50,
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
    width: 40,
    height: 40,
    borderRadius: 100,
    // borderWidth: 1,
    marginEnd: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  handleIcon: {
    width: 14,
    height: 14,
  },

  errorText: {
    color: "red",
    fontSize: ms(10),
    fontFamily: "medium",
    marginTop: 5,
  },
});
