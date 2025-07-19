import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { s, vs } from "react-native-size-matters";
import { Navbar, ReportCard } from "./Components";
import { Text } from "react-native-gesture-handler";
import { API_URI_REPORTS } from "@env";
import axios from "axios";
import { ReportScreenSkeleton } from "./Skeletons";

const ReportScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URI_REPORTS}/reports`);
      setReportData(response?.data?.data || []);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const renderItem = ({ item }) => <ReportCard item={item} />;

  return (
    <View style={styles.container}>
      {loading ? (
        <ReportScreenSkeleton />
      ) : (
        <>
          <Navbar navText={"Reports"} functionIconName={"edit"} />
          <FlatList
            data={reportData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.noReports}>No Reports Found</Text>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </>
      )}
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  listContent: {
    paddingHorizontal: s(12),
    paddingVertical: vs(15),
  },
  separator: {
    height: vs(15),
  },
  noReports: {
    fontSize: s(16),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: vs(20),
    color: "#444444",
  },
});
