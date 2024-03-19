import { createApi } from '@reduxjs/toolkit/query/react';
// @ts-ignore
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const walletConfigTag: string = "walletConfig";
const datalayerConfigTag: string = 'datalayerConfig';
const dataLayerMirrorsTag: string = 'mirrors';
const datalayerStoresTag: string = 'dataStores';
const datalayerSubscriptionsTag: string = 'subscriptions';

interface ipcRendererBaseQueryArgs {
  channel: string;
  args: any;
}

/**
 * Custom base query to use Electron's IPC renderer
 * @param {string} channel - IPC channel to send the request to
 * @param {any} args - Arguments for the IPC call
 * @returns {Promise<any>} - Promise representing the IPC call result
 */
const ipcRendererBaseQuery = async ({
  channel,
  args
}: ipcRendererBaseQueryArgs) => {
  try {
    const result = await ipcRenderer.invoke(channel, args);
    return { data: result };
  } catch (error) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        data: (error as any)?.message || "An error occurred",
      },
    };
  }
};

export { datalayerConfigTag, dataLayerMirrorsTag, datalayerSubscriptionsTag, datalayerStoresTag, walletConfigTag }

export const ipcApi = createApi({
  baseQuery: ipcRendererBaseQuery,
  tagTypes: [datalayerConfigTag, dataLayerMirrorsTag, datalayerSubscriptionsTag, datalayerStoresTag, walletConfigTag],
  reducerPath: "ipcApi",
  endpoints: () => ({}),
});