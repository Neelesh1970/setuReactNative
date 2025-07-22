import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import { getItem } from "../../Utils/utils";
import ToastService from "../../Utils/ToastService";
import Error from "../Error/Error";
import { ms, s, vs } from "react-native-size-matters";

export default function MyAppointment({ navigation, route }) {
  const { bookingStatus } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentData, setAppointmentData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getItem("userID");
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("FindDoctors");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    if (bookingStatus === "success") {
      ToastService.showSuccess("Success!", "Booking Successful!");
    } else if (bookingStatus === "failed") {
      ToastService.showError("Error!", "Booking Failed!");
    }
  }, [bookingStatus]);

  const fetchAppointmentData = async (page) => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/telemedappointment/user?userId=${userId}&page=${page}&10`
      );

      console.log("Appointment Data Response:", response);
      setAppointmentData(response?.data?.data?.appointments);
      setCurrentPage(response?.data?.data?.currentPage);
      setTotalPages(response?.data?.data?.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log("Appointment Data Error:", err.response || err.message);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAppointmentData(currentPage);
    }
  }, [userId, currentPage]);

  const isAppointmentActive = (appointmentDate, appointmentSlot) => {
    const now = new Date();
    const appointmentStart = new Date(appointmentDate);

    const [startTime, endTime] = appointmentSlot.split(" - ");
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    appointmentStart.setHours(startHour, startMinute, 0, 0);

    const appointmentEnd = new Date(appointmentStart);
    appointmentEnd.setHours(endHour, endMinute, 0, 0);

    return now >= appointmentStart && now <= appointmentEnd;
  };

  const handleJoin = (meetingLink) => {
    navigation.navigate("MeetingWebView", { meetingLink });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) {
    const errorMessage = error?.response?.data?.message;

    if (errorMessage === "No appointments found for this user.") {
      return (
        <View style={styles.container2}>
          <View style={styles.container2_card}>
            <Text style={styles.message}>No appointments found.</Text>
            <Text style={styles.subText}>Book one to get started!</Text>
            <TouchableOpacity
              style={styles.c2_button}
              onPress={() => navigation.navigate("FindDoctors")}
            >
              <Text style={styles.c2_buttonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return <Error />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C57A5" />
      </View>
    );
  }

  console.log("appointment data", appointmentData);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>My Appointments</Text>
        {appointmentData.map((item) => {
          const isActive = isAppointmentActive(
            item.appointmentDate,
            item.appointmentSlot
          );

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                item.status === "pending"
                  ? styles.cardPending
                  : item.status === "success"
                  ? styles.cardSuccess
                  : styles.cardDefault,
              ]}
            >
              <Text style={styles.cardText}>
                <Text style={styles.cardBoldText}>Appointment ID: </Text>{" "}
                {item.appointmentId}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardBoldText}>Date: </Text>
                {new Date(item.appointmentDate).toLocaleDateString()}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardBoldText}>Time: </Text>
                {item.appointmentSlot}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardBoldText}>Fees: </Text> ₹
                {item.appointmentFees}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.cardBoldText}>Doctor: </Text>{" "}
                {item?.doctorName}
              </Text>
              <Text
                style={[
                  styles.cardText,
                  item.status === "pending"
                    ? styles.statusPending
                    : item.status === "success"
                    ? styles.statusSuccess
                    : styles.statusDefault,
                ]}
              >
                <Text style={styles.cardBoldText}>Status: </Text>
                {item.status}
              </Text>
              <TouchableOpacity
                style={[
                  styles.joinButton,
                  !isActive && styles.joinButtonDisabled,
                ]}
                onPress={() => handleJoin(item.meetingLink)}
                // disabled={!isActive}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: s(16),
  },
  title: {
    fontSize: s(16),
    fontWeight: "bold",
    marginBottom: vs(20),
    color: "#1C57A5",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: ms(16),
    marginBottom: vs(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPending: {
    borderLeftWidth: 6,
    borderLeftColor: "#FFA500",
  },
  cardSuccess: {
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
  },
  cardDefault: {
    borderLeftWidth: 6,
    borderLeftColor: "#1C57A5",
  },
  cardBoldText: {
    fontSize: s(12),
    color: "#333",
    marginBottom: vs(8),
    fontWeight: "bold",
  },
  cardText: {
    fontSize: s(12),
    color: "#333",
    marginBottom: vs(8),
  },
  statusPending: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  statusSuccess: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  statusDefault: {
    color: "#1C57A5",
    fontWeight: "bold",
  },
  joinButton: {
    backgroundColor: "#1C57A5",
    borderRadius: 8,
    padding: ms(10),
    alignItems: "center",
    marginTop: vs(9),
  },
  joinButtonDisabled: {
    backgroundColor: "#ccc",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: s(12),
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(18),
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: s(18),
  },
  errorText: {
    fontSize: s(12),
    color: "#FF0000",
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ms(14),
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  paginationButton: {
    padding: ms(9),
    backgroundColor: "#1C57A5",
    borderRadius: 5,
  },
  paginationButtonText: {
    color: "#fff",
    fontSize: s(10.5),
    fontWeight: "bold",
  },
  paginationText: {
    fontSize: s(10),
    color: "#333",
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    padding: ms(20),

    flex: 1,
  },
  container2_card: {
    borderRadius: 10,
    backgroundColor: "#f9f9f9",

    margin: ms(20),
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(30),
    paddingHorizontal: vs(20),
  },
  message: {
    fontSize: s(16),
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: s(14),
    color: "#666",
    marginBottom: vs(10),
  },

  c2_button: {
    backgroundColor: "#1C57A5",
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: 5,
    marginTop: vs(10),
  },
  c2_buttonText: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "bold",
  },
});
