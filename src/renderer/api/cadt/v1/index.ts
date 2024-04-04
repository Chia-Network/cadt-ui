import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const projectsTag = 'projects';
const organizationsTag = 'organizations';
const unitsTag = 'projects';
const auditTag = 'audit';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

const baseQueryWithDynamicHost = async (args, api, extraOptions) => {

  let modifiedArgs = args;
  const state = api.getState();
  console.log(state)
  const currentHost = state.app.apiHost;

  console.log(modifiedArgs, currentHost, api, extraOptions)

  // If 'args' is a string, it's assumed to be the URL, so prepend the currentHost
  if (typeof args === 'string') {
    modifiedArgs = `${currentHost}${args}`;
  } else if (args && typeof args === 'object') {
    // If 'args' is an object with a 'url' property, prepend the currentHost to the 'url'
    modifiedArgs = {
      ...args,
      url: `${currentHost}${args.url}`,
    };
  }

  console.log(modifiedArgs, currentHost, api, extraOptions)

  return await baseQuery(modifiedArgs, api, extraOptions);
};

export const cadtApi = createApi({
  baseQuery: baseQueryWithDynamicHost,
  reducerPath: 'cadtApi',
  tagTypes: [projectsTag, organizationsTag, unitsTag, auditTag],
  endpoints: () => ({}),
});

export { projectsTag, organizationsTag, unitsTag, auditTag };
