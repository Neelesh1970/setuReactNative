import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Icons } from "../../assets/icons/Icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import JobChip from "./Components/JobChip";
import JobDrawer from "./Components/JobDrawer";
import { API_URL_AUTH } from "@env";
import JobProfileSkeleton from "./Skeletons/JobProfileSkeleton";
import axios from "axios";
import DocumentPicker from "react-native-document-picker";
import { Linking } from "react-native";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../../features/user/userSlice";
import {
  setCreate,
  setModalSection,
  setModalVisible,
  setSkillList,
} from "../../features/jobs/jobsSlice";
import { ms, s, vs } from "react-native-size-matters";

const ProfileSection = ({ onAdd, onEdit, section, setFormData }) => {
  const [expanded, setExpanded] = useState(false);

  const chipsToShow = expanded ? section?.data : section?.data?.slice(0, 4);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.profile_bg}>
          <Image source={section?.icon} style={styles.icon} />
        </View>
      </View>
      <View style={styles.detailsMid}>
        <Text style={styles.title}>{section?.title}</Text>
        <View style={styles.chipContainer}>
          {section?.data.length > 0 ? (
            <>
              {chipsToShow.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFormData(section.apiData?.[index]);
                    onEdit(section, "update");
                  }}
                >
                  <JobChip
                    label={item}
                    icon={() => (
                      <MaterialIcons name="edit" size={s(17)} color="#1C57A5" />
                    )}
                  />
                </TouchableOpacity>
              ))}
              {section?.data.length > 4 && (
                <TouchableOpacity
                  onPress={() => setExpanded(!expanded)}
                  style={styles.viewMoreButton}
                >
                  <Text style={styles.viewMoreText}>
                    {expanded ? "- View Less" : "+ View More"}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>{section?.noData}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={onAdd} style={styles.actionRight}>
        <MaterialIcons name="add" size={s(30)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default function JobProfile({ navigation }) {
  const dispatch = useDispatch();
  const { userId, userData, profileData } = useSelector((state) => state.user);
  const { skillsToken, modalSection, create, skillList } = useSelector(
    (state) => state.jobs
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("Add");
  const [formData, setFormData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [skillLoading, setSkillLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL_AUTH}/jobs/api/v1/applicant/user/${userId}`
      );
      const userResponse = await axios.get(
        `${API_URL_AUTH}/auth/user/${userId}`
      );

      if (response.data.data.length === 0) {
        dispatch(setCreate(true));
      }

      dispatch(setProfileData(response.data?.data));
      dispatch(setUserData(userResponse?.data));
      setLoading(false);
      setDataLoaded(true);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  const fetchSkillData = async () => {
    setSkillLoading(true);
    try {
      let url = `https://emsiservices.com/skills/versions/latest/skills?limit=0`;

      if (skillSearch) {
        url = `https://emsiservices.com/skills/versions/latest/skills?limit=7&q=${encodeURIComponent(
          skillSearch
        )}`;
      }
      const skillResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${skillsToken}`,
        },
      });

      dispatch(setSkillList(skillResponse?.data?.data));
      setSkillLoading(false);
    } catch (err) {
      // setError(err);
      console.log(err);
      dispatch(setSkillList([]));
      setSkillLoading(false);
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

  const openDrawer = (section, type = "add") => {
    dispatch(setModalVisible(true));

    if (type === "add") {
      setFormData({});
      setMode("Add");
    } else if (type === "update") {
      setMode("Edit");
    }

    dispatch(setModalSection({ ...section, type }));
  };

  const closeDrawer = () => {
    dispatch(setModalVisible(false));
  };

  const handleDocumentSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });

      if (res && res.length > 0) {
        setFileUploadLoading(true);
        const file = res[0];
        const { name, type, uri } = file;

        const getUrl = `${API_URL_AUTH}/jobs/api/v1/get-upload-url?fileName=${name}&fileType=${type}`;
        const response = await axios.get(getUrl);
        const { uploadURL, downloadURL } = response.data;

        const fileData = await RNFS.readFile(uri, "base64");

        const binaryData = Buffer.from(fileData, "base64");

        const uploadResponse = await axios.put(uploadURL, binaryData, {
          headers: {
            "Content-Type": type,
          },
        });

        if (uploadResponse.status === 200) {
          console.log("File uploaded successfully!", downloadURL);

          const downloadBody = {
            resumeUrl: downloadURL,
          };

          const downloadResponse = await axios.patch(
            `${API_URL_AUTH}/jobs/api/v1/applicant/${profileData?.id}`,
            downloadBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (downloadResponse.status === 200) {
            console.log("Resume URL updated successfully!", downloadURL);
            fetchData();
          } else {
            console.error("Failed to update resume URL", downloadResponse);
          }
          setFileUploadLoading(false);
        } else {
          console.error("File upload failed", uploadResponse);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("Error picking or uploading document:", err);
      }
      setFileUploadLoading(false);
    }
  };

  const profileApiData = {
    imageUrl: profileData?.imageUrl,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    experienceYears: profileData?.experienceYears,
    experienceMonths: profileData?.experienceMonths,
    phone_number: userData?.phone_number,
    city: profileData?.city,
  };

  const profile = {
    field: "profile",
    title: "Personal Details",
    icon: Icons.job_profile,
    apiData: profileApiData,
    noData: "Add your personal details",
    subTitle: "your personal details",
    fields: [
      { field: "imageUrl", label: "Profile", type: "camera" },
      { field: "first_name", label: "First Name", type: "text" },
      { field: "last_name", label: "Last Name", type: "text" },
      { field: "email", label: "Email", type: "email" },
      {
        field: "experienceYears",
        label: "Year",
        type: "text",
        note: "Add your experience in years",
        keyboardType: "numeric",
      },
      {
        field: "experienceMonths",
        label: "Month",
        type: "month",
        note: "Add your experience in months",
        keyboardType: "numeric",
      },
      {
        field: "phone_number",
        label: "Mobile Number",
        type: "text",
        note: "Add 10 digit number",
        keyboardType: "numeric",
      },
      {
        field: "city",
        label: "Current City",
        type: "text",
        note: "This helps us match you to relevant jobs",
      },
    ],
  };

  const profileSections = [
    {
      field: "workExperience",
      title: "Work Experience",
      icon: Icons.job_experience,
      apiData: profileData?.workExperience,
      data: profileData?.workExperience
        ? profileData.workExperience.map((item) => item.companyName)
        : [],
      noData: "Add your work experience",
      subTitle: "your work experience",
      fields: [
        { field: "jobTitle", label: "Job Title", type: "text" },
        { field: "companyName", label: "Company Name", type: "text" },
        { field: "joiningDate", label: "Joining Date", type: "date" },
      ],
    },
    {
      field: "education",
      title: "Education",
      icon: Icons.job_educations,
      apiData: profileData?.education,
      data: profileData?.education
        ? profileData.education.map((item) => item.degreeName)
        : [],
      noData: "Add your education details",
      subTitle: "your education details",
      fields: [
        { field: "degreeName", label: "Education Level", type: "text" },
        { field: "institution", label: "School/College", type: "text" },
        { field: "university", label: "University/Board", type: "text" },
        {
          field: "passingOutYear",
          label: "Passing Out Year",
          type: "text",
          keyboardType: "numeric",
        },
        {
          field: "percentage",
          label: "Marks",
          type: "text",
          note: "Enter % out of 100 or CGPA out of 10",
          keyboardType: "numeric",
        },
      ],
    },
    {
      field: "skills",
      title: "Skills",
      icon: Icons.job_skills,
      apiData: profileData?.skills,
      data: profileData?.skills
        ? profileData.skills.map((item) => item.skillName)
        : [],
      noData: "Add your relevant skills",
      subTitle: "your relevant skills",
      fields: [
        { field: "skillName", label: "Skill Name", type: "searchDropdown" },
        {
          field: "skillsYear",
          label: "Years of Experience",
          type: "number",
          keyboardType: "numeric",
        },
      ],
    },
    {
      field: "languagesKnown",
      title: "Languages",
      icon: Icons.job_language,
      data: profileData?.languagesKnown
        ? profileData.languagesKnown.map((item) => item.language)
        : [],

      apiData: profileData?.languagesKnown,
      noData: "Add multiple languages",
      subTitle: "your language",
      fields: [
        { field: "language", label: "Language", type: "text" },
        {
          field: "proficiency",
          label: "Proficiency",
          type: "dropdown",
          options: ["beginner", "intermediate", "advanced", "fluent", "native"],
        },
      ],
    },
  ];

  useEffect(() => {
    fetchData();
  }, [create]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchSkillData();
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [skillSearch]);

  useEffect(() => {
    if (create && dataLoaded) {
      setFormData(profileApiData);
      openDrawer(profile, "update");
    }
  }, [dataLoaded]);

  if (loading) {
    return (
      <>
        {Array.from({ length: 7 }).map((_, index) => (
          <JobProfileSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <Error />;
  }

  const handleUpdate = async (field, fieldData, type) => {
    setLoading(true);
    setError(null);

    let body;
    let userBody;

    const deepTrim = (data) => {
      if (typeof data === "string") {
        return data.trim();
      } else if (Array.isArray(data)) {
        return data.map(deepTrim);
      } else if (typeof data === "object" && data !== null) {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, deepTrim(value)])
        );
      }
      return data;
    };

    if (field === "profile") {
      body = {
        imageUrl: fieldData?.imageUrl,
        experienceYears: fieldData?.experienceYears,
        experienceMonths: fieldData?.experienceMonths,
        city: fieldData?.city.trim(),
      };
      userBody = {
        firstName: fieldData?.first_name.trim(),
        lastName: fieldData?.last_name.trim(),
        email: fieldData?.email.trim(),
        phoneNumber: fieldData?.phone_number,
      };
    } else {
      const cleanedFieldData = deepTrim(fieldData);

      body = {
        [field]: {
          [type]: Array.isArray(cleanedFieldData)
            ? cleanedFieldData
            : [cleanedFieldData],
        },
      };
    }

    try {
      const response = await axios.patch(
        `${API_URL_AUTH}/jobs/api/v1/applicant/${profileData?.id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (field === "profile") {
        const userResponse = await axios.put(
          `${API_URL_AUTH}/auth/update/${userId}`,
          userBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      setLoading(false);
      dispatch(setCreate(false));
      fetchData();
      closeDrawer();
    } catch (err) {
      console.error(
        "Error during PATCH request:",
        err.response?.data || err.message
      );
      setError(err);
      setLoading(false);
      closeDrawer();
    }
  };

  const handleCreate = async (formData) => {
    const requestBody = {
      userId: userId,
      imageUrl: formData?.imageUrl || null,
      experienceYears: formData?.experienceYears,
      experienceMonths: formData?.experienceMonths,
      city: formData?.city.trim(),
      skills: [],
      languagesKnown: [],
      resumeUrl: "",
      education: [],
      workExperience: [],
    };

    const userRequestBody = {
      firstName: formData?.first_name.trim(),
      lastName: formData?.last_name.trim(),
      email: formData?.email.trim(),
      phoneNumber: formData?.phone_number,
    };
    setLoading(true);

    try {
      const response = await fetch(`${API_URL_AUTH}/jobs/api/v1/applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const userResponse = await axios.put(
        `${API_URL_AUTH}/auth/update/${userId}`,
        userRequestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("User Created", responseData);
      setLoading(false);
      closeDrawer();
      dispatch(setCreate(false));
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      closeDrawer();
    }
  };

  const handleDeleteResume = async () => {
    const requestBody = {
      resumeUrl: "",
    };

    try {
      const response = await axios.patch(
        `${API_URL_AUTH}/jobs/api/v1/applicant/${profileData?.id}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Resume deleted successfully!");
        fetchData(); // Refresh the data after deletion
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const confirmDeleteResume = () => {
    Alert.alert(
      "Delete Resume",
      "Are you sure you want to delete your resume?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeleteResume,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Personal Details Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.headerLeft}>
            <View style={styles.profile_bg}>
              <Image source={Icons.job_profile} style={styles.icon} />
            </View>
          </View>
          <View style={styles.detailsMid}>
            <View>
              <Text style={styles.title}>Personal Details</Text>
              <Text style={styles.userName}>
                {userData?.first_name} {userData?.last_name}
              </Text>
              <Text style={styles.address}>{profileData?.city}</Text>
            </View>
          </View>
          <View style={styles.actionRight}>
            <TouchableOpacity
              onPress={() => {
                setFormData(profile?.apiData);
                openDrawer(profile, "update");
              }}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                color={"#222"}
                size={s(24)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
        {create ? (
          <Text
            style={{
              paddingLeft: s(10),
              fontWeight: "bold",
              fontSize: s(14),
            }}
          >
            Please Complete Personal Details
          </Text>
        ) : (
          <>
            {profileSections.map((section, index) => (
              <React.Fragment key={index}>
                <ProfileSection
                  section={section}
                  onAdd={() => openDrawer(section, "add")}
                  onEdit={() => openDrawer(section, "update")}
                  setFormData={setFormData}
                />
                <View style={styles.separator} />
              </React.Fragment>
            ))}
          </>
        )}
        {!create && (
          <>
            <View style={styles.sectionContainer}>
              <View style={styles.headerLeft}>
                <View style={styles.profile_bg}>
                  <Image source={Icons.job_resume} style={styles.icon} />
                </View>
              </View>
              <View style={styles.detailsMid}>
                <View>
                  <Text style={styles.title}>Resume</Text>

                  {profileData?.resumeUrl && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => Linking.openURL(profileData?.resumeUrl)}
                      >
                        <Ionicons
                          name="cloud-download-outline"
                          size={s(20)}
                          color="#1C57A5"
                        />
                        <Text style={styles.buttonText}>
                          View Uploaded Resume
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={confirmDeleteResume}>
                        <MaterialIcons
                          name="delete-outline"
                          size={s(24)}
                          color="#ff6666"
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleDocumentSelection}
                    disabled={fileUploadLoading}
                  >
                    {fileUploadLoading ? (
                      <View style={{ flexDirection: "row", gap: s(8) }}>
                        <ActivityIndicator size="small" color="#1C57A5" />
                        <Text style={styles.uploadButtonText}>
                          Uploading...
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.uploadButtonText}>
                        {profileData?.resumeUrl ? "Change " : "Upload "}
                        Resume
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </>
        )}
      </ScrollView>

      {/* Bottom Drawer Modal */}
      <JobDrawer
        onClose={closeDrawer}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
        skillLoading={skillLoading}
        skillSearch={skillSearch}
        setSkillSearch={setSkillSearch}
        fetchData={fetchData}
        onSave={() => {
          handleUpdate(
            modalSection?.field,
            formData,
            modalSection?.type || "add"
          );
          closeDrawer();
        }}
        onDelete={() => {
          handleUpdate(modalSection?.field, formData, "remove");
        }}
        userId={userId}
        mode={mode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  sectionContainer: {
    paddingHorizontal: ms(20),
    paddingTop: vs(10),
    borderRadius: 10,
    marginVertical: vs(4),
    flexDirection: "row",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profile_bg: {
    padding: s(10),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#BABABA",
  },
  detailsMid: {
    flex: 1,
    paddingTop: vs(2),
    marginLeft: s(10),
  },
  icon: {
    width: s(22),
    height: s(22),
  },
  separator: {
    height: 1.5,
    backgroundColor: "#979797A1",
    marginVertical: vs(9),
  },
  title: {
    fontSize: s(15),
    fontWeight: "bold",
  },
  userName: {
    color: "#2E2E2E",
    fontSize: s(12),
  },
  address: {
    fontSize: s(11),
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: vs(8),
  },
  uploadButton: {
    backgroundColor: "#fff",
    paddingVertical: vs(10),
    paddingHorizontal: s(18),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: vs(8),
    borderWidth: 1,
    borderColor: "#CFCFCF",
    alignSelf: "flex-start",
  },
  uploadButtonText: {
    color: "#1C57A5",
    fontSize: s(13),
    fontWeight: "bold",
  },
  noDataText: {
    color: "#2E2E2E",
    fontSize: s(12),
  },

  downloadButton: {
    padding: ms(10),
    borderRadius: 5,
    alignItems: "center",
    marginTop: vs(8),
    flexDirection: "row",
    gap: s(5),
  },
  buttonText: {
    color: "#1C57A5",
    fontWeight: "bold",
    fontSize: s(12),
  },

  viewMoreText: {
    paddingVertical: vs(8),
    fontSize: s(11),
    paddingHorizontal: s(5),
  },
});
