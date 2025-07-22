import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { ms } from "react-native-size-matters";
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
        <Text style={styles.title}>
          {item?.packagename
            ? item.packagename
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")
            : ''}
        </Text>
        <Text style={styles.description}>( Includes {item?.child.length} tests )</Text>
        <AntDesign name={isCollapsed ? "down" : "up"} size={18} style={{marginRight: ms(10)}}/>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.content}>
          {
            item?.child?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={styles.bulletPoint}
                ><Text style={styles.bulletPointicon}>{"• "}</Text>{item}</Text>
              )
            })
          }
        </View>
      </Collapsible>
    </View>
  );
};

const HemogramList = ({ bodyInfo }) => {
  console.log("bodyInfo", bodyInfo);
  return (
    <FlatList
      data={bodyInfo?.packages_list}
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
    borderWidth: 1,
    borderColor: '#A5A5A5',
    // paddingHorizontal: ms(10),
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
    width: "50%",
    color: '#000000',
    textAlign: "left",
    marginLeft: 10,
  },
  description: {
    color: "#3E4F5F",
    marginLeft: 10,
    fontSize: ms(14),
    fontWeight: "bold",
    opacity: 0.7
  },
  content: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  bulletPoint: {
    fontSize: ms(15),
    color: "#000",
  },
  bulletPointicon: {
    fontSize: ms(18),
  }

});

export default HemogramList;
