import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const projectsTag: string = 'projects';
const organizationsTag: string = 'organizations';
const unitsTag: string = 'projects';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

export { projectsTag, organizationsTag, unitsTag};

export const cadtApi = createApi({
  baseQuery,
  reducerPath: 'cadtApi',
  tagTypes: [projectsTag, organizationsTag, unitsTag],
  endpoints: () => ({}),
});
