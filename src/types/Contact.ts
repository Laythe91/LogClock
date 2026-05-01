// src/types/Friend.ts
export interface Contact {
  id: string;
  // Propriétés de base conservées
  name?: string;
  email?: string;
  avatarUrl?: string;
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
    // Ajout pour matcher avec DATA (lat/lng/updatedAt)
    lat?: number;
    lng?: number;
    updatedAt?: string;
  };

  // --- AJOUTS POUR MATCHER DATA & COMPONENTS ---
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string; // Utilisé dans tes composants à la place d'avatarUrl

  // Pour la logique de relation (contactsStatusCache)
  status?: "accepted" | "pending" | "blocked" | "refused";
  addedAt?: string;
}

export type ContactStatus = "accepted" | "pending" | "blocked" | "refused";
