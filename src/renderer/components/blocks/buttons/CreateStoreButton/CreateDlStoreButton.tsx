import React, { useCallback, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useCreateDataStoreMutation } from '@/api/ipc/datalayer';
import { FormattedMessage } from 'react-intl';
import {
  WalletNotSyncedErrorModal,
  SpendableCoinsInsufficientErrorModal,
  CreatStoreSuccessModal,
  CreateStoreErrorModal,
  WalletBalanceInsufficientErrorModal,
} from '@/components';
import {
  useGetSpendableCoinsImmediateMutation,
  useGetSyncStatusImmediateMutation,
  useGetWalletBalanceImmediateMutation,
} from '@/api/ipc/wallet';
import {datalayerStoresTag, ipcApi} from '@/api/ipc';
import { ConfirmCreateStoreModal } from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import { SpendableCoinRequest } from 'chia-wallet';
import { invalidateCheckForTXToken } from '@/store/slices/app';

const CreateDlStoreButton: React.FC = () => {
  const dispatch = useDispatch();
  const [showNotSyncedModal, setShowNotSyncedModal] = useState(false);
  const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState(false);
  const [showSpendableCoinsInsufficientModal, setShowSpendableCoinsInsufficientModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmStoreCreationModal, setShowConfirmStoreCreationModal] = useState(false);

  const [createStoreErrorMsg, setCreateStoreErrorMsg] = useState('');
  const defaultFeeAsString: string = useSelector((state: any) => state.userOptions.deployOptions.defaultFee);
  const defaultFee: number = parseInt(defaultFeeAsString);

  const [triggerCreateDataStore, { isLoading: isStoreCreating }] = useCreateDataStoreMutation();
  const [triggerGetSyncStatus, { isLoading: isSyncStatusLoading }] = useGetSyncStatusImmediateMutation();
  const [triggerGetWalletBalance, { isLoading: isBalanceLoading }] = useGetWalletBalanceImmediateMutation();
  const [triggerGetSpendableCoinsImmediate] = useGetSpendableCoinsImmediateMutation();

  const handleCreateDataStore = useCallback(async () => {
    const syncStatusResponse = await triggerGetSyncStatus({});

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoinsResponse = await triggerGetSpendableCoinsImmediate(spendableCoinRequest);

    // @ts-ignore
    if (spendableCoinsResponse?.data?.confirmed_records?.length < 1) {
      setShowSpendableCoinsInsufficientModal(true);
      return;
    }

    // @ts-ignore
    if (!syncStatusResponse?.data?.synced) {
      setShowNotSyncedModal(true);
      return;
    }

    const walletBalanceResponse = await triggerGetWalletBalance({});
    //@ts-ignore
    if (walletBalanceResponse?.data?.wallet_balance?.spendable_balance <= defaultFee) {
      setShowInsufficientBalanceModal(true);
      return;
    }

    dispatch(invalidateCheckForTXToken());
    const createDataStoreResponse: any = await triggerCreateDataStore({fee: defaultFeeAsString});
    setTimeout(() => {
      dispatch(invalidateCheckForTXToken());
    }, 1000)

    if (createDataStoreResponse.data.success) {
      setShowErrorModal(false);
      setCreateStoreErrorMsg('');
      setShowSuccessModal(true);
      // @ts-ignore
      dispatch(ipcApi.util.invalidateTags([datalayerStoresTag]));
      dispatch(invalidateCheckForTXToken());
    } else {
      setShowSuccessModal(false);
      setShowErrorModal(true);
      setCreateStoreErrorMsg(createDataStoreResponse?.error);
    }
  }, [triggerGetSyncStatus, triggerGetSpendableCoinsImmediate, triggerGetWalletBalance,
    defaultFee, dispatch, triggerCreateDataStore, defaultFeeAsString]);

  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'left',
          }}
        >
          <Button onClick={() => setShowConfirmStoreCreationModal(true)}>
            {isSyncStatusLoading || isBalanceLoading || isStoreCreating ? (
              <Spinner />
            ) : (
              <FormattedMessage id="create-new-store" />
            )}
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '5px',
            }}
          >
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="0.01-xch-fee" />
            </p>
          </div>
        </div>
        <ConfirmCreateStoreModal
          showModal={showConfirmStoreCreationModal}
          setShowModal={setShowConfirmStoreCreationModal}
          onCreateStore={handleCreateDataStore}
        />
        <CreatStoreSuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} />
        <CreateStoreErrorModal
          showModal={showErrorModal}
          setShowModal={setShowErrorModal}
          errorMessage={createStoreErrorMsg}
        />
        <WalletNotSyncedErrorModal showModal={showNotSyncedModal} setShowModal={setShowNotSyncedModal} />
        <WalletBalanceInsufficientErrorModal
          showModal={showInsufficientBalanceModal}
          setShowModal={setShowInsufficientBalanceModal}
        />
        <SpendableCoinsInsufficientErrorModal
          showModal={showSpendableCoinsInsufficientModal}
          setShowModal={setShowSpendableCoinsInsufficientModal}
        />
      </div>
    </>
  );
};

export { CreateDlStoreButton };
