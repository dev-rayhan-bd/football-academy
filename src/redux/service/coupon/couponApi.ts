
import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupons: builder.mutation({
      query: ({ payload }) => ({
        url: "/coupon",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getCoupons: builder.query({
      query: (params) => ({
        url: "/coupon",
        method: "GET",
        params,
      }),
      providesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, payload }: { id: string; payload: FormData }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponsMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
