import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import Error from "../Error/Error";
import axios from "axios";
import { API_URL_AUTH } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ms, s, vs } from "react-native-size-matters";

export default function DrugSearch({ navigation, route }) {
  const { searchQuery, showSearch, backClick, isNumber } = route.params || "";
  const [search, setSearch] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drugData, setDrugData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const searches = await AsyncStorage.getItem("recentSearches");
        if (searches) {
          setRecentSearches(JSON.parse(searches));
        }
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      }
    };

    fetchRecentSearches();
  }, []);

  const fetchDrugById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/drug/${id}`
      );
      const drug = response.data;
      navigation.navigate("Drugs", {
        drug,
        searchQuery: drug.name,
        backNavigation: "DrugSearch",
        showSearch: showSearch,
        backClick: backClick,
        isNumber: isNumber,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showSearch]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(backClick);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    console.log("search", search);
    const delayDebounceFn = setTimeout(() => {
      if (search && search.trim() !== "") {
        setHasSearched(true);
        fetchData();
      } else {
        setDrugData([]);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  console.log("search", search);

  const fetchData = async () => {
    setLoading(true);
    try {
      const trimmedSearch = search.trim();
      console.log("isNumber::", isNumber);
      let url = `${API_URL_AUTH}/drug/api/v1/drug/search?page=${currentPage}&limit=10`;
      console.log("url::", url);
      if (!isNumber) {
        url += `&search=${trimmedSearch}`;
      } else {
        url += `&isNumber=true`;
      }

      const response = await axios.get(url);
      console.log("response", response);
      setDrugData(response?.data?.drugs);
      setCurrentPage(response?.currentPage);
      setTotalPages(response?.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (error) {
    return <Error />;
  }

  const handleDrugPress = (drug) => {
    navigation.navigate("Drugs", {
      drug,
      searchQuery: search,
      backNavigation: "DrugSearch",
      showSearch: showSearch,
      backClick: backClick,
      isNumber: isNumber,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <AntDesign
              name="search1"
              size={s(20)}
              color="#A0A0A0"
              style={styles.searchIcon}
            />
            <TextInput
              ref={inputRef}
              placeholder="Search"
              placeholderTextColor="#666666"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
      )}

      {showSearch && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.browseText}>Recent Searches</Text>
          <View style={styles.recentSearchBox}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => fetchDrugById(search.id)}
              >
                <Text style={styles.recentSearchItem}>{search.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <View style={[styles.browseBody, !showSearch && { marginTop: 20 }]}>
        <Text style={styles.browseText}>
          Search Result {!showSearch && `for ${searchQuery}`}{" "}
        </Text>
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
          ) : drugData && drugData.length > 0 ? (
            drugData.map((drug) => (
              <TouchableOpacity
                key={drug.id}
                onPress={() => handleDrugPress(drug)}
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
            hasSearched && (
              <Text style={styles.noResultsText}>No results found</Text>
            )
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
    paddingHorizontal: s(20),
  },

  searchContainer: {
    marginTop: vs(10),
    marginBottom: vs(25),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 10,
    paddingHorizontal: s(9),
    marginTop: vs(9),
  },
  searchIcon: {
    marginRight: s(9),
  },
  input: {
    flex: 1,
    color: "#666",
    paddingVertical: s(8),
    fontSize: s(13),
  },
  browseBody: {
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
  recentSearchesContainer: {
    marginBottom: vs(18),
    paddingHorizontal: s(15),
  },
  recentSearchBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: s(10),
  },

  recentSearchItem: {
    fontSize: s(12),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "flex-start",
    color: "#444",
    borderRadius: 5,
    paddingVertical: vs(5),
    paddingHorizontal: s(8),
  },
});
