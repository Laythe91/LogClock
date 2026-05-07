// src/features/events/eventsThunks.ts

import { AppDispatch, RootState } from "../../core/store";
import { addEvent, removeEvent, createEvent } from "./eventsSlice";
import { eventMapper } from "./event.mapper";
import { eventsApi } from "./eventsApi";
import { EventForm, ParticipantStatus, AppEvent } from "../../types/Event";
import uuid from "react-native-uuid";

export const createEvent =
  (form: EventForm) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState();
    const userId = auth.userId;

    if (!userId) return;

    // 1. ID temporaire
    const tempId = uuid.v4() as string;

    // 2. participants → map object
    const participants: Record<string, ParticipantStatus> = {
      [userId]: "accepted",
      ...form.participants.reduce<Record<string, ParticipantStatus>>(
        (acc, id) => {
          acc[id] = "pending";
          return acc;
        },
        {},
      ),
    };

    // 3. EVENT OPTIMISTIC (Redux state)
    const optimisticEvent: AppEvent = {
      id: tempId,
      creatorId: userId,
      title: form.title,
      description: form.description,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd,
      allDay: form.allDay,
      location: form.location,
      participants,
    };

    // 4. Optimistic update UI
    dispatch(addEvent(optimisticEvent));

    console.log("🟢 OPTIMISTIC ADD:", optimisticEvent);
    console.log("STATE AFTER ADD:", getState().events);

    try {
      // 5. API CALL
      const apiPayload = eventMapper.toApi(optimisticEvent);
      const saved = await eventsApi.createEvent(apiPayload);

      // 6. NORMALISATION BACK
      const normalized = eventMapper.fromApi(saved);

      // 7. REPLACE TEMP EVENT
      dispatch(removeEvent(tempId));
      dispatch(addEvent(normalized));

      console.log("🟢 EVENT SAVED:", normalized);
      console.log("STATE FINAL:", getState().events);
    } catch (error) {
      // 8. ROLLBACK
      console.error("🔴 API ERROR → rollback", error);

      dispatch(removeEvent(tempId));

      console.log("STATE AFTER ROLLBACK:", getState().events);
    }
  };
