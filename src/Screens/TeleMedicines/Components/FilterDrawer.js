import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";

const FilterDrawer = ({ visible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [isVisible, setIsVisible] = useState(visible);
  const [allowInteraction, setAllowInteraction] = useState(true);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setAllowInteraction(false);
      slideAnim.setValue(600);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setAllowInteraction(true));
    } else {
      setAllowInteraction(false);
      onClose();
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          slideAnim.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          setAllowInteraction(false);
          onClose();
          Animated.timing(slideAnim, {
            toValue: 600,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsVisible(false));
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View
        style={[
          styles.modalOverlay,
          { pointerEvents: allowInteraction ? "auto" : "none" },
        ]}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Swipe Handle */}
          <View
            {...panResponder.panHandlers}
            style={styles.swipeHandleContainer}
          >
            <View style={styles.swipeHandle} />
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-sharp" size={s(24)} color="#444" />
          </TouchableOpacity>

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterDrawer;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 5,
    paddingBottom: vs(20),
  },
  swipeHandleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: vs(20),
  },
  swipeHandle: {
    width: "30%",
    height: vs(9),
    backgroundColor: "#1C57A5",
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    right: ms(20),
    top: ms(10),
  },
});
