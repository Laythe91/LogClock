import { axiosClient } from "./axiosClient";
import { ApiEvent, CreateEventDto } from "../../types/Event";

export const eventsApi = {
  createEvent: async (dto: CreateEventDto): Promise<ApiEvent> => {
    const { data } = await axiosClient.post("/events", dto);
    return data;
  },

  updateEvent: async (
    id: string,
    event: Partial<ApiEvent>,
  ): Promise<ApiEvent> => {
    const { data } = await axiosClient.put(`/events/${id}`, event);

    return data;
  },

  getEvents: async (): Promise<ApiEvent[]> => {
    const { data } = await axiosClient.get("/events");
    return data;
  },

  deleteEvent: async (id: string) => {
    await axiosClient.delete(`/events/${id}`);
    return id;
  },
};
