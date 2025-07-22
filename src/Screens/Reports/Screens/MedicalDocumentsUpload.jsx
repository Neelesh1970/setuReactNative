import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  Linking,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { MedicalDocumentUploadModal, Navbar } from "../Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URI_PHR } from "@env";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { formatDateTime } from "../../SOS/Services/helperFunction";
import { MedicalDocumentsUploadSkeleton } from "../Skeletons";
import RNFetchBlob from "rn-fetch-blob";

const { width } = Dimensions.get("window");

const MedicalDocumentsUpload = () => {
  const navigation = useNavigation();
  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState(null);
  const translateX = useRef(new Animated.Value(width)).current;

  const typeEnumMap = {
    Allergy: "allergy",
    "CT Scan": "ctScan",
    Immunization: "immunization",
    "Lab Report": "labReport",
    Medication: "medication",
    MRI: "mri",
    Sonography: "sonography",
    "Stress Test": "stressTest",
    "X-Ray": "xRay",
    Others: "others",
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddPress = () => {
    setShowModal(true);
  };

  const toggleFilterDrawer = () => {
    if (showFilterDrawer) {
      closeDrawer();
    } else {
      setShowFilterDrawer(true);
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const closeDrawer = async () => {
    await new Promise((resolve) => {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(resolve);
    });

    setShowFilterDrawer(false);
  };

  const applyFilter = async () => {
    try {
      setLoading(true);
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const endpoint = selectedFilter
        ? `${API_URI_PHR}/medical-documents/user/${userId}?type=${typeEnumMap[selectedFilter]}`
        : `${API_URI_PHR}/medical-documents/user/${userId}`;

      const response = await axios.get(endpoint);

      await closeDrawer();

      setUploadedFileList(response.data.data);
      setAppliedFilter(selectedFilter);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = async () => {
    await closeDrawer();

    setSelectedFilter(null);
    setAppliedFilter(null);
    await fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const response = await axios.get(
        `${API_URI_PHR}/medical-documents/user/${userId}`
      );
      setUploadedFileList(response.data.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showFilterDrawer) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterDrawer]);

  const FilterDrawer = () => (
    <Animated.View
      style={[styles.filterDrawer, { transform: [{ translateX }] }]}
    >
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filter Documents</Text>
        <TouchableOpacity onPress={closeDrawer}>
          <Ionicons name="close" size={24} color="#1C57A5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterOptions}>
        {Object.keys(typeEnumMap).map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.filterOption}
            onPress={() => handleFilterSelect(type)}
          >
            <Ionicons
              name={
                selectedFilter === type ? "radio-button-on" : "radio-button-off"
              }
              size={20}
              color="#1C57A5"
            />
            <Text style={styles.filterOptionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.filterActions}>
        <CustomButton
          title="Clear"
          onPress={clearFilter}
          type="secondary"
          style={styles.filterButton}
        />
        <CustomButton
          title="Apply"
          onPress={applyFilter}
          style={styles.filterButton}
        />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Navbar
        navText={"Medical Documents Upload"}
        functionIconName={"add-circle-outline"}
        backPress={handleBackPress}
        functionPress={handleAddPress}
      />
      {!loading && (
        <View style={styles.filterRow}>
          <View style={styles.chipRow}>
            {appliedFilter && ( // Only show chip for applied filter
              <ChipBody value={appliedFilter} onRemove={clearFilter} />
            )}
          </View>
          <TouchableOpacity
            style={styles.filterBtnCol}
            onPress={toggleFilterDrawer}
          >
            <Ionicons name="funnel-outline" size={s(22)} color="#1C57A5" />
            <Text style={styles.chipText}>Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <MedicalDocumentsUploadSkeleton />
        ) : uploadedFileList.length === 0 ? (
          <Text style={styles.notFoundText}>No Documents Added Yet</Text>
        ) : (
          <>
            {uploadedFileList.map((item, index) => (
              <DocumentUploadCard
                key={index}
                item={item}
                navigation={navigation}
              />
            ))}
          </>
        )}
      </ScrollView>

      <MedicalDocumentUploadModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />

      {showFilterDrawer && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeDrawer}
          activeOpacity={1}
        />
      )}
      <FilterDrawer />
    </View>
  );
};

const CustomButton = ({ title, onPress, type = "primary", style }) => (
  <TouchableOpacity
    style={[
      styles.button,
      type === "primary" ? styles.primaryButton : styles.secondaryButton,
      style,
    ]}
    onPress={onPress}
  >
    <Text
      style={
        type === "primary"
          ? styles.primaryButtonText
          : styles.secondaryButtonText
      }
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const DocumentUploadCard = ({ item }) => {
  const { date } = formatDateTime(item.createdAt);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const formatCamelCase = (str = "") => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (s) => s.toUpperCase());
  };

  const isPdf = (url) => {
    return url?.toLowerCase().endsWith(".pdf");
  };

  const isImage = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    return imageExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
  };

  const handleViewDocument = async () => {
    try {
      const url = item.documentUrl;

      if (isImage(url)) {
        setImageViewerVisible(true);
      } else {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          if (isPdf(url)) {
            const filePath = `${
              RNFetchBlob.fs.dirs.CacheDir
            }/temp_${Date.now()}.pdf`;

            const res = await RNFetchBlob.config({
              fileCache: true,
              path: filePath,
            }).fetch("GET", url);

            const fileSupported = await Linking.canOpenURL(
              `file://${res.path()}`
            );

            if (fileSupported) {
              await Linking.openURL(`file://${res.path()}`);
            } else {
              Alert.alert("Cannot Open File", "No PDF viewer app installed", [
                {
                  text: "Download Only",
                  onPress: () => handleDownloadDocument(),
                },
                { text: "OK" },
              ]);
            }
          } else {
            Alert.alert(
              "Cannot Open File",
              "No app available to view this document type",
              [
                {
                  text: "Download Only",
                  onPress: () => handleDownloadDocument(),
                },
                { text: "OK" },
              ]
            );
          }
        }
      }
    } catch (error) {
      console.error("Error viewing document:", error);
      Alert.alert("Error", "Failed to open document", [
        {
          text: "Try Downloading",
          onPress: () => handleDownloadDocument(),
        },
        { text: "OK" },
      ]);
    }
  };

  const handleDownloadDocument = async () => {
    try {
      const url = item.documentUrl;
      const fileExt = url.split(".").pop().toLowerCase();
      const fileName = `${item.documentName.replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.${fileExt}`;

      const downloadsPath = RNFetchBlob.fs.dirs.DownloadDir;
      const filePath = `${downloadsPath}/${fileName}`;

      const configOptions = Platform.select({
        ios: {
          fileCache: false,
          path: filePath,
          appendExt: fileExt,
        },
        android: {
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: filePath,
            description: `Downloading ${item.documentName}`,
          },
        },
      });

      const res = await RNFetchBlob.config(configOptions).fetch("GET", url);

      if (Platform.OS === "ios") {
        try {
          await Linking.openURL(`file://${res.path()}`);
        } catch (e) {
          Alert.alert("Download Complete", `File saved to ${filePath}`);
        }
      } else {
        Alert.alert("Success", `File downloaded to Downloads folder`);
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download file", [
        {
          text: "Open in Browser",
          onPress: () => Linking.openURL(item.documentUrl),
        },
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.documentUploadCard}>
      <View style={styles.documentUploadCardHeader}>
        <Text style={styles.primaryText} numberOfLines={1} ellipsizeMode="tail">
          Document Name: {item?.documentName}
        </Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleViewDocument}>
            <Ionicons name="eye" size={24} color="#1C57A5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownloadDocument}>
            <Ionicons name="download-outline" size={24} color="#1C57A5" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.documentUploadCardDetails}>
        <TextCol
          label="Document Category"
          value={formatCamelCase(item?.type)}
        />
        <TextCol label="Uploaded On" value={date} />
      </View>

      {/* Image Viewer Modal */}
      <Modal
        visible={imageViewerVisible}
        transparent={true}
        onRequestClose={() => setImageViewerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setImageViewerVisible(false)}>
          <View style={styles.imageViewerOverlay}>
            <Image
              source={{ uri: item.documentUrl }}
              style={styles.imageViewerImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const TextCol = ({ label, value }) => {
  return (
    <View style={styles.textCol}>
      <Text style={styles.secondaryText}>{label}</Text>
      <Text style={styles.tertiaryText}>{value}</Text>
    </View>
  );
};

const ChipBody = ({ value, onRemove }) => {
  return (
    <TouchableOpacity style={styles.chipBody} onPress={onRemove}>
      <Text style={styles.chipText}>{value}</Text>
      <Ionicons name="close-outline" size={24} color="#1C57A5" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    padding: ms(16),
    paddingBottom: vs(50),
  },
  documentUploadCard: {
    borderWidth: 1,
    borderColor: "#1C57A5",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: vs(10),
  },
  documentUploadCardHeader: {
    borderBottomWidth: 1,
    borderColor: "#1C57A5",
    padding: ms(10),
    backgroundColor: "#EFF6FC",
    flexDirection: "row",
    gap: s(10),
    alignItems: "center",
  },
  documentUploadCardDetails: {
    padding: ms(10),
    gap: vs(8),
  },
  primaryText: {
    fontSize: s(12),
    fontWeight: "600",
    color: "#1C57A5",
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    gap: s(10),
  },
  textCol: {
    flex: 1,
  },
  secondaryText: {
    fontSize: s(12),
    fontWeight: "600",
    color: "#1C1C1C",
  },
  tertiaryText: {
    fontSize: s(12),
    fontWeight: "400",
    color: "#1C1C1C",
  },
  filterRow: {
    flexDirection: "row",
    gap: s(10),
    paddingHorizontal: ms(16),
    paddingTop: vs(8),
    alignItems: "center",
  },
  chipRow: {
    flex: 1,
    flexDirection: "row",
  },
  chipBody: {
    flexDirection: "row",
    gap: s(5),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1C57A5",
    alignSelf: "flex-start",
    paddingLeft: s(10),
    paddingRight: s(5),
    paddingVertical: s(5),
    borderRadius: s(20),
  },
  chipText: {
    color: "#1C57A5",
    fontSize: s(12),
    fontWeight: "500",
  },
  filterBtnCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(5),
  },
  filterDrawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "white",
    zIndex: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ms(16),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  filterTitle: {
    fontSize: s(16),
    fontWeight: "600",
    color: "#1C57A5",
  },
  filterOptions: {
    flex: 1,
    padding: ms(16),
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(12),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  filterOptionText: {
    marginLeft: s(10),
    fontSize: s(14),
    color: "#1C1C1C",
  },
  filterActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: ms(16),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  filterButton: {
    flex: 1,
    marginHorizontal: s(5),
  },
  button: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: s(8),
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#1C57A5",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#1C57A5",
  },
  primaryButtonText: {
    color: "white",
    fontSize: s(14),
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#1C57A5",
    fontSize: s(14),
    fontWeight: "600",
  },
  notFoundText: {
    textAlign: "center",
    marginTop: vs(20),
    color: "#6B6B6B",
  },
  imageViewerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageViewerImage: {
    width: "100%",
    height: "80%",
  },
});

export default MedicalDocumentsUpload;
