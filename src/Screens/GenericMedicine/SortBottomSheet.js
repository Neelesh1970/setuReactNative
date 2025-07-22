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

export default function SortBottomSheet({ sheetRef, onClose, navigation }) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectionCategory, setSelectionCategory] = useState("Brands");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [clear, setClear] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const snapPoints = useMemo(() => ["40%"], []);

  const filterOptions = [
    "Relevance",
    "Average customer rating",
    "Price: low to high",
    "Price: high to low",
    "Discount",
  ];

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

  const handleSelectOption = (option) => {
    setSelectedOption(option);
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
            <Text style={styles.titleText}>{t("Sort")}</Text>

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
            <View style={styles.optionsContainer}>
              {filterOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleSelectOption(option)}
                >
                  <View
                    style={[
                      styles.radioContainer,
                      selectedOption === option && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
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
    borderWidth: ms(3.5),
    borderColor: color.colorPrimary,
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
    marginVertical: ms(10),
    marginStart: ms(25),
    fontFamily: "bold",
    fontSize: ms(16),
    color: color.black,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: ms(20),
  },
  button: {
    width: ms(80),
    height: ms(80),
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  icon: {
    width: ms(35),
    height: ms(31),
  },
  buttonText: {
    marginTop: ms(3),
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
    justifyContent: "center",
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
