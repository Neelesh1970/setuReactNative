import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TableInfo = () => {
  const tableData = [
    ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
    ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
  ];

  const headerData = ["Discount", "You Pay", "You Save", "Book Now"]; // Header row data

  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.row}>
        {headerData.map((header, colIndex) => (
          <View key={colIndex} style={[styles.cell, styles.headerCell]}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>

      {/* Table Body */}
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View key={colIndex} style={styles.cell}>
              <Text style={styles.cellText}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginBottom: 15,
    borderRadius: 4, // Rounded corners for the outer edges of the table
    overflow: "hidden", // Ensures that borders do not overflow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow effect
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCell: {
    //     backgroundColor: "#2372B5", // Blue background for the header
    //     borderColor: "#2372B5", // Ensure border matches header background
  },
  cellText: {
    color: "#3E4F5F",
    textAlign: "center",
    fontSize: 12,
  },
  headerText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#3E4F5F", // White text for header
  },
});

export default TableInfo;
