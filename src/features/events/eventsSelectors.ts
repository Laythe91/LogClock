import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../core/store";
import { eventsAdapter } from "./eventsSlice";
import { EventFilter } from "../../types/Event";

const selectors = eventsAdapter.getSelectors<RootState>(
  (state) => state.events,
);

const selectAllEvents = selectors.selectAll;

export const selectFilteredEvents = createSelector(
  [
    selectAllEvents,
    (state: RootState) => state.auth.userId,
    (_: RootState, filter: EventFilter) => filter,
  ],
  (events, userId, filter) => {
    if (!userId) return [];

    switch (filter) {
      case "created":
        return events.filter((e) => e.creatorId === userId);

      case "invited":
        return events.filter(
          (e) => e.creatorId !== userId && e.participants?.[userId],
        );

      case "pending":
        return events.filter((e) => e.participants?.[userId] === "pending");

      case "accepted":
        return events.filter((e) => e.participants?.[userId] === "accepted");

      case "declined":
        return events.filter((e) => e.participants?.[userId] === "declined");

      default:
        return [];
    }
  },
);
