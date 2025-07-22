import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { Icons } from "../../assets/icons/Icons";
import JobCard from "./Components/JobCard";
import JobCardSkeleton from "./Skeletons/JobCardSkeleton";
import { API_URL_AUTH } from "@env";
import axios from "axios";
import { getItem } from "../../Utils/utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileData,
  setUserData,
  setUserId,
} from "../../features/user/userSlice";
import { setJobsData, setSkillsToken } from "../../features/jobs/jobsSlice";
import { ms, s, vs } from "react-native-size-matters";

export default function JobHome({ navigation }) {
  const dispatch = useDispatch();
  const { userId, userData, profileData } = useSelector((state) => state.user);
  const { jobsData, skillsToken } = useSelector((state) => state.jobs);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [create, setCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState(0);

  // Fetch userId on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getItem("userID");
      dispatch(setUserId(storedUserId));
    };

    fetchUserId();
    getSkillToken();
  }, []);

  const getSkillToken = () => {
    const form = new FormData();
    form.append("client_id", "28lg8him0zq2fi2y");
    form.append("client_secret", "P7EbTLqw");
    form.append("grant_type", "client_credentials");
    form.append("scope", "emsi_open");
    axios
      .post(
        "https://auth.emsicloud.com/connect/token",
        new URLSearchParams({
          client_id: "28lg8him0zq2fi2y",
          client_secret: "P7EbTLqw",
          grant_type: "client_credentials",
          scope: "emsi_open",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((result) => {
        dispatch(setSkillsToken(result.data.access_token));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch job data when applicantId or currentPage changes
  const fetchJobData = async (page = 1, applicantId = profileData?.id) => {
    if (create || !applicantId) return;

    setIsJobsLoading(true);
    setIsPaginationLoading(true);
    try {
      const jobResponse = await axios.get(
        `${API_URL_AUTH}/jobs/api/v1/jobs/recommended-jobs?applicantId=${applicantId}&page=${page}`
      );
      dispatch(setJobsData(jobResponse?.data?.jobs || []));
      setTotalPages(jobResponse?.data?.totalPages || 1);
      setRecommendedJobs(jobResponse?.data?.totalJobs || 0);
      console.log("Job data fetched:", jobResponse.data);
    } catch (err) {
      console.log("Error fetching job data:", err);
      setError(err);
    } finally {
      setIsJobsLoading(false);
      setIsPaginationLoading(false);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(
        `${API_URL_AUTH}/auth/user/${userId}`
      );
      dispatch(setUserData(userResponse?.data));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DashboardScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Handle pagination for next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle pagination for previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Fetch applicant data and set applicantId
  useFocusEffect(
    useCallback(() => {
      const fetchApplicantData = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
          const [applicantResponse, userData] = await Promise.all([
            axios.get(`${API_URL_AUTH}/jobs/api/v1/applicant/user/${userId}`),
            fetchUserData(),
          ]);

          if (applicantResponse.data.data.length === 0) {
            setCreate(true);
          } else {
            dispatch(setProfileData(applicantResponse?.data?.data));

            setCreate(false);

            fetchJobData(1, applicantResponse?.data?.data?.id);
          }
        } catch (err) {
          console.log("Error fetching applicant data:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicantData();

      // Cleanup function
      return () => {
        console.log("Screen is unfocused");
      };
    }, [userId])
  );

  // Fetch job data when applicantId or currentPage changes
  useEffect(() => {
    if (profileData?.id && !create) {
      fetchJobData(currentPage);
    }
  }, [profileData?.id, currentPage, create]);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </View>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Card */}
        <LinearGradient
          colors={["#D7F2FD", "#fff", "#fff"]}
          style={styles.profileCard}
        >
          <View style={styles.profileCardContent}>
            <View style={styles.profileHeader}>
              <Image
                source={
                  profileData?.imageUrl
                    ? { uri: profileData.imageUrl }
                    : Icons.profile_icon
                }
                style={styles.profileImage}
              />

              <View style={styles.profileInfo}>
                <Text
                  style={styles.profileName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {userData?.first_name || "Personal"}{" "}
                  {userData?.last_name || "Details"}
                </Text>
                <Text
                  style={styles.profileLocation}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {profileData?.city || "Add Your Details"}
                </Text>
                <Text
                  style={styles.profileRole}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {profileData?.workExperience
                    ? profileData?.workExperience[0]?.jobTitle
                    : ""}
                </Text>
              </View>
              <View style={{ height: "100%" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("JobProfile")}
                >
                  <MaterialCommunityIcons
                    name="square-edit-outline"
                    color={"#1C57A5"}
                    size={s(26)}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.profileDetails}>
              <View style={styles.row}>
                <Image
                  source={Icons.job_experience}
                  style={styles.profileIcon}
                />
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Experience:</Text>{" "}
                  {!create && (
                    <Text style={styles.mediumText}>
                      {profileData?.experienceYears || ""}{" "}
                      {profileData?.experienceYears === 1 ? "Year " : "Years "}
                      Experience
                    </Text>
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <Image source={Icons.job_skills} style={styles.profileIcon} />

                <Text
                  style={[
                    styles.detailText,
                    {
                      paddingRight: s(6),
                    },
                  ]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  <Text style={styles.boldText}>Skills:</Text>{" "}
                  {!create && (
                    <Text style={styles.mediumText}>
                      {profileData?.skills?.length > 0
                        ? profileData.skills
                            .map((skill) => skill.skillName)
                            .join(", ")
                        : ""}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Recommended Jobs Section */}
        <Text style={styles.sectionTitle}>
          Recommended Jobs {recommendedJobs > 0 ? `(${recommendedJobs})` : ""}
        </Text>
        <Text style={styles.sectionSubTitle}>
          Based on your relevant experience
        </Text>
        {isJobsLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </>
        ) : create ? (
          <View style={styles.jobDataTab}>
            <Text style={styles.noDataFoundChip}>
              Complete Profile for Jobs Recommendation
            </Text>
          </View>
        ) : jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard key={job.id} job={job} backNavigation="JobHome" />
          ))
        ) : (
          <View style={styles.jobDataTab}>
            <Text style={styles.noDataFoundChip}>
              No Jobs Found Relevant To Your Skills
            </Text>
          </View>
        )}

        {/* Pagination Buttons */}
        {!create && totalPages > 1 && (
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

      {/* Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          mode="contained"
          style={styles.searchButton}
          onPress={() => navigation.navigate("JobSearchView")}
        >
          <Text style={styles.searchButtonText}>Search and View Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(100),
  },
  profileCard: {
    padding: ms(2),
    borderRadius: s(10),
    marginBottom: vs(16),
    borderWidth: 1,
    borderColor: "#CFCFCF",
    shadowColor: "#838B8E",
    shadowOffset: { width: 0, height: vs(22) },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 10,
  },
  profileCardContent: {
    padding: ms(16),
    backgroundColor: "transparent",
    borderRadius: s(10),
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  profileImage: {
    width: s(72),
    height: s(72),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileInfo: {
    flex: 1,
    marginLeft: s(10),
    display: "flex",
    gap: 3,
  },
  profileName: {
    fontSize: s(16),
    fontWeight: 700,
    color: "#140B41",
    marginBottom: vs(4),
  },
  profileLocation: {
    fontSize: s(14),
    fontWeight: 700,
    color: "#140B41",
  },
  profileRole: {
    fontSize: s(12),
    fontWeight: "thin",
    color: "#3E4F5F",
  },
  profileIcon: {
    height: s(20),
    width: s(20),
  },

  profileDetails: {
    marginTop: vs(8),
    gap: 4,
  },
  noDataFoundChip: {
    color: "#1C57A5",
    fontSize: s(12),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
    marginTop: vs(3),
    paddingRight: s(5),
  },
  detailText: {
    marginLeft: s(5),
    fontSize: s(14),
    paddingRight: s(5),
  },
  boldText: {
    fontWeight: "bold",
    fontSize: s(11),
  },
  mediumText: {
    fontSize: s(11),
  },
  sectionTitle: {
    fontSize: s(14),
    fontWeight: 700,
  },
  sectionSubTitle: {
    fontSize: s(12),
    marginBottom: vs(15),
    color: "#2E2E2E",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: vs(15),
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
  arrowIcon: { marginLeft: s(6), marginRight: s(6) },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: vs(15),
    paddingHorizontal: s(25),
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C57A5",
    paddingVertical: s(11),
    borderRadius: 10,
    marginVertical: vs(8),
  },
  searchButtonText: {
    fontWeight: "bold",
    fontSize: s(12),
    color: "#FFF",
  },
  jobDataTab: {
    backgroundColor: "#cfeaff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: ms(5),
  },
});
