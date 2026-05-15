// src/features/contacts/contacts.mapper.ts
import { Contact } from "../../types/Contact";
import { ApiContact } from "../../services/api/contacts.api";

export const contactsMapper = {
  fromApi: (c: ApiContact): Contact => ({
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone,
    profileImage: c.profileImage,
    location: c.location,
    status: c.status,
    addedAt: c.addedAt,
  }),

  toApi: (c: Contact): ApiContact => ({
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone,
    profileImage: c.profileImage,
    location: c.location,
    status: c.status,
    addedAt: c.addedAt,
  }),
};
