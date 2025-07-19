import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomTabHeader, Navbar } from "../Components";
import { useNavigation } from "@react-navigation/native";
import { ms, s, vs } from "react-native-size-matters";
import { API_URI_PHR } from "@env";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { MedicationCardSkeleton } from "../Skeletons";

const Medication = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const [medicineList, setMedicineList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("medicine");

  const tabs = [
    { id: "medicine", label: "Medicine" },
    { id: "test", label: "Test" },
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const [medicineResponse, testResponse] = await Promise.all([
        axios.get(`${API_URI_PHR}/doctor-visits/user/${userId}`),
        axios.get(`${API_URI_PHR}/lab-visits/user/${userId}`),
      ]);

      setMedicineList(medicineResponse.data.data);
      setTestList(testResponse.data.data);
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

  return (
    <View style={styles.container}>
      <Navbar navText={"Medication"} backPress={handleBackPress} />
      <CustomTabHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          [...Array(6)].map((_, index) => (
            <MedicationCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : activeTab === "medicine" ? (
          medicineList.length === 0 ? (
            <Text style={styles.notFoundText}>No Data Found</Text>
          ) : (
            medicineList.map((item, index) => (
              <MedicationCard
                key={index}
                navigation={navigation}
                name={item?.doctorName}
                date={item?.visitDate}
                type="medicine"
                item={item}
              />
            ))
          )
        ) : testList.length === 0 ? (
          <Text style={styles.notFoundText}>No Data Found</Text>
        ) : (
          testList.map((item, index) => (
            <MedicationCard
              key={index}
              navigation={navigation}
              name={item?.technicianName}
              date={item?.visitDate}
              type="test"
              item={item}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const MedicationCard = ({ navigation, name, date, type, item }) => {
  const getStatus = () => {
    if (!date) return "";

    try {
      const today = new Date();
      const visitDate = new Date(date.split("T")[0]);

      const todayStr = today.toISOString().split("T")[0];
      const visitDateStr = visitDate.toISOString().split("T")[0];

      if (type === "medicine") {
        if (visitDateStr === todayStr) return "Current";
        return visitDateStr < todayStr ? "Previous" : "Upcoming";
      } else {
        if (visitDateStr === todayStr) return "Today";

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (visitDateStr === yesterdayStr) return "Yesterday";
        return visitDateStr < todayStr ? "Past" : "Upcoming";
      }
    } catch (e) {
      console.error("Error parsing date:", e);
      return "";
    }
  };

  const status = getStatus();

  const handleViewPress = () => {
    if (type === "medicine") {
      navigation.navigate("MedicationList", {
        id: item.id,
        prescriptionList: item.prescriptionList || [],
      });
    } else {
      navigation.navigate("TestList", {
        id: item.id,
        reportList: item.reportList || [],
      });
    }
  };

  return (
    <View style={styles.cardBody}>
      <View style={styles.cardCol}>
        <Text style={styles.primaryText} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.secondaryText}>
          {status ? `${status} | ${date.split("T")[0]}` : date.split("T")[0]}
        </Text>
      </View>
      <TouchableOpacity onPress={handleViewPress}>
        <Text style={styles.viewText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    alignItems: "flex-start",
    padding: ms(12),
    marginBottom: vs(10),
    flexDirection: "row",
    gap: s(10),
  },
  cardCol: {
    flex: 1,
  },
  primaryText: {
    fontSize: s(14),
    color: "#1C1C1C",
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: s(13),
    color: "#B1A6A6",
    fontWeight: "500",
  },
  viewText: {
    fontSize: s(15),
    color: "#1B970F",
    fontWeight: "500",
    marginRight: s(10),
  },
  notFoundText: {
    fontSize: s(16),
    fontWeight: "500",
    color: "#1C1C1C",
    textAlign: "center",
  },
});

export default Medication;
