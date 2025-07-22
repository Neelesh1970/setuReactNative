import { createSlice } from "@reduxjs/toolkit";
import {
  createEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
} from "../../Screens/SOS/Services/emergencyContactService";

const initialState = {
  emergencyContactData: [],
  loading: false,
  error: null,
};

const sosSlice = createSlice({
  name: "sos",
  initialState,
  reducers: {
    setEmergencyContactData: (state, action) => {
      state.emergencyContactData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addContact: (state, action) => {
      state.emergencyContactData.push(action.payload);
    },
    updateContact: (state, action) => {
      const index = state.emergencyContactData.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.emergencyContactData[index] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      state.emergencyContactData = state.emergencyContactData.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Thunk for fetching contacts
export const fetchEmergencyContacts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const contacts = await getEmergencyContacts();
    dispatch(setEmergencyContactData(contacts));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for creating a contact
export const createContact = (contactData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const newContact = await createEmergencyContact(contactData);
    dispatch(addContact(newContact?.data));
    return newContact;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for updating a contact
export const updateContactById =
  (contactId, contactData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedContact = await updateEmergencyContact(
        contactId,
        contactData
      );
      dispatch(updateContact(updatedContact?.data));
      return updatedContact;
    } catch (error) {
      console.log("error::", error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

// Thunk for deleting a contact
export const deleteContactById = (contactId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteEmergencyContact(contactId);
    dispatch(deleteContact(contactId));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setEmergencyContactData,
  setLoading,
  setError,
  addContact,
  updateContact,
  deleteContact,
} = sosSlice.actions;

export default sosSlice.reducer;
