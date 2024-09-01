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
      query: (homeid) => `/user/find-by-home?homeId=${homeid}`,
    }),


    updateUsersForHome: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: '/home/update-users',
        method: 'PUT',
        body: {
          homeId,
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
