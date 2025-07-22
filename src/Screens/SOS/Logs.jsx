import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AlertCard, SosNavbar, TabHeader, TransactionCard } from "./Components";
import { useNavigation } from "@react-navigation/native";
import { ms, s, vs } from "react-native-size-matters";
import { FlatList, Text } from "react-native-gesture-handler";
import { API_URI_SOS } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
import { HistoryLogSkeleton, TransactionLogSkeleton } from "./Skeletons";

const Logs = () => {
  const { userHealthProfileData } = useSelector(
    (state) => state.userHealthProfile
  );
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("history");
  const [transactionData, setTransactionData] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionError, setTransactionError] = useState(false);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  console.log("userProfileData : ", userHealthProfileData);

  const fetchTransactionData = async () => {
    try {
      setTransactionLoading(true);
      const response = await axios.get(
        `${API_URI_SOS}/transactions/user/${userHealthProfileData[0]?.id}`
      );
      const sortedTransactions =
        response?.data?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ) || [];
      setTransactionData(sortedTransactions);
      setTransactionError(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactionError(true);
    } finally {
      setTransactionLoading(false);
    }
  };

  const debitData = transactionData.filter((item) => item.txnType === "debit");
  const creditData = transactionData.filter(
    (item) => item.txnType === "credit"
  );

  const renderTransactionList = () => {
    if (transactionLoading) {
      return <TransactionLogSkeleton />;
    }

    if (transactionError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load transactions</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchTransactionData}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (creditData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={creditData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => <TransactionCard item={item} />}
        refreshing={transactionLoading}
        onRefresh={fetchTransactionData}
      />
    );
  };

  const renderHistoryList = () => {
    if (transactionLoading) {
      return <HistoryLogSkeleton />;
    }

    if (transactionError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load history</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchTransactionData}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (debitData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={debitData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => <AlertCard item={item} />}
        refreshing={transactionLoading}
        onRefresh={fetchTransactionData}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Logs"
        backPress={() => {
          navigation.goBack();
        }}
        sideText={`Balance: ${userHealthProfileData[0]?.wallet}`}
      />
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "history" ? renderHistoryList() : renderTransactionList()}
    </View>
  );
};

export default Logs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(100),
  },

  tabContent: {
    padding: ms(20),
  },
  contentText: {
    fontSize: s(14),
    color: "#333333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ms(20),
  },
  loadingText: {
    marginTop: vs(10),
    color: "#666",
    fontWeight: 500,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ms(20),
  },
  errorText: {
    color: "#D32F2F",
    marginBottom: vs(10),
  },
  retryButton: {
    backgroundColor: "#3399cc",
    padding: ms(10),
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontWeight: 500,
  },
});
