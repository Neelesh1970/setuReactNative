import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../assets/icons/Icons";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { API_URL_AUTH } from "@env";
import DoctorCard from "./Components/DoctorCard";
import DoctorCardSkeleton from "./Skeletons/DoctorCardSkeleton";
import FilterDrawer from "./Components/FilterDrawer";
import FilterBody from "./Components/FilterBody";
import Error from "../Error/Error";
import { ms, s, vs } from "react-native-size-matters";

export default function Doctors({ navigation, route }) {
  const { specialityId, symptomId, openSearch } = route.params || {};
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorData, setDoctorData] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [gender, setGender] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    specialityIds: specialityId ? [specialityId] : [],
    genderIds: [],
    langIds: [],
    symptomsId: symptomId ? [symptomId] : [],
    staffId: [],
  });
  const [searchText, setSearchText] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (openSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const fetchDoctors = async (
    filters = {},
    page = 1,
    limit = 10,
    searchText = ""
  ) => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const urlParams = {
        date: filters.date || today,
        specialityIds: filters.specialityIds?.join(",") || " ",
        genderIds: filters.genderIds?.join(",") || " ",
        langIds: filters.langIds?.join(",") || " ",
        symptomsId: filters.symptomsId?.join(",") || " ",
        staffId: filters.staffId?.join(",") || " ",
        page,
        limit,
      };

      const url = `${API_URL_AUTH}/telemedicine/api/v1/doctors/filter/${urlParams.date}/${urlParams.specialityIds}/${urlParams.genderIds}/${urlParams.langIds}/${urlParams.symptomsId}/${urlParams.staffId}/${urlParams.page}/${urlParams.limit}`;
      const body = { staffName: searchText };

      const response = await axios.post(url, body);
      setDoctorData(response.data.data.list);
      setTotalRecords(response.data.data.totalRecords);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  const debouncedFetchDoctors = debounce(fetchDoctors, 500);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("FindDoctors");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    debouncedFetchDoctors(selectedFilters, 1, limit, text);
  };

  const fetchFilterOptions = async () => {
    try {
      const specialityResponse = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/doctors-specialty`
      );
      const genderResponse = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/gender`
      );
      const languageResponse = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/languages`
      );
      const symptomsResponse = await axios.get(
        `${API_URL_AUTH}/telemedicine/api/v1/symptoms`
      );

      const specialitiesList = specialityResponse.data.data.map((item) => ({
        id: item.specialityId,
        name: item.specialityName,
      }));
      const genderList = genderResponse.data.data.map((item) => ({
        id: item.genderId,
        name: item.genderName,
      }));
      const languageList = languageResponse.data.data.map((item) => ({
        id: item.languageId,
        name: item.languageName,
      }));

      const symptomsList = symptomsResponse.data.data.content.map((item) => ({
        id: item.symptomId,
        name: item.symptomName,
      }));

      setSpecialities(specialitiesList);
      setGender(genderList);
      setLanguages(languageList);
      setSymptoms(symptomsList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    setPage(1);
    fetchDoctors(filters, 1, limit, searchText);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchDoctors(selectedFilters, newPage, limit, searchText);
  };

  useEffect(() => {
    fetchDoctors(selectedFilters, page, limit, searchText);
    fetchFilterOptions();
  }, [selectedFilters, page, limit, searchText]);

  if (error) {
    return <Error />;
  }

  const openDrawer = () => {
    setModalVisible(true);
  };

  const closeDrawer = () => {
    setModalVisible(false);
  };

  const location = ["Pune", "Mumbai", "Nagpur"];

  const filter = [
    { name: "Specialities", field: "specialityIds", data: specialities },
    { name: "Symptoms", field: "symptomsId", data: symptoms },
    { name: "Languages", field: "langIds", data: languages },
    { name: "Gender", field: "genderIds", data: gender },
  ];

  const totalPages = Math.ceil(totalRecords / limit);

  const clearFilters = () => {
    setSelectedFilters({
      specialityIds: [],
      genderIds: [],
      langIds: [],
      symptomsId: [],
      staffId: [],
    });
    setPage(1);
    setSearchText("");
    fetchDoctors({}, 1, limit, "");
  };

  return (
    <View style={styles.doctorsBody}>
      <View style={styles.doctorsHeader}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={"Pune-411016"}
            style={styles.picker}
            dropdownIconColor={"#2372B5"}
          >
            {location.map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Doctors"
            placeholderTextColor="#666666"
            style={styles.input}
            ref={inputRef}
            returnKeyType="search"
            value={searchText}
            onChangeText={handleSearchChange}
          />
          <AntDesign
            name="search1"
            size={s(20)}
            color="#A0A0A0"
            style={styles.searchIcon}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={openDrawer}>
        <Text style={styles.filterText}>Filter</Text>
        <MaterialIcons name="filter-list" size={s(20)} color="#2372B5" />
      </TouchableOpacity>

      <ScrollView
        style={styles.doctorListBody}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))
        ) : doctorData?.length > 0 ? (
          doctorData.map((doctor) => (
            <DoctorCard
              key={doctor?.staff_id}
              doctor={doctor}
              navigation={navigation}
              specialityId={specialityId}
              symptomId={symptomId}
            />
          ))
        ) : (
          <View style={styles.noDoctorsContainer}>
            <Text style={styles.noDoctorsText}>No Doctors Found</Text>
            <TouchableOpacity
              style={styles.showAllButton}
              onPress={clearFilters}
            >
              <Text style={styles.showAllButtonText}>Show All Doctors</Text>
            </TouchableOpacity>
          </View>
        )}

        {totalPages > 1 && (
          <View style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <TouchableOpacity
                  key={pageNumber}
                  style={[
                    styles.pageButton,
                    page === pageNumber && styles.activePageButton,
                  ]}
                  onPress={() => handlePageChange(pageNumber)}
                >
                  <Text
                    style={[
                      styles.pageText,
                      page === pageNumber && styles.activePageText,
                    ]}
                  >
                    {pageNumber}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </ScrollView>

      <FilterDrawer visible={modalVisible} onClose={closeDrawer}>
        <FilterBody
          onClose={closeDrawer}
          filter={filter}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          totalRecords={totalRecords}
        />
      </FilterDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  doctorsBody: {
    flex: 1,
    backgroundColor: "#fff",
    padding: ms(20),
  },
  doctorsHeader: {
    borderWidth: 1,
    borderColor: "#2372B5",
    borderRadius: 8,
    flexDirection: "row",
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#2372B5",
    width: "30%",
  },
  picker: {
    flex: 1,
    color: "#2372B5",
    marginRight: s(-10),
    marginVertical: vs(-5),
  },
  pickerItem: {
    fontSize: s(10),
  },
  searchBox: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: vs(9),
  },
  searchIcon: {},
  input: {
    color: "#000",
    flex: 1,
    fontSize: s(10),
  },
  filterButton: {
    marginTop: vs(18),
    paddingHorizontal: s(8),
    paddingVertical: vs(4),
    borderWidth: 1,
    borderColor: "#2372B5",
    backgroundColor: "#eff7ff",
    borderRadius: 8,
    flexDirection: "row",
    gap: s(8),
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  filterText: {
    color: "#2372B5",
    fontWeight: 700,
    fontSize: s(12),
  },
  doctorListBody: {
    marginTop: vs(27),
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(9),
  },
  pageButton: {
    marginHorizontal: vs(5),
    padding: ms(10),
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: "#2372B5",
  },
  pageText: {
    color: "#000",
    fontSize: s(10),
  },
  activePageText: {
    color: "#FFF",
  },
  noDoctorsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(20),
  },
  noDoctorsText: {
    fontSize: s(12),
    color: "#666",
    marginBottom: vs(9),
  },
  showAllButton: {
    backgroundColor: "#2372B5",
    paddingHorizontal: s(18),
    paddingVertical: s(9),
    borderRadius: 8,
  },
  showAllButtonText: {
    color: "#fff",
    fontSize: s(10),
    fontWeight: "bold",
  },
});
