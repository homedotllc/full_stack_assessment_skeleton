// src/store/userApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => '/user/find-all',
     
      keepUnusedDataFor: 60, // Cache data for 60 seconds before considering it "unused"
    }),
    fetchHomesByUser: builder.query({
      query: ({ userId, page }) => `/home/find-by-user?userId=${userId}&page=${page}`,
      
      keepUnusedDataFor: 60, 
    }),
    fetchUsersByHome: builder.query({
      query: (homeId) => `/user/find-by-home?homeId=${homeId}`,
     
      keepUnusedDataFor: 60, 
    }),
    updateUsersForHome: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: '/home/update-users',
        method: 'PUT',
        body: {
          homeId,
          userIds,
        },
      }),
      // Optionally invalidate cache after mutation
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        
          dispatch(userApi.util.invalidateTags([{ type: 'Homes', id: arg.homeId }]));
        } catch (error) {
          // Handle error if needed

          console.error('Error updating users:', error);
        }
      },
    }),
  }),
  
  tagTypes: ['Users', 'Homes'],
});

export const {
  useFetchUsersQuery,
  useFetchHomesByUserQuery,
  useFetchUsersByHomeQuery,
  useUpdateUsersForHomeMutation,
} = userApi;
