import {cadtApi, organizationsTag} from "../";
// @ts-ignore
import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {Organization} from "@/schemas/Organization.schema";

interface GetOrgnaizationsMapResponse {
  [index: string]: Organization
}

const organizationsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsList: builder.query<Organization[], void | null>({
      query: () => ({
        url: `/v1/organizations`,
        method: 'GET',
      }),
      providesTags: [organizationsTag],
      transformResponse(baseQueryReturnValue: BaseQueryResult<Organization[]>): Organization[]{
        return Object.values(baseQueryReturnValue);
      }
    }),

    getOrganizationsMap: builder.query<GetOrgnaizationsMapResponse, void | null>({
      query: () => ({
        url: `/v1/organizations`,
        method: 'GET',
      }),
      providesTags: [organizationsTag],
    })
  })
});


export const {
  useGetOrganizationsListQuery,
  useGetOrganizationsMapQuery
} = organizationsApi;