import { baseApi } from "@/redux/api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
      providesTags: ["Auth", "User", "Coupon", "Video"],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
