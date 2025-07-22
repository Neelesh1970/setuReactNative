import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

export default function NutritionAdviceScreen() {
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [advice, setAdvice] = useState("");

  const generateAdvice = () => {
    const current = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);

    if (isNaN(current) || isNaN(target)) {
      setAdvice("❗ Please enter valid numbers.");
      return;
    }

    if (current < 50) {
      setAdvice(
        "\u26A0\uFE0F Underweight\n\n" +
          "• Eat calorie-dense and protein-rich meals.\n" +
          "• Add peanut butter, banana shakes, nuts, paneer.\n" +
          "• Train with weights 3x/week.\n" +
          "• Eat every 3 hours.\n"
      );
    } else if (current >= 50 && current <= 60) {
      setAdvice(
        "💪 Lean Build-up\n\n" +
          "• Maintain or bulk with clean foods.\n" +
          "• Include oats, eggs, rice, chicken.\n" +
          "• Track progress weekly.\n"
      );
    } else if (current > 60 && current <= 70) {
      setAdvice(
        "✅ Ideal Weight\n\n" +
          "• Maintain with balanced diet (carbs, protein, fat).\n" +
          "• Strength + 2 cardio sessions/week.\n" +
          "• Drink 2–3L water daily.\n"
      );
    } else if (current > 70 && current <= 85) {
      setAdvice(
        "📉 Weight Loss\n\n" +
          "• Reduce sugar, fried foods, and snacks.\n" +
          "• Include dal, sabzi, roti, fruit, green tea.\n" +
          "• Walk 45 minutes daily.\n"
      );
    } else if (current > 85) {
      setAdvice(
        "🔥 Obesity Risk\n\n" +
          "• Eat high-fiber, high-protein meals.\n" +
          "• Avoid junk, white rice, sugar.\n" +
          "• Brisk walking + light training.\n" +
          "• Consult a certified nutritionist.\n"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}> Nutrition Advice</Text>

          {/* Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Current Weight (kg)"
            keyboardType="numeric"
            value={currentWeight}
            onChangeText={setCurrentWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Target Weight (kg)"
            keyboardType="numeric"
            value={targetWeight}
            onChangeText={setTargetWeight}
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={generateAdvice}>
            <Text style={styles.buttonText}>Get Advice</Text>
          </TouchableOpacity>

          {/* Advice Output */}
          {advice !== "" && (
            <View style={styles.adviceBox}>
              <Text style={styles.adviceText}>{advice}</Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C39BB",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  adviceBox: {
    backgroundColor: "#FFFDE7",
    padding: 16,
    borderRadius: 12,
    borderColor: "#FFD54F",
    borderWidth: 1,
  },
  adviceText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
