import { cadtApi, issuancesTag } from "..";
import { Issuance } from "@/schemas/Issuance.schema";

interface GetIssuancesParams {
  issuanceIds: string[];
}

const issuanceApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getIssuances: builder.query<Issuance, GetIssuancesParams>({
      query: ({ issuanceIds }: GetIssuancesParams) => ({
        url: `/v1/issuances`,
        params: { issuanceIds },
        method: 'GET',
      }),
      // Adding error handling in providesTags
      providesTags: (result, error) => {
        // Check if there was an error or if the result is undefined or null
        if (error || !result) {
          // Handle errors or no result by returning a minimal tag
          // This prevents caching potentially faulty data
          return [{ type: issuancesTag, id: 'ERROR' }];
        }

        // Provide a tag for each issuance returned by the query
        return [
          ...result.map(issuance => ({ type: issuancesTag, id: issuance.id })),
          { type: issuancesTag, id: 'PARTIAL-LIST' } // Additional tag for managing partial lists
        ];
      }
    }),
  })
});

export const {
  useGetIssuancesQuery
} = issuanceApi;
