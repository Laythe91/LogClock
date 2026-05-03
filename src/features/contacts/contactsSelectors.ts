import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../core/store";
import { ContactStatus } from "../../types/Contact";

const selectContactsState = (state: RootState) => state.contacts;

export const selectUserById = (state: RootState, userId: string) =>
  state.contacts.profilesById[userId];

export const selectUserFullName = (state: RootState, userId: string) => {
  const user = state.contacts.profilesById[userId];
  return user ? `${user.firstName} ${user.lastName}` : "Unknown";
};

export const selectContactsByFilter = createSelector(
  [
    (state: RootState) => state.contacts.relations,
    (state: RootState) => state.contacts.profilesById,
    (_: RootState, filter: ContactStatus) => filter,
  ],
  (relations, profilesById, filter) => {
    return Object.entries(relations)
      .filter(([, status]) => status === filter)
      .map(([userId]) => profilesById[userId])
      .filter(Boolean);
  },
);
