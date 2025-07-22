import axios from "axios";
import { API_URI_SOS } from "@env";

export const createEmergencyTransaction = async (data) => {
  try {
    const response = await axios.post(`${API_URI_SOS}/transactions`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating emergency transaction:", error);
    throw error;
  }
};
