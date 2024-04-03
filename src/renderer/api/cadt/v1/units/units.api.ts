import {cadtApi, unitsTag} from "../";
import {Unit} from "@/schemas/Unit.schema";

const host: string = 'http://localhost:31310'

interface GetUnitsParams {
  page: number;
  orgUid?: string;
  search?: string;
  order?: string;
}

interface GetUnitsResponse {
  page: number,
  pageCount: number,
  data: Unit[]
}

const unitsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<GetUnitsResponse, GetUnitsParams>({
      query: ({ page, orgUid, search, order }: GetUnitsParams) => {
        // Initialize the params object with page and limit
        const params: GetUnitsParams & {limit: number} = { page, limit: 10 };

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `${host}/v1/units`,
          params, // Use the constructed params object
          method: 'GET',
        };
      },
      providesTags: (_response, _error, {orgUid}) => [{type: unitsTag, id: orgUid}],
    })
  })
});

export const {
  useGetUnitsQuery
} = unitsApi;