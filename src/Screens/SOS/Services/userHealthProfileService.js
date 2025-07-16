import axios from "axios";
import { API_URI_SOS } from "@env";
import { getItem } from "../../../Utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserHealthProfile = async () => {
  try {
    const id = await getItem("userID");
    if (!id) throw new Error("User ID not found");

    const response = await axios.get(
      `${API_URI_SOS}/user-health-profiles/user/${id}`
    );
    return response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching user health profile:", error);
    throw error;
  }
};

export const createUserHealthProfile = async (userHealthData) => {
  try {
    const id = await getItem("userID");
    if (!id) throw new Error("User ID not found");

    const response = await axios.post(`${API_URI_SOS}/user-health-profiles`, {
      userid: parseInt(id, 10),
      bloodGroup: userHealthData.bloodGroup.trim(),
      allergies: userHealthData.allergies.trim(),
      medicalConditions: userHealthData.medicalConditions.trim(),
      medications: userHealthData.medications.trim(),
      emergencyNotes: userHealthData.emergencyNotes.trim(),
    });

    return response.data;
  } catch (error) {
    console.error("Error creating emergency contact:", error);
    throw error;
  }
};

export const updateUserHealthProfile = async (
  userHealthDataId,
  userHealthData
) => {
  try {
    const id = await getItem("userID");
    if (!id) throw new Error("User ID not found");
    const response = await axios.put(
      `${API_URI_SOS}/user-health-profiles/${userHealthDataId}`,
      {
        userid: parseInt(id, 10),
        bloodGroup: userHealthData.bloodGroup.trim(),
        allergies: userHealthData.allergies.trim(),
        medicalConditions: userHealthData.medicalConditions.trim(),
        medications: userHealthData.medications.trim(),
        emergencyNotes: userHealthData.emergencyNotes.trim(),
      }
    );

    return response.data;
  } catch (error) {
    console.log("error::", error);
    console.error("Error updating emergency contact:", error);
    throw error;
  }
};

export const setHealthProfileExists = async (exists) => {
  try {
    await AsyncStorage.setItem("healthProfileExists", exists.toString());
  } catch (error) {
    console.error("Error setting health profile status:", error);
  }
};

export const getHealthProfileExists = async () => {
  try {
    const value = await AsyncStorage.getItem("healthProfileExists");
    return value === "true";
  } catch (error) {
    console.error("Error getting health profile status:", error);
    return false;
  }
};
