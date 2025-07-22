import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
import { generatedNext7Dates } from "./AppointmentDate";
import { generateTimes } from "./AppointmentTime";

const CollapsibleSection = ({
  icon,
  title,
  isOpen,
  setOnToggle,
  data1,

  data2,
}) => {
  const datesListRef = useRef(null);
  const timesListRef = useRef(null);
  const dates = generatedNext7Dates();
  const times = generateTimes("all");
  const flatListRef = useRef(null);

  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleScrollToIndex = (ref, index) => {
    if (ref.current) {
      ref.current.scrollToIndex({ index });
    }
  };

  const onTogglePressed = () => {
    setOnToggle(!isOpen);
  };

  const handleDatePress = (date) => {
    const index = data1.indexOf(date);
    setSelectedDate(date);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const onSelectTime = (time) => {
    setSelectedTime(time);
  };

  const renderDates = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        {
          backgroundColor:
            selectedDate === item ? color.consult_bg : color.white,
          borderBottomColor:
            selectedDate === item ? color.colorPrimary : "transparent",
        },
      ]}
      onPress={() => handleDatePress(item)}
    >
      <Text
        style={[
          styles.dateText,
          { color: selectedDate === item ? color.selectedText : color.black },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTime = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        {
          backgroundColor:
            selectedTime === item ? color.colorPrimary : color.white,
        },
      ]}
      onPress={() => onSelectTime(item)}
    >
      <Text
        style={[
          styles.timeText,
          { color: selectedTime === item ? color.white : color.black },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.sectionHeader}>
        <Image style={styles.sectionIcon} source={icon} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={onTogglePressed}>
            <Icon
              name={isOpen ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isOpen && (
        <View style={styles.sectionContent}>
          {data1 && renderDates && (
            <FlatList
              data={data1}
              renderItem={renderDates}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.datecontentContainer}
              showsHorizontalScrollIndicator={false}
              ref={flatListRef}
            />
          )}
          {data2 && renderTime && (
            <FlatList
              data={data2}
              renderItem={renderTime}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: color.consult_bg,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    marginTop: 15,
    flexDirection: "row",
    marginHorizontal: 25,
    padding: 10,
    gap: 15,
    alignItems: "center",
  },
  sectionIcon: {
    width: 20,
    height: 20,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "medium",
    fontSize: ms(14),
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
    color: color.colorPrimary,
  },
  sectionContent: {
    marginHorizontal: 25,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  datecontentContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
  },

  dateButton: {
    bordeColor: color.colorPrimary, // Adjust this color as needed
    backgroundColor: color.consult_bg,
    paddingVertical: 10,
    borderBottomWidth: 1,
    // paddingHorizontal: 15,
    width: 105,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: color.black, // Adjust this color as needed
    fontSize: ms(10),
    fontFamily: "bold", // Ensure you have this font defined in your project
  },

  timeButton: {
    borderColor: color.colorPrimary, // Adjust this color as needed
    borderRadius: 8,
    paddingVertical: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    color: color.black, // Adjust this color as needed
    fontSize: ms(12),
    fontFamily: "bold", // Ensure you have this font defined in your project
  },
});

export default CollapsibleSection;
