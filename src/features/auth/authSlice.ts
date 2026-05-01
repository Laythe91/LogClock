// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: "user1",
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userId: string; token: string }>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // ✅ export par défaut
