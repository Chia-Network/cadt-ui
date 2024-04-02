import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const projectsTag: string = 'projects';
const organizationsTag: string = 'organizations';
const unitsTag: string = 'projects';
const auditTag: string = 'audit';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

export { projectsTag, organizationsTag, unitsTag, auditTag};

export const cadtApi = createApi({
  baseQuery,
  reducerPath: 'cadtApi',
  tagTypes: [projectsTag, organizationsTag, unitsTag, auditTag],
  endpoints: () => ({}),
});
