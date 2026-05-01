import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../core/store";

const selectContactsState = (state: RootState) => state.contacts;

export const selectContactsByFilter = createSelector(
  [selectContactsState, (_: RootState, filter: string) => filter],
  (contactsState, filter) => {
    const currentUserRelation = contactsState.usersRelations.find(
      (user) => user.id === contactsState.currentUserId,
    );

    if (!currentUserRelation) return [];

    const statusMap = currentUserRelation.contactsStatusCache;

    const filteredUserIds = Object.entries(statusMap)
      .filter(([, status]) => status === filter)
      .map(([userId]) => userId);

    return contactsState.allProfiles.filter((profile) =>
      filteredUserIds.includes(profile.id),
    );
  },
);

export const selectUserById = (state: RootState, userId: string) =>
  state.contacts.allProfiles.find((u) => u.id === userId);

export const selectUserFullName = (state: RootState, userId: string) => {
  const user = state.contacts.allProfiles.find((u) => u.id === userId);
  if (!user) return "Unknown";
  return `${user.firstName} ${user.lastName}`;
};
