import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";

export default function DailyHoroscopeScreen({ route }) {
  const navigation = useNavigation();
  const { zodiac } = route.params;
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(true);
  const [futureDaily, setFutureDaily] = useState(null);
  const [futureWeekly, setFutureWeekly] = useState(null);
  const [loadingFuture, setLoadingFuture] = useState(true);
  const [showFuture, setShowFuture] = useState(false);

  useEffect(() => {
    fetchHoroscope();
    // fetchAztroFuture();
  }, []);

  const fetchHoroscope = async () => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/horoscope?zodiac=${zodiac.name.toLowerCase()}`,
        { headers: { "X-Api-Key": "ghvu+CEVIHzXmYGOPNvzDg==SFzeayFYSkXKZGl8" } }
      );
      const data = await res.json();
      setPrediction(data.horoscope || "No prediction found.");
    } catch (e) {
      console.error("Daily horoscope error:", e);
      setPrediction("Could not load.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toDateString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#1C39BB", "#4B6CB7"]} style={styles.card}>
        <Image source={zodiac.image} style={styles.imageCentered} />
        <Text style={styles.zodiacName}>{zodiac.name}</Text>
        <Text style={styles.date}>{today}</Text>
        <Text style={styles.sectionTitle}>Your Daily Horoscope</Text>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.prediction}>{prediction}</Text>
        )}
      </LinearGradient>

      <TouchableOpacity
        style={styles.futureToggleBtn}
        onPress={() => navigation.navigate("FutureAstrology", { zodiac })}
      >
        <Text style={styles.futureToggleText}>See Future 🔮</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.futureToggleBtn}
        onPress={() => navigation.navigate("Panchang")}
      >
        <Text style={styles.futureToggleText}>📿 View Daily Panchang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F3F7",
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  imageCentered: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
    tintColor: "#fff",
  },
  zodiacName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  prediction: {
    fontSize: 15,
    color: "#F5F5F5",
    lineHeight: 24,
    textAlign: "center",
  },
  futureToggleBtn: {
    backgroundColor: "#1C39BB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 28,
  },
  futureToggleText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  futureCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // elevation: 4,
  },
  futureTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1C39BB",
  },
  futureBlock: {
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  futureText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
