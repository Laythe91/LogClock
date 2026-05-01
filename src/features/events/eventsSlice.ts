// src/features/events/eventsSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Event } from "../../types/Event";
import { RootState } from "../../core/store";

/*const initialState = {
  createdEvents: [], // Données venant de /users/me/events
  invitedEvents: [], // Données chargées via les références dans /users/me/myInvitations
  loading: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCreatedEvents: (state, action) => {
      state.createdEvents = action.payload;
    },
    setInvitedEvents: (state, action) => {
      state.invitedEvents = action.payload;
    },
  },
});

// SELECTEURS MÉMOÏSÉS
const selectCreated = (state: RootState) => state.events.createdEvents;
const selectInvited = (state: RootState) => state.events.invitedEvents;

export const selectAllMyVisibleEvents = createSelector(
  [selectCreated, selectInvited],
  (created, invited) => {
    // On fusionne les deux pour la Vue Carte par exemple
    return [...created, ...invited];
  },
);
*/

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
    },
  },
});

export const { setEvents, addEvent } = eventsSlice.actions;
// ✅ export par défaut*/
export default eventsSlice.reducer;
