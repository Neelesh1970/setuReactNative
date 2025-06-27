import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import DropShadow from "react-native-drop-shadow";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { moderateScale, ms } from "react-native-size-matters";
import Button from "../../Components/Button";
import PrescriptionCard from "../../Components/PrescriptionCard";
import { useTranslation } from "react-i18next";
import { screenWidth } from "../../Utils/utils";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";



export default function UploadPresSheet({
  sheetRef,
  navigation,
  onContinueClick,
  onEditClick,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  // const snapPoints = useMemo(() => ["60%", "75%", "90%"], []);
  const [snapPoints, setSnapPoints] = useState(["60%"]);
  const [fileNames, setFileNames] = useState([]);

  const data = [
    {
      image: Icons.clock,
      text_1: t("a_verified_doc_will_call_you"),
      text_2: t("30_mins_of_order_placement"),
      step: Icons.step_1,
    },
    {
      isSep: true,
    },
    {
      image: Icons.phone_doc,
      text_1: t("you_will_get_the_call_on"),
      text_2: t("+91-8989565612"),
      step: Icons.step_2,
    },

    {
      isSep: true,
    },
    {
      image: Icons.doctor_doc,
      text_1: t("after_consultation"),
      text_2: t("digital_prescription_for_your_added_medicines"),
      step: Icons.step_3,
    },
  ];

  const handleClosePress = useCallback(() => {
    setSelectedOption("");
    setSnapPoints(["60%"]);
    sheetRef.current?.close();
  }, [sheetRef]);

  const handleContinuePress = useCallback(() => {
    sheetRef.current?.close();
    setSnapPoints(["60%"]);
    onContinueClick();
  }, [sheetRef]);


  //EXPO-----
  // const openCamera = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     Alert.alert("Permission to access camera is required!");
  //     return;
  //   }

  //   result = await ImagePicker.launchCameraAsync({
  //     //cameraType: ImagePicker.CameraType.front,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setFileNames((prevFiles) => [
  //       ...prevFiles,
  //       `Prescription ${prevFiles.length + 1}`,
  //     ]);
  //     console.log(result.assets[0].uri); // The image URI
  //     // You can now use the image URI, e.g., upload it or display it
  //   }
  // };

  // Function to open the gallery


  // CLI 
  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 1,
    };
    launchCamera(options, (response) => {
      if (!response.didCancel && !response.error) {
        setFileNames((prevFiles) => [
          ...prevFiles,
          `Prescription ${prevFiles.length + 1}`,
        ]);
        console.log(response.assets[0].uri); // The image URI
      }
    });
  };


  // EXPO Gallery---------
  // const openGallery = async () => {
  //   Alert.alert("Gakk");
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     Alert.alert("Permission to access gallery is required!");
  //     return;
  //   }

  //   result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setFileNames((prevFiles) => [
  //       ...prevFiles,
  //       `Prescription ${prevFiles.length + 1}`,
  //     ]);
  //     console.log(result.assets[0].uri); // The image URI
  //     // You can now use the image URI, e.g., upload it or display it
  //   }
  // };


  // CLI Gallery-------- 
  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setFileNames((prevFiles) => [
          ...prevFiles,
          `Prescription ${prevFiles.length + 1}`,
        ]);
        console.log(response.assets[0].uri); // The image URI
      }
    });
  };


  const RenderFileNameItem = ({ item }) => (
    <TouchableOpacity style={styles.fileNameItem}>
      <Text style={styles.fileName}>{item}</Text>
    </TouchableOpacity>
  );

  const handleSheetChanges = useCallback((index) => {
    setIsSheetOpen(index !== -1); // Sheet is open if index is not -1
    if (index === -1) {
      setSelectedOption("");
      setSnapPoints(["60%"]); // Reset selected option when sheet is closed
    }
  }, []);

  const CustomHandle = () => {
    return (
      <View style={styles.customHandleContainer}>
        <View style={styles.customHandle} />
      </View>
    );
  };

  useEffect(() => {
    if (selectedOption === "withPrescription") {
      setSnapPoints(["75%"]); // With prescription snap to 75%
    } else if (selectedOption === "withoutPrescription") {
      setSnapPoints(["90%"]); // Without prescription snap to 90%
    }
  }, [selectedOption]);

  const handleSnapPres = () => {
    selectedOption === "withPrescription"
      ? sheetRef.current?.snapToIndex(1)
      : sheetRef.current?.snapToIndex(1);
    setIsSheetOpen(true); // Sheet is open
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

  const handleOptionSelect = (option) => {
    handleSnapPres();
    setSelectedOption(option);
  };

  const NoPrescriptionStep = ({ item, index }) => {
    if (item.isSep) {
      return (
        <Image
          source={Icons.dashed_line}
          style={{
            height: 2,
            width: "100%",
            resizeMode: "cover",
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            minHeight: moderateScale(60),
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: moderateScale(40),
              width: moderateScale(40),

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.image}
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                resizeMode: "contain",
              }}
            />
            <Image
              source={item.step}
              style={{
                height: moderateScale(10),
                width: moderateScale(10),
                position: "absolute",
                top: 5,
                left: 5,
              }}
            />
          </View>
          {index == 2 ? (
            <View style={{ flex: 1, marginStart: 10 }}>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(14),
                  color: color.grey,
                }}
              >
                {item.text_1}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: ms(14),
                    color: color.black,
                  }}
                >
                  {item.text_2}
                </Text>
                <TouchableOpacity
                  style={{ marginStart: 10 }}
                  onPress={onEditClick}
                >
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(14),
                      color: color.editBlue,
                    }}
                  >
                    {"Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, marginStart: 10 }}>
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: ms(14),
                  color: color.grey,
                }}
              >
                {item.text_1}
                <Text style={{ color: color.black }}>{"\n" + item.text_2}</Text>
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  const buttonData = [
    {
      icon: Icons.camera,
      text: t("take_photo_of_pres"),
      onPress: openCamera,
    },
    {
      icon: Icons.gallery,
      text: t("choose_from_your_gallery"),
      onPress: openGallery,
    },
    {
      icon: Icons.rx,
      text: t("your_past_pres"),
      onPress: () => {
        // Action for viewing past prescriptions
      },
    },
  ];

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
        onDismiss={handleClosePress}
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
                  source={Icons.bottom_sheet_close} // Replace with your icon path
                  style={styles.handleIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <>
              <Text style={styles.titleText}>{t("upload_prescription")}</Text>
              <View
                style={{
                  backgroundColor: color.grey,
                  width: "100%",
                  height: 1,
                }}
              />
            </>

            <View style={{ marginBottom: ms(20) }}>
              {selectedOption === "" ? (
                <>
                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(11),
                      marginStart: 25,
                      marginVertical: 15,
                    }}
                  >
                    1 {t("medicine_need_a_precription")}
                  </Text>

                  <View
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: color.grey,
                      marginHorizontal: 25,

                      paddingTop: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingHorizontal: 15,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: ms(41),
                          height: ms(41),
                          borderRadius: 6,
                          borderWidth: 0.8,
                          borderColor: color.grey,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={Icons.image1}
                          style={{ width: ms(30), height: ms(28) }}
                          resizeMode="contain"
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: ms(11),
                          marginStart: 10,

                          flex: 1, // Allow the text to use available space
                          flexWrap: "wrap",
                        }}
                      >
                        Himalaya Liv.52 Syrup | For Liver Protection , Appetite
                        & Liver Care
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 15,
                        backgroundColor: "rgba(0, 69, 159, 0.09)",
                        paddingStart: 15,
                        paddingEnd: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "medium",
                          fontSize: ms(9),
                          color: color.medicine_blue,
                        }}
                      >
                        Valid prescription from a registered medical
                        practitioner is mandatory for the purchase of
                        mrdications
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),
                      marginStart: 25,
                      marginVertical: 20,
                    }}
                  >
                    {t("how_do_u_want_to_proceed")}
                  </Text>
                </>
              ) : (
                <View style={{ marginTop: 25 }} />
              )}

              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 25,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    borderColor: color.grey,
                    borderWidth: 1,
                    padding: 15,
                    flex: 1,
                  }}
                  onPress={() => handleOptionSelect("withPrescription")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={Icons.doc_icon}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        borderRadius: 100,
                        borderWidth: 1.4,
                        borderColor:
                          selectedOption === "withPrescription"
                            ? color.colorPrimary
                            : color.grey,
                        backgroundColor:
                          selectedOption === "withPrescription"
                            ? color.colorPrimary
                            : color.white,
                        width: ms(18),
                        height: ms(18),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={Icons.tickMark}
                        style={{ width: 10, height: 6, tintColor: color.white }}
                      />
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),

                      marginVertical: 15,
                    }}
                  >
                    {t("i_will_attach_pres")}
                  </Text>

                  <Image
                    source={Icons.dashed_line}
                    style={{ width: "100%", height: 1 }}
                  />

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(10),
                      color: color.grey,
                      marginTop: 10,
                    }}
                  >
                    {t("cont_with_pres")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    borderColor: color.grey,
                    borderWidth: 1,
                    padding: 15,
                    flex: 1,
                  }}
                  onPress={() => handleOptionSelect("withoutPrescription")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={Icons.phone_icon}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />

                    <View
                      style={{
                        borderRadius: 100,
                        borderWidth: 1.4,
                        borderColor:
                          selectedOption === "withoutPrescription"
                            ? color.colorPrimary
                            : color.grey,
                        backgroundColor:
                          selectedOption === "withoutPrescription"
                            ? color.colorPrimary
                            : color.white,
                        width: ms(18),
                        height: ms(18),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={Icons.tickMark}
                        style={{ width: 10, height: 6, tintColor: color.white }}
                      />
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(12),

                      marginVertical: 15,
                    }}
                  >
                    {t("i_dont_have_pres")}
                  </Text>

                  <Image
                    source={Icons.dashed_line}
                    style={{ width: "100%", height: 1 }}
                  />

                  <Text
                    style={{
                      fontFamily: "medium",
                      fontSize: ms(10),
                      color: color.grey,
                      marginTop: 10,
                    }}
                  >
                    {t("cont_without_pres")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {selectedOption === "withPrescription" && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View style={{ marginHorizontal: 25 }}>
                  <Text
                    style={{
                      marginVertical: 15,
                      fontFamily: "medium",
                      fontSize: 12,
                      color: color.prescription_grey,
                    }}
                  >
                    {t("upload_pres_using")}
                  </Text>

                  {buttonData.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        borderColor: color.grey,
                        borderWidth: 1,
                        padding: 15,
                        borderRadius: 10,
                        flexDirection: "row",
                        gap: 15,
                        alignItems: "center",
                        marginBottom: 15,
                      }}
                      onPress={button.onPress}
                    >
                      <Image
                        source={button.icon}
                        style={{ width: 25, height: 25 }}
                      />

                      <Text style={{ fontFamily: "regular", fontSize: ms(14) }}>
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {fileNames.length > 0 ? (
                  <View style={{ marginHorizontal: ms(30) }}>
                    <Text style={styles.header}>Uploaded Prescriptions</Text>
                    {fileNames.map((item) => {
                      return <RenderFileNameItem item={item} />;
                    })}
                    {/* <FlatList
                      data={fileNames}
                      renderItem={renderFileNameItem}
                      keyExtractor={(item, index) => index.toString()}
                      style={styles.fileList}
                    /> */}
                  </View>
                ) : (
                  ""
                )}

                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 25,
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: ms(41),
                      height: ms(41),
                      borderRadius: 6,
                      borderWidth: 0.8,
                      borderColor: color.grey,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={Icons.image1}
                      style={{ width: ms(30), height: ms(28) }}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      justifyContent: "space-between",
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ marginStart: 10 }}>
                      <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text
                          style={{ fontFamily: "regular", fontSize: ms(14) }}
                        >
                          {"1 " + t("item")}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: ms(17),
                            height: ms(17),
                            marginTop: 2,
                          }}
                        >
                          <Image
                            source={Icons.doc_down_arrow}
                            style={{ width: ms(15), height: ms(15) }}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: ms(12),
                          color: color.grey,
                        }}
                      >
                        {t("need_prescription")}
                      </Text>
                    </View>

                    <View style={{ width: "50%" }}>
                      <Button
                        title={t("continue")}
                        backgroundColor={color.colorPrimary}
                        buttonStyle={{
                          marginBottom: 0,
                          marginStart: 0,
                          marginEnd: 0,
                          width: "100%",
                          borderRadius: ms(10),
                        }}
                        textColor={color.white}
                        onPress={handleContinuePress}
                      //onPress={handleSnapPress}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
            {selectedOption === "withoutPrescription" && (
              <View>
                <View
                  style={{
                    width: screenWidth,
                    height: screenWidth / 1.5,
                    // height: screenWidth / 1.5,
                  }}
                >
                  <Image
                    source={Icons.doc_bg}
                    style={{
                      width: screenWidth,
                      height: screenWidth / 1.5,
                      resizeMode: "cover",
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      alignItems: "center",

                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  >
                    <Image
                      source={Icons.doctors}
                      style={{
                        height: "70%",
                        width: "70%",
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: ms(18),
                        color: color.black,
                        marginTop: -20,
                        textAlign: "center",
                      }}
                    >
                      {t("dont_have_pres")}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "medium",
                        fontSize: ms(14),
                        color: color.doctor_grey,
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      {t("we_arrange_online_consultation")}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: color.grey,
                    padding: 10,
                    margin: 16,
                  }}
                >
                  {data.map((item, index) => {
                    return <NoPrescriptionStep item={item} index={index} />;
                  })}
                </View>
                <Button
                  backgroundColor={color.colorPrimary}
                  textColor={color.white}
                  title={t("cont_without_pres")}
                  buttonStyle={{
                    marginEnd: 16,
                    marginStart: 16,
                    borderRadius: ms(10),
                  }}
                  onPress={handleContinuePress}
                />
              </View>
            )}
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

  fileList: {
    marginTop: 20,
    width: "100%",
  },
  fileNameItem: {
    marginBottom: ms(10),
  },
  fileName: {
    // color: "blue",
    // textDecorationLine: "underline",
    fontSize: ms(14),
    fontFamily: "regular",
  },

  header: {
    fontSize: ms(16),
    fontFamily: "bold",

    color: color.black,
    width: "100%",
    textAlign: "left",
    //paddingHorizontal: ms(10),
  },
});
