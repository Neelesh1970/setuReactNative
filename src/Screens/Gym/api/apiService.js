import axios from "axios";

const API_KEY = "77313eb2b7msheeddf71270398d0p15b6a7jsn3c81707c6771";

const BASE_URL =
  "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com";

const EXERCISE_API =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

// ✅ Analyze Food Plate
export const analyzeFoodPlate = async (imageUrl) => {
  const url = `${BASE_URL}/analyzeFoodPlate?imageUrl=${encodeURIComponent(
    imageUrl
  )}&lang=en&noqueue=1`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host":
            "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "🔴 Analyze Food API ERROR:",
      error.response?.data || error.message
    );
    throw new Error("API error");
  }
};

// ✅ Get Nutrition Advice
export const getNutritionAdvice = async (body) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/nutritionAdvice?noqueue=1`,
      body,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host":
            "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "❌ Nutrition Advice API Error:",
      error.response?.data || error.message
    );
    throw new Error("API error");
  }
};

// ✅ Get Custom Workout Plan
export const getCustomWorkoutPlan = async (body) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customWorkoutPlan?noqueue=1`,
      body,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host":
            "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "❌ Workout Plan API Error:",
      error.response?.data || error.message
    );
    throw new Error("API error");
  }
};

// ✅ Get Exercise Details
export const getExerciseDetails = async (exerciseName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/exerciseDetails?noqueue=1`,
      { exercise_name: exerciseName, lang: "en" },
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host":
            "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "❌ Exercise Details API Error:",
      error.response?.data || error.message
    );
    throw new Error("API error");
  }
};

// ✅ Browse Exercises by Muscle
export const getExercisesByMuscle = async (muscle) => {
  try {
    const response = await axios.get(`${EXERCISE_API}?muscle=${muscle}`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "❌ Browse Exercises API Error:",
      error.response?.data || error.message
    );
    throw new Error("API error");
  }
};
