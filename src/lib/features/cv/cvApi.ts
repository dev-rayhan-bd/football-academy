import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cvApi = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Dummy base URL
  tagTypes: ["Player", "Coach"],
  endpoints: (builder) => ({
    getPlayerProfile: builder.query<any, string>({
      query: (id) => `player/${id}`,
      providesTags: ["Player"],
    }),
    updatePlayerProfile: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `player/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Player"],
    }),
    getCoachProfile: builder.query<any, string>({
      query: (id) => `coach/${id}`,
      providesTags: ["Coach"],
    }),
    updateCoachProfile: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `coach/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),
  }),
});

export const {
  useGetPlayerProfileQuery,
  useUpdatePlayerProfileMutation,
  useGetCoachProfileQuery,
  useUpdateCoachProfileMutation,
} = cvApi;
