import {
  ipcApi,
  datalayerConfigTag,
  dataLayerMirrorsTag,
  datalayerSubscriptionsTag,
  datalayerStoresTag
} from '@/api';

/**
 * importing the chia-datalayer module and its typescript types
 */
import {
  Config as DatalayerConfig /* the config type is common to both the chia wallet and chia datalayer */,
  AddMirrorParams,
  AddMissingFilesParams,
  BatchUpdateParams,
  CreateDataStoreParams,
  DeleteMirrorParams,
  GetKeysParams,
  GetKeysValuesParams,
  GetKvDiffParams,
  GetMirrorsParams,
  GetRootParams,
  GetRootHistoryParams,
  GetValueParams,
  Options,
  RemoveSubscriptionsParams,
  SubscribeParams,
  UnsubscribeParams,
  WalletLogInParams,
} from 'chia-datalayer';

// @ts-ignore
import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

/**
 * RTKquery state managment API for chia-wallet
 */
const datalayerApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<any, any>({
      query: () => ({ channel: 'datalayerGetConfig', args: {} }),
      // @ts-ignore
      providesTags: () => [datalayerConfigTag],
    }),

    setConfig: builder.mutation<any, DatalayerConfig>({
      query: (args) => ({ channel: 'datalayerSetConfig', args }),
      //@ts-ignore
      invalidatesTags: () => [datalayerConfigTag],
    }),

    addMirror: builder.mutation<any, AddMirrorParams>({
      query: (args) => ({ channel: 'datalayerAddMirror', args }),
      //@ts-ignore
      invalidatesTags: () => [dataLayerMirrorsTag],
    }),

    addMissingFiles: builder.mutation<any, AddMissingFilesParams>({
      query: (args) => ({ channel: 'datalayerAddMissingFiles', args }),
    }),

    createDataStore: builder.mutation<any, CreateDataStoreParams>({
      query: (args) => ({ channel: 'datalayerCreateDataStore', args }),
      //@ts-ignore
      invalidatesTags: () => [{ type: datalayerStoresTag }],
    }),

    deleteMirror: builder.mutation<any, DeleteMirrorParams>({
      query: (args) => ({ channel: 'datalayerDeleteMirror', args }),
      //@ts-ignore
      invalidatesTags: () => [dataLayerMirrorsTag],
    }),

    getKeys: builder.query<any, GetKeysParams>({
      query: (args) => ({ channel: 'datalayerGetKeys', args }),
    }),

    getKeysValues: builder.query<any, GetKeysValuesParams>({
      query: (args) => ({ channel: 'datalayerGetKeysValues', args }),
    }),

    getKvDiff: builder.query<any, GetKvDiffParams>({
      query: (args) => ({ channel: 'datalayerGetKvDiff', args }),
    }),

    getMirrors: builder.query<any, GetMirrorsParams>({
      query: (args) => ({ channel: 'datalayerGetMirrors', args }),
      //@ts-ignore
      providesTags: () => [dataLayerMirrorsTag],
    }),

    getOwnedStores: builder.query<any, any>({
      query: () => ({ channel: 'datalayerGetOwnedStores', args: {} }),
      // @ts-ignore
      providesTags: () => [{ type: datalayerStoresTag, id: 'LIST' }],
    }),

    getRoot: builder.query<any, GetRootParams>({
      query: (args) => ({ channel: 'datalayerGetRoot', args }),
    }),

    getRootHistory: builder.query<any, GetRootHistoryParams>({
      query: (args) => ({ channel: 'datalayerGetRootHistory', args }),
    }),

    getSubscriptions: builder.query<any, Options>({
      query: (args) => ({ channel: 'datalayerGetSubscriptions', args }),
      //@ts-ignore
      providesTags: () => [datalayerSubscriptionsTag],
      transformResponse(baseQueryReturnValue: BaseQueryResult<{id: string, storeId: string}[]>):
        Promise<{id: string, storeId: string}[]> | [] {
        return {
          ...baseQueryReturnValue,
          store_ids:
            baseQueryReturnValue.store_ids ?
            baseQueryReturnValue.store_ids.map((storeId: string) => ({
              id: storeId,
              storeId
            })) : []
        };
      }
    }),

    getValue: builder.query<any, GetValueParams>({
      query: (args) => ({ channel: 'datalayerGetValue', args }),
    }),

    plugins: builder.query<any, Options>({
      query: (args) => ({ channel: 'datalayerPlugins', args }),
    }),

    removeSubscriptions: builder.mutation<any, RemoveSubscriptionsParams>({
      query: (args) => ({ channel: 'datalayerRemoveSubscriptions', args }),
      //@ts-ignore
      invalidatesTags: () => [datalayerSubscriptionsTag],
    }),

    subscribe: builder.mutation<any, SubscribeParams>({
      query: (args) => ({ channel: 'datalayerSubscribe', args }),
      //@ts-ignore
      invalidatesTags: () => [datalayerSubscriptionsTag],
    }),

    unsubscribe: builder.mutation<any, UnsubscribeParams>({
      query: (args) => ({ channel: 'datalayerUnsubscribe', args }),
      //@ts-ignore
      invalidatesTags: () => [datalayerSubscriptionsTag],
    }),

    updateDataStore: builder.mutation<any, BatchUpdateParams>({
      query: (args) => ({ channel: 'datalayerUpdateDataStore', args }),
      //@ts-ignore
      invalidatesTags: () => [datalayerStoresTag],
    }),

    walletLogin: builder.mutation<any, WalletLogInParams>({
      query: (args) => ({ channel: 'datalayerWalletLogin', args }),
    }),
  }),
});

export const {
  useCreateDataStoreMutation,
  useGetOwnedStoresQuery,
  useGetKeysQuery,
  useGetSubscriptionsQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useAddMirrorMutation,
  useDeleteMirrorMutation,
  useGetMirrorsQuery,
  usePluginsQuery
} = datalayerApi;
