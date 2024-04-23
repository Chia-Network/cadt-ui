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

    getHomeOrg: builder.query<Organization | undefined, void | null>({
        query: () => ({
          url: `/v1/organizations`,
          method: 'GET',
        }),
        providesTags: [organizationsTag],
        transformResponse(baseQueryReturnValue: BaseQueryResult<Organization[]>): Organization | undefined {
          const organizations: Organization[] =  Object.values(baseQueryReturnValue);
          return organizations.find(org => org.isHome);
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
        const formData: FormData = new FormData();
        formData.append('name', orgName);

        return {
          url: `/v1/organizations/create`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [organizationsTag],
    }),

    importOrganization: builder.mutation<CreateOrganizationResponse, string>({
      query: (orgUid: string) => ({
        url: `/v1/organizations`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: { orgUid },
      }),
      invalidatesTags: [organizationsTag],
    }),

    deleteOrganization: builder.mutation<any, string>({
      query: (orgUid: string) => ({
        url: `/v1/organizations`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { orgUid },
      }),
      invalidatesTags: [organizationsTag],
    }),

    editOrganization: builder.mutation<any, { orgUid: string; orgName: string }>({
      query: ({ orgUid, orgName }) => {
        const formData: FormData = new FormData();
        formData.append('orgUid', orgUid);
        formData.append('name', orgName);

        return {
          url: `/v1/organizations/edit`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
  }),
});

const invalidateOrgApiTag = organizationsApi.util.invalidateTags;
export { invalidateOrgApiTag };

export const {
  useGetOrganizationsListQuery,
  useGetOrganizationsMapQuery,
  useCreateOrganizationMutation,
  useImportOrganizationMutation,
  useDeleteOrganizationMutation,
  useEditOrganizationMutation,
  useGetHomeOrgQuery
} = organizationsApi;
