import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Navbar } from "../Components";
import { ms, s, vs } from "react-native-size-matters";
import { ConfirmationModal, CustomButton } from "../../SOS/Components";
import { API_URI_PHR } from "@env";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import ToastService from "../../../Utils/ToastService";
import { TestListSkeleton } from "../Skeletons";

const TestList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, reportList } = route.params;
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URI_PHR}/lab-reports?visitId=${id}`
      );
      setReports(response.data.data);
      setError(false);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [id]);

  const handleViewPrescription = () => {
    navigation.navigate("MediaViewer", {
      title: "Lab Test Report",
      mediaURLs: reportList ?? [],
    });
  };

  const refreshData = () => {
    fetchPrescriptions();
  };

  return (
    <View style={styles.container}>
      <Navbar navText={"Test List"} backPress={handleBackPress} />
      {loading ? (
        <TestListSkeleton />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load prescriptions</Text>
          <CustomButton title="Retry" onPress={fetchPrescriptions} />
        </View>
      ) : reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Lab Reports found</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {reports.map((report, index) => (
            <TestReportCard key={index} item={report} refresh={refreshData} />
          ))}
        </ScrollView>
      )}

      {!loading && !error && reports.length > 0 && (
        <View style={styles.btnBody}>
          <CustomButton
            title="View Prescription"
            onPress={handleViewPrescription}
          />
        </View>
      )}
    </View>
  );
};

export default TestList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  cardBody: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    width: "100%",
    overflow: "hidden",
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    marginBottom: vs(10),
    gap: s(5),
    alignItems: "flex-start",
  },
  btnBody: {
    padding: ms(20),
  },
  titleText: {
    color: "#1C57A5",
    fontSize: s(14),
    fontWeight: "600",
    marginBottom: vs(2),
  },
  iconTitleValue: {
    flexDirection: "row",
    gap: s(5),
    alignItems: "center",
  },
  labelText: {
    fontSize: s(12),
    fontWeight: "600",
    color: "#1C1C1C",
  },
  valueText: {
    fontSize: s(12),
    fontWeight: "400",
    color: "#1C1C1C",
  },
  headerRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  btnRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap: s(10),
    marginTop: vs(10),
  },
  confrimBtn: {
    paddingHorizontal: s(15),
    paddingVertical: vs(3),
    backgroundColor: "#1C57A5",
    borderRadius: s(4),
    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  confirmBtnText: {
    color: "#FFFFFF",
    fontSize: s(12),
    fontWeight: 400,
  },
  cancelBtn: {
    paddingHorizontal: s(10),
    paddingVertical: vs(3),
    backgroundColor: "#FFCECD24",
    borderRadius: s(4),
    borderWidth: 1,
    borderColor: "#D15454",
  },
  cancelBtnText: {
    color: "#D15454",
    fontSize: s(13),
    fontWeight: 400,
  },
});

const TestReportCard = ({ item, refresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      await axios.patch(`${API_URI_PHR}/lab-reports/${item?.id}`, {
        status: actionType,
      });
      ToastService.showSuccess("Success!", "Test updated successfully");
      refresh();
    } catch (error) {
      console.error("Error updating report status:", error);
      ToastService.showSuccess("Error!", "Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleButtonPress = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  return (
    <View style={styles.cardBody}>
      <View style={styles.headerRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
          {item?.testName ?? "Unknown"}
        </Text>
        <Ionicons
          name={
            item?.status === "pending"
              ? "time-outline"
              : item?.status === "completed"
              ? "checkmark-circle-outline"
              : "close-circle-outline"
          }
          size={s(18)}
          color={
            item?.status === "pending"
              ? "#DCB20C"
              : item?.status === "completed"
              ? "#1B970F"
              : "#D15454"
          }
        />
      </View>
      <IconTitleValue
        iconName="calendar-outline"
        label="Appointment No:"
        value={item?.appointmentNo}
      />

      <IconTitleValue
        iconName="chatbubble-ellipses-outline"
        label="Remark:"
        value={item?.remark}
      />

      <IconTitleValue
        iconName="flask-outline"
        label="Type:"
        value={item?.type}
      />
      {item?.status === "pending" && (
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.confrimBtn}
            onPress={() => handleButtonPress("completed")}
            disabled={isUpdating}
          >
            <Text style={styles.confirmBtnText}>
              {isUpdating && actionType === "completed"
                ? "Processing..."
                : "Done"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => handleButtonPress("cancelled")}
            disabled={isUpdating}
          >
            <Text style={styles.cancelBtnText}>
              {isUpdating && actionType === "cancelled"
                ? "Processing..."
                : "Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleStatusUpdate}
        title={`Confirm ${
          actionType === "completed" ? "Completion" : "Cancellation"
        }`}
        message={`Are you sure you want to mark this test as ${
          actionType === "completed" ? "completed" : "cancelled"
        }?`}
      />
    </View>
  );
};

const IconTitleValue = ({ iconName, label, value }) => {
  return (
    <View style={styles.iconTitleValue}>
      <Ionicons name={iconName} size={s(14)} color="#1C57A5" />
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};
