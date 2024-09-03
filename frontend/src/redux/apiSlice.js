import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getHomes: builder.query({
      query: ({userId, page = 1, take = 5}) => `home/find-by-user/${userId}?page=${page}&take=${take}`,
    }),
    getUsers: builder.query({
      query: () => '/user/find-all',
    }),
    getUsersByHomeId: builder.query({
      query: (homeId) => `/user/find-by-home/${homeId}`,
    }),
    updateUserHomes: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: `/home/update-users`,
        method: 'PUT',
        body: { homeId, userIds },
      }),
    }),
  }),
});

export const { useGetHomesQuery, useGetUsersQuery, useUpdateUserHomesMutation, useGetUsersByHomeIdQuery } = apiSlice;
export default apiSlice;
