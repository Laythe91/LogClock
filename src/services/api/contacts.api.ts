// src/services/api/contacts.api.ts
import { axiosClient } from "./axiosClient";
import { Contact } from "../../types/Contact";

export type ApiContact = Contact;

export const contactsApi = {
  getContacts: async (): Promise<ApiContact[]> => {
    const { data } = await axiosClient.get("/contacts");
    return data;
  },

  updateContactStatus: async (
    userId: string,
    status: string,
  ): Promise<{ userId: string; status: string }> => {
    const { data } = await axiosClient.patch(`/contacts/${userId}`, {
      status,
    });
    return data;
  },

  deleteContact: async (userId: string): Promise<string> => {
    await axiosClient.delete(`/contacts/${userId}`);
    return userId;
  },

  blockUser: async (targetId: string): Promise<void> => {
    await axiosClient.patch(`/contacts/${targetId}/block`);
  },

  unblockUser: async (targetId: string): Promise<void> => {
    await axiosClient.patch(`/contacts/${targetId}/unblock`);
  },
};
