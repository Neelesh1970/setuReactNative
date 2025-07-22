import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";

const RatingBar = ({ label, rating, colorRating }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: ms(40) }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.barContainer}>
        <Progress.Bar
          progress={rating}
          style={styles.bar}
          height={ms(10)}
          animated={false}
          width={null}
          color={colorRating}
          unfilledColor={color.rating_grey}
          borderWidth={0}
        />
        <Text style={styles.percentage}>{Math.round(rating * 100)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: ms(15),
    alignItems: "center",
  },
  label: {
    fontFamily: "regular",
    color: "black",
    fontSize: ms(11),
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingStart: ms(10),
  },
  bar: {
    height: ms(10),
    flex: 1,
    marginEnd: ms(10),
    marginStart: ms(10),
    borderRadius: ms(2),
  },
  percentage: {
    fontFamily: "medium",
    color: "grey",
    fontSize: ms(11),
    textAlign: "center",
  },
});

export default RatingBar;
