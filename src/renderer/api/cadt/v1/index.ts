import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import initialState from '@/store/slices/app/app.initialstate';

export const projectsTag = 'projects';
export const organizationsTag = 'organizations';
export const unitsTag = 'units';
export const auditTag = 'audit';
export const issuancesTag = 'issuances';
export const stagedProjectsTag = 'stagedProjects';
export const stagedUnitsTag = 'stagedUnits';
export const offerTag = 'offer';
export const importedOfferTag = 'importedTransferTag';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

const baseQueryWithDynamicHost = async (args, api, extraOptions) => {
  let modifiedArgs = args;
  const state = api.getState();
  const currentHost = state.app.apiHost;
  const currentApiKey = state.app.apiKey;

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
      headers: {
        ...args.headers,
        ...(currentApiKey ? { 'X-Api-Key': currentApiKey } : {}),
      },
    };
  }

  return await baseQuery(modifiedArgs, api, extraOptions);
};

export const cadtApi = createApi({
  baseQuery: baseQueryWithDynamicHost,
  reducerPath: 'cadtApi',
  tagTypes: [
    projectsTag,
    organizationsTag,
    unitsTag,
    auditTag,
    stagedProjectsTag,
    stagedUnitsTag,
    issuancesTag,
    offerTag,
    importedOfferTag,
  ],
  endpoints: () => ({}),
});
