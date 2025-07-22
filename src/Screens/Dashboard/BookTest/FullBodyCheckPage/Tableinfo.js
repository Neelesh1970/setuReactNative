import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";

const TableInfo = () => {
  const tableData = [
    ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
    ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
  ];

  const headerData = ["Discount", "You Pay", "You Save", "Book Now"];

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
              {colIndex === row.length - 1 ? ( // ✅ Last column: Make it a clickable link
                <TouchableOpacity onPress={() => alert("Booking Clicked!")}>
                  <Text style={styles.linkText}>{cell}</Text>
                </TouchableOpacity>
              ) : (
                <Text
                  style={[
                    styles.cellText,
                    colIndex === 0 && styles.discountText, // ✅ Apply styles to "Discount" column
                  ]}
                >
                  {cell}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginBottom: ms(10),
    overflow: "hidden",
    borderColor: "#929292",
    borderWidth: 1,
    borderRadius: ms(6),
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
    // backgroundColor: "#2372B5", // Blue background for the header
    // borderColor: "#2372B5", // Ensure border matches header background
  },
  cellText: {
    color: "#3E4F5F",
    textAlign: "center",
    fontSize: 12,
  },
  headerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#3E4F5F",
  },
  linkText: {
    color: "#175EC2",
    textDecorationLine: "underline",
    fontSize: ms(12),
    textAlign: "center",
  },
  discountText: {
    fontWeight: "bold",
    color: "#3E4F5F",
    fontSize: ms(14),
    textAlign: "center",
    textTransform: "capitalize",
    letterSpacing: 1,
  },
});

export default TableInfo;












// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { ms } from "react-native-size-matters";

// const TableInfo = () => {
//   const tableData = [
//     ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
//     ["72% for One", "Rs. 1799/-", "Rs. 1799/-", "Click to Book"],
//   ];

//   const headerData = ["Discount", "You Pay", "You Save", "Book Now"];

//   return (
//     <View style={styles.tableContainer}>
//       {/* Table Header */}
//       <View style={styles.row}>
//         {headerData.map((header, colIndex) => (
//           <View key={colIndex} style={[styles.cell, styles.headerCell]}>
//             <Text style={styles.headerText}>{header}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Table Body
//       {tableData.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           {row.map((cell, colIndex) => (
//             <View key={colIndex} style={styles.cell}>
//               <Text style={styles.cellText}>{cell}</Text>
//             </View>
//           ))}
//         </View>
//       ))}
//     </View> */}

//     {/* Table Body */}
//     {tableData.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           {row.map((cell, colIndex) => (
//             <View key={colIndex} style={styles.cell}>
//               {colIndex === row.length - 1 ? ( // Check if it's the last column
//                 <TouchableOpacity onPress={() => alert("Booking Clicked!")}>
//                   <Text style={styles.linkText}>{cell}</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <Text style={styles.cellText}>{cell}</Text>
//               )}
//             </View>
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tableContainer: {
//     marginBottom: ms(15),
//     overflow: "hidden",
//     borderColor: "#929292",
//     borderWidth: 1,
//     borderRadius: ms(6),
//   },
//   row: {
//     flexDirection: "row",
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerCell: {
//     //     backgroundColor: "#2372B5", // Blue background for the header
//     //     borderColor: "#2372B5", // Ensure border matches header background
//   },
//   cellText: {
//     color: "#3E4F5F",
//     textAlign: "center",
//     fontSize: 12,
//   },
//   headerText: {
//     textAlign: "center",
//     fontSize: 12,
//     // fontWeight: "bold",
//     color: "#3E4F5F",
//   },
//   linkText: {
//     color: "#175EC2", 
//     textDecorationLine: "underline", 
//     fontSize: ms(12),
//     // width: '100%'
//   }
// });

// export default TableInfo;
