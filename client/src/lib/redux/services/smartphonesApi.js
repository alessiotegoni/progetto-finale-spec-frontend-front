import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

export const smartphonesApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Smartphones"],
  endpoints: (builder) => ({
    getSmartphones: builder.query({
      query: ({ title, category } = {}) => {
        const searchParams = new URLSearchParams();
        if (title) searchParams.set("search", title);
        if (category) searchParams.set("category", category);
        return `/smartphones?${searchParams.toString()}`;
      },
    }),
    getSmartphoneById: builder.query({
      query: (id) => `/smartphones/${id}`,
    }),
    createSmartphone: builder.mutation({
      query: (newPhone) => ({
        url: "/smartphones",
        method: "POST",
        body: newPhone,
      }),
    }),
    updateSmartphone: builder.mutation({
      query: ({ id, ...updatedPhone }) => ({
        url: `/smartphones/${id}`,
        method: "PUT",
        body: updatedPhone,
      }),
    }),
    deleteSmartphone: builder.mutation({
      query: (id) => ({
        url: `/smartphones/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSmartphonesQuery,
  useGetSmartphoneByIdQuery,
  useCreateSmartphoneMutation,
  useUpdateSmartphoneMutation,
  useDeleteSmartphoneMutation,
} = smartphonesApi;
