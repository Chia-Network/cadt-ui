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
        url: `/config.json`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<Config>): Config | undefined {
        // Check if response is empty, null, or HTML content (which would indicate a 404 served as index.html)
        if (_.isEmpty(baseQueryReturnValue) || _.isNil(baseQueryReturnValue)) {
          return undefined;
        }

        if (typeof baseQueryReturnValue === 'string' && baseQueryReturnValue.includes('<!doctype html>')) {
          return undefined;
        }

        // Ensure it's a valid config object with expected structure
        if (typeof baseQueryReturnValue === 'object' && baseQueryReturnValue !== null) {
          return baseQueryReturnValue as Config;
        }

        return undefined;
      },
      transformErrorResponse(): Config | undefined {
        // Return undefined for any errors (including file not found)
        return undefined;
      },
    }),
    getThemeColors: builder.query<any, void>({
      query: () => ({
        url: `/colors.json`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<any>): any {
        // Check if response is empty, null, or HTML content (which would indicate a 404 served as index.html)
        if (
          _.isEmpty(baseQueryReturnValue) ||
          _.isNil(baseQueryReturnValue) ||
          (typeof baseQueryReturnValue === 'string' && baseQueryReturnValue.includes('<!doctype html>'))
        ) {
          return undefined;
        }
        // Ensure it's a valid object
        if (typeof baseQueryReturnValue === 'object' && baseQueryReturnValue !== null) {
          return baseQueryReturnValue;
        }
        return undefined;
      },
      transformErrorResponse(): any {
        // Return undefined for any errors (including file not found)
        return undefined;
      },
    }),
  }),
});

export const { useGetHealthQuery, useGetHealthImmediateMutation, useGetUiConfigQuery, useGetThemeColorsQuery } =
  systemApi;
