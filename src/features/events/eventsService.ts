import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiEvent } from "../../types/Event";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api.com",
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<ApiEvent[], void>({
      query: () => "/events",
      providesTags: ["Events"],
    }),

    createEvent: builder.mutation<ApiEvent, CreateEventDto>({
      query: (event) => ({
        url: "/events",
        method: "POST",
        body: event,
      }),
      invalidatesTags: ["Events"],
    }),

    updateEvent: builder.mutation<ApiEvent, ApiEvent>({
      query: (event) => ({
        url: `/events/${event.id}`,
        method: "PUT",
        body: event,
      }),
      invalidatesTags: ["Events"],
    }),

    deleteEvent: builder.mutation<string, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
