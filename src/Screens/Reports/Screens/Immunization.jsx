import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CustomTabHeader, ImmunizationModal, Navbar } from "../Components";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { API_URI_PHR } from "@env";
import { ms, s, vs } from "react-native-size-matters";
import Error from "../../Error/Error";
import { AllergiesSkeleton } from "../Skeletons";
import Ionicons from "react-native-vector-icons/Ionicons";
import ToastService from "../../../Utils/ToastService";
import { ConfirmationModal } from "../../SOS/Components";

const Immunization = () => {
  const navigation = useNavigation();
  const [upcomingVaccines, setUpcomingVaccines] = useState([]);
  const [completedVaccines, setCompletedVaccines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "done", label: "Done" },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddPress = () => {
    setShowModal(true);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      // Fetch pending vaccines
      const pendingResponse = await axios.get(
        `${API_URI_PHR}/immunizations/user/${userId}?status=pending`
      );

      // Fetch confirmed vaccines
      const confirmedResponse = await axios.get(
        `${API_URI_PHR}/immunizations/user/${userId}?status=confirmed`
      );

      setUpcomingVaccines(pendingResponse.data.data);
      setCompletedVaccines(confirmedResponse.data.data);

      if (
        pendingResponse.data.data.length === 0 &&
        confirmedResponse.data.data.length === 0
      ) {
        setShowModal(true);
      }

      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Navbar
        navText={"Immunization"}
        functionIconName={"add-circle-outline"}
        backPress={handleBackPress}
        functionPress={handleAddPress}
      />
      <CustomTabHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <AllergiesSkeleton />
        ) : activeTab === "upcoming" ? (
          upcomingVaccines.length === 0 ? (
            <Text style={styles.notFoundText}>No Upcoming Immunizations</Text>
          ) : (
            upcomingVaccines.map((item, index) => (
              <ImmunizationCard
                key={index}
                item={item}
                showButtons={true}
                fetchData={fetchData}
              />
            ))
          )
        ) : completedVaccines.length === 0 ? (
          <Text style={styles.notFoundText}>No Completed Immunizations</Text>
        ) : (
          completedVaccines.map((item, index) => (
            <ImmunizationCard
              key={index}
              item={item}
              showButtons={false}
              fetchData={fetchData}
            />
          ))
        )}
      </ScrollView>
      <ImmunizationModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />
    </View>
  );
};

export default Immunization;

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
    justifyContent: "flex-start",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    padding: ms(10),
    marginBottom: vs(10),
    flexDirection: "row",
    gap: s(10),
  },
  cardImage: {
    height: "100%",
    width: s(70),
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  dataDetailsCol: {
    flex: 1,
    justifyContent: "space-between",
    gap: vs(4),
  },
  dataRow: {
    flexDirection: "row",
    gap: s(5),
    overflow: "hidden",
  },
  primaryText: {
    fontSize: s(15),
    fontWeight: 600,
    color: "#1B970F",
    paddingRight: s(16),
    marginBottom: vs(5),
  },
  valueText: {
    fontSize: s(12),
    fontWeight: 400,
    color: "#1C1C1C",
    flexShrink: 1,
  },
  notFoundText: {
    fontSize: s(16),
    fontWeight: 500,
    color: "#1C1C1C",
    textAlign: "center",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: s(10),
    marginTop: vs(10),
  },
  confrimBtn: {
    paddingHorizontal: s(10),
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
    paddingHorizontal: s(13),
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
  iconRow: {
    position: "absolute",
    top: s(8),
    right: s(8),
  },
});

const ImmunizationCard = ({ item, showButtons = false, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null); // 'confirmed' or 'cancelled'

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      await axios.patch(`${API_URI_PHR}/immunizations/${item.id}`, {
        status: actionType,
      });
      ToastService.showSuccess("Success!", "Immunization updated successfully");
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
      ToastService.showError("Error!", "Failed to update immunization");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonPress = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  return (
    <View style={styles.cardBody}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1631941618536-2979d565b726?w=400&auto=format&fit=crop&q=60",
        }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.dataDetailsCol}>
        <Text style={styles.primaryText} numberOfLines={1} ellipsizeMode="tail">
          {item?.vaccineName}
        </Text>
        <ImmunizationCardRow
          value={`Prescribed By: ${item?.prescribedBy}`}
          iconName="reader-outline"
        />
        <ImmunizationCardRow
          value={item?.dateOfVaccination}
          iconName="calendar-outline"
        />
        {showButtons && (
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.confrimBtn}
              onPress={() => handleButtonPress("confirmed")}
              disabled={loading}
            >
              <Text style={styles.confirmBtnText}>
                {loading && actionType === "confirmed"
                  ? "Updating..."
                  : "Confirm"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => handleButtonPress("cancelled")}
              disabled={loading}
            >
              <Text style={styles.cancelBtnText}>
                {loading && actionType === "cancelled"
                  ? "Updating..."
                  : "Cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.iconRow}>
        <Ionicons
          name={
            item?.status === "pending"
              ? "time-outline"
              : "checkmark-circle-outline"
          }
          size={s(18)}
          color={item?.status === "pending" ? "#DCB20C" : "#1B970F"}
        />
      </View>

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleStatusUpdate}
        title={`Confirm ${
          actionType === "confirmed" ? "Confirmation" : "Cancellation"
        }`}
        message={`Are you sure you want to mark this immunization as ${
          actionType === "confirmed" ? "confirmed" : "cancelled"
        }?`}
      />
    </View>
  );
};

const ImmunizationCardRow = ({ iconName, value }) => {
  return (
    <View style={styles.dataRow}>
      <Ionicons name={iconName} size={s(20)} color="#1C57A5" />
      <Text style={styles.valueText} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  );
};
