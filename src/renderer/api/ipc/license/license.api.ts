import { ipcApi } from '@/api';

const licenseApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    isLicenseValid: builder.query<any, any>({
      query: ({ accessKey, accessSecret }) => ({
        channel: 'isLicenseValid',
        args: { accessKey, accessSecret },
      }),
    }),
  }),
});

export const { useIsLicenseValidQuery } = licenseApi;
