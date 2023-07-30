"use client";
import { createSlice } from "@reduxjs/toolkit";

// Check if window is defined (running in a browser) before using localStorage
const getUserInfoFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
  return null;
};

const initialState = {
  userInfo: getUserInfoFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
