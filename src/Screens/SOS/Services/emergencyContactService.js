import axios from "axios";
import { API_URI_SOS } from "@env";
import { getItem } from "../../../Utils/utils";
import ToastService from "../../../Utils/ToastService";

export const getEmergencyContacts = async () => {
  try {
    const id = await getItem("userID");
    if (!id) throw new Error("User ID not found");

    const response = await axios.get(
      `${API_URI_SOS}/emergency-contacts/user/${id}`
    );
    return response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    throw error;
  }
};

export const createEmergencyContact = async (contactData) => {
  try {
    const id = await getItem("userID");
    if (!id) throw new Error("User ID not found");

    const response = await axios.post(`${API_URI_SOS}/emergency-contacts`, {
      userid: parseInt(id, 10),
      name: contactData.name.trim(),
      contactNumber: contactData.phone,
      relation: contactData.relation.trim(),
    });
    ToastService.showSuccess("Success!", "Contact Added successfully!");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage =
        error.response.data?.error ||
        "Emergency contact with this phone number already exists for this user";
      ToastService.showError("Error!", errorMessage);
    } else {
      // Fallback to generic error handling
      ToastService.showError(
        "Error!",
        error?.message || "Something Went Wrong!"
      );
    }
    console.error("Error creating emergency contact:", error?.message);
    throw error;
  }
};

export const updateEmergencyContact = async (contactId, contactData) => {
  try {
    const response = await axios.put(
      `${API_URI_SOS}/emergency-contacts/${contactId}`,
      {
        name: contactData.name.trim(),
        contactNumber: contactData.contactNumber,
        relation: contactData.relation.trim(),
        userid: contactData.userid,
      }
    );

    ToastService.showSuccess("Success!", "Contact Updated successfully!");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage =
        error.response.data?.error ||
        "Emergency contact with this phone number already exists for this user";
      ToastService.showError("Error!", errorMessage);
    } else {
      // Fallback to generic error handling
      ToastService.showError(
        "Error!",
        error?.message || "Something Went Wrong!"
      );
    }
    console.error("Error updating emergency contact:", error);
    throw error;
  }
};

export const deleteEmergencyContact = async (contactId) => {
  try {
    const response = await axios.delete(
      `${API_URI_SOS}/emergency-contacts/${contactId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting emergency contact:", error);
    throw error;
  }
};
