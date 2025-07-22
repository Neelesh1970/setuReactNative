import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsData: [],
  skillsToken: null,
  modalVisible: false,
  modalSection: null,

  create: false,
  skillList: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobsData: (state, action) => {
      state.jobsData = action.payload;
    },
    setSkillsToken: (state, action) => {
      state.skillsToken = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setModalSection: (state, action) => {
      state.modalSection = action.payload;
    },

    setCreate: (state, action) => {
      state.create = action.payload;
    },
    setSkillList: (state, action) => {
      state.skillList = action.payload;
    },
  },
});

export const {
  setJobsData,
  setSkillsToken,
  setModalVisible,
  setModalSection,

  setCreate,
  setSkillList,
} = jobsSlice.actions;

export default jobsSlice.reducer;
