import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

export const smartphonesApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Smartphones"],
  endpoints: (builder) => ({
    getSmartphones: builder.query({
      query: ({ search } = {}) => {
        const searchParams = new URLSearchParams();
        if (search) searchParams.set("search", search);
        // if (category) searchParams.set("category", category);
        return `/smartphones?${searchParams.toString()}`;
      },
      providesTags: (result, error, arg) => [
        { type: "Smartphones", id: "LIST" },
        ...result.map(({ id }) => ({ type: "Smartphone", id })),
      ],
    }),
    getSmartphoneById: builder.query({
      query: (id) => `/smartphones/${id}`,
      providesTags: (result, error, id) => [{ type: "Smartphones", id }],
    }),
    createSmartphone: builder.mutation({
      query: (newPhone) => ({
        url: "/smartphones",
        method: "POST",
        body: newPhone,
      }),
      invalidatesTags: [{ type: "Smartphones", id: "LIST" }],
    }),
    updateSmartphone: builder.mutation({
      query: ({ id, ...updatedPhone }) => ({
        url: `/smartphones/${id}`,
        method: "PUT",
        body: updatedPhone,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Smartphones", id: "LIST" },
        { type: "Smartphones", id },
      ],
    }),
    deleteSmartphone: builder.mutation({
      query: (id) => ({
        url: `/smartphones/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Smartphones", id: "LIST" }],
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
