import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  FlatList,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import GenericMedicineHeader from "../../Components/GenericMedicineHeader";
import { color } from "../../assets/colors/Colors";
import Button from "../../Components/Button";
import { ms } from "react-native-size-matters";
import { Icons } from "../../assets/icons/Icons";
import { useTranslation } from "react-i18next";
import UploadBottomSheet from "./UploadBottomSheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AddressBottomSheet from "./AddressBottomSheet";
import DocumentPicker from "react-native-document-picker"; // Updated import

import UploadPresSheet from "./UploadPresSheet";
import ConfirmDeliverySheet from "./ConfirmDeliverySheet";
import ConfirmMobileSheet from "./ConfirmMobileSheet";

export default function UploadPrescription({ navigation }) {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const confirmDeliveryRef = useRef(null);
  const confirmMobileRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSnapPress = () => {
    sheetRef.current?.snapToIndex(0);
    setIsSheetOpen(true);
  };

  const handleDeliverySheet = () => {
    confirmDeliveryRef.current?.snapToIndex(0);
  };

  const handleMobileSheet = () => {
    confirmMobileRef.current?.snapToIndex(0);
  };

  const handleBottomSheetClose = () => {
    sheetRef.current?.close();
  };

  const openCamera = async () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.errorMessage) {
        console.log("Camera Error: ", response.errorMessage);
      } else {
        setFileNames((prevFiles) => [
          ...prevFiles,
          `Prescription ${prevFiles.length + 1}`,
        ]);
        handleBottomSheetClose();
      }
    });
  };

  const openDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (result) {
        console.log("Selected file URI:", result[0].uri);
        setFileNames((prevFiles) => [
          ...prevFiles,
          `Prescription ${prevFiles.length + 1}`,
        ]);
        handleBottomSheetClose();
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User cancelled document picker");
      } else {
        console.error("Error picking document:", error);
      }
    }
  };

  const renderFileNameItem = ({ item }) => (
    <TouchableOpacity style={styles.fileNameItem}>
      <Text style={styles.fileName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.editBlue} />

      <GenericMedicineHeader
        title={t("upload_prescription")}
        onIconPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Image source={Icons.upload_prescription} style={styles.image} />
        <Button
          backgroundColor={color.colorPrimary}
          textColor={color.white}
          title={t("upload_prescription")}
          buttonStyle={{ width: "100%", marginTop: 30, borderRadius: ms(10) }}
          onPress={handleSnapPress}
          disabled={isSheetOpen}
        />

        {fileNames.length > 0 && (
          <Text style={styles.header}>Uploaded Prescriptions</Text>
        )}

        <FlatList
          data={fileNames}
          renderItem={renderFileNameItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.fileList}
        />
      </View>

      <UploadBottomSheet
        sheetRef={sheetRef}
        navigation={navigation}
        openCamera={openCamera}
        openDocumentPicker={openDocumentPicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 25,
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
  },
  fileList: {
    marginTop: 20,
    width: "100%",
  },
  fileNameItem: {
    marginBottom: ms(10),
  },
  fileName: {
    fontSize: ms(14),
    fontFamily: "regular",
  },
  header: {
    fontSize: ms(16),
    fontFamily: "bold",
    marginBottom: ms(10),
    color: color.black,
    width: "100%",
    textAlign: "left",
  },
});