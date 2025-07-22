import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import JobCard from "./Components/JobCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-paper";
import JobCardSkeleton from "./Skeletons/JobCardSkeleton";
import axios from "axios";
import { API_URL_AUTH } from "@env";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { setJobsData } from "../../features/jobs/jobsSlice";
import { ms, s, vs } from "react-native-size-matters";

export default function JobSearchView({ navigation }) {
  const dispatch = useDispatch();
  const { jobsData } = useSelector((state) => state.jobs);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  const getUrl = (page = 1) => {
    const trimmedSearchQuery = searchQuery.trim();
    const trimmedLocation = location.trim();

    if (trimmedSearchQuery && trimmedLocation) {
      return `jobs/search?location=${trimmedLocation}&search=${trimmedSearchQuery}&page=${page}`;
    } else if (trimmedSearchQuery) {
      return `jobs/search?search=${trimmedSearchQuery}&page=${page}`;
    } else if (trimmedLocation) {
      return `jobs/search?location=${trimmedLocation}&page=${page}`;
    } else {
      return `jobs/search?page=${page}`;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    const delaySearch = setTimeout(() => {
      fetchData(1);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, location]);

  // Fetch data function
  const fetchData = async (page) => {
    setLoading(true);
    setIsPaginationLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/jobs/api/v1/${getUrl(page)}`
      );

      dispatch(setJobsData(response.data?.jobs || []));
      setTotalPages(response.data?.totalPages || 1);
      setLoading(false);
      setIsPaginationLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      setIsPaginationLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("JobHome");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  if (error) {
    return <Error />;
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      fetchData(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchData(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input Section */}
      <View style={styles.inputContainerBody}>
        <View style={[styles.inputContainer, styles.inputContainer1]}>
          <AntDesign
            name="search1"
            size={s(20)}
            color="#A0A0A0"
            style={styles.icon}
          />
          <TextInput
            placeholder="Job Title, Keywords or Company"
            style={styles.input}
            mode="flat"
            underlineColor="transparent"
            selectionColor="#1976D2"
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={[styles.inputContainer, styles.inputContainer2]}>
          <Ionicons
            name="location-outline"
            size={s(20)}
            color="#A0A0A0"
            style={styles.icon}
          />
          <TextInput
            placeholder="Search City or State"
            style={styles.input}
            mode="flat"
            underlineColor="transparent"
            selectionColor="#1976D2"
            placeholderTextColor="#A0A0A0"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text style={styles.sectionTitle}>Job Feed</Text>
        {/* <Text style={styles.sectionSubTitle}>
          Jobs based on your search activity
        </Text> */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Job Feed Section */}
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </>
        ) : jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard key={job.id} job={job} backNavigation="JobSearchView" />
          ))
        ) : (
          <Text>No Jobs Found</Text>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <View style={styles.paginationContainer}>
            {/* Previous Button */}
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.disabledButton,
              ]}
              disabled={currentPage === 1 || isPaginationLoading}
              onPress={handlePreviousPage}
            >
              {isPaginationLoading && currentPage > 1 ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <AntDesign
                    name="arrowleft"
                    size={s(20)}
                    color="#FFF"
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.paginationButtonText}>Previous</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage === totalPages && styles.disabledButton,
              ]}
              disabled={currentPage === totalPages || isPaginationLoading}
              onPress={handleNextPage}
            >
              {isPaginationLoading && currentPage < totalPages ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Text style={styles.paginationButtonText}>Next</Text>
                  <AntDesign
                    name="arrowright"
                    size={s(20)}
                    color="#FFF"
                    style={styles.arrowIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  inputContainerBody: {
    paddingHorizontal: s(20),
    paddingTop: vs(20),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: s(10),
  },
  inputContainer1: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderBottomWidth: 0,
  },
  inputContainer2: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: vs(20),
  },
  icon: {
    marginRight: s(8),
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: s(12),
  },
  scrollContainer: {
    paddingHorizontal: s(20),
    paddingTop: vs(10),
  },
  sectionTitle: {
    fontSize: s(14),
    fontWeight: "bold",
    marginVertical: vs(5),
  },
  sectionSubTitle: {
    fontSize: s(12),
    marginBottom: vs(15),
    color: "#2E2E2E",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: vs(20),
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C57A5",
    paddingVertical: vs(10),
    paddingHorizontal: s(10),
    borderRadius: 10,
  },
  disabledButton: { backgroundColor: "#A0A0A0" },
  paginationButtonText: {
    fontWeight: "bold",
    fontSize: s(11),
    color: "#FFF",
  },
  arrowIcon: { marginLeft: 8, marginRight: 8 },
});
