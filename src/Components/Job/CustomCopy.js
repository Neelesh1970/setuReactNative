import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { ms } from "react-native-size-matters";
import { screenWidth } from "../../utils/utils";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import LinearGradient from 'react-native-linear-gradient';


const CustomCopy = ({
  min = 0,
  max = 100,
  initialValue,
  onValueChange,
  containerStyle,
  _sliderWidth = screenWidth,
  isGradient,
  gradientColors1,
  gradientColors2,
}) => {
  //const sliderWidth = screenWidth - ms(130); // Width of the slider track
  const sliderWidth = _sliderWidth;
  const pan = useRef(new Animated.ValueXY()).current;
  const [sliderValue, setSliderValue] = useState(initialValue);
  console.log("Progress", (initialValue / max) * sliderWidth - ms(9));
  // Convert the current position to a slider value
  const getSliderValue = (gestureX) => {
    const value = Math.max(min, Math.min(max, (gestureX / sliderWidth) * max));
    return value;
  };

  // PanResponder to handle gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate the new slider value based on gesture position
        const value = getSliderValue(gestureState.dx + sliderWidth / 2);
        setSliderValue(value);
        onValueChange && onValueChange(value);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Final position when the user stops dragging
        const value = getSliderValue(gestureState.dx + sliderWidth / 2);
        setSliderValue(value);
        onValueChange && onValueChange(value);
      },
    })
  ).current;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Slider Track */}
      <View
        style={{
          width: sliderWidth,
          height: ms(10),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.track,
            { width: sliderWidth, justifyContent: "center" },
          ]}
          // {...panResponder.panHandlers}
        >
          {/* Slider Thumb */}

          <View
            style={{
              height: ms(2),
              width: "100%",
              backgroundColor: color.tracking_text_grey,
              position: "absolute",
              top: ms(6),
            }}
          />
          <LinearGradient
            colors={[color.order_tracking_gradient_1, color.in_transit_yellow]} // Gradient colors
            start={{ x: 0, y: 1 }} // Start from left (x: 0) to right (x: 1)
            end={{ x: 1, y: 0 }} // End at the right
            style={{
              height: ms(2),
              width: (sliderValue / max) * sliderWidth, // Progress width
              position: "absolute",
              top: ms(6),
            }}
          />

          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [
                  { translateX: (sliderValue / max) * sliderWidth - ms(9) },
                ],
              },
            ]}
          >
            <Image
              style={{ height: ms(14), width: ms(14), resizeMode: "contain" }}
              source={Icons.popImage}
            />
          </Animated.View>
        </View>
      </View>
      {/* Display Slider Value */}
      {/* <Text>Value: {sliderValue.toFixed(0)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: ms(2),
    height: ms(14),
  },
  track: {
    height: ms(14),

    borderRadius: 5,
    position: "relative",
  },
  thumb: {
    width: ms(14),
    height: ms(14),
    borderRadius: ms(5),

    position: "absolute",
  },
});

export default CustomCopy;
