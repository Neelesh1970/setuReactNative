import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectedSlot } from "../../../features/booktest/booktestSlice";

const slotData = [
  { id: "3", slotMasterId: "8", slot: "06:00 - 06:30" },
  { id: "4", slotMasterId: "8", slot: "06:30 - 07:00" },
  { id: "9", slotMasterId: "11", slot: "09:00 - 09:30" },
  { id: "10", slotMasterId: "11", slot: "09:30 - 10:00" },
  { id: "11", slotMasterId: "12", slot: "10:00 - 10:30" },
  { id: "12", slotMasterId: "12", slot: "10:30 - 11:00" },
  { id: "13", slotMasterId: "13", slot: "11:00 - 11:30" },
  { id: "14", slotMasterId: "13", slot: "11:30 - 12:00" },
];

const AvailableTimeSlots = ({ availableTime }) => {
  const lSlotDataRes = availableTime?.data?.lSlotDataRes || [];
  const dispatch = useDispatch()
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedTimee = useSelector((state) => state.bookTest.selectedSlotData);

  console.log("selectedTimee",selectedTimee)
  const handleSlotSelection = (item) => {
    setSelectedTime(item.id); 
    console.log("Selected time:", item.slot); 
    dispatch(selectedSlot({data :item.slot}))
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.timeSlot,
          selectedTime === item.id ? styles.selected : {},
        ]}
        onPress={() => handleSlotSelection(item)}>
        <Text
          style={[
            styles.timeText,
            selectedTime === item.id ? styles.selectedText : {},
          ]}>
          {item.slot}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lSlotDataRes}
        numColumns={2} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  timeSlot: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selected: {
    backgroundColor: "#c2c6cf",  
    borderColor: "#555",
  },
  selectedText: {
    color: "#000", 
  },
});

export default AvailableTimeSlots;