import { AppEvent } from "../../types/Event";
import { eventsApi } from "../../services/api/events.api";
import { eventMapper } from "./event.mapper";

export const eventsService = {
  async createEvent(event: AppEvent): Promise<AppEvent> {
    const dto = eventMapper.toApi(event);

    const response = await eventsApi.create(dto);

    return eventMapper.fromApi(response.data);
  },

  async updateEvent(id: string, event: AppEvent): Promise<AppEvent> {
    const dto = eventMapper.toApi(event);

    const response = await eventsApi.update(id, dto);

    return eventMapper.fromApi(response.data);
  },

  async deleteEvent(id: string) {
    await eventsApi.remove(id);
  },

  async fetchEvents(): Promise<AppEvent[]> {
    const response = await eventsApi.getAll();

    return response.data.map(eventMapper.fromApi);
  },
};
