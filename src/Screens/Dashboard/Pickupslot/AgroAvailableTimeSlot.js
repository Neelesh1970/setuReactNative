import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectedSlot } from "../../../features/booktest/booktestSlice";

const slots = [
  { id: "1", slotMasterId: "1", slot: "12:00 AM" },
  { id: "2", slotMasterId: "1", slot: "12:30 AM" },
  { id: "3", slotMasterId: "2", slot: "01:00 AM" },
  { id: "4", slotMasterId: "2", slot: "01:30 AM" },
  { id: "5", slotMasterId: "3", slot: "02:00 AM" },
  { id: "6", slotMasterId: "3", slot: "02:30 AM" },
  { id: "7", slotMasterId: "4", slot: "03:00 AM" },
  { id: "8", slotMasterId: "4", slot: "03:30 AM" },
  { id: "9", slotMasterId: "5", slot: "04:00 AM" },
  { id: "10", slotMasterId: "5", slot: "04:30 AM" },
  { id: "11", slotMasterId: "6", slot: "05:00 AM" },
  { id: "12", slotMasterId: "6", slot: "05:30 AM" },
  { id: "13", slotMasterId: "7", slot: "06:00 AM" },
  { id: "14", slotMasterId: "7", slot: "06:30 AM" },
  { id: "15", slotMasterId: "8", slot: "07:00 AM" },
  { id: "16", slotMasterId: "8", slot: "07:30 AM" },
  { id: "17", slotMasterId: "9", slot: "08:00 AM" },
  { id: "18", slotMasterId: "9", slot: "08:30 AM" },
  { id: "19", slotMasterId: "10", slot: "09:00 AM" },
  { id: "20", slotMasterId: "10", slot: "09:30 AM" },
  { id: "21", slotMasterId: "11", slot: "10:00 AM" },
  { id: "22", slotMasterId: "11", slot: "10:30 AM" },
  { id: "23", slotMasterId: "12", slot: "11:00 AM" },
  { id: "24", slotMasterId: "12", slot: "11:30 AM" },
  { id: "25", slotMasterId: "13", slot: "12:00 PM" },
  { id: "26", slotMasterId: "13", slot: "12:30 PM" },
  { id: "27", slotMasterId: "14", slot: "01:00 PM" },
  { id: "28", slotMasterId: "14", slot: "01:30 PM" },
  { id: "29", slotMasterId: "15", slot: "02:00 PM" },
  { id: "30", slotMasterId: "15", slot: "02:30 PM" },
  { id: "31", slotMasterId: "16", slot: "03:00 PM" },
  { id: "32", slotMasterId: "16", slot: "03:30 PM" },
  { id: "33", slotMasterId: "17", slot: "04:00 PM" },
  { id: "34", slotMasterId: "17", slot: "04:30 PM" },
  { id: "35", slotMasterId: "18", slot: "05:00 PM" },
  { id: "36", slotMasterId: "18", slot: "05:30 PM" },
  { id: "37", slotMasterId: "19", slot: "06:00 PM" },
  { id: "38", slotMasterId: "19", slot: "06:30 PM" },
  { id: "39", slotMasterId: "20", slot: "07:00 PM" },
  { id: "40", slotMasterId: "20", slot: "07:30 PM" },
  { id: "41", slotMasterId: "21", slot: "08:00 PM" },
  { id: "42", slotMasterId: "21", slot: "08:30 PM" },
  { id: "43", slotMasterId: "22", slot: "09:00 PM" },
  { id: "44", slotMasterId: "22", slot: "09:30 PM" },
  { id: "45", slotMasterId: "23", slot: "10:00 PM" },
  { id: "46", slotMasterId: "23", slot: "10:30 PM" },
  { id: "47", slotMasterId: "24", slot: "11:00 PM" },
  { id: "48", slotMasterId: "24", slot: "11:30 PM" },
];


// console.log(slots);


const AgroAvailableTimeSlots = ({ availableTime ,setSelectedTimee}) => {
  const lSlotDataRes = availableTime?.data?.lSlotDataRes || [];
  const dispatch = useDispatch()
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedTimee = useSelector((state) => state.bookTest.selectedSlotData);

  console.log("selectedTimee", selectedTimee)
  const handleSlotSelection = (item) => {
    setSelectedTime(item.id);
    setSelectedTimee(item.slot)
    console.log("Selected time:", item.slot);
    dispatch(selectedSlot({ data: item.slot }))
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
        data={slots}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        style={styles.flatList}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // height: 300,
    flex: 1,
  },
  flatList: {
    flex: 1,
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
    backgroundColor: "#d3d3d3",
    borderColor: "#555",
  },
  selectedText: {
    color: "#000",
  },
  scrollView: {
    height: 300,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AgroAvailableTimeSlots;
