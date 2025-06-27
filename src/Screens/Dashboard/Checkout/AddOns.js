import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddOns = ({ text, text2 = "" ,handleIshardcoyChecked = () => {},handleDietConsultChecked = () => {},price}) => {
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   handleIshardcoyChecked(checked)
  // },[checked])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setChecked(!checked)}
    >
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.iconRow}>
          <Text style={styles.price}>₹{price}</Text>
          <TouchableOpacity onPress={() => 
           {
            setChecked(!checked)
            handleIshardcoyChecked(!checked)
            handleDietConsultChecked(!checked)
           }
            }>
            <MaterialCommunityIcons
              name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      {text2 && <Text style={styles.subText}>{text2}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 10,
  },
  subText: {
    fontSize: 12.5,
    color:'#8C8C8C'
  },
});

export default AddOns;
