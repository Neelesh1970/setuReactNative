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
import { ms } from "react-native-size-matters";


export const SimilarPackages = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate("fullbodyinfo")}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>FREEDOM HEALTHY PACKAGE 2024</Text>
          <FontAwesome name="chevron-circle-right" size={23} color="#134cf9" />
        </View>
        <View style={styles.testList}>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>-Basophils</Text> - Absolute Count,
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
          <FontAwesome name="chevron-circle-right" size={23} color="#134cf9" />
        </View>
        <View style={styles.testList}>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>-Basophils</Text> - Absolute Count,
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
    borderRadius: ms(10),
    padding: ms(10),
    // margin: ms(10),
    marginBottom: ms(20),
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ms(10),
    padding: ms(4),
  },
  cardTitle: {
    fontSize: ms(16),
    fontWeight: "bold",
    color: "#140B41",
    fontFamily: 'Roboto'
  },

  HeadTitle: {
    paddingVertical: ms(10),
    paddingLeft: ms(14),
    fontSize: ms(17),
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
    color: "#3E4F5F",
    marginBottom: 3,
  },
  linkText: {

    // color: "#0A3D91",
    textDecorationLine: "underline",
  },
  moreTests: {
    color: "#2373B0",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#140B41",
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


