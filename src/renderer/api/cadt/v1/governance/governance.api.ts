import { cadtApi } from '../';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { PickList } from '@/schemas/PickList.schema';

interface BaseQueryResult {
  [key: string]: string[];
}

interface DescriptionItem {
  header: string;
  definition: string;
}

interface GlossaryItem {
  term: string;
  description: DescriptionItem[];
}

const governanceApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getGlossary: builder.query<GlossaryItem[], void>({
      query: () => ({
        url: `/v1/governance/meta/glossary`,
        method: 'GET',
      }),
      transformResponse: (baseQueryReturnValue: BaseQueryResult): GlossaryItem[] => {
        return Object.entries(baseQueryReturnValue).map(([key, valueArray]) => {
          // Map each value in the value array to a DescriptionItem by splitting by ";" to separate header and definition
          const description: DescriptionItem[] = valueArray.map((item) => {
            const [header, definition] = item.split(';').map((part) => part.trim());
            return { header, definition };
          });

          return { term: key, description };
        });
      },
    }),

    getDefaultOrgList: builder.query<{ orgUid: string }[], void>({
      query: () => ({
        url: `/v1/governance/meta/orgList`,
        method: 'GET',
      }),
    }),

    getPickLists: builder.query<PickList, void>({
      query: () => ({
        url: `/v1/governance/meta/pickList`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGlossaryQuery, useGetDefaultOrgListQuery, useGetPickListsQuery } = governanceApi;
