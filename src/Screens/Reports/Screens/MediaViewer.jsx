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
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ms, s, vs } from "react-native-size-matters";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import { Navbar } from "../Components";

const { width, height } = Dimensions.get("window");

const MediaViewer = ({ route }) => {
  const { title, mediaURLs } = route.params;
  const navigation = useNavigation();
  const [pdfStates, setPdfStates] = useState({});
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({
    total: 0,
    completed: 0,
    currentFile: "",
  });
  const [cachedPdfUris, setCachedPdfUris] = useState({});
  const [showDownloadAll, setShowDownloadAll] = useState(false);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const cachePdfFile = async (url, index) => {
    try {
      if (cachedPdfUris[index]) return;

      const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/temp_pdf_${index}.pdf`;

      const res = await RNFetchBlob.config({
        fileCache: true,
        path: filePath,
        trusty: true,
      }).fetch("GET", url);

      setCachedPdfUris((prev) => ({
        ...prev,
        [index]: res.path(),
      }));

      return res.path();
    } catch (error) {
      console.error(`Error caching PDF ${index}:`, error);
      return url;
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

      const res = await config({
        ...options,
        trusty: true,
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

  const isLikelyImage = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    if (imageExtensions.some((ext) => url?.toLowerCase().endsWith(ext))) {
      return true;
    }

    return true;
  };

  const handleImageLoad = (index) => {
    setImageLoadStatus((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setImageLoadStatus((prev) => ({ ...prev, [index]: false }));
  };

  const onPdfLoadComplete = (index) => (numberOfPages, filePath) => {
    setPdfStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], loading: false, error: false },
    }));
  };

  const onPdfError = (index) => (error) => {
    console.log(`PDF error for document ${index}:`, error);
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
      const totalFiles = mediaURLs?.length || 0;
      setDownloadProgress({
        total: totalFiles,
        completed: 0,
        currentFile: "Starting download...",
      });
      setDownloadLoading(true);

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
                ) : isLikelyImage(url) ? (
                  <>
                    <Image
                      source={{ uri: url }}
                      style={styles.image}
                      resizeMode="contain"
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                    {imageLoadStatus[index] === false && (
                      <View style={styles.unknownFile}>
                        <MaterialCommunityIcons
                          name="file-question"
                          size={s(50)}
                          color="#2372B5"
                        />
                        <Text style={styles.unknownFileText}>
                          Could not load content
                        </Text>
                        <TouchableOpacity
                          style={styles.openInBrowserButton}
                          onPress={() => Linking.openURL(url)}
                        >
                          <Text style={styles.openInBrowserText}>
                            Open in Browser
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
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
                    <TouchableOpacity
                      style={styles.openInBrowserButton}
                      onPress={() => Linking.openURL(url)}
                    >
                      <Text style={styles.openInBrowserText}>
                        Open in Browser
                      </Text>
                    </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  reportBody: {
    paddingHorizontal: s(12),
    paddingVertical: vs(5),
    paddingTop: vs(20),
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
    textAlign: "center",
  },
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
  openInBrowserButton: {
    marginTop: vs(10),
    padding: vs(5),
    backgroundColor: "#2372B5",
    borderRadius: 4,
  },
  openInBrowserText: {
    color: "#ffffff",
    fontSize: s(12),
  },
});

export default MediaViewer;
