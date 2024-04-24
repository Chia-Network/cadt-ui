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

    commitProjects: builder.mutation<any, void | null | undefined>({
      query: () => {
        return {
          url: `/v1/staging/commit`,
          method: 'POST',
          params: { table: 'Projects' },
        };
      },
      invalidatesTags: [stagedProjectsTag],
    }),

    commitUnits: builder.mutation<any, void | null | undefined>({
      query: () => {
        return {
          url: `/v1/staging/commit`,
          method: 'POST',
          params: { table: 'Units' },
        };
      },
      invalidatesTags: [stagedUnitsTag],
    }),

    commitAll: builder.mutation<any, void | null | undefined>({
      query: () => {
        return {
          url: `/v1/staging/commit`,
          method: 'POST',
        };
      },
      invalidatesTags: [stagedUnitsTag, stagedProjectsTag],
    }),
  }),
});

const invalidateStagingApiTag = stagingApi.util.invalidateTags;
export { invalidateStagingApiTag };

export const {
  useGetStagedProjectsQuery,
  useGetStagedUnitsQuery,
  useCommitProjectsMutation,
  useCommitUnitsMutation,
  useCommitAllMutation,
} = stagingApi;
