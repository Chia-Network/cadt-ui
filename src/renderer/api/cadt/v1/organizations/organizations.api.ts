import {cadtApi, organizationsTag} from "../";
// @ts-ignore
import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const host: string = 'http://localhost:31310'

const organizationsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsList: builder.query({
      query: () => ({
        url: `${host}/v1/organizations`,
        method: 'GET',
      }),
      providesTags: [organizationsTag],
      transformResponse(baseQueryReturnValue: BaseQueryResult<any>): any[]{
        return Object.values(baseQueryReturnValue);
      }
    }),
    getOrganizationsMap: builder.query({
      query: () => ({
        url: `${host}/v1/organizations`,
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