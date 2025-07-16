import { createSlice } from "@reduxjs/toolkit";
import {
  createUserHealthProfile,
  getUserHealthProfile,
  updateUserHealthProfile,
} from "../../Screens/SOS/Services/userHealthProfileService";

const initialState = {
  userHealthProfileData: [],
  userHealthProfileLoading: false,
  userHealthProfileError: null,
};

const userHealthProfileSlice = createSlice({
  name: "userHealthProfile",
  initialState,
  reducers: {
    setUserHealthProfileData: (state, action) => {
      state.userHealthProfileData = action.payload;
    },
    setUserHealthProfileLoading: (state, action) => {
      state.userHealthProfileLoading = action.payload;
    },
    setUserHealthProfileError: (state, action) => {
      state.userHealthProfileError = action.payload;
    },
    createHealthProfile: (state, action) => {
      state.userHealthProfileData.push(action.payload);
    },
    updateHealthProfile: (state, action) => {
      const index = state.userHealthProfileData.findIndex(
        (userHealthData) => userHealthData.id === action.payload.id
      );
      if (index !== -1) {
        state.userHealthProfileData[index] = action.payload;
      }
    },
  },
});

// Thunk for fetching user health data
export const fetchUserHealthProfile = () => async (dispatch) => {
  dispatch(setUserHealthProfileLoading(true));
  try {
    const userHealthData = await getUserHealthProfile();
    dispatch(setUserHealthProfileData(userHealthData));
  } catch (error) {
    dispatch(setUserHealthProfileError(error.message));
  } finally {
    dispatch(setUserHealthProfileLoading(false));
  }
};

// Thunk for creating user health data
export const postUserHealthProfile = (userHealthData) => async (dispatch) => {
  dispatch(setUserHealthProfileLoading(true));
  try {
    const newUserHealthData = await createUserHealthProfile(userHealthData);
    dispatch(createHealthProfile(newUserHealthData?.data));
    return newUserHealthData;
  } catch (error) {
    dispatch(setUserHealthProfileError(error.message));
    throw error;
  } finally {
    dispatch(setUserHealthProfileLoading(false));
  }
};

// Thunk for updating user health data
export const putUserHealthProfile =
  (userHealthDataId, userHealthData) => async (dispatch) => {
    dispatch(setUserHealthProfileLoading(true));
    try {
      const updateduserHealthData = await updateUserHealthProfile(
        userHealthDataId,
        userHealthData
      );
      dispatch(updateHealthProfile(updateduserHealthData?.data));
      return updateduserHealthData;
    } catch (error) {
      dispatch(setUserHealthProfileError(error.message));
      throw error;
    } finally {
      dispatch(setUserHealthProfileLoading(false));
    }
  };

export const {
  setUserHealthProfileData,
  setUserHealthProfileLoading,
  setUserHealthProfileError,
  createHealthProfile,
  updateHealthProfile,
} = userHealthProfileSlice.actions;

export default userHealthProfileSlice.reducer;
