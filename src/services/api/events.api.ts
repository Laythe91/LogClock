import { axiosClient } from "./axiosClient";
import { ApiEvent, CreateEventDto } from "../../types/Event";

export const eventsApi = {
  create: async (dto: CreateEventDto) => {
    return axiosClient.post<ApiEvent>("/events", dto);
  },

  update: async (id: string, dto: Partial<ApiEvent>) => {
    return axiosClient.put<ApiEvent>(`/events/${id}`, dto);
  },

  getAll: async () => {
    return axiosClient.get<ApiEvent[]>("/events");
  },

  remove: async (id: string) => {
    return axiosClient.delete(`/events/${id}`);
  },
};
