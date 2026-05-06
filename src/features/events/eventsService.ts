import { eventMapper } from "./event.mapper";
import { ApiEvent } from "../../types/Event";

export const eventsService = {
  createEvent: async (event: ApiEvent) => {
    // firebase / api call
    const res = await fetch("/events", {
      method: "POST",
      body: JSON.stringify(event),
    });

    return res.json();
  },
};
