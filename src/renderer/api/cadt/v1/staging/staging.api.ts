import { cadtApi, stagedProjectsTag } from '../';

const stagingApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getStagedProjects: builder.query<any, null | undefined | void>({
      query: () => {
        const params: { type: string } = { type: 'projects' };

        return {
          url: `/v1/staging`,
          params,
          method: 'GET',
        };
      },
      providesTags: [stagedProjectsTag],
    }),
  }),
});

export const { useGetStagedProjectsQuery } = stagingApi;
