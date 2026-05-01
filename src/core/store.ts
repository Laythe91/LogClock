// src/core/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import contactsReducer from "../features/contacts/contactsSlice";
import eventsReducer from "../features/events/eventsSlice";
import localesReducer from "../features/locales/localesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    events: eventsReducer,
    locales: localesReducer, //
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
