import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { Navbar } from "../Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URI_PHR } from "@env";
import Error from "../../Error/Error";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { LifeStyleSkeleton } from "../Skeletons";
import LifeStyleFormModal from "../Components/LifeStyleFormModal";

const LifeStyle = () => {
  const navigation = useNavigation();
  const [lifeStyleData, setLifeStyleData] = useState({});
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
        `${API_URI_PHR}/lifestyle-history-reports/user/${userId}`
      );
      if (response.data.data.length === 0) {
        setShowModal(true);
      }
      setLifeStyleData(response.data.data[0] || {});

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
        navText={"Life Style History"}
        functionIconName={"create-outline"}
        backPress={handleBackPress}
        functionPress={handleEditPress}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <LifeStyleSkeleton />
        ) : (
          <View style={styles.gridBody}>
            <GridCard
              value={`Smoking`}
              label={lifeStyleData?.smoking}
              iconName={"color-wand-outline"}
            />
            <GridCard
              value={`Alcohol`}
              label={lifeStyleData?.alcohol}
              iconName={"beer-outline"}
            />
            <GridCard
              value={`Diet`}
              label={lifeStyleData?.diet}
              iconName={"fast-food-outline"}
            />
            <GridCard
              value={`Exercise`}
              label={lifeStyleData?.exercise}
              iconName={"barbell-outline"}
            />
            <GridCard
              value={`Occupation`}
              label={lifeStyleData?.occupation}
              iconName={"briefcase-outline"}
            />
            <GridCard
              value={`Pet`}
              label={lifeStyleData?.pet}
              iconName={"paw-outline"}
            />
          </View>
        )}
      </ScrollView>
      <LifeStyleFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        lifeStyleData={lifeStyleData}
        fetchData={fetchData}
      />
    </View>
  );
};

export default LifeStyle;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
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
    fontSize: s(13),
    color: "#1C57A5",
    fontWeight: 500,
    textAlign: "center",
  },
  gridCardValueLabel: {
    fontSize: s(15),
    color: "#1C57A5",
    fontWeight: 700,
    textAlign: "center",
  },
  iconBody: {
    backgroundColor: "#E2F2FF",
    padding: ms(10),
    borderRadius: s(6),
  },
});

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
