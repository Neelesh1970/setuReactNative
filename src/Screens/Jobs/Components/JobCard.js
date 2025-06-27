import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Chip, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { ms, s, vs } from "react-native-size-matters";

const JobCard = ({ job, backNavigation }) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.jobCard} mode="contained">
      <Text style={styles.jobTitle}>{job?.title}</Text>
      <Text style={styles.companyName} numberOfLines={2} ellipsizeMode="tail">
        {job?.company?.name || "NA"}
      </Text>

      {/* Salary Chip */}
      <View style={styles.salaryChipContainer}>
        <Chip
          style={[styles.chip, styles.salaryChip]}
          textStyle={styles.salaryText}
        >
          ₹{job?.minSalary} - ₹{job?.maxSalary} / year
        </Chip>
      </View>

      {/* Tags */}
      <View style={styles.tags}>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          {job?.jobType}
        </Chip>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          {job?.shift}
        </Chip>
      </View>

      {/* View Details Button */}
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() =>
          navigation.navigate("JobDetails", {
            jobId: job?.id,
            backNavigation: backNavigation,
          })
        }
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
        <MaterialCommunityIcons
          name="chevron-double-right"
          size={26}
          color="#1C57A5"
        />
      </TouchableOpacity>
    </Card>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  jobCard: {
    padding: ms(20),
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: vs(20),
    shadowColor: "transparent",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#BABABA",
  },
  jobTitle: {
    fontSize: s(13),
    fontWeight: "bold",
    marginBottom: 4,
    color: "#140B41",
  },
  companyName: {
    fontSize: s(12),
    color: "#140B41",
    marginBottom: vs(10),
  },
  salaryChipContainer: {
    marginBottom: vs(8),
    alignSelf: "flex-start",
  },
  salaryChip: {
    backgroundColor: "#E2F2FF",
    borderRadius: 25,
  },
  salaryText: {
    color: "#1C57A5",
    fontWeight: "bold",
    fontSize: s(11),
  },
  tags: {
    flexDirection: "row",
    marginBottom: vs(10),
  },
  chip: {
    marginRight: s(8),
    backgroundColor: "#E2F2FF",
    borderRadius: 25,
  },
  chipText: {
    color: "#1C57A5",
    fontWeight: "bold",
    fontSize: s(11),
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: vs(8),
  },
  viewDetailsText: {
    fontSize: s(13),
    color: "#1C57A5",
    fontWeight: "bold",
    marginRight: s(4),
  },
  boldText: {
    fontWeight: "bold",
  },
});
