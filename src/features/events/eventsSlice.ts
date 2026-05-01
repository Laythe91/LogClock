import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Event, ParticipantStatus } from "../../types/Event";
import DATA from "../../data";
import { logout } from "../auth/authSlice";

const eventsAdapter = createEntityAdapter<Event>();

const initialState = eventsAdapter.getInitialState();

const hydratedState = eventsAdapter.setAll(
  initialState,
  DATA.events as Event[],
);

const eventsSlice = createSlice({
  name: "events",
  initialState: hydratedState,
  reducers: {
    setEvent: eventsAdapter.upsertOne,

    updateParticipantStatus: (
      state,
      action: PayloadAction<{
        eventId: string;
        userId: string;
        status: ParticipantStatus;
      }>,
    ) => {
      const { eventId, userId, status } = action.payload;
      const event = state.entities[eventId];

      if (event) {
        event.participants[userId] = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { setEvent, updateParticipantStatus } = eventsSlice.actions;
export { eventsAdapter };
export default eventsSlice.reducer;
