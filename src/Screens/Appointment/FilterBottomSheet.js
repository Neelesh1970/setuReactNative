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
  Alert,
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const filterData = [
  {
    title: "Specialities",
    type: "checkbox",
    options: [
      "General physician",
      "Dentist",
      "Dermatologist",
      "Orthopaedic",
      "Psychiatrist",
    ],
  },
  {
    title: "Mode of Consultation",
    type: "radio",
    options: ["Video Consultation", "In-Clinic Consultation", "All"],
  },
  {
    title: "Languages",
    type: "radio",
    options: ["English", "Hindi", "Marathi"],
  },
  {
    title: "Gender",
    type: "radio",
    options: ["Male", "Female", "Any"],
  },
];

export default function FilterBottomSheet({ sheetRef, onClose, navigation }) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectionCategory, setSelectionCategory] = useState("Specialities");
  const [previousSelectionCategory, setPreviousCategory] = useState(
    "Mode of Consultation"
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previousSelectedIndex, setPreviousSelectedIndex] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [clear, setClear] = useState(false);
  // const translationX = useSharedValue(50);
  // const translationY = useSharedValue(25);
  // const opacity = useSharedValue(0);

  const translationY = useSharedValue(0);

  const listAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  });

  // const undo_translationX = useSharedValue(0);
  // const undo_translationY = useSharedValue(0);
  // const undo_opacity = useSharedValue(1);

  const translationX_array = [];
  const translationY_array = [];
  const opacity_array = [];

  filterData.map((item) => {
    translationX_array.push(useSharedValue(50));
    translationY_array.push(useSharedValue(25));
    opacity_array.push(useSharedValue(0));
  });

  const animateSelection = (index) => {
    if (previousSelectedIndex !== null) {
      translationX_array[previousSelectedIndex].value = 0;
      translationY_array[previousSelectedIndex].value = 0;
      opacity_array[previousSelectedIndex].value = 1;
      undoAnimation(previousSelectedIndex);
    }
    if (index !== null) {
      translationX_array[index].value = 50;
      translationY_array[index].value = 25;
      opacity_array[index].value = 0;
      moveElement(index);
    }
  };

  useEffect(() => {
    animateSelection(selectedIndex);
  }, [selectedIndex]);

  const listAnimation = () => {
    translationY.value = withTiming(0, { duration: 600 });
  };

  const moveElement = (index) => {
    translationX_array[index].value = withTiming(0, { duration: 600 });
    translationY_array[index].value = withTiming(0, { duration: 500 });
    opacity_array[index].value = withTiming(1, { duration: 600 });
  };

  const undoAnimation = (index) => {
    translationX_array[index].value = withTiming(50, { duration: 600 });
    translationY_array[index].value = withTiming(25, { duration: 500 });
    opacity_array[index].value = withTiming(0, { duration: 600 });
  };

  const handlePress = (index) => {
    if (selectedIndex != null) {
      setPreviousSelectedIndex(selectedIndex);
    }
    setSelectedIndex(index);
  };

  const snapPoints = useMemo(() => ["55%"], []);

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
            <View>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(16),
                  color: color.filter_black_2,
                }}
              >
                20794
              </Text>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(14),
                  color: color.filter_grey,
                }}
              >
                Doctors Found
              </Text>
            </View>

            <View>
              <Button
                title={t("apply_filters")}
                backgroundColor={color.colorPrimary}
                textColor={color.white}
                buttonStyle={{
                  paddingHorizontal: 15,
                  height: 30,
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
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 4,
              borderRadius: ms(30),
              backgroundColor: color.white,
              minHeight: ms(50),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[styles.titleText, { zIndex: 5 }]}>
                {t("filters")}
              </Text>

              <TouchableOpacity
                onPress={handleClearAll}
                style={{
                  //   position: "absolute",
                  //   right: 0,
                  padding: 10,
                  zIndex: 4,
                }}
              >
                <View style={styles.handleContainer}>
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: ms(16),
                      color: color.colorPrimary,
                    }}
                  >
                    {t("clear_all")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginBottom: 20,
                backgroundColor: color.grey,
                height: 1,
                width: "100%",
                zIndex: 4,
              }}
            />
          </View>

          <View style={[styles.categoryContainer, { marginTop: ms(80) }]}>
            <View style={styles.categoryList}>
              {filterData.map((category, index) => {
                const animationStayle = useAnimatedStyle(() => {
                  return {
                    transform: [
                      {
                        translateX: translationX_array[index].value,
                      },
                      {
                        translateY: translationY_array[index].value,
                      },
                    ],
                    opacity: opacity_array[index].value,
                  };
                });
                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      {
                        // backgroundColor:
                        //   category.title === selectionCategory
                        //     ? color.filter_selected_bg
                        //     : color.white,
                        backgroundColor: color.white,
                        flexDirection: "row",
                      },
                    ]}
                    // onPress={() => setSelectionCategory(category.title)}
                    onPress={() => {
                      setSelectionCategory(category.title);
                      handlePress(index);
                      translationY.value =
                        previousSelectedIndex < index ? 300 : -300;
                      listAnimation();
                      //  setPreviousCategory(selectionCategory);

                      // setTimeout(() => {
                      //   if (category.title === previousSelectionCategory) {
                      //     translationX.value = ms(0);
                      //     translationY.value = ms(5);
                      //     opacity.value = 1;
                      //     undoAnimation();
                      //     console.log("Previous");
                      //   }
                      //   if (category.title === selectionCategory) {
                      //     console.log("Current");
                      //     translationX.value = ms(50);
                      //     translationY.value = ms(25);
                      //     opacity.value = 0;
                      //     moveElement();
                      //   }
                      // }, 0);
                    }}
                    key={category.title}
                  >
                    {/* {category.title === selectionCategory && (
                    <View
                      style={{
                        height: 49,
                        width: 4,
                        backgroundColor: color.colorPrimary,
                      }}
                    />
                  )} */}
                    <View style={{ justifyContent: "center", marginStart: 30 }}>
                      <Text style={styles.categoryText}>{category.title}</Text>
                    </View>

                    <Animated.View
                      style={[
                        {
                          backgroundColor: color.filter_selected_bg,
                          position: "absolute",
                          width: ms(151),
                          height: ms(49),
                          right: 0,
                          bottom: 0,
                          zIndex: -1,
                        },
                        animationStayle,
                      ]}
                    >
                      <View
                        style={{
                          height: 49,
                          width: ms(4),
                          backgroundColor: color.colorPrimary,
                        }}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ backgroundColor: color.white }}>
              <Animated.View
                style={[styles.optionsContainer, listAnimationStyle]}
              >
                {filterData.map(
                  (category) =>
                    category.title === selectionCategory && (
                      <View key={category.title}>
                        {category.options.map((option, index) => (
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
              </Animated.View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    //zIndex: 2,
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
    marginVertical: 15,
    marginStart: 25,
    fontFamily: "bold",
    fontSize: ms(16),
    color: color.filter_black,
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
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  optionText: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.colorPrimary,
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

  categoryContainer: {
    flexDirection: "row",

    flexWrap: "wrap",
  },
  categoryList: {},
  categoryButton: {
    borderTopWidth: 0,
    borderWidth: 0.5,
    borderColor: color.filter_border,
    width: ms(151),
    height: ms(49),
    paddingEnd: 10,
  },
  categoryText: {
    fontFamily: "bold",
    fontSize: ms(12),
    color: color.filter_black,
    flexWrap: "wrap",
  },
  optionsContainer: {
    flex: 1,
    zIndex: 2,
    backgroundColor: color.white,
    paddingStart: 30,
  },

  footerView: {
    marginTop: 0,
    justifyContent: "space-between",
    flexDirection: "row",

    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
});
