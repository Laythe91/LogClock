import { AppEvent, ApiEvent } from "../../types/Event";

export const eventMapper = {
  fromApi: (e: ApiEvent): AppEvent => ({
    id: e.id,
    creatorId: e.creatorId,
    title: e.title,
    description: e.description,

    dateStart: new Date(e.dateStart).getTime(),
    dateEnd: new Date(e.dateEnd).getTime(),

    allDay: e.allDay ?? false,

    createdAt: e.createdAt,

    location: e.location,

    participants: e.participants,
  }),

  toApi: (e: AppEvent): ApiEvent => ({
    id: e.id,
    creatorId: e.creatorId,
    title: e.title,
    description: e.description,

    dateStart: new Date(e.dateStart).toISOString(),
    dateEnd: new Date(e.dateEnd).toISOString(),

    allDay: e.allDay,

    createdAt: e.createdAt,

    location: e.location,

    participants: e.participants,
  }),
};
