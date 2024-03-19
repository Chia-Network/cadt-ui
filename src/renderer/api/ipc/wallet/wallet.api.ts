import { ipcApi, walletConfigTag } from "@/api";

/**
 * importing the chia-wallet module and its typescript types
 */
import {
  Config as WalletConfig,
  GetPrivateKeyRequest,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

/**
 * RTKquery state managment API for chia-wallet
 */
const walletApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<WalletConfig, any>({
      query: () => ({ channel: 'walletGetConfig', args: {} }),
      // @ts-ignore
      providesTags: () => [walletConfigTag],
    }),

    setConfig: builder.mutation<WalletConfig, any>({
      query: (args) => ({ channel: 'walletSetConfig', args }),
      // @ts-ignore
      invalidatesTags: () => [walletConfigTag],
    }),

    getLoggedInFingerprint: builder.query<any, any>({
      query: (args) => ({ channel: 'walletGetLoggedInFingerprint', args }),
    }),

    getCoinRecords: builder.query<any, any>({
      query: (args) => ({ channel: 'walletGetCoinRecords', args }),
    }),

    getPrivateKey: builder.query<GetPrivateKeyRequest, any>({
      query: (args) => ({ channel: 'getPrivateKey', args }),
    }),

    getCoinRecordsByName: builder.query<CoinRecordsByNameRequest, any>({
      query: (args) => ({ channel: 'walletGetCoinRecordsByName', args }),
    }),

    getSpendableCoins: builder.query<SpendableCoinRequest, any>({
      query: (args) => ({ channel: 'walletGetSpendableCoins', args }),
    }),

    getSpendableCoinsImmediate: builder.mutation<SpendableCoinRequest, any>({
      query: (args) => ({ channel: 'walletGetSpendableCoins', args }),
    }),

    pushTxRequest: builder.mutation<PushTxRequest, any>({
      query: (args) => ({ channel: 'walletPushTx', args }),
    }),

    getWalletSyncStatus: builder.query<any, any>({
      query: (args) => ({ channel: 'walletGetSyncStatus', args }),
    }),

    getSyncStatusImmediate: builder.mutation<any, any>({
      query: (args) => ({ channel: 'walletGetSyncStatus', args }),
    }),

    getWalletBalanceImmediate: builder.mutation<any, any>({
      query: (args) => ({ channel: 'walletGetWalletBalance', args }),
    }),

    getWalletBalance: builder.query<any, any>({
      query: (args) => ({ channel: 'walletGetWalletBalance', args }),
    }),

    getTransactions: builder.query<any, any>({
      query: (args) => ({ channel: 'walletGetTransactions', args }),
    }),
  }),
});

export const {
  useGetConfigQuery,
  useGetWalletSyncStatusQuery,
  useGetWalletBalanceImmediateMutation,
  useGetWalletBalanceQuery,
  useGetSyncStatusImmediateMutation,
  useGetTransactionsQuery,
  useGetSpendableCoinsImmediateMutation,
} = walletApi;
