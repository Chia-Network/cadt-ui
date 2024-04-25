import { cadtApi } from '../';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface Health {
  message: string;
  timestamp: string;
}

interface GetHealthParams {
  apiHost?: string;
  apiKey?: string;
}

interface ServerHealth {
  isHealthy: boolean;
  readOnly: boolean;
}

const systemApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<ServerHealth, GetHealthParams>({
      query: ({ apiHost = '', apiKey }) => ({
        url: `${apiHost}/health`,
        method: 'GET',
        headers: apiKey ? { 'X-Api-Key': apiKey } : {},
      }),
      transformResponse: (response: BaseQueryResult<Health>, meta): ServerHealth => {
        const isHealthy = response?.message === 'OK';
        const readOnly = meta?.response?.headers.get('cw-readonly') === 'true';
        return { isHealthy, readOnly };
      }
    }),
    getHealthImmediate: builder.mutation<boolean, GetHealthParams>({
      query: ({ apiHost = '', apiKey }) => ({
        url: `${apiHost}/health`,
        method: 'GET',
        headers: apiKey ? { 'X-Api-Key': apiKey } : {},
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<Health>): boolean {
        return baseQueryReturnValue?.message === 'OK';
      },
    }),
  }),
});

export const { useGetHealthQuery, useGetHealthImmediateMutation } = systemApi;
