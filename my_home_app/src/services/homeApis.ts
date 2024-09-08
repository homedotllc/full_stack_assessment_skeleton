import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./usersApi";

const BASE_URL = "http://localhost:4000";

export interface Home {
  id: number;
  street_address: string;
  list_price: number;
  state: string;
  zip: number;
  sqft: number;
  beds: number;
  baths: number;
}

//  - **/home/find-by-user**
// **/home/update-users**
export const homesApi = createApi({
  reducerPath: "homesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getHomesByUserId: builder.query<Home[], number>({
      query: (userId) => ({
        url: `home/find-by-user/${userId}`,
        method: "GET",
      }),
    }),

    updateHomeUsers: builder.mutation<
      User[],
      { homeId: number; userIds: number[] }
    >({
      query({ homeId, userIds }) {
        return {
          url: `home/update-users/${homeId}`,
          method: "PUT",
          body: userIds,
        };
      },
    }),
  }),
});

export const { useGetHomesByUserIdQuery, useUpdateHomeUsersMutation } =
  homesApi;
export {};
