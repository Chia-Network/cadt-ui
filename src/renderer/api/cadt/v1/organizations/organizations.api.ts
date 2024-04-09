import { cadtApi, organizationsTag } from '../';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { Organization } from '@/schemas/Organization.schema';

interface GetOrgnaizationsMapResponse {
  [index: string]: Organization;
}

interface CreateOrganizationResponse {
  message: string;
  orgId: string;
}

const organizationsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsList: builder.query<Organization[], void | null>({
      query: () => ({
        url: `/v1/organizations`,
        method: 'GET',
      }),
      providesTags: [organizationsTag],
      transformResponse(baseQueryReturnValue: BaseQueryResult<Organization[]>): Organization[] {
        return Object.values(baseQueryReturnValue);
      },
    }),

    getOrganizationsMap: builder.query<GetOrgnaizationsMapResponse, void | null>({
      query: () => ({
        url: `/v1/organizations`,
        method: 'GET',
      }),
      providesTags: [organizationsTag],
    }),

    createOrganization: builder.mutation<CreateOrganizationResponse, string>({
      query: (orgName: string) => {
        return {
          url: `/v1/organizations`,
          method: 'POST',
          body: { name: orgName },
        };
      },
      invalidatesTags: [organizationsTag],
    }),

    importOrganization: builder.mutation<CreateOrganizationResponse, { orgUid: string }>({
      query: () => ({
        url: `/v1/organizations`,
        method: 'PUT',
      }),
      invalidatesTags: [organizationsTag],
    }),
  }),
});

export const {
  useGetOrganizationsListQuery,
  useGetOrganizationsMapQuery,
  useCreateOrganizationMutation,
  useImportOrganizationMutation,
} = organizationsApi;
