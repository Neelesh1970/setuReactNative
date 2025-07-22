import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SoundPlayer from "react-native-sound-player";
import Slider from "@react-native-community/slider";
import DropShadow from "react-native-drop-shadow";
import { color } from "../../assets/colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const AartiDetailScreen = ({ route }) => {
  const { aarti } = route.params;
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // seconds
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        SoundPlayer.getInfo().then((info) => {
          setDuration(info.duration);
          setCurrentTime(info.currentTime);
        });
      } catch (e) {
        // ignore errors if not yet playing
      }
    }, 500);
    setIntervalId(interval);

    return () => {
      clearInterval(interval);
      SoundPlayer.stop();
    };
  }, []);

  const togglePlayback = () => {
    try {
      if (isPlaying) {
        SoundPlayer.pause();
      } else {
        if (!aarti.aarti_mp3) {
          throw new Error("Audio file not found");
        }
        SoundPlayer.playAsset(aarti.aarti_mp3); // ✅ This works now
        SoundPlayer.seek(currentTime);
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.log("Cannot play the sound file", e);
      Alert.alert("Playback Error", "Unable to play sound.");
    }
  };

  const onSlideComplete = (value) => {
    try {
      SoundPlayer.seek(value);
      setCurrentTime(value);
    } catch (e) {
      console.log("Seek error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{aarti.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* New static image instead of passed thumbnail */}
        <Image source={aarti.thumbnail} style={styles.thumbnail} />

        {/* <Text style={styles.description}>{aarti.description}</Text> */}
        <DropShadow
          style={{
            shadowColor: "#00000030",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <View style={styles.playerContainer}>
            <TouchableOpacity onPress={togglePlayback}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={70}
                color="#1C39BB"
              />
            </TouchableOpacity>
            {/* Progress bar */}
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              minimumTrackTintColor="#1C39BB"
              maximumTrackTintColor="#1C39BB"
              onSlidingComplete={onSlideComplete}
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
        </DropShadow>
      </ScrollView>
    </SafeAreaView>
  );
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: color.bottomViewColor,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  thumbnail: {
    width: width * 0.9,
    height: width * 0.90,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 24,
  },
  playerContainer: {
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#00000030",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#fff",
    // borderWidth:1,

    padding: 10,
    borderRadius: 10,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: color.bottomViewColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  playButtonText: {
    fontSize: 30,
    color: "#fff",
  },
  slider: {
    width: "90%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  timeText: {
    fontSize: 12,
    color: "#555",
  },
});

export default AartiDetailScreen;
