import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Error from "../Error/Error";
import { ms, s, vs } from "react-native-size-matters";

export default function DrugByBrand({ navigation, route }) {
  const { brand } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drugList, setDrugList] = useState([]);

  console.log("brand", brand);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DrugDirectoryAtoZ");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/drug/brand/${brand.id}`
      );
      console.log("brand response", response.data);
      setDrugList(response?.data);
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

  const handleDrugPress = (drug) => {
    navigation.navigate("Drugs", {
      drug,
      searchQuery: "",
      backNavigation: "DrugByBrand",
      brand: brand,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>{brand?.name}</Text>
        <View style={styles.column}>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="#1C57A5" />
            </View>
          ) : drugList && drugList.length > 0 ? (
            drugList.map((drug) => (
              <TouchableOpacity
                key={drug.id}
                onPress={() => handleDrugPress(drug)}
                style={{ paddingHorizontal: s(10) }}
              >
                <Text
                  style={styles.bulletPoint}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  • {drug?.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
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

  browseBody: {
    marginTop: vs(20),
    paddingHorizontal: s(20),
    paddingBottom: vs(15),
    marginBottom: vs(15),
  },
  browseText: {
    fontWeight: "bold",
    fontSize: s(13),
    marginBottom: vs(8),
    paddingLeft: s(5),
  },
  bulletPoint: {
    fontSize: s(12),
    color: "#1C57A5",
    paddingVertical: vs(3),
    paddingLeft: s(5),
  },
  column: {
    width: "100%",
  },
  noResultsText: {
    textAlign: "center",
    color: "#A0A0A0",
    marginTop: vs(10),
    fontSize: s(13),
  },
});
