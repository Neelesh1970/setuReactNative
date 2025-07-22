import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./Components";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ms, s, vs } from "react-native-size-matters";
import { Icons } from "../../assets/icons/Icons";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import ViewShot from "react-native-view-shot";
import { captureRef } from "react-native-view-shot";

const { width, height } = Dimensions.get("window");

const ViewReportScreen = ({ route }) => {
  const [hideDownloadIcon, setHideDownloadIcon] = useState(false);

  const reportBodyRef = useRef();

  const { report } = route.params;
  const navigation = useNavigation();
  const [pdfStates, setPdfStates] = useState({});
  const { title, mediaURLs, content } = report;
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({
    total: 0,
    completed: 0,
    currentFile: "",
  });
  const [cachedPdfUris, setCachedPdfUris] = useState({});
  const [showDownloadAll, setShowDownloadAll] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cachePdfFile = async (url, index) => {
    try {
      // Only cache if we haven't already
      if (cachedPdfUris[index]) return;

      const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/temp_pdf_${index}.pdf`;

      // Download the file
      const res = await RNFetchBlob.config({
        fileCache: true,
        path: filePath,
        trusty: true, // Bypass SSL validation for download
      }).fetch("GET", url);

      // Store the local file path
      setCachedPdfUris((prev) => ({
        ...prev,
        [index]: res.path(),
      }));

      return res.path();
    } catch (error) {
      console.error(`Error caching PDF ${index}:`, error);
      return url; // Fallback to original URL
    }
  };

  useEffect(() => {
    const initialStates = {};
    const cacheAllPdfs = async () => {
      for (let index = 0; index < mediaURLs?.length; index++) {
        const url = mediaURLs[index];
        if (isPdf(url)) {
          initialStates[index] = { loading: true, error: false };
          await cachePdfFile(url, index);
        }
      }
      setPdfStates(initialStates);
    };

    cacheAllPdfs();
  }, [mediaURLs]);

  const downloadReportAsImage = async () => {
    try {
      setHideDownloadIcon(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const uri = await captureRef(reportBodyRef, {
        format: "jpg",
        quality: 0.9,
      });

      if (Platform.OS === "android") {
        // For Android 10+ (API 29+), we don't need WRITE_EXTERNAL_STORAGE for Downloads
        if (Platform.Version < 29) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to storage to save files",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            throw new Error("Storage permission denied");
          }
        }
      }

      // Generate file path
      const fileName = `Report_${new Date().getTime()}.jpg`;
      const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;

      // Save the file
      await RNFetchBlob.fs.cp(uri, filePath);

      // For Android, add to downloads
      if (Platform.OS === "android") {
        RNFetchBlob.android.addCompleteDownload({
          title: fileName,
          description: "Report image downloaded",
          mime: "image/jpeg",
          path: filePath,
          showNotification: true,
        });
      }

      Alert.alert("Success", `Report saved to Downloads folder`);
    } catch (error) {
      console.error("Error saving report:", error);
      Alert.alert(
        "Error",
        "Failed to save report. Please check app permissions in settings.",
        [
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } finally {
      setHideDownloadIcon(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const downloadFile = async (url) => {
    try {
      setDownloadLoading(true);
      const { config, fs } = RNFetchBlob;
      const date = new Date();
      const fileExt = url.split(".").pop().toLowerCase();

      let filename = "";
      if (fileExt === "pdf") {
        filename = `document_${date.getTime()}.pdf`;
      } else if (["jpg", "jpeg", "png"].includes(fileExt)) {
        filename = `image_${date.getTime()}.${fileExt}`;
      } else {
        filename = `file_${date.getTime()}.${fileExt}`;
      }

      const downloadsPath = fs.dirs.DownloadDir;
      const filePath = `${downloadsPath}/${filename}`;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: "Downloading file",
        },

        ios: {
          fileCache: true,
          path: filePath,
        },
      };

      // For SSL issues, add trusty option
      const res = await config({
        ...options,
        trusty: true, // This handles SSL certificate issues
      }).fetch("GET", url);

      if (Platform.OS === "ios") {
        RNFetchBlob.ios.previewDocument(res.path());
      } else {
        Alert.alert("Success", `File downloaded to ${filePath}`);
      }
      setDownloadLoading(false);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Error",
        "Failed to download file. You can try opening it directly.",
        [
          {
            text: "Open in Browser",
            onPress: () => Linking.openURL(url),
          },
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      setDownloadLoading(false);
    }
  };

  const isPdf = (url) => {
    return url?.toLowerCase().endsWith(".pdf");
  };

  const isImage = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    return imageExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
  };

  const onPdfLoadComplete = (index) => (numberOfPages, filePath) => {
    setPdfStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], loading: false, error: false },
    }));
  };

  const onPdfError = (index) => (error) => {
    console.log(`PDF error for document ${index}:`, error);
    // First try the original URL if we were using cached version
    if (cachedPdfUris[index]) {
      setPdfStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          loading: false,
          error: true,
          retryWithOriginal: true,
        },
      }));
    } else {
      setPdfStates((prev) => ({
        ...prev,
        [index]: { ...prev[index], loading: false, error: true },
      }));
    }
  };

  const downloadALLFile = async () => {
    try {
      // Calculate total files (ViewShot + all media URLs)
      const totalFiles = 1 + (mediaURLs?.length || 0);
      setDownloadProgress({
        total: totalFiles,
        completed: 0,
        currentFile: "Starting download...",
      });
      setDownloadLoading(true);

      // 1. First download the ViewShot
      setDownloadProgress((prev) => ({
        ...prev,
        currentFile: "Saving report snapshot...",
      }));

      const viewShotUri = await captureRef(reportBodyRef, {
        format: "jpg",
        quality: 0.9,
      });

      const viewShotFileName = `Report_${new Date().getTime()}.jpg`;
      const viewShotPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${viewShotFileName}`;

      await RNFetchBlob.fs.cp(viewShotUri, viewShotPath);

      if (Platform.OS === "android") {
        RNFetchBlob.android.addCompleteDownload({
          title: viewShotFileName,
          description: "Report image downloaded",
          mime: "image/jpeg",
          path: viewShotPath,
          showNotification: false,
        });
      }

      setDownloadProgress((prev) => ({
        ...prev,
        completed: prev.completed + 1,
        currentFile: "Report snapshot saved",
      }));

      // 2. Download all media files
      if (mediaURLs?.length > 0) {
        for (let i = 0; i < mediaURLs.length; i++) {
          const url = mediaURLs[i];
          setDownloadProgress((prev) => ({
            ...prev,
            currentFile: `Downloading file ${i + 1} of ${mediaURLs.length}...`,
          }));

          await downloadSingleFile(url, i);

          setDownloadProgress((prev) => ({
            ...prev,
            completed: prev.completed + 1,
          }));
        }
      }

      Alert.alert(
        "Success",
        `All ${totalFiles} files downloaded successfully to your Downloads folder`
      );
    } catch (error) {
      console.error("Download all error:", error);
      Alert.alert("Error", `Failed to download all files. ${error.message}`, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    } finally {
      setDownloadLoading(false);
      setDownloadProgress({
        total: 0,
        completed: 0,
        currentFile: "",
      });
    }
  };

  const downloadSingleFile = async (url, index) => {
    try {
      const { config, fs } = RNFetchBlob;
      const date = new Date();
      const fileExt = url.split(".").pop().toLowerCase();

      let filename = `File_${index + 1}_${date.getTime()}`;
      if (fileExt === "pdf") {
        filename += ".pdf";
      } else if (["jpg", "jpeg", "png"].includes(fileExt)) {
        filename += `.${fileExt}`;
      } else {
        filename += `.${fileExt || "file"}`;
      }

      const filePath = `${fs.dirs.DownloadDir}/${filename}`;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: false,
          path: filePath,
          description: `Downloading file ${index + 1}`,
        },
        ios: {
          fileCache: true,
          path: filePath,
        },
      };

      await config({
        ...options,
        trusty: true,
      }).fetch("GET", url);
    } catch (error) {
      console.error(`Error downloading file ${index + 1}:`, error);
      throw new Error(`File ${index + 1} failed to download`);
    }
  };

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowDownloadAll(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowDownloadAll(false);
        });
      }, 2000);
    }, 1000);

    return () => clearTimeout(showTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <Navbar
        navText={title}
        functionIconName={"archive"}
        backPress={handleBackPress}
        functionPress={downloadALLFile}
      />
      {showDownloadAll && (
        <Animated.View style={[styles.downloadAllPopup, { opacity: fadeAnim }]}>
          <Text style={styles.downloadAllText}>Download All</Text>
        </Animated.View>
      )}

      <ScrollView style={styles.reportBody}>
        <ViewShot
          ref={reportBodyRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={{ backgroundColor: "#ffffff" }}
        >
          <View style={styles.reportBodyBox}>
            <View style={styles.reportBodyHeader}>
              <View style={styles.reportBodyHeaderRow}>
                <Image source={Icons.setu_logo} style={styles.setuImage} />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.titleText}
                >
                  {title}
                </Text>
              </View>
              {!hideDownloadIcon && (
                <TouchableOpacity onPress={downloadReportAsImage}>
                  <MaterialCommunityIcons
                    name="download-outline"
                    color="#2372B5"
                    size={s(24)}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.reportContentBody}>
              {Object.entries(content).map(([key, value]) => {
                const formattedKey = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <View key={key} style={styles.contentRow}>
                    <Text style={styles.contentKey}>{formattedKey}:</Text>
                    <Text style={styles.contentValue}> {String(value)}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.verifyBody}>
              <View style={styles.verifyRow}>
                <View style={styles.verifyIconBox}>
                  <MaterialIcons
                    name="verified-user"
                    color="#1B970F"
                    size={s(40)}
                  />
                </View>
                <View style={styles.verifyTextBox}>
                  <Text style={styles.verifyText}>Verified By Setu</Text>
                  <View style={styles.diagonalBox} />
                </View>
              </View>
            </View>
          </View>
        </ViewShot>
        <View style={{ paddingBottom: vs(50) }}>
          {mediaURLs?.map((url, index) => (
            <View key={index} style={styles.mediaBody}>
              <View style={styles.mediaRow}>
                <Text style={styles.mediaText}>Document #{index + 1}</Text>
                <TouchableOpacity onPress={() => downloadFile(url)}>
                  <MaterialCommunityIcons
                    name="download-outline"
                    color="#2372B5"
                    size={s(24)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.mediaContent}>
                {isPdf(url) ? (
                  !pdfStates[index]?.loading && !pdfStates[index]?.error ? (
                    <View style={styles.pdfContainer}>
                      <ActivityIndicator size={"large"} color={"#2372B5"} />
                    </View>
                  ) : pdfStates[index]?.error ? (
                    <TouchableOpacity
                      style={styles.pdfFallback}
                      onPress={() => Linking.openURL(url)}
                    >
                      <MaterialCommunityIcons
                        name="file-pdf-box"
                        size={s(50)}
                        color="#e74c3c"
                      />
                      <Text style={styles.pdfText}>Tap to view PDF</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.pdfContainer}>
                      <Pdf
                        source={{
                          uri: cachedPdfUris[index] || url,
                          cache: true,
                          trustAllCerts:
                            Platform.OS === "android" ? false : undefined,
                        }}
                        onLoadComplete={onPdfLoadComplete(index)}
                        onError={onPdfError(index)}
                        style={styles.pdf}
                        enablePaging={false}
                        enableRTL={false}
                        enableAnnotationRendering={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        singlePage={true}
                        page={1}
                      />
                    </View>
                  )
                ) : isImage(url) ? (
                  <Image
                    source={{ uri: url }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.unknownFile}>
                    <MaterialCommunityIcons
                      name="file-question"
                      size={s(50)}
                      color="#2372B5"
                    />
                    <Text style={styles.unknownFileText}>
                      Unsupported file format
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {downloadLoading && (
        <View style={styles.loaderBody}>
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="#2372B5" />
            <Text style={styles.progressText}>
              {downloadProgress.currentFile}
            </Text>
            <Text style={styles.progressText}>
              {downloadProgress.completed} of {downloadProgress.total} files
            </Text>
            {downloadProgress.total > 0 && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        (downloadProgress.completed / downloadProgress.total) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
export default ViewReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  reportBody: {
    paddingHorizontal: s(12),
    paddingVertical: vs(5),
    paddingTop: vs(20),
  },
  reportBodyBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  reportBodyHeader: {
    flexDirection: "row",
    gap: s(20),
    padding: ms(12),
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    justifyContent: "space-between",
  },
  reportBodyHeaderRow: {
    flexDirection: "row",
    gap: s(20),
    alignItems: "center",
  },
  setuImage: {
    height: ms(60),
    width: ms(60),
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 6,
  },
  titleText: {
    fontSize: s(16),
    fontWeight: "bold",
    color: "#333333",
  },
  reportContentBody: {
    padding: ms(12),
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
  },
  contentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: vs(8),
  },
  contentKey: {
    fontWeight: "bold",
    color: "#333",
  },
  contentValue: {
    color: "#333",
  },
  verifyBody: {
    padding: ms(12),
    marginVertical: vs(8),
  },
  verifyRow: {
    flexDirection: "row",
  },
  verifyIconBox: {
    borderWidth: 1,
    borderColor: "#2372B5",
    borderRadius: 6,
    padding: ms(3),
    backgroundColor: "#D4FDCA",
  },
  verifyTextBox: {
    backgroundColor: "#2372B5",
    alignSelf: "flex-start",
    paddingVertical: vs(5),
    marginTop: vs(5),
    paddingLeft: s(15),
    paddingRight: s(40),
    position: "relative",
  },
  verifyText: {
    color: "#ffffff",
    fontSize: s(11),
    fontWeight: 600,
  },
  diagonalBox: {
    backgroundColor: "#ffffff",
    transform: [{ rotate: "45deg" }],
    height: vs(25),
    width: vs(25),
    position: "absolute",
    right: s(-10),
  },
  mediaBody: {
    marginTop: vs(20),
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 6,
    padding: ms(12),
  },
  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(10),
  },
  mediaText: {
    fontSize: s(14),
    fontWeight: 600,
    color: "#2372B5",
  },
  mediaContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: vs(200),
  },
  pdfContainer: {
    flex: 1,
    width: "100%",
    height: vs(300),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: vs(300),
  },
  image: {
    width: "100%",
    height: vs(300),
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  unknownFile: {
    alignItems: "center",
    justifyContent: "center",
    padding: ms(20),
  },
  unknownFileText: {
    marginTop: vs(10),
    color: "#2372B5",
    fontSize: s(14),
  },
  loader: {},
  loaderBody: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 10000,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfFallback: {
    alignItems: "center",
    justifyContent: "center",
    padding: ms(20),
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 4,
    width: "100%",
    height: vs(200),
  },
  pdfText: {
    marginTop: vs(10),
    color: "#e74c3c",
    fontSize: s(14),
  },
  progressContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  progressText: {
    marginTop: 10,
    color: "#2372B5",
    textAlign: "center",
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2372B5",
  },
  downloadAllPopup: {
    position: "absolute",
    backgroundColor: "#888",
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    right: s(27),
    top: vs(35),
    zIndex: 10000,
    borderRadius: 4,
  },
  downloadAllText: {
    fontSize: s(11),
    color: "#ffffff",
    fontWeight: 600,
  },
});
