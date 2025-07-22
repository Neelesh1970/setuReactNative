import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import DropShadow from "react-native-drop-shadow";
import { Icons } from "../../assets/icons/Icons";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import { screenWidth } from "../../Utils/utils";
import Button from "../../Components/Button";
import { useTranslation } from "react-i18next";
import CustomTextInput from "../../Components/CustomTextInput";

const filterData = [
  {
    title: "Brands",
    type: "checkbox",
    options: [
      "SBL",
      "Dr. Wilmar Schwade India",
      "Bjain",
      "Dr. Reckeweg",
      "ADEL",
      "Boiron",
      "Emcure",
      "Cipla",
      "Serum",
      "Basic Ayurveda",
    ],
  },
  {
    title: "Product form",
    type: "checkbox",
    options: [
      "Shampoo",
      "Bottle",
      "Kit",
      "Pack",
      "Tube",
      "Kit",
      "Cleanser",
      "Unit",
      "Body Wash",
      "Soap",
      "Oil",
    ],
  },
  {
    title: "Prescription Required",
    type: "checkbox",
    options: [
      "Hair Care",
      "Skin Care",
      "Body Care",
      "Pet Care",
      "Reduce Hair Fall",
      "Man care",
      "Healthy coat",
      "Immunity Booster",
      "Dental Clean",
    ],
  },

  {
    title: "Uses",
    type: "checkbox",
    options: [
      "Scalp",
      "Dandruff",
      "Follicles",
      "Amla",
      "Paraben",
      "Nourishment",
      "Shikakai",
      "Itching",
    ],
  },

  {
    title: "Age",
    type: "checkbox",
    options: ["UniSex", "Male", "Female"],
  },
];

export default function AllfilterBottomSheet({
  sheetRef,
  onClose,
  navigation,
}) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectionCategory, setSelectionCategory] = useState("Brands");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [clear, setClear] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const snapPoints = useMemo(() => ["75%"], []);

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

  const handleSheetChanges = useCallback(
    (index) => {
      setIsSheetOpen(index !== -1); // Sheet is open if index is not -1
      if (index === -1 && clear) {
        setSelectedOptions({}); // Reset selected option when sheet is closed
      }
    },
    [clear]
  );

  const handleClosePress = (resetOptions = false) => {
    if (resetOptions) {
      setSelectedOptions({}); // Reset selected options
    }
    sheetRef.current?.close();
    setClear(false); // Reset clear state
  };

  const handleApplyFilters = () => {
    handleClosePress(); // Just close the sheet without resetting options
  };

  const handleClearAll = () => {
    setClear(true);
    setSelectedOptions({}); // Close sheet and reset options
  };

  const handleSelectOption = (categoryTitle, option) => {
    setSelectedOptions((prevSelected) => {
      const currentSelection = prevSelected[categoryTitle] || [];

      if (
        filterData.find((category) => category.title === categoryTitle).type ===
        "radio"
      ) {
        // For radio type, overwrite with the new option
        return { ...prevSelected, [categoryTitle]: option };
      } else {
        // For checkbox type, add or remove the option
        const isSelected = currentSelection.includes(option);
        const newSelection = isSelected
          ? currentSelection.filter((opt) => opt !== option)
          : [...currentSelection, option];

        return { ...prevSelected, [categoryTitle]: newSelection };
      }
    });
  };

  const filteredOptions = useMemo(() => {
    // Find the currently selected category
    const selectedCategory = filterData.find(
      (category) => category.title === selectionCategory
    );

    if (!selectedCategory) {
      return [];
    }

    // Filter options based on the search query
    return selectedCategory.options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectionCategory]);

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <DropShadow
          style={{
            shadowColor: "#00000025",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <View style={styles.footerView}>
            <TouchableOpacity
              onPress={handleClearAll}
              style={{ width: ms(80) }}
            >
              <View style={styles.handleContainer}>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: ms(14),
                    color: color.colorPrimary,
                  }}
                >
                  {t("clear_all")}
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <Button
                title={t("apply")}
                backgroundColor={color.colorPrimary}
                textColor={color.white}
                buttonStyle={{
                  paddingHorizontal: ms(50),
                  height: ms(40),
                  marginBottom: 0,
                  borderRadius: 8,
                }}
                textStyle={{ fontSize: ms(14) }}
                onPress={handleApplyFilters}
              />
            </View>
          </View>
        </DropShadow>
      </BottomSheetFooter>
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
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => handleClosePress()}
            style={{
              position: "absolute",
              right: ms(20),

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>{t("all_filters")}</Text>

            <TouchableOpacity
              onPress={handleClearAll}
              style={{
                position: "absolute",
                right: 0,
                padding: 10,
                zIndex: 4,
              }}
            ></TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: color.grey,
              height: 1,
              width: "100%",
            }}
          />

          <View style={styles.categoryContainer}>
            <View style={styles.categoryList}>
              {filterData.map((category) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    {
                      flexDirection: "row",
                    },
                  ]}
                  onPress={() => setSelectionCategory(category.title)}
                  key={category.title}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      marginStart: ms(10),

                      flex: 1,
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        {
                          fontFamily:
                            category.title === selectionCategory
                              ? "medium"
                              : "regular",
                        },
                      ]}
                    >
                      {category.title}
                    </Text>
                  </View>
                  {category.title === selectionCategory && (
                    <View
                      style={{
                        height: ms(25),
                        width: 1,
                        marginVertical: ms(5),
                        backgroundColor: color.appointment_grey,
                      }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                backgroundColor: color.grey,
                height: "100%",
                width: 1,
              }}
            />
            <View style={styles.optionsContainer}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 7,
                  paddingHorizontal: ms(10),
                  marginStart: ms(10),
                  width: "75%",
                  fontFamily: "regular",
                  fontSize: ms(10),
                  color: color.search_grey,
                  marginBottom: ms(20),
                }}
                placeholder={t("search")}
                placeholderTextColor={color.search_grey}
                onChangeText={setSearchQuery} // Update search query
              />
              {filterData.map(
                (category) =>
                  category.title === selectionCategory && (
                    <View key={category.title}>
                      {category.options
                        .filter((option) =>
                          option
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() =>
                              handleSelectOption(category.title, option)
                            }
                          >
                            {category.type === "checkbox" && (
                              <View
                                style={[
                                  styles.checkboxContainer,
                                  selectedOptions[category.title]?.includes(
                                    option
                                  ) && styles.checkboxSelected,
                                ]}
                              />
                            )}
                            {category.type === "radio" && (
                              <View
                                style={[
                                  styles.radioContainer,
                                  selectedOptions[category.title] === option &&
                                  styles.radioSelected,
                                ]}
                              />
                            )}
                            <Text style={styles.optionText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )
              )}
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

  checkboxContainer: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",

    marginRight: 5,
    borderColor: color.black,
  },
  checkboxSelected: {
    backgroundColor: color.colorPrimary,
    borderColor: color.colorPrimary,
  },
  radioContainer: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: color.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: color.colorPrimary,
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
    marginVertical: 10,
    marginStart: 25,
    fontFamily: "bold",
    fontSize: ms(16),
    color: color.black,
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

  optionButton: {
    flexDirection: "row",
    gap: ms(5),
    marginBottom: ms(12),
    alignItems: "center",
  },
  optionText: {
    fontFamily: "regular",
    fontSize: ms(14),
    color: color.black,
    flex: 1,
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
    borderRadius: 100,
    // borderWidth: 1,

    marginEnd: ms(5),
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

  categoryContainer: {
    flexDirection: "row",
    gap: ms(0),

    // flexWrap: "wrap",
    flex: 1,
  },
  categoryList: { marginTop: 20 },
  categoryButton: {
    borderTopWidth: 0,
    //borderWidth: 0.5,
    //  borderColor: color.filter_border,
    width: ms(120),
    height: ms(35),

    // paddingEnd: 10,
  },
  categoryText: {
    fontFamily: "bold",
    fontSize: ms(12),
    color: color.black,
    flexWrap: "wrap",
  },
  optionsContainer: {
    flex: 1,
    marginTop: ms(20),
    marginStart: ms(20),
  },

  footerView: {
    marginTop: 0,
    justifyContent: "space-between",
    flexDirection: "row",

    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    alignItems: "center",
    backgroundColor: "white",
  },

  handleContainer: {
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  handleIcon: {
    width: 14,
    height: 14,
  },
});
