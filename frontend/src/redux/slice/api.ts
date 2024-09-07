import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Home, User } from "../../types";

interface HomeMutationType {
  street_address: string;
  usernames: string[];
}

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Home"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/user/find-all",
    }),
    getHomesByUser: builder.query<Home[], string>({
      query: (username) => "/home/find-by-user/" + username,
      providesTags: ["Home"],
    }),
    // find-by-user/:username
    getUserByHome: builder.query<User[], string>({
      query: (street_address) => "/user/find-by-home/" + street_address,
      providesTags: ["Home"],
    }),
    setUserOfHome: builder.mutation<Home, HomeMutationType>({
      query: ({ street_address, usernames }) => {
        return {
          url: `/home/update-user/${street_address}`,
          method: "PATCH",
          body: { usernames },
        };
      },
      invalidatesTags: ["Home"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useGetUserByHomeQuery,
  useSetUserOfHomeMutation,
} = api;
