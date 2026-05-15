import { contactsApi } from "../../services/api/contacts.api";
import { contactsMapper } from "./contacts.mapper";
import { Contact, ContactStatus } from "../../types/Contact";

export const contactsService = {
  fetchContacts: async () => {
    const data = await contactsApi.getContacts();
    return data.map(contactsMapper.fromApi);
  },

  updateStatus: async (userId: string, status: ContactStatus) => {
    return contactsApi.updateContactStatus(userId, status);
  },

  deleteContact: async (userId: string) => {
    return contactsApi.deleteContact(userId);
  },

  blockUser: async (userId: string) => {
    return contactsApi.blockUser(userId);
  },

  unblockUser: async (userId: string) => {
    return contactsApi.unblockUser(userId);
  },
};
