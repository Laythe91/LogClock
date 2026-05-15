// src/types/Friend.ts
export interface Contact {
  id: string;

  firstName: string;
  lastName: string;

  email?: string;
  phone?: string;

  avatarUrl?: string;
  profileImage?: string;

  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;

    lat?: number;
    lng?: number;
    updatedAt?: string;
  };

  addedAt?: string;
}

export type ContactStatus = "accepted" | "pending" | "blocked" | "refused";
export type ContactFilter = "accepted" | "pending" | "blocked" | "refused";

export type ContactsTabParamList = {
  Accepted: { filter: ContactFilter };
  Pending: { filter: ContactFilter };
  Blocked: { filter: ContactFilter };
};
