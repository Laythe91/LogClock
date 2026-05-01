export type ParticipantStatus = "accepted" | "pending" | "declined";

export interface Event {
  id: string;
  creatorId: string; // Indispensable pour vérifier les droits d'édition
  title: string;
  description?: string;
  dateStart: string;
  dateEnd: string;
  createdAt?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  // Utilisation d'un objet (Map) pour les participants comme dans ton DATA
  participants: {
    [userId: string]: ParticipantStatus;
  };
}
// Comme ton ContactFilter
export type EventFilter =
  | "created"
  | "invited"
  | "pending"
  | "accepted"
  | "declined";
