import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import { AppEvent, ParticipantStatus } from "../../types/Event";
import { eventMapper } from "./event.mapper";
import DATA from "../../data";

export const eventsAdapter = createEntityAdapter<AppEvent>({
  sortComparer: (a, b) => a.dateStart - b.dateStart,
});

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

    addEvents: eventsAdapter.addMany,

    updateEventAction: eventsAdapter.updateOne,

    removeEvent: eventsAdapter.removeOne,

    clearEvents: eventsAdapter.removeAll,

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
});

export const {
  addEvent,
  addEvents,
  updateEventAction,
  removeEvent,
  clearEvents,
  updateParticipantStatus,
} = eventsSlice.actions;

export default eventsSlice.reducer;
