import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { BooktestSearch } from "../../../Utils/api/bookTest";
import { useNavigation } from '@react-navigation/native';



const SearchBarScreens = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const navigation = useNavigation();


  const BooktestSearchApi = async () => {
    const data = {
      "searchInput": debouncedSearchText
    }
    try {
      console.log('BooktestSearchApi data input:', data);
      const response = await BooktestSearch(data);
      console.log('BooktestSearchApi Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        setSearchedData(response.data.data);
      } else {
      }
    } catch (error) {
      console.log('Error from BooktestSearchApi call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
      } else {
      }
    } finally {
      // hideLoader();
    }
  }

  useEffect(() => {
    if (debouncedSearchText != '') {
      BooktestSearchApi()
    } else {
      setSearchedData([])
    }
  }, [debouncedSearchText])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../assets/images/search_icon.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tests, Package"
          onChangeText={setSearchText}
          value={searchText}
          placeholderTextColor="#999"
        />
      </View>

      {searchedData?.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {searchedData?.map((item, index) => (
            <TouchableOpacity key={index} style={styles.resultItem} onPress={
              () => {
                navigation.navigate("fullbodyinfo", { code: item?.code, name: item?.packageName })
                setSearchedData([]);
                setSearchText("");
              }

            }>
              <Text>{item?.packageName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchBarScreens;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    // backgroundColor: "#fff",
  },
  searchContainer: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  resultsContainer: {
    marginTop: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
