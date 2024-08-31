import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    fetchHomes: builder.query({
      query: () => '/home',
    }),
  }),
});

export const { useFetchHomesQuery } = homeApi;
