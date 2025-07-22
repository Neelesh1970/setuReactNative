import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import DropShadow from "react-native-drop-shadow";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import Button from "../../Components/Button";
import PrescriptionCard from "../../Components/PrescriptionCard";
import { useTranslation } from "react-i18next";

export default function ConfirmMobileSheet({ sheetRef }) {
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();

  const snapPoints = useMemo(() => ["30%"], []);

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

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1} // Closed by default
        handleComponent={CustomHandle}
        style={styles.bottomSheet}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
        animationConfigs={{
          duration: 400, // Duration for the animation
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => handleClosePress()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,

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

          <Text style={styles.titleText}>{t("confirm_mob_no")}</Text>
          <Text style={styles.subtitleText}>{t("verify_the_no")}</Text>

          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              style={styles.input}
              placeholder={t("your_mob_no")}
              value={inputValue}
              onChangeText={(text) =>
                setInputValue(text.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              maxLength={10}
            />
            {inputValue.length > 0 && (
              <TouchableOpacity
                onPress={() => setInputValue("")}
                style={styles.clearButton}
              >
                <Image
                  source={Icons.close_icon}
                  style={{ height: 18, width: 18 }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ marginTop: 40 }}>
            <Button
              backgroundColor={color.colorPrimary}
              textColor={color.white}
              title={t("confirm")}
              buttonStyle={{
                marginEnd: 10,
                marginStart: 10,
                borderRadius: ms(10),
              }}
            />
          </View>
        </BottomSheetView>
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
    padding: 20,
    // alignItems: "center",
  },
  titleText: {
    //marginVertical: 15,
    //marginStart: 5,
    fontFamily: "medium",
    fontSize: ms(14),
  },
  subtitleText: {
    color: color.grey,
    fontFamily: "medium",
    fontSize: ms(10),
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
  infoContainer: {
    flexDirection: "row",
    width: "80%",
    marginStart: 10,
    marginTop: 20,
  },
  infoIcon: {
    width: 21,
    height: 22,
  },
  infoTextContainer: {
    marginStart: 10,
  },
  infoTitle: {
    marginTop: 3,
    fontFamily: "bold",
    fontSize: ms(11),
    textAlign: "center",
  },
  infoSubtitle: {
    fontFamily: "regular",
    fontSize: ms(11),
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

  //   input: {
  //     paddingStart: 10,
  //     //  paddingEnd: 50,
  //     height: 40,
  //     //width: 150,
  //     marginTop: 15,
  //     borderWidth: 1,
  //     fontFamily: "regular",
  //     borderColor: color.grey,
  //     fontSize: ms(12),
  //     borderRadius: 6,
  //   },

  inputContainer: {
    position: "relative",
    marginHorizontal: 10,
  },
  input: {
    paddingStart: 10,
    height: 40,
    marginTop: 15,
    borderWidth: 1,
    fontFamily: "regular",
    borderColor: color.grey,
    fontSize: ms(12),
    borderRadius: 6,
    // paddingRight: 30, // Make space for the clear button
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 25, // Adjust based on input height and margin
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
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  handleIcon: {
    width: 14,
    height: 14,
  },

  closeButtonContainer: {
    alignItems: "flex-end",
    marginTop: -20, // Adjust as needed
    marginEnd: 10,
  },
});
