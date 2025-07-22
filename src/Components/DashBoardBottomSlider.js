import React, { useRef, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { ms } from "react-native-size-matters";
import { Icons } from "../../src/assets/icons/Icons";
import DropShadow from "react-native-drop-shadow";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function BottomSlider() {
  const DATA = [
    {
      id: 1,
      title: "Ayushman Bharat",
      subtitle: "Digital Mission",
      description: "Click to see national and international videos",
      image: Icons.dashboard_pm,
      imagewidth: 90,
      imageheight: 100,
    },
    {
      id: 2,
      title: "Maharashtra State",
      subtitle: "Government Initiatives",
      description:
        "Click to explore schemes, services, and updates from Maharashtra",
      image: Icons.dashboard_cm,
      imagewidth: 90,
      imageheight: 100,
    },
    {
  id: 3,
  title: "Maharashtra State",
  subtitle: "Vikas Yatra",
  description: "Click to explore Maharashtra's development ",
  image: Icons.dashboard_d_cm, // Make sure to add this image in your Icons.js
  imagewidth: 120,
  imageheight: 120,
}

    // Add more items if needed
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1;

      if (nextIndex < DATA.length) {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      } else {
        // Jump back to first without animation
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: false,
        });
        setCurrentIndex(0);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle manual swipe
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => {
    return (
      <DropShadow
        style={{
          shadowColor: "#00000030",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <Image
            source={item.image}
            style={{
              width: ms(item.imagewidth),
              height: ms(item.imageheight),
              borderRadius: ms(10),
            }}
            resizeMode="contain"
          />
        </View>
      </DropShadow>
    );
  };

  return (
    <View style={{ marginTop: ms(10) }}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: ms(15),
    padding: ms(10),
    marginHorizontal: ms(10),
    width: SCREEN_WIDTH - 40,
    height: ms(100),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "center",
    marginVertical: ms(10),
  },
  textContainer: {
    flex: 1,
    paddingRight: ms(10),
  },
  title: {
    fontSize: ms(18),
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: ms(18),
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: ms(12),
    color: "#555",
    marginTop: ms(5),
  },
});