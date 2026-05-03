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

    return events.filter((event) => {
      const myStatus = event.participants?.[userId];

      switch (filter) {
        case "created":
          return event.creatorId === userId;

        case "invited":
          return event.creatorId !== userId && !!myStatus;

        case "pending":
          return myStatus === "pending";

        case "accepted":
          return myStatus === "accepted";

        case "declined":
          return myStatus === "declined";

        default:
          return false;
      }
    });
  },
);

export const selectEventById = (state: RootState, eventId: string) =>
  state.events.entities[eventId];

export const selectEventFullDetails = createSelector(
  [
    (state: RootState, eventId: string) => state.events.entities[eventId],

    (state: RootState) => state.contacts.profilesById,
  ],
  (event, profilesById) => {
    if (!event) return null;

    const participants = Object.entries(event.participants).map(
      ([userId, status]) => {
        const user = profilesById[userId];

        return {
          id: userId,
          name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
          status,
        };
      },
    );

    const creator = profilesById[event.creatorId];

    return {
      ...event,
      creator: creator
        ? {
            id: creator.id,
            name: `${creator.firstName} ${creator.lastName}`,
          }
        : null,
      participants,
    };
  },
);
