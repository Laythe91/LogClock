import { ContactStatus } from "./Contact";

export type ParticipantStatus = "accepted" | "pending" | "declined";

export interface AppEvent {
  id: string;
  creatorId: string; // Indispensable pour vérifier les droits d'édition
  title: string;
  description?: string;
  dateStart: number; // 👈 IMPORTANT
  dateEnd: number;
  allDay: boolean;

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

export type MainEventFilter = "created" | "invited";

export type EventFilter = {
  type?: "created" | "invited";
  status?: ParticipantStatus;
};

export type RootStackParamList = {
  Events: { filter: MainEventFilter };
  EventDetails: { eventId: string; filter?: MainEventFilter };
  //EventForm: { eventId?: string };
  Contacts: { filter: ParticipantStatus };
  EventCreate: {
    selectedDate?: string;
    eventId?: string;
  };
};

export type ApiEvent = {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  dateStart: string;
  dateEnd: string;
  allDay?: boolean;
  createdAt?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  participants: Record<string, ParticipantStatus>;
};

export type EventForm = {
  title: string;
  description?: string;

  dateStart: number;
  dateEnd: number;

  allDay: boolean;

  location: {
    lat: number;
    lng: number;
    address?: string;
  };

  participants: string[]; // userIds sélectionnés
};

export type CreateEventDto = Omit<ApiEvent, "id" | "createdAt">;

export type EventDetails = Omit<AppEvent, "participants"> & {
  creator: {
    id: string;
    name: string;
  } | null;

  participants: {
    id: string;
    name: string;
    status: ParticipantStatus;
  }[];
};

export type EventRole = {
  isOwner: boolean;
  isInvited: boolean;
  isParticipant: boolean;
  myStatus?: ParticipantStatus;
};
