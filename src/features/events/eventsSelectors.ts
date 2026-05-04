import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../core/store";
import { eventsAdapter } from "./eventsSlice";
import { EventFilter, ParticipantStatus } from "../../types/Event";

const selectors = eventsAdapter.getSelectors<RootState>(
  (state) => state.events,
);

const selectAllEvents = selectors.selectAll;

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

export const selectInvitedEventsCount = createSelector(
  [selectors.selectAll, (state: RootState) => state.auth.userId],
  (events, userId) => {
    if (!userId) return 0;

    return events.filter((event) => event.participants[userId] !== undefined)
      .length;
  },
);

export const selectMyEventsWithFilter = createSelector(
  [
    selectors.selectAll,
    (state: RootState) => state.auth.userId,
    (_: RootState, filter: EventFilter) => filter,
  ],
  (events, userId, filter) => {
    if (!userId) return [];

    return events.filter((event) => {
      const isCreator = event.creatorId === userId;
      const myStatus = event.participants?.[userId];

      // 🔹 TYPE FILTER
      if (filter.type === "created" && !isCreator) return false;
      if (filter.type === "invited" && isCreator) return false;

      // 🔹 STATUS FILTER (uniquement si participant)
      if (filter.status) {
        if (!myStatus) return false;
        if (myStatus !== filter.status) return false;
      }

      return true;
    });
  },
);

export const selectParticipantsByStatus = createSelector(
  [
    (state: RootState, eventId: string) => state.events.entities[eventId],
    (state: RootState) => state.contacts.profilesById,
    (_: RootState, __: string, status?: ParticipantStatus) => status,
  ],
  (event, profilesById, status) => {
    if (!event) return [];

    return Object.entries(event.participants)
      .filter(([_, s]) => !status || s === status)
      .map(([userId, s]) => {
        const user = profilesById[userId];

        return {
          id: userId,
          name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
          status: s,
        };
      });
  },
);
