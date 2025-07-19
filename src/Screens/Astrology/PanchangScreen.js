// PanchangScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from "react-native-drop-shadow";

export default function PanchangScreen() {
  const [panchang, setPanchang] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPanchang();
  }, []);

  const fetchPanchang = async () => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    const [year, month, day] = dateString.split("-");

    const body = {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
      hour: today.getHours(),
      min: today.getMinutes(),
      lat: 28.6139,
      lon: 77.209,
      tzone: 5.5,
    };

    try {
      const res = await fetch(
        "https://json.astrologyapi.com/v1/advanced_panchang",
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic NjQzMDIxOjQyNzdiZDk3N2U4ODI0Y2Q3M2E4Nzc1MmQ2MThjNDgwMTc3ZGY3Mjk=",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      setPanchang(data);
    } catch (error) {
      console.error("Panchang API error:", error);
      setPanchang(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <LinearGradient colors={["#1C39BB", "#4B6CB7"]} style={styles.header}>
        <Text style={styles.headerTitle}>📿 Daily Panchang</Text>
        <Text style={styles.headerDate}>{new Date().toDateString()}</Text>
      </LinearGradient>

      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#1C39BB" />
          ) : panchang ? (
            <>
              <Text style={styles.sectionTitle}>🌞 Celestial Timings</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Sunrise</Text>
                <Text style={styles.value}>{panchang.sunrise}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sunset</Text>
                <Text style={styles.value}>{panchang.sunset}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Moonrise</Text>
                <Text style={styles.value}>{panchang.moonrise}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Moonset</Text>
                <Text style={styles.value}>{panchang.moonset}</Text>
              </View>

              <Text style={styles.sectionTitle}>🪔 Panchang Elements</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Tithi</Text>
                <Text style={styles.value}>
                  {panchang.tithi.details.tithi_name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Nakshatra</Text>
                <Text style={styles.value}>
                  {panchang.nakshatra.details.nak_name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Yoga</Text>
                <Text style={styles.value}>
                  {panchang.yog.details.yog_name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Karan</Text>
                <Text style={styles.value}>
                  {panchang.karan.details.karan_name}
                </Text>
              </View>

              <Text style={styles.sectionTitle}>⏰ Muhurtas</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Rahukaal</Text>
                <Text style={styles.value}>
                  {panchang.rahukaal.start} - {panchang.rahukaal.end}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Abhijit Muhurta</Text>
                <Text style={styles.value}>
                  {panchang.abhijit_muhurta.start} -{" "}
                  {panchang.abhijit_muhurta.end}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>GuliKaal</Text>
                <Text style={styles.value}>
                  {panchang.guliKaal.start} - {panchang.guliKaal.end}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Yamghant Kaal</Text>
                <Text style={styles.value}>
                  {panchang.yamghant_kaal.start} - {panchang.yamghant_kaal.end}
                </Text>
              </View>

              <Text style={styles.sectionTitle}>📍 Other Info</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Disha Shool</Text>
                <Text style={styles.value}>{panchang.disha_shool}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Moon Nivas</Text>
                <Text style={styles.value}>{panchang.moon_nivas}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.error}>Failed to load Panchang data.</Text>
          )}
        </View>
      </DropShadow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "#F2F3F7",
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: "#1C39BB",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop:-10
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerDate: {
    color: "#E0E0E0",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 6,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    color: "#1C39BB",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#E5E5E5",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 15,
    color: "#222",
    textAlign: "right",
    maxWidth: "60%",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
