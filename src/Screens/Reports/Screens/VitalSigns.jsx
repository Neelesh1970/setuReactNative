import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { Navbar, VitalFormModal } from "../Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URI_PHR } from "@env";
import axios from "axios";
import Error from "../../Error/Error";
import { VitalSignsSkeleton } from "../Skeletons";
import { getItem } from "../../../Utils/utils";

const VitalSigns = () => {
  const navigation = useNavigation();
  const [vitalData, setVitalData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditPress = () => {
    setShowModal(true);
  };

  const fetchData = async () => {
    setloading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const response = await axios.get(
        `${API_URI_PHR}/vital-signs-reports/user/${userId}`
      );
      if (response.data.data.length === 0) {
        setShowModal(true);
      }
      setVitalData(response.data.data[0] || {});

      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setloading(false);
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
        navText={"Vital Signs"}
        functionIconName={"create-outline"}
        backPress={handleBackPress}
        functionPress={handleEditPress}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <VitalSignsSkeleton />
        ) : (
          <>
            <View style={styles.topRow}>
              <TopCard value={vitalData?.height} label={"Height (cm)"} />
              <TopCard value={vitalData?.weight} label={"Weight (Kg)"} />
              <TopCard value={vitalData?.bmi} label={"BMI (Kg/m²)"} />
            </View>
            <View style={styles.dividerline} />
            <View style={styles.gridBody}>
              <GridCard
                value={`${vitalData?.temperature}°C`}
                label={"Temperature (°C)"}
                iconName={"thermometer-outline"}
              />
              <GridCard
                value={`${vitalData?.bloodPressureSystolic}/${vitalData?.bloodPressureDiastolic}`}
                label={"Systolic / Diastolic Blood Pressure (mm Hg)"}
                iconName={"fitness-outline"}
              />
              <GridCard
                value={vitalData?.pulse}
                label={"Pulse (BPM)"}
                iconName={"pulse-outline"}
              />
              <GridCard
                value={vitalData?.respiration}
                label={"Respiration (BPM)"}
                iconName={"sync-outline"}
              />
              <GridCard
                value={vitalData?.oxygenSaturation}
                label={"Oxygen Saturation (%)"}
                iconName={"medkit-outline"}
              />
            </View>
          </>
        )}
      </ScrollView>
      <VitalFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        vitalData={vitalData}
        fetchData={fetchData}
      />
    </View>
  );
};

export default VitalSigns;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  topRow: {
    flexDirection: "row",
    gap: s(10),
  },
  topCard: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(6),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    flex: 1,
  },
  topCardValue: {
    paddingHorizontal: s(10),
    paddingVertical: vs(20),
    alignItems: "center",
  },
  topCardLabel: {
    alignItems: "center",
    paddingBottom: vs(10),
    paddingHorizontal: s(10),
  },
  topCardValueText: {
    fontSize: s(18),
    color: "#1C57A5",
    fontWeight: 700,
  },
  topCardValueLabel: {
    fontSize: s(12),
    color: "#1C57A5",
    fontWeight: 500,
    textAlign: "center",
  },
  dividerline: {
    height: s(1),
    flex: 1,
    backgroundColor: "#D5D5D5",
    marginVertical: vs(20),
  },
  gridBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
    flex: 1,
  },
  gridCard: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    width: "47%",
    overflow: "hidden",
    alignItems: "center",
    padding: ms(10),
    marginBottom: vs(10),
  },
  gridCardValue: {
    paddingVertical: vs(10),
    alignItems: "center",
  },
  gridCardLabel: {
    alignItems: "center",
    paddingBottom: vs(10),
  },
  gridCardValueText: {
    fontSize: s(20),
    color: "#1C57A5",
    fontWeight: 700,
    textAlign: "center",
  },
  gridCardValueLabel: {
    fontSize: s(12),
    color: "#1C57A5",
    fontWeight: 500,
    textAlign: "center",
  },
  iconBody: {
    backgroundColor: "#E2F2FF",
    padding: ms(10),
    borderRadius: s(6),
  },
});

const TopCard = ({ value, label }) => {
  return (
    <View style={styles.topCard}>
      <View style={styles.topCardValue}>
        <Text style={styles.topCardValueText}>{value}</Text>
      </View>
      <View style={styles.topCardLabel}>
        <Text style={styles.topCardValueLabel}>{label}</Text>
      </View>
    </View>
  );
};

const GridCard = ({ value, label, iconName }) => {
  return (
    <View style={styles.gridCard}>
      <View style={styles.iconBody}>
        <Ionicons name={iconName} size={s(30)} color="#1C57A5" />
      </View>
      <View style={styles.gridCardValue}>
        <Text style={styles.gridCardValueText}>{value}</Text>
      </View>
      <View style={styles.gridCardLabel}>
        <Text style={styles.gridCardValueLabel}>{label}</Text>
      </View>
    </View>
  );
};
