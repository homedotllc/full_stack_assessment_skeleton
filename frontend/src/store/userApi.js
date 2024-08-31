// src/store/userApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => '/user/find-all',
    }),
    fetchHomesByUser: builder.query({
      query: ({ userId, page }) => `/home/find-by-user?userId=${userId}&page=${page}`,
    }),
    fetchUsersByHome: builder.query({
      query: (streetAddress) => `/user/find-by-home?street_address=${streetAddress}`,
    }),
    updateUsersForHome: builder.mutation({
      query: ({ homeid, userIds }) => ({
        url: '/home/update-users',
        method: 'PUT',
        body: {
          homeid,
          userIds, // Updated to match the new request body format
        },
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchHomesByUserQuery,
  useFetchUsersByHomeQuery,
  useUpdateUsersForHomeMutation,
} = userApi;
