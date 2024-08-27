import { cadtApi } from '../';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import _ from 'lodash';

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

export interface Config {
  apiHost?: string;
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
        const readOnly = meta?.response?.headers.get('cw-read-only') === 'true';
        return { isHealthy, readOnly };
      },
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
    getUiConfig: builder.query<Config | undefined, void>({
      query: () => ({
        url: `config.json`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<Config>): Config | undefined {
        if (_.isEmpty(baseQueryReturnValue) || _.isNil(baseQueryReturnValue)) {
          return undefined;
        }
        return baseQueryReturnValue;
      },
    }),
    getThemeColors: builder.query<any, void>({
      query: () => ({
        url: `colors.json`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<any>): any {
        if (_.isEmpty(baseQueryReturnValue) || _.isNil(baseQueryReturnValue)) {
          return undefined;
        }
        return baseQueryReturnValue;
      },
    }),
  }),
});

export const { useGetHealthQuery, useGetHealthImmediateMutation, useGetUiConfigQuery, useGetThemeColorsQuery } =
  systemApi;
