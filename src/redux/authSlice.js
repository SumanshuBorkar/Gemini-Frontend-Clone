// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,

  phoneNumber: "",
  countryCode: "+91",
  otpSent: false,
  otpVerified: false,

  isLoading: false, 
  error: null,
  success: null,

  tempOtp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.phoneNumber = action.payload.phone;
      state.countryCode = action.payload.code;
      state.error = null;
      state.success = null;
    },

    sendOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    sendOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.otpSent = true;
      state.tempOtp = action.payload.otp;
      state.success = "OTP sent";
    },
    sendOtpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to send OTP";
    },

    verifyOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    verifyOtpSuccess: (state) => {
      state.isLoading = false;
      state.otpVerified = true;
      state.isAuthenticated = true;
      state.success = "OTP verified";
      state.tempOtp = null; 
    },
    verifyOtpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Invalid OTP";
    },

    resetAuthFlags: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.otpSent = false;
      state.otpVerified = false;
      state.tempOtp = null;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  setCredentials,
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  resetAuthFlags,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
