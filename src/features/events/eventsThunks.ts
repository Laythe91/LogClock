// src/features/events/eventsThunks.ts
import { AppDispatch, RootState } from "../../core/store";
import { addEvent, removeEvent, updateEventAction } from "./eventsSlice";
import { eventsApi } from "../../services/api/events.api";
import { eventMapper } from "./event.mapper";
import { EventForm, AppEvent } from "../../types/Event";
import uuid from "react-native-uuid";

export const createEvent =
  (form: EventForm) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const tempId = uuid.v4() as string;

    const optimisticEvent: AppEvent = {
      id: tempId,
      creatorId: userId,
      title: form.title,
      description: form.description,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd,
      allDay: form.allDay,
      location: form.location,
      participants: {
        [userId]: "accepted",
        ...Object.fromEntries(form.participants.map((id) => [id, "pending"])),
      },
    };

    // 1. optimistic UI
    dispatch(addEvent(optimisticEvent));
    console.log("EVENT AJOUTÉ AU STORE :", optimisticEvent);
    console.log("STATE EVENTS :", getState().events);

    try {
      // 2. API call
      const apiPayload = eventMapper.toApi(optimisticEvent);
      const saved = await eventsApi.createEvent(apiPayload);

      const normalized = eventMapper.fromApi(saved);

      // 3. replace temp event
      dispatch(removeEvent(tempId));
      dispatch(addEvent(normalized));
    } catch (err) {
      // rollback
      dispatch(removeEvent(tempId));
      console.log("ERREUR API -> rollback", tempId);
      console.log("STATE EVENTS :", getState().events);
    }
  };

export const updateEvent =
  (eventId: string, updates: Partial<AppEvent>) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previous = getState().events.entities[eventId];

    if (!previous) return;

    // optimistic update
    dispatch(
      updateEventAction({
        id: eventId,
        changes: updates,
      }),
    );

    try {
      const merged = {
        ...previous,
        ...updates,
      };

      const apiPayload = eventMapper.toApi(merged);

      const saved = await eventsApi.updateEvent(eventId, apiPayload);

      dispatch(
        updateEventAction({
          id: eventId,
          changes: eventMapper.fromApi(saved),
        }),
      );
    } catch {
      // rollback
      dispatch(
        updateEventAction({
          id: eventId,
          changes: previous,
        }),
      );
    }
  };

export const deleteEvent =
  (eventId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previous = getState().events.entities[eventId];

    if (!previous) return;

    // optimistic remove
    dispatch(removeEvent(eventId));

    try {
      await eventsApi.deleteEvent(eventId);
    } catch {
      // rollback
      dispatch(addEvent(previous));
    }
  };
