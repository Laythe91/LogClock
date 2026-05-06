import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppEvent, ParticipantStatus } from "../../types/Event";
import { eventMapper } from "./event.mapper";
import { createEvent } from "./eventsThunks";
import DATA from "../../data";
import { logout } from "../auth/authSlice";

export const eventsAdapter = createEntityAdapter<AppEvent>();

const initialState = eventsAdapter.getInitialState();

const hydratedState = eventsAdapter.setAll(
  initialState,
  DATA.events.map(eventMapper.fromApi),
);

const eventsSlice = createSlice({
  name: "events",
  initialState: hydratedState,
  reducers: {
    addEvent: eventsAdapter.addOne,
    removeEvent: eventsAdapter.removeOne,

    updateParticipantStatus: (state, action) => {
      const { eventId, userId, status } = action.payload;
      const event = state.entities[eventId];
      if (event) {
        event.participants[userId] = status;
      }
    },
  },
});

export const { addEvent, removeEvent, updateParticipantStatus } =
  eventsSlice.actions;
export default eventsSlice.reducer;
