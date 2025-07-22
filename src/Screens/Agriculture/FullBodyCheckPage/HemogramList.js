import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import AntDesign from 'react-native-vector-icons/AntDesign';


const testData = Array(5).fill({
  title: "Completed Hemogram",
  description: "Includes 28 tests",
});

const CollapsibleItem = ({ item }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <AntDesign name={isCollapsed ? "down" : "up"} size={18} />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.content}>
          <Text>Details of the 28 tests go here...</Text>
        </View>
      </Collapsible>
    </View>
  );
};

const HemogramList = () => {
  return (
    <FlatList
      data={testData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <CollapsibleItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "gray",
    marginLeft: 10,
  },
  content: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default HemogramList;
