import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL of your NestJS backend
const BASE_URL = 'http://localhost:4000';

// Define the types for the user and API responses
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UpdateUsersRequest {
  homeId: number;
  userIds: number[];
}

// Create the API slice
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Fetch users by home ID
    getUsers: builder.query<User[], void>({
        query: () => ({
            url:`user/find-all`,
            method: 'GET'
        }), // URL of the endpoint on your NestJS backend
    }),
//  - **/user/find-by-home**
    getUserByHomeId: builder.query<User[],number>({
        query: (userId) =>({
            url:`user/find-by-home/${userId}`,
            method: 'GET'
        }),
    })
  }),
});

// Export the auto-generated hooks for the queries and mutations
export const { useGetUsersQuery, useGetUserByHomeIdQuery } = usersApi;
export {};