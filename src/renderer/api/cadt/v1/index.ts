import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import initialState from '@/store/slices/app/app.initialstate'; // Ensure this path is correct

const projectsTag = 'projects';
const organizationsTag = 'organizations';
const unitsTag = 'projects';
const auditTag = 'audit';
const stagedProjectsTag = 'stagedProjects';
const stagedUnitsTag = 'stagedUnits';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

const baseQueryWithDynamicHost = async (args, api, extraOptions) => {
  let modifiedArgs = args;
  const state = api.getState();
  const currentHost = state.app.apiHost;

  // Check if currentHost is equal to the initialState's apiHost
  const effectiveHost =
    currentHost === initialState.apiHost && import.meta.env.VITE_API_HOST ? import.meta.env.VITE_API_HOST : currentHost;

  if (!args.url.startsWith('/')) {
    return await baseQuery(args, api, extraOptions);
  }

  // Modify the URL based on the effectiveHost
  if (typeof args === 'string') {
    modifiedArgs = `${effectiveHost}${args}`;
  } else if (args && typeof args === 'object') {
    modifiedArgs = {
      ...args,
      url: `${effectiveHost}${args.url}`,
    };
  }

  return await baseQuery(modifiedArgs, api, extraOptions);
};

export const cadtApi = createApi({
  baseQuery: baseQueryWithDynamicHost,
  reducerPath: 'cadtApi',
  tagTypes: [projectsTag, organizationsTag, unitsTag, auditTag, stagedProjectsTag, stagedUnitsTag],
  endpoints: () => ({}),
});

export { projectsTag, organizationsTag, unitsTag, auditTag, stagedProjectsTag, stagedUnitsTag };
