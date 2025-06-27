import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  BackHandler,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Icons } from "../../assets/icons/Icons";
import JobChip from "./Components/JobChip";
import { useFetch } from "../../Utils/CustomHooks";
import JobDetailsSkeleton from "./Skeletons/JobDetailsSkeleton";
import Clipboard from "@react-native-clipboard/clipboard";
import Error from "../Error/Error";
import { ms, s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

const JobDetailsRow = ({ image, icon, title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View style={styles.jobDetailsRow}>
      <Image source={image} style={styles.iconClass} />
      <View style={styles.jobDetailsColumn}>
        <Text style={styles.jobDetailsHeader}>{title || "NA"}</Text>
        <View style={styles.chipContainer}>
          {items.slice(0, isExpanded ? items.length : 3).map((item, index) => (
            <JobChip key={index} label={item} icon={icon} />
          ))}
        </View>
        {items.length > 3 && (
          <TouchableOpacity
            onPress={handleToggle}
            style={styles.showMoreButton}
          >
            <AntDesign
              name={isExpanded ? "minus" : "plus"}
              size={s(16)}
              color="#676869"
            />
            <Text style={styles.showMoreText}>
              {isExpanded ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function JobDetails({ navigation, route }) {
  const { jobId, backNavigation } = route.params;
  const { data, loading, error } = useFetch(`jobs/${jobId}`);
  const [copiedField, setCopiedField] = useState(null);

  const jobDetailData = data ? data.data : [];

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(backNavigation);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  if (loading) {
    return (
      <>
        <JobDetailsSkeleton />
      </>
    );
  }

  if (error) {
    return <Error />;
  }

  const copyToClipboard = (text, field) => {
    Clipboard.setString(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.jobTitleContainer}>
          <View style={styles.jobHeaderBody}>
            <Text
              style={styles.jobTitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {jobDetailData?.title}
            </Text>
            <Text
              style={styles.companyName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {jobDetailData?.company?.name || "NA"}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                if (jobDetailData?.sourceUrl) {
                  Linking.openURL(jobDetailData.sourceUrl[0]);
                } else {
                  alert("No URL available");
                }
              }}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Contact Section */}

        <View style={styles.contactRow}>
          <Image source={Icons.job_mail} style={styles.contactIcon} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
            {jobDetailData?.company?.email
              ? jobDetailData?.company?.email
              : "NA"}
          </Text>

          {jobDetailData?.company?.email && (
            <TouchableOpacity
              onPress={() =>
                copyToClipboard(jobDetailData?.company?.email, "email")
              }
            >
              {copiedField === "email" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="copy" color={"#888"} size={s(17)} />
                  <Text style={styles.copiedText}>Copied!</Text>
                </View>
              ) : (
                <Ionicons name="copy-outline" color={"#888"} size={s(17)} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.contactRow}>
          <Image source={Icons.job_call} style={styles.contactIcon} />
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>
            {jobDetailData?.company?.contactNumber
              ? jobDetailData?.company?.contactNumber
              : "NA"}
          </Text>
          {jobDetailData?.company?.contactNumber && (
            <TouchableOpacity
              onPress={() =>
                copyToClipboard(jobDetailData?.company?.contactNumber, "phone")
              }
            >
              {copiedField === "phone" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="copy" color={"#888"} size={s(17)} />
                  <Text style={styles.copiedText}>Copied!</Text>
                </View>
              ) : (
                <Ionicons name="copy-outline" color={"#888"} size={s(17)} />
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.separator} />

        {/* Profile Insight Section */}

        <View style={styles.jobDetailsContainer}>
          <View>
            <Text style={styles.jobTitle}>Profile Insights</Text>
            <Text style={styles.companyName}>
              Here's how skills and education align with your role
            </Text>
          </View>
          <JobDetailsRow
            image={Icons.job_skills}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Skills"
            items={jobDetailData?.skills || []}
          />
          <JobDetailsRow
            image={Icons.job_educations}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Education"
            items={jobDetailData?.educationType || ["Graduation"]}
          />
        </View>

        <View style={styles.separator} />

        {/* Job Details Section */}
        <View style={styles.jobDetailsContainer}>
          <View>
            <Text style={styles.jobTitle}>Job Details</Text>
            <Text style={styles.companyName}>
              Here's how job qualifications align with your role
            </Text>
          </View>
          <JobDetailsRow
            image={Icons.job_payment}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Pay"
            items={[`upto ₹${jobDetailData?.maxSalary} / year`]}
          />
          <JobDetailsRow
            image={Icons.job_experience}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Job Type"
            items={[jobDetailData?.jobType]}
          />

          <JobDetailsRow
            image={Icons.job_experience}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Shift & Schedule"
            items={[jobDetailData?.shift]}
          />
          <JobDetailsRow
            image={Icons.job_geo}
            icon={() => (
              <MaterialIcons name="done" size={s(17)} color="#1C57A5" />
            )}
            title="Location"
            items={jobDetailData?.location || []}
          />
        </View>
        <View style={styles.separator} />

        {/* Job Description Section */}
        <View style={styles.jobDetailsContainer}>
          <View>
            <Text style={styles.jobTitle}>Job Description</Text>
          </View>
          <View style={styles.jobDetailsRow}>
            <Text style={styles.jobText}>
              {jobDetailData?.description || "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  content: {},
  jobTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ms(20),
  },
  jobHeaderBody: {
    maxWidth: width <= 400 ? "60%" : width > 401 && width < 412 ? "70%" : "80%",
  },
  jobTitle: {
    fontSize: s(15),
    fontWeight: "bold",
  },
  companyName: {
    fontSize: s(12),
    fontWeight: "bold",
    color: "#140B41",
    marginTop: vs(3),
  },
  applyButton: {
    backgroundColor: "#1C57A5",
    paddingVertical: vs(7),
    paddingHorizontal: s(20),
    borderRadius: 30,
    alignSelf: "flex-end",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(12),
  },
  separator: {
    height: 1.5,
    backgroundColor: "#979797A1",
    marginVertical: vs(8),
  },
  copiedText: {
    fontSize: s(10),
    fontWeight: width <= 400 ? 500 : "bold",
    color: "#888",
    marginLeft: s(5),
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(8),
    paddingHorizontal: s(20),
    marginBottom: vs(3),
  },
  contactIcon: {
    height: ms(19),
    width: ms(19),
  },
  label: {
    fontSize: s(12),
    fontWeight: "bold",
    marginLeft: 8,
    color: "#140B41",
  },
  value: {
    fontSize: s(12),
    color: "#3E4F5F",
    marginLeft: s(4),
    marginRight: s(7),
  },
  jobDetailsContainer: {
    padding: ms(20),
  },
  jobDetailsRow: {
    marginTop: vs(13),
    flexDirection: "row",
    gap: vs(13),
  },
  iconClass: {
    height: ms(24),
    width: ms(24),
  },
  jobDetailsColumn: {
    flex: 1,
  },
  jobDetailsHeader: {
    fontWeight: "bold",
    fontSize: s(15),
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: vs(7),
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(7),
  },
  showMoreText: {
    marginLeft: s(5),
    fontSize: s(11),
    fontWeight: "bold",
    color: "#676869",
  },
  jobText: {
    color: "#3E4F5F",
    fontSize: s(13),
  },
  jobDescription: {
    marginTop: vs(13),
  },
});
