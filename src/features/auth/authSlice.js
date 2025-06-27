import { createSlice } from '@reduxjs/toolkit';
import { storeItem, storeRefreshToken, storeToken } from '../../Utils/utils';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  signuploading: false,
  signuperror: null,
  forgotpwdloading: false,
  forgotpwderror: null,
  activeModule:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      storeToken(action.payload.token)
      storeRefreshToken(action.payload.refreshToken)
      console.log(action.payload.user_id)
      storeItem("userID",action.payload.user_id)
      storeItem("uhid",action.payload.uhid)
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.signuploading = true;
      state.signuperror = null;
    },
    signupSuccess: (state, action) => {
      state.signuploading = false;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      state.uhid = action.payload.uhid;
      storeItem("uhid",action.payload.uhid)
    },
    signupFailure: (state, action) => {
      state.signuploading = false;
      state.signuperror = action.payload;
    },
    forgotpwdRequest: (state) => {
      state.forgotpwdloading = true;
      state.forgotpwderror = null;
    },
    forgotpwdSuccess: (state, action) => {
      state.forgotpwdloading = false;
    },
    forgotpwdFailure: (state, action) => {
      state.forgotpwdloading = false;
      state.forgotpwderror = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setActiveModule: (state, action) => {
      state.activeModule = action.payload;
    }
  },
});

export const { loginRequest,signupRequest, loginSuccess, signupSuccess,loginFailure,signupFailure, logout,
  forgotpwdRequest,forgotpwdSuccess,forgotpwdFailure,setActiveModule
 } = authSlice.actions;

export default authSlice.reducer;
