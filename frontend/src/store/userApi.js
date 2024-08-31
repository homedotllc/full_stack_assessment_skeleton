import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Set your base URL here
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => '/user/find-all',
    }),
    fetchHomesByUser: builder.query({
      query: (id) => `/home/find-by-user?userId=${id}`, // Use 'id' instead of 'userId'
    }),
    fetchUsersByHome: builder.query({
      query: (streetAddress) => `/user/find-by-home?street_address=${streetAddress}`,
    }),
    updateUsersForHome: builder.mutation({
      query: ({ streetAddress, users }) => ({
        url: '/home/update-users',
        method: 'POST',
        body: { streetAddress, users },
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