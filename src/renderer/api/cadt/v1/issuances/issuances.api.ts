import { cadtApi, issuancesTag } from '..';
import { Issuance } from '@/schemas/Issuance.schema';

interface GetIssuancesParams {
  issuanceIds: string[];
}

const issuanceApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getIssuances: builder.query<Issuance[], GetIssuancesParams>({
      query: ({ issuanceIds }: GetIssuancesParams) => ({
        url: `/v1/issuances`,
        params: { issuanceIds },
        method: 'GET',
      }),
      // @ts-ignore
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map((issuance) => ({ type: issuancesTag, id: issuance.id })),
            { type: issuancesTag, id: 'PARTIAL-LIST' }, // Additional tag for managing partial lists
          ];
        }
      },
    }),
  }),
});

export const { useGetIssuancesQuery } = issuanceApi;
