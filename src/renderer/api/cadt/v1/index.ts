import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const projectsTag: string = 'projects';
const organizationsTag: string = 'organizations';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

export { projectsTag, organizationsTag};

export const cadtApi = createApi({
  baseQuery,
  reducerPath: 'cadtApi',
  tagTypes: [projectsTag, organizationsTag],
  endpoints: () => ({}),
});
