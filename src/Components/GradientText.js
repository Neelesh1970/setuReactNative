import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { color } from "../assets/colors/Colors";
import { ScaledSheet, ms } from "react-native-size-matters";
import MaskedView from "@react-native-masked-view/masked-view";

export default function GradientText({
  text,
  scale,
  height = ms(50),
  textSize = ms(20),
}) {
  const styles = dynamic;
  return (
    <MaskedView
      maskElement={
        <View style={[styles.maskView, { height: height }]}>
          <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={[color.colorPrimary, color.colorSecondary]}
        style={[styles.gradient, { height: height }]}
      />
    </MaskedView>
  );
  //   return (
  //     <MaskedView
  //       maskElement={
  //         <View style={styles.maskView}>
  //           <Text style={styles.text}>{text}</Text>
  //         </View>
  //       }
  //     >
  //       <LinearGradient
  //         colors={["#4c669f", "#3b5998", "#192f6a"]}
  //         start={{ x: 0, y: 0 }}
  //         end={{ x: 1, y: 1 }}
  //       />
  //     </MaskedView>
  //   );
}
const dynamic = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  maskView: {
    backgroundColor: "transparent",
    height: ms(50),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: ms(20),
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    height: ms(50),
  },
});
