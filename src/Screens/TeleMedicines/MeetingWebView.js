import React, { useEffect } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

const MeetingWebView = ({ navigation, route }) => {
  const { meetingLink } = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("MyAppointment");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: meetingLink }}
        style={styles.webview}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MeetingWebView;
