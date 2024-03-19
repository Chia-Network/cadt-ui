// Import the createApi and fetchBaseQuery utilities from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API service
export const getUserIp = createApi({
  // The reducerPath is a unique key that identifies this API slice in the Redux store
  reducerPath: 'getUserIp',

  // The baseQuery defines the base part of your requests (e.g., domain and headers)
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.datalayer.storage/user/v1/' }),

  // The "endpoints" represent operations you want to perform against your API
  endpoints: (builder) => ({
    // Define an endpoint for fetching data
    getUserIp: builder.query({
      // The "query" option describes how to make the request
      query: () => 'get_user_ip',
    }),
  }),
});

export const { useGetUserIpQuery } = getUserIp;