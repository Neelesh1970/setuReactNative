import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userData: {},
  profileData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setUserId, setUserData, setProfileData, setApplicantId } =
  userSlice.actions;

export default userSlice.reducer;
