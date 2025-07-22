import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icons } from "../../assets/icons/Icons";
import moment from "moment";
import { API_URL_AUTH } from "@env";
import Error from "../Error/Error";
import { ms, s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

const generateDates = () => {
  const dates = [];
  for (let i = 1; i <= 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const weekday = date.toLocaleString("en-US", { weekday: "short" });

    dates.push({
      id: i,
      label: `${day} ${month}`,
      weekday: weekday,
      dateObj: date,
    });
  }
  return dates;
};

export default function DoctorAppointment({ navigation, route }) {
  const initialDates = generateDates();
  const firstDate = initialDates[0];
  const { doctor, specialityId, symptomId } = route.params;

  const [expandedSlots, setExpandedSlots] = useState({
    Morning: false,
    Afternoon: false,
    Evening: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(firstDate?.label);

  const [selectedTime, setSelectedTime] = useState(null);

  const [timeSlots, setTimeSlots] = useState({
    Morning: [],
    Afternoon: [],
    Evening: [],
  });

  const timeSlotIcons = {
    Morning: "sunny-outline",
    Afternoon: "partly-sunny-outline",
    Evening: "moon-outline",
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Doctors", { specialityId, symptomId });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleDateSelection = (dateObj, label) => {
    setSelectedDate(label);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    const fullDate = moment(selectedDate, "DD MMM").format("DD-MM-YYYY");

    let review = {
      selectedDate: fullDate,
      timeSlot: selectedTime,
    };

    navigation.navigate("DoctorReview", { doctor, review });
  };

  const fetchSlots = async () => {
    const fullDate = moment(selectedDate, "DD MMM").format("YYYY-MM-DD");
    const dayOfWeek = moment(fullDate).isoWeekday() + 1;

    const body = {
      staffId: doctor?.staff_id,
      dur: doctor?.staffMinDuration || "20",
      dayOfWeek: dayOfWeek,
      currAppDate: fullDate,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL_AUTH}/telemedicine/api/v1/doctors/slots`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (result.success && result.data?.content) {
        const categorizedSlots = categorizeSlots(result.data.content);
        setTimeSlots(categorizedSlots);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const categorizeSlots = (slots) => {
    const categorized = { Morning: [], Afternoon: [], Evening: [] };

    slots.forEach(({ slot, status }) => {
      const [startTime, endTime] = slot.split(" - ");
      const hour = moment(startTime, "hh:mm A").hour();

      const slotData = { fullSlot: slot, displayTime: startTime, status: 1 };

      if (hour < 12) {
        categorized.Morning.push(slotData);
      } else if (hour < 17) {
        categorized.Afternoon.push(slotData);
      } else {
        categorized.Evening.push(slotData);
      }
    });

    return categorized;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* header section */}
        <View style={styles.cardHeader}>
          <Image source={Icons.doctor_lady} style={styles.cardImage} />
          <View style={styles.headerMid}>
            <Text
              style={styles.doctorName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {doctor?.name}
            </Text>
            <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
              {doctor?.sname}
            </Text>
            <Text style={styles.subText} numberOfLines={2} ellipsizeMode="tail">
              {doctor?.education || "MBBS"}
            </Text>
            <View style={styles.headerFooter}>
              {/* <Text style={styles.experienceText}>{doctor?.experience}</Text> */}
              <Text style={styles.ratingText}>
                {doctor?.rating || "70"} % positive ratings
              </Text>
            </View>
            <View style={styles.headerFooter2}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="location-outline" size={s(13)} color="#555" />
                <Text style={styles.locationText}>
                  {doctor?.city_name || "Pune"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Appointment Type */}

        {/* Dates */}
        <View style={styles.dateBody}>
          <View style={styles.dateRow}>
            {generateDates().map((date) => (
              <TouchableOpacity
                key={date.id}
                style={[
                  styles.dateButton,
                  selectedDate === date.label && styles.selectedDate,
                ]}
                onPress={() => handleDateSelection(date.dateObj, date.label)}
              >
                <Text
                  style={
                    selectedDate === date.label
                      ? styles.selectedDateText
                      : styles.optionDateText
                  }
                >
                  {date.label}
                </Text>
                <Text
                  style={
                    selectedDate === date.label
                      ? styles.selectedDateText
                      : styles.optionDateText
                  }
                >
                  {date.weekday}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Time Slots */}
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#1C57A5" />
          </View>
        ) : error ? (
          <Error />
        ) : (
          <View style={styles.section}>
            {Object.entries(timeSlots).map(([timeLabel, slots]) => (
              <View key={timeLabel}>
                <View style={styles.timeHeader}>
                  <Ionicons
                    name={timeSlotIcons[timeLabel]}
                    size={s(16)}
                    color="#1C57A5"
                  />
                  <Text style={styles.timeLabel}>{timeLabel}</Text>
                </View>
                <View style={styles.optionRowBody}>
                  {slots.length === 0 ? (
                    <Text style={styles.noSlotsText}>No slots available</Text>
                  ) : (
                    <View style={styles.optionRow}>
                      {slots
                        .slice(0, expandedSlots[timeLabel] ? slots.length : 4)
                        .map(({ fullSlot, displayTime, status }) => (
                          <TouchableOpacity
                            key={fullSlot}
                            style={[
                              styles.timeButton,
                              status !== 1 && styles.inActive,
                              selectedTime === fullSlot &&
                                status === 1 &&
                                styles.selectedOption,
                            ]}
                            onPress={() => setSelectedTime(fullSlot)}
                            disabled={status !== 1}
                          >
                            <Text
                              style={
                                selectedTime === fullSlot
                                  ? styles.selectedText
                                  : styles.optionText
                              }
                            >
                              {displayTime}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>

                {slots.length > 4 && (
                  <TouchableOpacity
                    style={styles.viewMoreButton}
                    onPress={() =>
                      setExpandedSlots((prev) => ({
                        ...prev,
                        [timeLabel]: !prev[timeLabel],
                      }))
                    }
                  >
                    <Text style={styles.viewMoreText}>
                      {expandedSlots[timeLabel] ? "View Less" : "View More"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          mode="contained"
          style={[
            styles.bookAppointmentButton,
            !(selectedDate && selectedTime) && styles.disabledButton,
          ]}
          onPress={handleBookAppointment}
          disabled={!(selectedDate && selectedTime)}
        >
          <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    // padding: 20,
    paddingBottom: vs(100),
  },

  cardHeader: {
    flexDirection: "row",
    paddingHorizontal: s(18),
    marginTop: vs(18),
    marginBottom: vs(9),
    alignItems: "flex-start",
  },
  cardImage: {
    height: ms(90),
    width: ms(90),
  },
  headerMid: {
    flex: 1,
    paddingHorizontal: s(9),
  },
  doctorName: {
    fontWeight: "bold",
    fontSize: s(12),
  },
  subText: {
    fontSize: s(10.5),
  },
  headerFooter: {
    flexDirection: "row",
    gap: s(9),
  },

  experienceText: {
    fontWeight: 700,
    fontSize: s(10.5),
  },
  ratingText: {
    color: "#086608",
    fontSize: s(10.5),
    fontWeight: width <= 400 ? 500 : 700,
  },
  headerFooter2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: "#555",
    fontSize: s(10.5),
    fontWeight: "bold",
  },
  distanceText: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#555",
    fontSize: s(10.5),
  },

  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: vs(10),
    paddingHorizontal: s(25),
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  bookAppointmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C57A5",
    paddingVertical: vs(13),
    borderRadius: 10,
    marginVertical: vs(9),
  },
  bookAppointmentButtonText: {
    fontWeight: "bold",
    fontSize: s(13),
    color: "#FFF",
  },

  appointmentTypeBody: {
    flexDirection: "row",
    padding: ms(18),
    justifyContent: "space-between",
  },
  appointmentTypeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
    borderWidth: 1,
    flex: 1,
    borderColor: "#1C57A5",
    padding: s(9),
  },
  chipLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    // borderRightWidth: 0,
  },
  chipRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
  },
  chipText: {
    fontWeight: "bold",
    fontSize: s(10),
  },

  section: { padding: ms(19) },

  optionRow: {
    flexDirection: "row",

    alignSelf: "flex-start",
    gap: s(9),
    flexWrap: "wrap",
  },
  noSlotsText: {
    color: "#999",
    fontSize: s(11),
    marginBottom: vs(9),
  },

  dateBody: {
    flexDirection: "row",

    paddingHorizontal: s(18),
    borderBottomWidth: 1,
    borderColor: "#666",
  },
  optionRowBody: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: s(18),
  },
  dateRow: {
    flexDirection: "row",

    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateButton: {
    paddingHorizontal: s(11),
    paddingTop: vs(9),
    paddingBottom: vs(13),
    flex: 1,
    color: "#555",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDate: {
    borderBottomWidth: 1,
    borderColor: "#1C57A5",
  },
  selectedDateText: {
    color: "#1C57A5",
    fontWeight: 700,
    fontSize: s(11),
  },
  optionDateText: {
    color: "#000",
    fontWeight: 700,
    fontSize: s(11),
  },
  timeButton: {
    paddingVertical: vs(5),
    paddingHorizontal: width <= 400 ? s(6) : s(9),
    borderRadius: width <= 400 ? 6 : 8,
    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  optionText: {
    color: "#1C57A5",
    fontSize: s(10),
  },
  selectedOption: { backgroundColor: "#1C57A5" },
  inActive: {
    backgroundColor: "#ccc",
  },
  selectedText: {
    color: "#fff",
    fontSize: s(10),
  },
  timeLabel: {
    fontSize: s(12),
    fontWeight: "bold",
    marginVertical: vs(5),
  },
  timeHeader: {
    flexDirection: "row",
    alignItems: "center",

    gap: s(5),
    marginBottom: vs(9),
  },

  viewMoreButton: {
    marginVertical: vs(9),
    paddingLeft: s(18),
  },

  viewMoreText: {
    color: "#1C57A5",
    fontWeight: "bold",
    fontSize: s(11),
  },
  disabledButton: {
    backgroundColor: "#999",
  },
});
