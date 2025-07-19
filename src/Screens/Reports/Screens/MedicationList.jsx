import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { Navbar } from "../Components";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "../../SOS/Components";
import { API_URI_PHR } from "@env";
import axios from "axios";
import { MedicationListSkeleton } from "../Skeletons";

const MedicationList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, prescriptionList } = route.params;
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleHistoryPress = () => {
    navigation.navigate("MedicineOrderHistory");
  };

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URI_PHR}/medicine-prescription?visitId=${id}`
      );
      setPrescriptions(response.data.data);
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
      title: "Prescription",
      mediaURLs: prescriptionList ?? [],
    });
  };

  return (
    <View style={styles.container}>
      <Navbar
        navText={"Medicine List"}
        functionIconName={"albums-outline"}
        backPress={handleBackPress}
        functionPress={handleHistoryPress}
      />

      {loading ? (
        <MedicationListSkeleton />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load prescriptions</Text>
          <CustomButton title="Retry" onPress={fetchPrescriptions} />
        </View>
      ) : prescriptions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No prescriptions found</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {prescriptions.map((prescription, index) => (
            <MedicineCard
              key={index}
              medicineName={prescription.medicineName}
              duration={prescription.duration}
              remark={prescription.remark}
              morning={prescription.morning}
              afternoon={prescription.afternoon}
              night={prescription.night}
            />
          ))}
        </ScrollView>
      )}

      {!loading && !error && prescriptions.length > 0 && (
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

const MedicineCard = ({
  medicineName,
  duration,
  remark,
  morning,
  afternoon,
  night,
}) => {
  return (
    <View style={styles.cardBody}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
        {medicineName}
      </Text>
      <IconTitleValue
        iconName="time-outline"
        label="Duration:"
        value={duration}
      />
      <IconTitleValue
        iconName="information-circle-outline"
        label="Remark:"
        value={remark || "No remarks"}
      />

      <View style={styles.dosageTable}>
        <View style={[styles.dosageColumn]}>
          <View style={styles.dosageHeaderBox}>
            <Text style={styles.dosageHeader}>Morning</Text>
          </View>
          <Ionicons
            name={morning ? "checkmark-circle-outline" : "close-circle-outline"}
            size={s(22)}
            color={morning ? "green" : "red"}
          />
        </View>
        <View style={[styles.dosageColumn]}>
          <View style={styles.dosageHeaderBox}>
            <Text style={styles.dosageHeader}>Afternoon</Text>
          </View>
          <Ionicons
            name={
              afternoon ? "checkmark-circle-outline" : "close-circle-outline"
            }
            size={s(22)}
            color={afternoon ? "green" : "red"}
          />
        </View>
        <View style={[styles.dosageColumn, styles.lastColumn]}>
          <View style={styles.dosageHeaderBox}>
            <Text style={styles.dosageHeader}>Night</Text>
          </View>
          <Ionicons
            name={night ? "checkmark-circle-outline" : "close-circle-outline"}
            size={s(22)}
            color={night ? "green" : "red"}
          />
        </View>
      </View>
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
  dosageTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: vs(5),
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(6),
    overflow: "hidden",
  },
  dosageColumn: {
    alignItems: "center",
    flex: 1,
    paddingVertical: vs(5),
    borderRightWidth: s(1),
    borderRightColor: "#B1A6A6",
  },
  lastColumn: {
    borderRightWidth: 0,
  },
  dosageHeaderBox: {
    borderBottomWidth: s(1),
    borderBottomColor: "#B1A6A6",
    width: "100%",
    alignItems: "center",
    paddingBottom: vs(5),
    marginBottom: vs(5),
  },
  dosageHeader: {
    fontSize: s(14),
    fontWeight: "500",
    color: "#1C1C1C",
  },
  btnBody: {
    padding: ms(20),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ms(20),
  },
  errorText: {
    fontSize: s(16),
    color: "red",
    marginBottom: vs(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: s(16),
    color: "#B1A6A6",
  },
});

export default MedicationList;
