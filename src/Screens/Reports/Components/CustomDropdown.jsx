import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ms, s } from "react-native-size-matters";

const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  error,
  placeholder = "Select an option",
  style,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const maxDropdownHeight = screenHeight * 0.3;

  const handleSelect = (value) => {
    onSelect(value);
    setShowDropdown(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[
          styles.input,
          styles.dropdownInput,
          error && { borderColor: "#FF4D4D", borderWidth: 1.5 },
        ]}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text
          style={selectedValue ? styles.dropdownText : styles.placeholderText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedValue || placeholder}
        </Text>
        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={s(20)}
          color="#999"
        />
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {showDropdown && (
        <View style={[styles.dropdown, { maxHeight: maxDropdownHeight }]}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.dropdownItem}
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={styles.dropdownItemText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(16),
  },
  label: {
    fontSize: s(14),
    fontWeight: "600",
    marginBottom: ms(6),
    color: "#0F45B1",
  },
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: ms(12),
    height: ms(48),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: s(8),
  },
  dropdownText: {
    fontSize: s(14),
    color: "#000",
    flex: 1,
    marginRight: ms(8),
  },
  placeholderText: {
    fontSize: s(14),
    color: "#999",
    flex: 1,
    marginRight: ms(8),
  },
  dropdown: {
    position: "absolute",
    top: ms(70),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: s(8),
    zIndex: 10,
    elevation: 5,
    maxHeight: ms(200),
  },
  dropdownItem: {
    backgroundColor: "#fff",
    padding: ms(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    minHeight: ms(40),
    justifyContent: "center",
  },
  dropdownItemText: {
    fontSize: s(14),
    color: "#000",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: s(12),
    marginTop: ms(4),
  },
});

export default CustomDropdown;
