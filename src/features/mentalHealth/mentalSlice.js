import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAssessments, submitAssessment, logMood, logActivity } from './api/tracking';

// Async thunks
export const fetchUserAssessments = createAsyncThunk(
  'mentalHealth/fetchAssessments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAssessments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitUserAssessment = createAsyncThunk(
  'mentalHealth/submitAssessment',
  async (assessmentData, { rejectWithValue }) => {
    try {
      const response = await submitAssessment(assessmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logUserMood = createAsyncThunk(
  'mentalHealth/logMood',
  async (moodData, { rejectWithValue }) => {
    try {
      const response = await logMood(moodData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logUserActivity = createAsyncThunk(
  'mentalHealth/logActivity',
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await logActivity(activityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  assessments: [],
  moodLogs: [],
  activityLogs: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const mentalHealthSlice = createSlice({
  name: 'mentalHealth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Assessments
    builder.addCase(fetchUserAssessments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserAssessments.fulfilled, (state, action) => {
      state.loading = false;
      state.assessments = action.payload;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(fetchUserAssessments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch assessments';
    });

    // Submit Assessment
    builder.addCase(submitUserAssessment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(submitUserAssessment.fulfilled, (state, action) => {
      state.loading = false;
      state.assessments = [action.payload, ...state.assessments];
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(submitUserAssessment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to submit assessment';
    });

    // Log Mood
    builder.addCase(logUserMood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logUserMood.fulfilled, (state, action) => {
      state.loading = false;
      state.moodLogs = [action.payload, ...state.moodLogs];
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(logUserMood.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to log mood';
    });

    // Log Activity
    builder.addCase(logUserActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logUserActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.activityLogs = [action.payload, ...state.activityLogs];
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(logUserActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to log activity';
    });
  },
});

export const { clearError, resetState } = mentalHealthSlice.actions;

export const selectMentalHealth = (state) => state.mentalHealth;

export default mentalHealthSlice.reducer;
