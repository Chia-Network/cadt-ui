import { cadtApi, importedOfferTag, offerTag } from '../';

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

    uploadOfferFile: builder.mutation<any, { offerFile: File }>({
      query: ({ offerFile }) => {
        const formData: FormData = new FormData();
        formData.append('file', offerFile);

        return {
          url: `/v1/offer/accept/import`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [importedOfferTag],
    }),

    getImportedOffer: builder.query<any, void>({
      query: () => {
        return {
          url: `/v1/offer/accept`,
          method: 'GET',
        };
      },
      providesTags: [importedOfferTag],
    }),

    rejectImportedOfferFile: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/v1/offer/accept/cancel`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [importedOfferTag],
    }),

    commitImportedOfferFile: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/v1/offer/accept/commit`,
          method: 'POST',
        };
      },
      invalidatesTags: [importedOfferTag],
    }),
  }),
});

export const {
  useGetOfferFileQuery,
  useCancelActiveOfferMutation,
  useUploadOfferFileMutation,
  useGetImportedOfferQuery,
  useRejectImportedOfferFileMutation,
  useCommitImportedOfferFileMutation,
} = offerApi;
