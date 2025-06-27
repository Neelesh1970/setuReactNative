import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

export default function Drugs({ navigation, route }) {
  const {
    drug,
    searchQuery,
    backNavigation,
    brand,
    showSearch,
    backClick,
    isNumber,
  } = route.params || {};

  const [webViewHeight, setWebViewHeight] = useState(0);

  const fetchDrugIndex = async () => {
    try {
      const response = await axios.post(
        `${API_URL_AUTH}/drug/api/v1/drug-index-search`,
        {
          querySearch: drug?.name,
        }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Call API when component mounts
  if (drug?.name) {
    fetchDrugIndex();
  }

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(backNavigation, {
        searchQuery,
        brand,
        showSearch,
        backClick,
        isNumber,
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Function to save recent search
  const saveRecentSearch = async (drug) => {
    try {
      const recentSearches = await AsyncStorage.getItem("recentSearches");
      let searches = recentSearches ? JSON.parse(recentSearches) : [];

      const existingIndex = searches.findIndex(
        (search) => search.id === drug.id
      );
      if (existingIndex !== -1) {
        searches.splice(existingIndex, 1);
      }

      searches.unshift({ id: drug.id, name: drug.name });

      if (searches.length > 5) {
        searches = searches.slice(0, 5);
      }

      await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  useEffect(() => {
    if (drug?.name) {
      saveRecentSearch(drug);
    }
  }, [drug]);

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
      ${drug?.description}
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
            Drug Details
          </Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.header} ellipsizeMode="tail" numberOfLines={1}>
            {drug?.name || "N/A"}
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
