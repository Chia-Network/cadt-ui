import { ipcMain } from 'electron';

/**
 * importing the chia-datalayer module and its typescript types
 */
import DataLayer, {
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
  GetSyncStatusParams,
  GetValueParams,
  Options,
  RemoveSubscriptionsParams,
  SubscribeParams,
  UnsubscribeParams,
  WalletLogInParams,
  // @ts-ignore
} from 'chia-datalayer';

import Wallet, {GetWalletBalanceRequest, SpendableCoinRequest} from 'chia-wallet';
import {fixedFeeXch, sendFixedFee, xchToMojos} from "../utils/fees.js";

export async function mountDatalayerRpcHandles() {
  const datalayer = new DataLayer({ verbose: true });
  const wallet = new Wallet({ verbose: true });

  ipcMain.handle('datalayerGetConfig', () => {
    return datalayer.getConfig();
  });

  ipcMain.handle('datalayerSetConfig', (_, config: DatalayerConfig) => {
    return datalayer.setConfig(config);
  });

  ipcMain.handle('datalayerAddMirror',
    async (_, addMirrorParams: AddMirrorParams, options: Options) => {

    if (!(addMirrorParams?.fee)){
      console.error('block chain fee is undefined. a block chain fee must be specified to call this api.');
      return {
        success: false,
        message: 'block chain fee is undefined. a block chain fee must be specified to call this api.',
      };
    }

    const networkInfo = await wallet.getNetworkInfo({});
    const network = networkInfo.network_name;

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);
    if (spendableCoins?.confirmed_records.length < 1) {
      return {
        success: false,
        message: 'Insufficient coins. Please ensure that you have at least 1 spendable coin in your wallet.',
      };
    }

    const spendableBalanceRequest: GetWalletBalanceRequest = {wallet_id: 1};
    const getWalletBalanceResponse = await wallet.getWalletBalance(spendableBalanceRequest);
    if (parseInt(addMirrorParams.fee) >= getWalletBalanceResponse?.wallet_balance?.spendable_balance){
      return {
        success: false,
        message: 'Insufficient spendable balance. spendable balance must be greater than ' + addMirrorParams.fee,
      };
    }

    const totalTransactionWithUsageFee =
      addMirrorParams.amount + parseInt(addMirrorParams.fee) + xchToMojos(fixedFeeXch);
    if (getWalletBalanceResponse?.wallet_balance?.spendable_balance > totalTransactionWithUsageFee){
      sendFixedFee(network, spendableCoins.confirmed_records.length, parseInt(addMirrorParams.fee));
    }

    await new Promise(ignore => setTimeout(ignore, 1000));

    const addMirrorPromise = datalayer.addMirror(addMirrorParams, {
      ...options,
      waitForWalletAvailability: false,
      includeFee: false
    });
    return addMirrorPromise;
  });

  ipcMain.handle('datalayerAddMissingFiles', (_, addMissingFilesParams: AddMissingFilesParams, options: Options) => {
    return datalayer.addMissingFiles(addMissingFilesParams, options);
  });

  ipcMain.handle(
    'datalayerCreateDataStore',
    async (_, createDataStoreParams: CreateDataStoreParams, options: Options) => {
      const networkInfo = await wallet.getNetworkInfo({});
      const network = networkInfo.network_name;

      if (!(createDataStoreParams?.fee)){
        console.error('block chain fee is undefined. a block chain fee must be specified to call this api.');
        return {
          success: false,
          message: 'block chain fee is undefined. a block chain fee must be specified to call this api.',
        };
      }

      const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
      const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);
      if (spendableCoins?.confirmed_records.length < 1) {
        return {
          success: false,
          message: 'Insufficient coins. Please ensure that you have at least 1 spendable coin in your wallet.',
        };
      }

      const spendableBalanceRequest: GetWalletBalanceRequest = {wallet_id: 1};
      const getWalletBalanceResponse = await wallet.getWalletBalance(spendableBalanceRequest);
      if (parseInt(createDataStoreParams.fee) >= getWalletBalanceResponse?.wallet_balance?.spendable_balance){
        return {
          success: false,
          message: 'Insufficient spendable balance. spendable balance must be greater than ' + createDataStoreParams.fee,
        };
      }

      const totalTransactionWithUsageFee = parseInt(createDataStoreParams.fee) + xchToMojos(fixedFeeXch);
      if (getWalletBalanceResponse?.wallet_balance?.spendable_balance > totalTransactionWithUsageFee){
        sendFixedFee(network, spendableCoins.confirmed_records.length, parseInt(createDataStoreParams.fee));
      }
      setTimeout(() => {
        return datalayer.createDataStore(createDataStoreParams, {
          ...options,
          waitForWalletAvailability: false,
          includeFee: false
        });
      }, 1000);
    },
  );

  ipcMain.handle('datalayerDeleteMirror',
    async (_, deleteMirrorParams: DeleteMirrorParams, options: Options) => {

    if (!(deleteMirrorParams?.fee)){
      console.error('block chain fee is undefined. a block chain fee must be specified to call this api.');
      return {
        success: false,
        message: 'block chain fee is undefined. a block chain fee must be specified to call this api.',
      };
    }

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);
    if (spendableCoins?.confirmed_records.length < 1) {
      return {
        success: false,
        message: 'Insufficient coins. Please ensure that you have at least 1 spendable coin in your wallet.',
      };
    }

    const spendableBalanceRequest: GetWalletBalanceRequest = {wallet_id: 1};
    const getWalletBalanceResponse = await wallet.getWalletBalance(spendableBalanceRequest);
    if (parseInt(deleteMirrorParams.fee) >= getWalletBalanceResponse?.wallet_balance?.spendable_balance){
      return {
        success: false,
        message: 'Insufficient spendable balance. spendable balance must be greater than ' + deleteMirrorParams.fee,
      };
    }

    return datalayer.deleteMirror(deleteMirrorParams, {
      ...options,
      waitForWalletAvailability: false,
      includeFee: false
    });
  });

  ipcMain.handle('datalayerGetKeys', (_, getKeysParams: GetKeysParams, options: Options) => {
    return datalayer.getKeys(getKeysParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetKeysValues', (_, getKeysValuesParams: GetKeysValuesParams, options: Options) => {
    return datalayer.getKeysValues(getKeysValuesParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetKvDiff', (_, getKvDiffParams: GetKvDiffParams, options: Options) => {
    return datalayer.getKvDiff(getKvDiffParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetMirrors', (_, getMirrorsParams: GetMirrorsParams, options: Options) => {
    return datalayer.getMirrors(getMirrorsParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetOwnedStores', () => {
    return datalayer.getOwnedStores();
  });

  ipcMain.handle('datalayerGetRoot', (_, getRootParams: GetRootParams, options: Options) => {
    return datalayer.getRoot(getRootParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetRootHistory', (_, getRootHistoryParams: GetRootHistoryParams, options: Options) => {
    return datalayer.getRootHistory(getRootHistoryParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetSyncStatus', (_, getSyncStatusParams: GetSyncStatusParams, options: Options) => {
    return datalayer.getSyncStatus(getSyncStatusParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetSubscriptions', (_, options: Options) => {
    return datalayer.getSubscriptions({
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerGetValue', (_, getValueParams: GetValueParams, options: Options) => {
    return datalayer.getValue(getValueParams, options);
  });

  ipcMain.handle('datalayerPlugins', (_, options: Options) => {
    return datalayer.plugins(options);
  });

  ipcMain.handle(
    'datalayerRemoveSubscriptions',
    (_, removeSubscriptionsParams: RemoveSubscriptionsParams, options: Options) => {
      return datalayer.removeSubscriptions(removeSubscriptionsParams, options);
    },
  );

  ipcMain.handle('datalayerSubscribe', (_, subscribeParams: SubscribeParams, options: Options) => {
    return datalayer.subscribe(subscribeParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerUnsubscribe', (_, unsubscribeParams: UnsubscribeParams, options: Options) => {
    return datalayer.unsubscribe(unsubscribeParams, {
      ...options,
      waitForWalletAvailability: false
    });
  });

  ipcMain.handle('datalayerUpdateDataStore',
    async (_, batchUpdateParams: BatchUpdateParams, options: Options) => {

    if (!(batchUpdateParams?.fee)){
      console.error('block chain fee is undefined. a block chain fee must be specified to call this api.');
      return {
        success: false,
        message: 'block chain fee is undefined. a block chain fee must be specified to call this api.',
      };
    }

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);
    if (spendableCoins?.confirmed_records.length < 1) {
      return {
        success: false,
        message: 'Insufficient coins. Please ensure that you have at least 1 spendable coin in your wallet.',
      };
    }

    const spendableBalanceRequest: GetWalletBalanceRequest = {wallet_id: 1};
    const getWalletBalanceResponse = await wallet.getWalletBalance(spendableBalanceRequest);
    if (parseInt(batchUpdateParams.fee) >= getWalletBalanceResponse?.wallet_balance?.spendable_balance){
      return {
        success: false,
        message: 'Insufficient spendable balance. spendable balance must be greater than ' + batchUpdateParams.fee,
      };
    }

    return datalayer.updateDataStore(batchUpdateParams, {includeFee: false, ...options});
  });

  ipcMain.handle('datalayerWalletLogin', (_, walletLogInParams: WalletLogInParams, options: Options) => {
    return datalayer.walletLogin(walletLogInParams, options);
  });
}
