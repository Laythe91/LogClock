import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../core/store";

import { ContactStatus } from "../../types/Contact";

import { contactsAdapter } from "./contactsSlice";

export const contactsSelectors = contactsAdapter.getSelectors(
  (state: RootState) => state.contacts,
);

export const selectContactsState = (state: RootState) => state.contacts;

export const selectUserById = (state: RootState, userId: string) =>
  contactsSelectors.selectById(state, userId);

export const selectUserFullName = (state: RootState, userId: string) => {
  const user = contactsSelectors.selectById(state, userId);

  return user ? `${user.firstName} ${user.lastName}` : "Unknown";
};

export const selectContactsByFilter = createSelector(
  [
    (state: RootState) => state.contacts.relations,

    (state: RootState) => state.contacts.entities,

    (_: RootState, filter: ContactStatus) => filter,
  ],

  (relations, entities, filter) => {
    return Object.entries(relations)
      .filter(([, status]) => status === filter)

      .map(([userId]) => entities[userId])

      .filter(Boolean);
  },
);

export const selectInvitableContacts = createSelector(
  [
    (state: RootState) => state.contacts.relations,

    (state: RootState) => state.contacts.entities,

    (state: RootState) => state.contacts.currentUserId,
  ],

  (relations, entities, currentUserId) => {
    return Object.entries(relations)
      .filter(([id, status]) => status === "accepted" && id !== currentUserId)

      .map(([id]) => entities[id])

      .filter(Boolean);
  },
);

export const selectAcceptedContacts = createSelector(
  [contactsSelectors.selectAll, (state: RootState) => state.contacts.relations],

  (contacts, relations) => {
    return contacts.filter((c) => relations[c.id] === "accepted");
  },
);

export const selectPendingContacts = createSelector(
  [contactsSelectors.selectAll, (state: RootState) => state.contacts.relations],
  (contacts, relations) =>
    contacts.filter((c) => relations[c.id] === "pending"),
);

export const selectBlockedContacts = createSelector(
  [contactsSelectors.selectAll, (state: RootState) => state.contacts.relations],
  (contacts, relations) =>
    contacts.filter((c) => relations[c.id] === "blocked"),
);

export const selectRefusedContacts = createSelector(
  [contactsSelectors.selectAll, (state: RootState) => state.contacts.relations],
  (contacts, relations) =>
    contacts.filter((c) => relations[c.id] === "refused"),
);

export const selectContactStatus = (state: RootState, userId: string) =>
  state.contacts.relations[userId];
