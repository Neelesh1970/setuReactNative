import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  allowFutureDates = false,
}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value) {
      // Parse the stored yyyy-mm-dd date
      const dateParts = value.split("-");
      if (dateParts.length === 3) {
        const parsedDate = new Date(
          parseInt(dateParts[0]),
          parseInt(dateParts[1]) - 1, // Months are 0-indexed
          parseInt(dateParts[2])
        );
        setDate(parsedDate);
        setDisplayValue(value); // Show the stored value
      }
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      // Format as yyyy-mm-dd
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDisplayValue(formattedDate);
      onChangeText(formattedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.dateInput, { borderColor: error ? "#FF4D4D" : "#ccc" }]}
      >
        <Text style={displayValue ? styles.dateText : styles.placeholderText}>
          {displayValue || placeholder}
        </Text>
        <Ionicons name="calendar" size={s(20)} color="#0F45B1" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          maximumDate={allowFutureDates ? undefined : new Date()}
        />
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
  dateInput: {
    height: ms(48),
    borderWidth: 1,

    borderRadius: s(8),
    paddingHorizontal: ms(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: s(14),
    color: "#000",
  },
  placeholderText: {
    fontSize: s(14),
    color: "#999",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: s(12),
    marginTop: ms(4),
  },
});

export default CustomDatePicker;
