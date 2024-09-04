import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "user/find-all",
    }),
    getUsersByHome: builder.query({
      query: (homeId) => `/home/get-users-by-home/${homeId}`,
    }),
    getHomesByUser: builder.query({
      query: (userId) => `home/find-by-user/${userId}`,
    }),
    updateUsersForHome: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: `home/update-users/${homeId}`, // No leading slash
        method: "PUT",
        body: { userIds }, // Sending the correct body
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersByHomeQuery,
  useGetHomesByUserQuery,
  useUpdateUsersForHomeMutation,
} = apiSlice;
