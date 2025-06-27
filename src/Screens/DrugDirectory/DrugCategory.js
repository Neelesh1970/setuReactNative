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
import AntDesign from "react-native-vector-icons/AntDesign";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import Error from "../Error/Error";
import { s, vs } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function DrugCategory({ navigation, route }) {
  const { category } = route.params || {};
  const [selected, setSelected] = useState(null);
  const [drugList, setDrugList] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

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

  const handleDrugCategoryDetail = (selectedDrug) => {
    setSelected(selectedDrug);
    navigation.navigate("DrugCategoryDetail", {
      category: category,
      drug: selectedDrug,
    });
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/drug-category/drug-cat?categoryId=${category.id}&page=${page}&limit=10`
      );
      const drugs = response?.data?.data?.data || [];
      setDrugList(drugs);
      setFilteredDrugs(drugs);
      setCurrentPage(response?.data?.data?.currentPage);
      setTotalPages(response?.data?.data?.totalPages);
      setTotalRecords(response?.data?.data?.totalRecords);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Search filtering logic
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredDrugs(drugList);
    } else {
      const filtered = drugList.filter((drug) =>
        drug?.drug?.name?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDrugs(filtered);
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: s(20) }}>
        <View style={styles.headerBody}>
          <Text style={styles.header}>{category?.name}</Text>
        </View>
        {/* Search Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <AntDesign
              name="search1"
              size={s(20)}
              color="#A0A0A0"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Enter a drug name"
              placeholderTextColor="#666666"
              style={styles.input}
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </View>

      {/* Drug List */}
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>{category?.name} search results</Text>
        <View style={styles.column}>
          {filteredDrugs.length > 0 ? (
            filteredDrugs.map((drug) => (
              <TouchableOpacity
                key={drug.id}
                onPress={() => handleDrugCategoryDetail(drug)}
              >
                <Text
                  style={styles.bulletPoint}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  • {drug?.drug?.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>

        {/* Pagination */}
        {totalPages > 1 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginTop: s(18),
    marginBottom: s(9),
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
    marginTop: vs(6),
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
    fontWeight: width <= 400 ? 500 : "bold",
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: vs(20),
  },
  paginationText: {
    fontSize: s(13),
    color: "#1C57A5",
  },
  noResultsText: {
    textAlign: "center",
    color: "#A0A0A0",
    marginTop: vs(10),
    fontSize: s(13),
  },
});
