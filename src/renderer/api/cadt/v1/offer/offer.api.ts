import { cadtApi, offerTag } from '../';

const offerApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getOfferFile: builder.query<void, void>({
      query: () => {
        return {
          url: `/v1/offer`,
          method: 'GET',
        };
      },
      providesTags: [offerTag],
    }),

    cancelActiveOffer: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/v1/offer`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [offerTag],
    }),
  }),
});

export const { useGetOfferFileQuery, useCancelActiveOfferMutation } = offerApi;
