// src/features/contacts/contactsThunk.ts
import { AppDispatch, RootState } from "../../core/store";
import { contactsApi } from "../../services/api/contacts.api";
import { contactsMapper } from "./contacts.mapper";
import {
  addContacts,
  updateContact,
  removeContact,
  updateContactStatus,
} from "./contactsSlice";
import { ContactStatus } from "../../types/Contact";
import { contactsService } from "./contacts.service";

export const fetchContacts = () => async (dispatch: AppDispatch) => {
  const contacts = await contactsService.fetchContacts();
  dispatch(addContacts(contacts));
};

export const changeContactStatus =
  (userId: string, status: ContactStatus) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previous = getState().contacts.entities[userId];

    if (!previous) return;

    // optimistic
    dispatch(
      updateContactStatus({
        targetId: userId,
        status,
      }),
    );

    try {
      await contactsService.updateStatus(userId, status);
    } catch {
      // rollback
      dispatch(
        updateContact({
          id: userId,
          changes: previous,
        }),
      );
    }
  };

export const deleteContact =
  (userId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previous = getState().contacts.entities[userId];

    if (!previous) return;

    // optimistic delete
    dispatch(removeContact(userId));

    try {
      await contactsService.deleteContact(userId);
    } catch {
      // rollback
      dispatch(addContacts([previous]));
    }
  };

export const blockUser =
  (userId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previousStatus = getState().contacts.relations[userId];

    if (!previousStatus) return;

    // optimistic update
    dispatch(
      updateContactStatus({
        targetId: userId,
        status: "blocked",
      }),
    );

    try {
      await contactsService.blockUser(userId);
    } catch {
      // rollback correct
      dispatch(
        updateContactStatus({
          targetId: userId,
          status: previousStatus,
        }),
      );
    }
  };

export const unblockUser =
  (userId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previousStatus = getState().contacts.relations[userId];

    if (!previousStatus) return;

    dispatch(
      updateContactStatus({
        targetId: userId,
        status: "accepted",
      }),
    );

    try {
      await contactsService.unblockUser(userId);
    } catch {
      dispatch(
        updateContactStatus({
          targetId: userId,
          status: previousStatus,
        }),
      );
    }
  };
