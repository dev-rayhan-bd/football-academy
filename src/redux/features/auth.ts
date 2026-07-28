/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
}

const getInitialAuth = () => {
  if (typeof window === "undefined") return { user: null, accessToken: null, refreshToken: null };
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  if (isLoggedIn) {
    return {
      user: { email: userEmail, role: userRole },
      accessToken: "dummy-token",
      refreshToken: null,
    };
  }
  return { user: null, accessToken: null, refreshToken: null };
};

const initialState: AuthState = getInitialAuth();

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: any;
      }>,
    ) {
      state.user = action.payload.user;
    },
    setAccessToken(state, action: { payload: string | null }) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: { payload: string | null }) {
      state.refreshToken = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      window.location.href = "/login";
    },
  },
});

export const { setUser, setAccessToken, logout, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
