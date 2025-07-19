import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Navbar, ReportCard } from "../Components";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { API_URI_PHR } from "@env";
import Error from "../../Error/Error";
import { ReportScreenSkeleton } from "../Skeletons";
import { ms, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../../assets/colors/Colors";

const TestReport = () => {
  const navigation = useNavigation();
  const [reportData, setReportData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    setloading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const response = await axios.get(`${API_URI_PHR}/reports/user/${userId}`);

      setReportData(response.data.data || []);

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: color.bottomViewColor,
          alignItems: "center",
          gap: 100,
        }}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Navbar navText={"View Report"} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ReportScreenSkeleton />
        ) : reportData.length === 0 ? (
          <Text style={styles.notFoundText}>No Test Report Yet</Text>
        ) : (
          <>
            {reportData.map((item, index) => (
              <ReportCard key={index} item={item} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default TestReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
});
