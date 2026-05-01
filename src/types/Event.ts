// src/types/Event.ts
export interface Event {
  id: string;
  title: string;
  description?: string;
  dateStart: string; // ISO string pour début
  dateEnd: string; // ISO string pour fin
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  participants: string[];
}
