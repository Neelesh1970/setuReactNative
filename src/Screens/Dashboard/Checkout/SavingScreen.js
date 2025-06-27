import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SavingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yay! You Saved $300 on this booking!</Text>
      {/* If you have an image to display, you can use the Image component */}
      {/* <Image source={require('./path/to/your/image.png')} style={styles.image} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50", // Green color to signify savings
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default SavingsScreen;
