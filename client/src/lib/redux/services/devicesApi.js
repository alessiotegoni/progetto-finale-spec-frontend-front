import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

export const devicesApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Devices"],
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: ({ search, category } = {}) => {
        const searchParams = new URLSearchParams();
        if (search) searchParams.set("search", search);
        if (category) searchParams.set("category", category);
        return `/devices?${searchParams.toString()}`;
      },
      providesTags: (result, error, arg) => [
        { type: "Devices", id: "LIST" },
        ...result.map(({ id }) => ({ type: "Device", id })),
      ],
    }),
    getDeviceById: builder.query({
      query: (id) => `/devices/${id}`,
      providesTags: (result, error, id) => [{ type: "Devices", id }],
    }),
    createDevice: builder.mutation({
      query: (newPhone) => ({
        url: "/devices",
        method: "POST",
        body: newPhone,
      }),
      invalidatesTags: [{ type: "Devices", id: "LIST" }],
    }),
    updateDevice: builder.mutation({
      query: ({ id, ...updatedPhone }) => ({
        url: `/devices/${id}`,
        method: "PUT",
        body: updatedPhone,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Devices", id: "LIST" },
        { type: "Devices", id },
      ],
    }),
    deleteDevice: builder.mutation({
      query: (id) => ({
        url: `/devices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Devices", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useGetDeviceByIdQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;
