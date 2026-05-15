import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import { ContactStatus, Contact } from "../../types/Contact";

import DATA from "../../data";

export const contactsAdapter = createEntityAdapter<Contact>({
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

const currentUser = DATA.users.find((u) => u.id === "user2");

const initialState = contactsAdapter.getInitialState({
  currentUserId: "user2",

  relations: (currentUser?.contactsStatusCache ?? {}) as Record<
    string,
    ContactStatus
  >,
});

const hydratedState = contactsAdapter.setAll(initialState, DATA.userProfiles);

const contactsSlice = createSlice({
  name: "contacts",

  initialState: hydratedState,

  reducers: {
    addContact: contactsAdapter.addOne,

    addContacts: contactsAdapter.addMany,

    updateContact: contactsAdapter.updateOne,

    removeContact: contactsAdapter.removeOne,

    clearContacts: contactsAdapter.removeAll,

    updateContactStatus: (
      state,
      action: PayloadAction<{
        targetId: string;
        status: ContactStatus;
      }>,
    ) => {
      const { targetId, status } = action.payload;

      state.relations[targetId] = status;
    },
  },
});

export const {
  addContact,
  addContacts,
  updateContact,
  removeContact,
  clearContacts,
  updateContactStatus,
} = contactsSlice.actions;

export default contactsSlice.reducer;
