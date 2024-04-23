import { cadtApi, unitsTag, stagedUnitsTag } from '../';
import { Unit } from '@/schemas/Unit.schema';

interface GetUnitsParams {
  page: number;
  orgUid?: string;
  search?: string;
  order?: string;
  filter?: string;
}

interface GetUnitParams {
  warehouseUnitId: string;
}

interface DeleteUnitParams {
  warehouseUnitId: string;
}

interface GetUnitsResponse {
  page: number;
  pageCount: number;
  data: Unit[];
}

const unitsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<GetUnitsResponse, GetUnitsParams>({
      query: ({ page, orgUid, search, order, filter }: GetUnitsParams) => {
        // Initialize the params object with page and limit
        const params: GetUnitsParams & { limit: number } = { page, limit: 10 };

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        if (filter) {
          params.filter = filter;
        }

        return {
          url: `/v1/units`,
          params,
          method: 'GET',
        };
      },
      providesTags: (_response, _error, { orgUid }) => [{ type: unitsTag, id: orgUid }],
    }),

    getUnit: builder.query<Unit, GetUnitParams>({
      query: ({ warehouseUnitId }: GetUnitParams) => ({
        url: `/v1/units`,
        params: { warehouseUnitId },
        method: 'GET',
      }),
      providesTags: (_response, _error, { warehouseUnitId }) => [{ type: unitsTag, id: warehouseUnitId }],
    }),

    deleteUnit: builder.mutation<any, DeleteUnitParams>({
      query: ({ warehouseUnitId }: DeleteUnitParams) => ({
        url: `/v1/units`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { warehouseUnitId },
      }),
      invalidatesTags: (_response, _error, { warehouseUnitId }) => [{ type: unitsTag, id: warehouseUnitId }],
    }),

    stageUnit: builder.mutation<any, Unit>({
      query: (unit) => ({
        url: `/v1/units`,
        method: 'POST',
        body: unit,
      }),
      invalidatesTags: [stagedUnitsTag],
    }),
  }),
});

export const { useGetUnitsQuery, useGetUnitQuery, useDeleteUnitMutation } = unitsApi;
