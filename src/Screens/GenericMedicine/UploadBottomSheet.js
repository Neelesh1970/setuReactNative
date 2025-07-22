import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import DropShadow from "react-native-drop-shadow";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { useTranslation } from "react-i18next";

export default function UploadBottomSheet({
  sheetRef,
  navigation,
  openCamera,
  openDocumentPicker,
}) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = useMemo(() => ["35%"], []);

  const handleSheetChanges = useCallback((index) => {
    setIsSheetOpen(index === 0);
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
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.titleText}>{t("Upload_Prescription")}</Text>

          <View style={styles.buttonContainer}>
            <DropShadow style={styles.dropShadow}>
              <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Image
                  source={Icons.camera}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>{t("camera")}</Text>
              </TouchableOpacity>
            </DropShadow>

            <DropShadow style={styles.dropShadow}>
              <TouchableOpacity
                style={styles.button}
                onPress={openDocumentPicker}
              >
                <Image
                  source={Icons.browse}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>{t("browse")}</Text>
              </TouchableOpacity>
            </DropShadow>

            <DropShadow style={styles.dropShadow}>
              <TouchableOpacity style={styles.button}>
                <Image
                  source={Icons.setu_desc}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>{t("setu_prescription")}</Text>
              </TouchableOpacity>
            </DropShadow>
          </View>

          <View style={styles.infoContainer}>
            <Image source={Icons.upload_right} style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>
                {t("uploaded_pres_are_safe")}
              </Text>
              <Text style={styles.infoSubtitle}>
                {t("only_our_lab_techinician_review_these") + "."}
              </Text>
            </View>
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
    alignItems: "center",
  },
  titleText: {
    marginVertical: 30,
    fontFamily: "bold",
    fontSize: 21,
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
});
