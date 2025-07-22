import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import Error from "../Error/Error";
import { WebView } from "react-native-webview";
import { s, vs } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function DrugCategoryDetail({ navigation, route }) {
  const { category, drug } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [webViewHeight, setWebViewHeight] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/drug-category/${drug.id}`
      );
      console.log("response", response.data);
      setDescription(response?.data?.description);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DrugCategory", { category: category });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1C57A5" />
      </View>
    );
  }

  if (error) {
    return <Error />;
  }

  const htmlContent = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #333;
          line-height: 1.6;
          padding: 10px;
        }
        strong {
          font-weight: bold;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
      </style>
    </head>
    <body>
      ${description}
     <script>
        document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click
        document.addEventListener("selectstart", (event) => event.preventDefault()); // Prevent text selection
        document.addEventListener("copy", (event) => event.preventDefault()); // Disable copy
        document.addEventListener("cut", (event) => event.preventDefault()); // Disable cut
        document.addEventListener("paste", (event) => event.preventDefault()); // Disable paste
        window.onload = function() {
          window.ReactNativeWebView.postMessage(document.body.scrollHeight);
        };
      </script>
    </body>
  </html>
`;

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: s(18) }}>
        <View style={styles.headerBody}>
          <Text style={styles.header} ellipsizeMode="tail" numberOfLines={1}>
            {category?.name}
          </Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.header} ellipsizeMode="tail" numberOfLines={1}>
            {drug?.drug?.name}
          </Text>
        </View>
        <View>
          <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={{
              width: width - s(40),
              height: webViewHeight || vs(500),
            }}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight);"
            onMessage={(event) => {
              setWebViewHeight(Number(event.nativeEvent.data));
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  headerBody: {
    alignItems: "center",
  },
  header: {
    fontSize: s(14),
    fontWeight: "bold",
    marginTop: vs(15),
    marginBottom: vs(8),
  },
});
