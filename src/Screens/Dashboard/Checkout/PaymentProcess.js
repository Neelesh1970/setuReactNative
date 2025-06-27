// import React, { useEffect, useState } from "react";
// import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const PaymentProcess = () => {
//   const navigation = useNavigation();
//   const [isProcessing, setIsProcessing] = useState(true);

//   useEffect(() => {
//     // Simulate booking confirmation delay
//     setTimeout(() => {
//       setIsProcessing(false);
//       navigation.navigate("OrderSuccess"); // Navigate after success
//     }, 3000); // 3 seconds delay
//   }, []);

//   return (
//     <View style={styles.container}>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   successText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//   },
// });

// export default PaymentProcess;
