import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import Error from "../Error/Error";
import { ms, s } from "react-native-size-matters";
import { vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

export default function DrugDirectoryAtoZ({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drugCategories, setDrugCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [popularDrugs, setPopularDrugs] = useState([]);
  const [currentPageBrands, setCurrentPageBrands] = useState(1);
  const [totalPagesBrands, setTotalPagesBrands] = useState(1);
  const [currentPageCategories, setCurrentPageCategories] = useState(1);
  const [totalPagesCategories, setTotalPagesCategories] = useState(1);

  const browseChars = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    "0-9",
  ];

  const handlePress = (char) => {
    console.log("Pressed:", char);

    const params = {
      searchQuery: char,
      backClick: "DrugDirectoryAtoZ",
    };

    if (char === "0-9") {
      params.isNumber = true;
    }

    navigation.navigate("DrugSearch", params);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DrugDirectoryHome");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const fetchBrands = async (page = 1) => {
    try {
      const brandResponse = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/brand?page=${page}&limit=8`
      );
      setBrands(brandResponse.data.data);
      setTotalPagesBrands(brandResponse.data.totalPages);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const fetchDrugCategories = async (page = 1) => {
    try {
      const drugResponse = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/category?page=${page}&limit=12`
      );
      setDrugCategories(drugResponse.data.data);
      setTotalPagesCategories(drugResponse.data.totalPages);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchBrands();
      await fetchDrugCategories();
      const popularResponse = await axios.get(
        `${API_URL_AUTH}/drug/api/v1/drug-index-search`
      );
      setPopularDrugs(popularResponse.data || []);
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

  const splitDataIntoColumns = (data) => {
    const middleIndex = Math.ceil(data.length / 2);
    return [data.slice(0, middleIndex), data.slice(middleIndex)];
  };

  const [leftColumn, rightColumn] = splitDataIntoColumns(popularDrugs);
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

  const handleSelectedCategory = (selectedItem) => {
    setSelected(selectedItem);
    navigation.navigate("DrugCategory", { category: selectedItem });
  };

  const handlePageChangeBrands = (page) => {
    setCurrentPageBrands(page);
    fetchBrands(page);
  };

  const handlePageChangeCategories = (page) => {
    setCurrentPageCategories(page);
    fetchDrugCategories(page);
  };

  const renderPaginationButtons = (
    totalPages,
    currentPage,
    handlePageChange
  ) => {
    if (totalPages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.paginationButton,
              currentPage === page && styles.activePaginationButton,
            ]}
            onPress={() => handlePageChange(page)}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === page && styles.activePaginationButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* browse header */}
      <View style={{ paddingHorizontal: s(20) }}>
        <View style={styles.headerBody}>
          <Text style={styles.header}>Drugs Directory Search</Text>
        </View>
        <View style={styles.subHeaderBody}>
          <Text style={styles.subHeader}>
            Discover, explore, and learn about drugs and medications from A to
            Z, all in one app.
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchBox}
            onPress={() =>
              navigation.navigate("DrugSearch", {
                searchQuery: "",
                showSearch: true,
                backClick: "DrugDirectoryAtoZ",
              })
            }
          >
            <AntDesign
              name="search1"
              size={s(20)}
              color="#A0A0A0"
              style={styles.searchIcon}
            />
            <Text style={styles.input}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* browse a to z */}
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>Browse A-Z</Text>
        <View style={styles.browseButtonBody}>
          {browseChars.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.browseButton}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.browseButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* browse category */}
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>Browse Drugs by Category</Text>
        {drugCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleSelectedCategory(category)}
          >
            <Text style={styles.bulletPoint}>• {category.name}</Text>
          </TouchableOpacity>
        ))}
        {renderPaginationButtons(
          totalPagesCategories,
          currentPageCategories,
          handlePageChangeCategories
        )}
      </View>

      {/* popular category */}
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>Browse Drugs by Popular Search</Text>
        {popularDrugs.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() =>
              navigation.navigate("DrugSearch", {
                searchQuery: category?.querySearch,
                showSearch: true,
                backClick: "DrugDirectoryAtoZ",
              })
            }
          >
            <Text style={styles.bulletPoint}>• {category.querySearch}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* browse by brand */}
      <View style={styles.browseBody}>
        <Text style={styles.browseText}>Browse Drugs by Brand</Text>
        <View style={styles.gridContainer}>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={styles.brandContainer}
              onPress={() =>
                navigation.navigate("DrugByBrand", { brand: brand })
              }
            >
              <Image
                source={
                  brand?.imageUrl
                    ? { uri: brand?.imageUrl }
                    : require("./images/cipla.png")
                }
                style={styles.brandImage}
              />
              <Text style={styles.brandText}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderPaginationButtons(
          totalPagesBrands,
          currentPageBrands,
          handlePageChangeBrands
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    // padding: 20,
  },
  headerBody: {
    alignItems: "center",
  },
  header: {
    fontSize: s(14),
    fontWeight: "bold",
    marginTop: vs(19),
    marginBottom: vs(9),
  },
  subHeaderBody: {
    alignSelf: "stretch",
  },
  subHeader: {
    textAlign: "justify",
    fontSize: s(12),
    lineHeight: vs(17),
    marginBottom: vs(10),
  },
  searchContainer: {
    marginTop: vs(9),
    marginBottom: vs(25),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BABABA",
    borderRadius: 10,
    paddingHorizontal: s(9),
    marginTop: vs(5),
  },
  searchIcon: {
    marginRight: s(9),
  },
  input: {
    flex: 1,
    color: "#666",
    paddingVertical: vs(8),
    fontSize: s(13),
  },
  browseBody: {
    paddingHorizontal: s(20),
    paddingBottom: vs(14),
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: vs(14),
  },
  browseText: {
    fontWeight: width <= 400 ? 500 : "bold",
    fontSize: s(13),
    marginBottom: vs(8),
    paddingLeft: s(5),
  },
  browseButtonBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: s(3),
  },
  browseButton: {
    backgroundColor: "#eaf4fa",
    paddingVertical: vs(8),
    width: "10%",
    alignItems: "center",
    borderRadius: 4,
  },
  browseButtonText: {
    fontSize: s(11),
    fontWeight: "bold",
  },
  bulletPoint: {
    fontSize: s(12),
    color: "#1C57A5",
    paddingVertical: vs(3),
    paddingLeft: s(5),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  brandContainer: {
    width: "45%",
    alignItems: "center",
    marginVertical: vs(9),
  },
  brandImage: {
    width: ms(50),
    height: ms(50),
    resizeMode: "contain",
    marginBottom: vs(5),
  },
  brandText: {
    textAlign: "center",
    fontSize: s(11),
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: vs(8),
  },
  paginationButton: {
    paddingHorizontal: s(9),
    paddingVertical: vs(4),
    marginHorizontal: s(5),
    backgroundColor: "#eaf4fa",
    borderRadius: 5,
  },
  activePaginationButton: {
    backgroundColor: "#1C57A5",
  },
  paginationButtonText: {
    color: "#1C57A5",
    fontSize: s(13),
  },
  activePaginationButtonText: {
    color: "#fff",
  },
});
