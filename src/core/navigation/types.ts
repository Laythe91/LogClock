import { ContactStatus } from "../../types/Contact";

export type RootStackParamList = {
  Events: { filter: string };
  EventDetails: { eventId: string };
  Contacts: { filter: ContactStatus };
};
