import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartHeader from "../Cart/CartHeader";


export const CardItem = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate("fullbodyinfo")}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>FREEDOM HEALTHY PACKAGE 2024</Text>
          <FontAwesome name="chevron-right" size={16} color="#2372B5" />
        </View>
        <View style={styles.testList}>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>Basophils</Text> - Absolute Count,
            Eosinophils - Absolute Count,
          </Text>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>Lymphocytes</Text> - Absolute Count,
            Monocytes - Absolute Count...
            <Text style={styles.moreTests}> +107 Tests</Text>
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>₹1799</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Second Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>FREEDOM HEALTHY PACKAGE 2024</Text>
          <FontAwesome name="chevron-right" size={16} color="#2372B5" />
        </View>
        <View style={styles.testList}>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>Basophils</Text> - Absolute Count,
            Eosinophils - Absolute Count,
          </Text>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>Lymphocytes</Text> - Absolute Count,
            Monocytes - Absolute Count...
            <Text style={styles.moreTests}> +107 Tests</Text>
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>₹1799</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#140B41",
  },

  HeadTitle: {
    paddingVertical: 10,
    paddingLeft: 14,
    fontSize: 17,
    fontWeight: "bold",
    color: "#140B41",
  },
  testList: {
    marginBottom: 15,
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  testItem: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  linkText: {
    color: "#0A3D91",
    textDecorationLine: "underline",
  },
  moreTests: {
    color: "#0A3D91",
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cartButton: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#140B41",
    borderRadius: 5,
    paddingVertical: 5,
  },
  cartButtonText: {
    color: "#1C57A5",
    fontSize: 14,
    fontWeight: "bold",
  },
});


