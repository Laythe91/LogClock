// src/features/calendar/calendarService.ts
import * as Calendar from "expo-calendar";
import { Event } from "../../types/Event";

export const getCalendars = async () => {
  return await Calendar.getCalendarsAsync();
};

export const addEventToCalendar = async (event: Event) => {
  const calendars = await getCalendars();
  const defaultCalendar =
    calendars.find((cal) => cal.isPrimary) || calendars[0];
  if (!defaultCalendar) return;

  const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
    title: event.title,
    startDate: new Date(event.dateStart),
    endDate: new Date(event.dateEnd),
    notes: event.description,
    location: event.location
      ? `${event.location.latitude}, ${event.location.longitude}`
      : undefined,
    timeZone: "GMT+1",
  });

  return eventId;
};
