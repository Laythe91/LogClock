// src/core/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import friendsReducer from "../features/friends/friendsSlice";
import eventsReducer from "../features/events/eventsSlice";
import localesReducer from "../features/locales/localesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    events: eventsReducer,
    locales: localesReducer, // ✅ ajouter locales
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
