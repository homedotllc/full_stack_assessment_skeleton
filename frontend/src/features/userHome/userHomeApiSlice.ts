import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  AllUsersResponse,
  FindHomeByUserIdRequest,
  FindHomeByUserIdResponse,
  FindUserByHomeIdRequest,
  UpdateUserPayload
} from "./types"

// Define a service using a base URL and expected endpoints
export const userHomeApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/"
  }),
  reducerPath: "userHomeApiSlice",
  tagTypes: ["User", "Home"],
  endpoints: build => ({
    // Set types for input in pagination (assuming)
    getHomeByUserId: build.query<
      FindHomeByUserIdResponse,
      FindHomeByUserIdRequest
    >({
      query: ({ userId, pageSize = 50, page = 1 }) =>
        `home/find-by-user/${userId}?pageSize=${pageSize}&page=${page}`,
      providesTags: result =>
        result?.result
          ? [
              ...result.result.map(({ id }) => ({ type: "Home" as const, id })),
              { type: "Home", id: "LIST" }
            ]
          : [{ type: "Home", id: "LIST" }]

      //    [
      //   { type: "Home", id: userId }
      // ]
    }),
    getAllUsers: build.query<AllUsersResponse, void>({
      query: () => `user/find-all`,
      providesTags: () => [{ type: "User" }]
    }),
    getUserByHomeId: build.query<AllUsersResponse, FindUserByHomeIdRequest>({
      query: ({ homeId }) => `user/find-by-home/${homeId}`,
      providesTags: (_, __, { homeId }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: homeId }
      ]
    }),
    updateUsers: build.mutation<void, UpdateUserPayload>({
      query: payload => ({
        url: "home/update-users",
        method: "POST",
        body: payload
      }),
      invalidatesTags: [
        { type: "Home", id: "LIST" },
        { type: "User", id: "LIST" }
      ]
    })
  })
})

export const {
  useGetHomeByUserIdQuery,
  useGetAllUsersQuery,
  useGetUserByHomeIdQuery,
  useUpdateUsersMutation
} = userHomeApiSlice
