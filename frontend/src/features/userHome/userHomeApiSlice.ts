import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  AllUsersResponse,
  FindHomeByUserIdRequest,
  FindHomeByUserIdResponse,
  FindUserByHomeIdRequest
} from "./types"

// Define a service using a base URL and expected endpoints
export const userHomeApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/"
  }),
  reducerPath: "userHomeApiSlice",
  tagTypes: ["UserHome"],
  endpoints: build => ({
    // Set types for input in pagination (assuming)
    getHomeByUserId: build.query<
      FindHomeByUserIdResponse,
      FindHomeByUserIdRequest
    >({
      query: ({ userId, pageSize = 50, page = 1 }) =>
        `home/find-by-user/${userId}?pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, { userId }) => [
        { type: "UserHome", id: userId }
      ]
    }),
    getAllUsers: build.query<AllUsersResponse, void>({
      query: () => `user/find-all`,
      providesTags: (result, error) => [{ type: "UserHome" }]
    }),
    getUserByHomeId: build.query<AllUsersResponse, FindUserByHomeIdRequest>({
      query: ({ homeId }) => `user/find-by-home/${homeId}`,
      providesTags: (result, error, { homeId }) => [
        { type: "UserHome", id: homeId }
      ]
    })
  })
})

export const {
  useGetHomeByUserIdQuery,
  useGetAllUsersQuery,
  useGetUserByHomeIdQuery
} = userHomeApiSlice
