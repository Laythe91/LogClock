export interface Location {
  lat: number;
  lng: number;
  updatedAt?: string;
}

export interface FriendRelation {
  status: "accepted" | "pending" | "blocked" | "refused";
  addedAt: string;
}

export interface ContactsStatusCache {
  accepted: string[];
  pending: string[];
  blocked: string[];
  refused: string[];
}

export interface User {
  id: string;
  location: Location;

  contacts: Record<string, FriendRelation>;

  contactsStatusCache: ContactsStatusCache;

  myEvents: {
    created: string[];
    invited: string[];
  };
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
}

// Type combiné pour ton écran de profil
export type FullUserData = User & UserProfile;
