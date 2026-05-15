import { AppDispatch, RootState } from "../../core/store";

import { addEvent, removeEvent, updateEventAction } from "./eventsSlice";

import { EventForm, AppEvent } from "../../types/Event";

import uuid from "react-native-uuid";

import { eventsService } from "./events.service";

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

      isOptimistic: true,
    };

    // optimistic UI
    dispatch(addEvent(optimisticEvent));

    try {
      const savedEvent = await eventsService.createEvent(optimisticEvent);

      // replace optimistic version
      dispatch(removeEvent(tempId));

      dispatch(addEvent(savedEvent));
    } catch (error) {
      // rollback
      dispatch(removeEvent(tempId));

      console.log("CREATE EVENT FAILED", error);
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
      const mergedEvent = {
        ...previous,
        ...updates,
      };

      const saved = await eventsService.updateEvent(eventId, mergedEvent);

      dispatch(
        updateEventAction({
          id: eventId,
          changes: saved,
        }),
      );
    } catch (error) {
      // rollback
      dispatch(
        updateEventAction({
          id: eventId,
          changes: previous,
        }),
      );

      console.log("UPDATE FAILED", error);
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
      await eventsService.deleteEvent(eventId);
    } catch (error) {
      // rollback
      dispatch(addEvent(previous));

      console.log("DELETE FAILED", error);
    }
  };
