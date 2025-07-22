import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
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
      lat: 25.7464,
      lon: 82.6837,
      tzone: 5.5,
    };

    try {
      const res = await fetch(
        "https://json.astrologyapi.com/v1/advanced_panchang/sunrise",
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

  const renderRow = (label, value) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              {/* 🌞 Celestial Timings */}
              <Text style={styles.sectionTitle}>🌞 Celestial Timings</Text>
              {renderRow("Sunrise", panchang.sunrise)}
              {renderRow("Sunset", panchang.sunset)}
              {renderRow("Moonrise", panchang.moonrise)}
              {renderRow("Moonset", panchang.moonset)}

              {/* 🕉️ Tithi */}
              <Text style={styles.sectionTitle}>🕉️ Tithi</Text>
              {renderRow("Name", panchang.tithi.details.tithi_name + ` (${panchang.tithi.details.special})`)}
              {renderRow("Ends at", `${panchang.tithi.end_time.hour}:${panchang.tithi.end_time.minute}:${panchang.tithi.end_time.second}`)}
              {renderRow("Deity", panchang.tithi.details.deity)}
              {renderRow("Meaning", panchang.tithi.details.summary)}

              {/* 🌌 Nakshatra */}
              <Text style={styles.sectionTitle}>🌌 Nakshatra</Text>
              {renderRow("Name", panchang.nakshatra.details.nak_name)}
              {renderRow("Ends at", `${panchang.nakshatra.end_time.hour}:${panchang.nakshatra.end_time.minute}:${panchang.nakshatra.end_time.second}`)}
              {renderRow("Deity", panchang.nakshatra.details.deity)}
              {renderRow("Ruler", panchang.nakshatra.details.ruler)}
              {renderRow("Meaning", panchang.nakshatra.details.summary)}

              {/* ☄️ Yoga */}
              <Text style={styles.sectionTitle}>☄️ Yoga</Text>
              {renderRow("Name", panchang.yog.details.yog_name)}
              {renderRow("Ends at", `${panchang.yog.end_time.hour}:${panchang.yog.end_time.minute}:${panchang.yog.end_time.second}`)}
              {renderRow("Meaning", panchang.yog.details.meaning)}

              {/* 💰 Karan */}
              <Text style={styles.sectionTitle}>💰 Karan</Text>
              {renderRow("Name", panchang.karan.details.karan_name)}
              {renderRow("Ends at", `${panchang.karan.end_time.hour}:${panchang.karan.end_time.minute}:${panchang.karan.end_time.second}`)}
              {renderRow("Deity", panchang.karan.details.deity)}
              {renderRow("Effect", panchang.karan.details.special)}

              {/* ⏰ Muhurtas */}
              <Text style={styles.sectionTitle}>⏰ Muhurtas</Text>
              {renderRow("Abhijit Muhurta", `${panchang.abhijit_muhurta.start} - ${panchang.abhijit_muhurta.end}`)}
              {renderRow("Rahukaal", `${panchang.rahukaal.start} - ${panchang.rahukaal.end}`)}
              {renderRow("GuliKaal", `${panchang.guliKaal.start} - ${panchang.guliKaal.end}`)}
              {renderRow("Yamghant Kaal", `${panchang.yamghant_kaal.start} - ${panchang.yamghant_kaal.end}`)}

              {/* 📚 Vedic Info */}
              <Text style={styles.sectionTitle}>📚 Vedic Info</Text>
              {renderRow("Paksha", panchang.paksha)}
              {renderRow("Ritu", panchang.ritu)}
              {renderRow("Sun Sign", panchang.sun_sign)}
              {renderRow("Moon Sign", panchang.moon_sign)}
              {renderRow("Panchang Yog", panchang.panchang_yog)}
              {renderRow("Ayana", panchang.ayana)}

              {/* 📅 Calendar Info */}
              <Text style={styles.sectionTitle}>📅 Calendar Info</Text>
              {renderRow("Vikram Samvat", `${panchang.vikram_samvat} (${panchang.vkram_samvat_name})`)}
              {renderRow("Shaka Samvat", `${panchang.shaka_samvat} (${panchang.shaka_samvat_name})`)}
              {renderRow("Purnimanta Month", panchang.hindu_maah.purnimanta)}
              {renderRow("Amanta Month", panchang.hindu_maah.amanta)}

              {/* 🧭 Direction Info */}
              <Text style={styles.sectionTitle}>🧭 Directional Info</Text>
              {renderRow("Disha Shool", panchang.disha_shool)}
              {renderRow("Moon Nivas", panchang.moon_nivas)}
              {renderRow("Nakshatra Shool", panchang.nak_shool.direction)}
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
    backgroundColor: "#F2F3F7",
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: "#1C39BB",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: -10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop:-10
  },
  headerDate: {
    color: "#E0E0E0",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 6,
    marginBottom:20
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
    maxWidth: "45%",
  },
  value: {
    fontSize: 15,
    color: "#222",
    textAlign: "right",
    maxWidth: "55%",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
