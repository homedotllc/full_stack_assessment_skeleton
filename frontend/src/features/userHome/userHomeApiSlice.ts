import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface FindByUseResponse {
  total: number
  page: number
  pageSize: number
  totalPages: number
  result: FindByUseResult[]
}

export interface FindByUseResult {
  id: number
  street_address: string
  state: string
  zip: string
  sqft: string
  beds: number
  baths: number
  list_price: string
}

// Define a service using a base URL and expected endpoints
export const userHomeApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/"
  }),
  reducerPath: "userHomeApiSlice",
  // Tag types are used for caching and invalidation.
  tagTypes: ["UserHome"],
  endpoints: build => ({
    getFindByUser: build.query<FindByUseResponse, number>({
      query: (userId, pageSize = 50, page = 1) =>
        `home/find-by-user/${userId}?pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, id) => [{ type: "UserHome", id }]
    })
  })
})

export const { useGetFindByUserQuery } = userHomeApiSlice
