// screens/AnalyzeFoodScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import { analyzeFoodPlate } from "../api/apiService";
import Ionicons from 'react-native-vector-icons/Ionicons'; // at top


export default function AnalyzeFoodScreen() {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!imageUrl) return;
    Keyboard.dismiss();
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeFoodPlate(imageUrl);
      setResult(data);
    } catch (err) {
      console.log("❌ Analyze API error:", err.message);
      setResult({
        error: "Something went wrong! Please check image URL or API status.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <Ionicons name="restaurant-outline" size={24} color="#1C39BB" />
        <Text style={styles.header}>Analyze Food Plate</Text>
      </View>
      <TextInput
        placeholder="Paste a direct image URL (https://...)"
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
        <Text style={styles.buttonText}>
          {loading ? "Analyzing..." : "Analyze"}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.resultTitle}>🧠 Analysis Result:</Text>

          {result.error ? (
            <Text style={styles.errorText}>{result.error}</Text>
          ) : (
            <>
              {imageUrl && (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.resultText}>
                {JSON.stringify(result, null, 2)}
              </Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F6FC",
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C39BB",
    // marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#DDD",
    borderWidth: 1,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1C39BB",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#1C39BB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 13,
    color: "#444",
  },
  errorText: {
    color: "#D8000C",
    fontWeight: "600",
    fontSize: 14,
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 4,
  },
  titleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  gap: 8,
},
});
