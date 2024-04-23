import { cadtApi, stagedProjectsTag, stagedUnitsTag } from '../';

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

    getStagedUnits: builder.query<any, null | undefined | void>({
      query: () => {
        const params: { type: string } = { type: 'units' };

        return {
          url: `/v1/staging`,
          params,
          method: 'GET',
        };
      },
      providesTags: [stagedUnitsTag],
    }),

    deleteStagedItem: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => {
        return {
          url: `/v1/staging`,
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: { uuid },
        };
      },
      invalidatesTags: [stagedUnitsTag, stagedProjectsTag],
    }),
  }),
});

const invalidateStagingApiTag = stagingApi.util.invalidateTags;
export { invalidateStagingApiTag };

export const { useGetStagedProjectsQuery, useGetStagedUnitsQuery, useDeleteStagedItemMutation } = stagingApi;
