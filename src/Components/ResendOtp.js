import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { color } from "../assets/colors/Colors";
import { ms } from "react-native-size-matters";

export default function ResendOtp(props) {
  useEffect(() => {
    if (props.second < 0) return;
    const interval = setInterval(() => {
      if (props.second != 0) {
        props.setSecond((seconds) => seconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [props.second, props.setSecond]);

  useEffect(() => {
    if (props.second == 0) {
      props.handleTimer();
    }
  }, [props.second]);

  const formatTime = () => {
    const minutes = Math.floor(props.second / 60);
    const remainingSeconds = props.second % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}s`;
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={[styles.timerText, props.testStyle]}>{formatTime()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginStart: 5,
  },
  timerText: {
    fontSize: ms(12),
    color: color.black,
    fontFamily: "medium",
  },
});
