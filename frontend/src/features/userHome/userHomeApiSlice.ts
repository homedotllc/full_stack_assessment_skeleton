import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface FindByUserResponse {
  total: number
  page: number
  pageSize: number
  totalPages: number
  result: HomeInfo[]
}
export interface FindByUserRequest {
  userId: number
  pageSize?: number
  page?: number
}

export interface HomeInfo {
  id: number
  street_address: string
  state: string
  zip: string
  sqft: string
  beds: number
  baths: number
  list_price: string
}

export interface AllUsersResponse {
  result: UserInfo[]
}

export interface UserInfo {
  id: number
  username: string
  email: string
}

// Define a service using a base URL and expected endpoints
export const userHomeApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/"
  }),
  reducerPath: "userHomeApiSlice",
  tagTypes: ["UserHome"],
  endpoints: build => ({
    // Set types for input in pagination (assuming)
    getFindByUser: build.query<FindByUserResponse, FindByUserRequest>({
      query: ({ userId, pageSize = 50, page = 1 }) =>
        `home/find-by-user/${userId}?pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, { userId }) => [
        { type: "UserHome", id: userId }
      ]
    }),
    getAllUsers: build.query<AllUsersResponse, void>({
      query: () => `/user/find-all`,
      providesTags: (result, error) => [{ type: "UserHome" }]
    })
  })
})

export const { useGetFindByUserQuery, useGetAllUsersQuery } = userHomeApiSlice
