import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from "react-native-drop-shadow";

export default function FutureHoroscopeScreen({ route }) {
  const { zodiac } = route.params;
  const [prediction, setPrediction] = useState(null);
  const [predictionDate, setPredictionDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFutureHoroscope();
  }, []);

  const fetchFutureHoroscope = async () => {
    const sign = zodiac.name.toLowerCase();
    try {
      const res = await fetch(
        `https://json.astrologyapi.com/v1/horoscope_prediction/daily/${sign}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic NjQzMDYwOmQ5NjNiODY0NzZmM2YwMTVmNzNhNjM2NTFlZWIxNDY2MTBjNzQ1ZGI=",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timezone: 5.5,
          }),
        }
      );

      const json = await res.json();
      if (json && json.status && json.prediction) {
        setPrediction(json.prediction);
        setPredictionDate(json.prediction_date);
      } else {
        setPrediction("No prediction found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setPrediction("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}

      <LinearGradient
        colors={["#1C39BB", "#4B6CB7"]}
        style={styles.headerContainer}
      >
        <Image source={zodiac.image} style={styles.icon} />
        <Text style={styles.signText}>{zodiac.name}</Text>
        <Text style={styles.dateText}>📅 {predictionDate}</Text>
      </LinearGradient>

      <DropShadow style={styles.shadow}>
        <View style={styles.card}>
          <Text style={styles.title}>🔮 Your Future Prediction for Today</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#1C39BB" />
          ) : (
            <Text style={styles.predictionText}>{prediction}</Text>
          )}
        </View>
      </DropShadow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 25,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop:-10
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "#fff",
    marginBottom: 8,
  },
  signText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },
  dateText: {
    color: "#fff",
    fontSize: 14,
    fontStyle: "italic",
    marginVertical:10
  },
  shadow: {
    shadowColor: "#00000020",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 30,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
    marginTop:-50
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C39BB",
    marginBottom: 12,
    textAlign: "center",
  },
  predictionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 26,
    textAlign: "justify",
  },
});
