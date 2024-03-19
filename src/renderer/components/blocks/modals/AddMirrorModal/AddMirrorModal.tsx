import React, {useCallback, useEffect, useState} from "react";
import {Button, Modal, Spinner, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {addStoreMirror} from "@/store/slices/app";
import {useAddMirrorMutation} from "@/api/ipc/datalayer";
import {useGetUserIpQuery} from "@/api";
import {useGetWalletBalanceImmediateMutation} from "@/api/ipc/wallet";
import {AddMirrorErrorModal, WalletBalanceInsufficientErrorModal} from "@/components";
import {AddMirrorParams} from "chia-datalayer";

interface ConfirmCreateStoreModalProps {
  storeId: string;
  onClose: () => void;
}

const AddMirrorModal: React.FC<ConfirmCreateStoreModalProps> = ({storeId, onClose}: ConfirmCreateStoreModalProps) => {

  const [triggerAddMirror, {isLoading: addMirrorMutationLoading}] = useAddMirrorMutation();
  const {data: getIpData, isLoading: getUserIpLoading} = useGetUserIpQuery({});
  const [triggerGetWalletBalance, {isLoading: getWalletBalanceLoading}] = useGetWalletBalanceImmediateMutation();

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const enterUrlPlaceholder: string = 'enter mirror url ...';
  const [mirrorURL, setMirrorURL] = useState<string>('');
  const [mirrorCoinValue, setMirrorCoinValue] = useState<string>('');
  const [showInvalidUrlError, setShowInvalidUrlError] = useState<boolean>(false);
  const [urlChanged, setUrlChanged] = useState<boolean>(true);
  const [placeholderUrl, setPlaceHolderUrl] = useState<string>(enterUrlPlaceholder);
  const [showInsufficientBalanceModal, setShowInsufficentBalanceModal] = useState<boolean>(false);
  const [showGenericAddMirrorErrorModal, setShowGenericAddMirrorErrorModal] = useState<boolean>(false);

  useEffect(() => {
    if (getIpData?.success && !getUserIpLoading){
      setPlaceHolderUrl('https://' + getIpData.ip_address + ':8575');
    }
  }, [getUserIpLoading, getIpData]);

  // Regex to check if the string is a valid URL
  const urlPattern = new RegExp('^(https?:\\/\\/)' + // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlChanged(true);
    setShowInvalidUrlError(!urlPattern.test(event.target.value));
    setMirrorURL(event.target.value);
  };

  const handleCoinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMirrorCoinValue(event.target.value);
  };

  const getAddMirrorParams = useCallback((): AddMirrorParams => {
    if (mirrorURL && mirrorCoinValue) {
      return {
        id: storeId,
        urls: [mirrorURL],
        amount: parseInt(mirrorCoinValue),
        fee: deployOptions.defaultFee
      }
    } else if (mirrorURL && !mirrorCoinValue) {
      return {
        id: storeId,
        urls: [mirrorURL],
        amount: deployOptions.defaultMirrorCoinAmount,
        fee: deployOptions.defaultFee
      }
    } else if (!mirrorURL && mirrorCoinValue) {
      return {
        id: storeId,
        urls: [placeholderUrl],
        amount: parseInt(mirrorCoinValue),
        fee: deployOptions.defaultFee
      }
    } else {
      return {
        id: storeId,
        urls: [placeholderUrl],
        amount: deployOptions.defaultMirrorCoinAmount,
        fee: deployOptions.defaultFee
      }
    }
  }, [deployOptions.defaultFee, deployOptions.defaultMirrorCoinAmount,
    mirrorCoinValue, mirrorURL, placeholderUrl, storeId
  ]);

  const accept = async () => {
    setUrlChanged(false);

    if (showInvalidUrlError){
      return;
    }

    const getWalletBalanceResponse = await triggerGetWalletBalance({});

    // @ts-ignore
    if (getWalletBalanceResponse?.data?.success) {

      // @ts-ignore
      const walletBalance = getWalletBalanceResponse?.data?.wallet_balance?.spendable_balance;
      const requiredWalletBalance: number = mirrorCoinValue ?
        parseInt(deployOptions.defaultFee) + parseInt(mirrorCoinValue) :
        parseInt(deployOptions.defaultFee) + parseInt(deployOptions.defaultMirrorCoinAmount);

      if (walletBalance >= requiredWalletBalance) {

        if(!showInvalidUrlError){
          const addMirrorResult = await triggerAddMirror(getAddMirrorParams());

          // @ts-ignore
          if (addMirrorResult?.data?.success) {
            onClose();
            if (mirrorURL) {
              dispatch(addStoreMirror({storeId, url: mirrorURL}));
            } else {
              dispatch(addStoreMirror({storeId, url: placeholderUrl}));
            }
          } else {
            setShowGenericAddMirrorErrorModal(true);
          }
        }
      } else {
        setShowInsufficentBalanceModal(true);
      }
    }else{
      setShowGenericAddMirrorErrorModal(true);
    }
  }

  const cancel = () => {
    onClose()
  }

  const disableAddMirror = (): boolean => {
    return addMirrorMutationLoading || ((placeholderUrl === enterUrlPlaceholder) && !mirrorURL)
  }

  return (
    <Modal
      show={true}
      dismissible={!addMirrorMutationLoading || getWalletBalanceLoading}
      onClose={cancel}
      size={"3xl"}
    >
      <Modal.Header>
        <FormattedMessage id="add-store-mirror"/>
      </Modal.Header>

      {getUserIpLoading ?
        <Modal.Body>
          <div className={'flex justify-center align-middle'}>
            <Spinner/>
          </div>
        </Modal.Body>
        :
        <>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id={"store-id"}/>{": " + storeId}
              </p>
              <div>
                {showInvalidUrlError && !urlChanged && <p className="text-base leading-relaxed text-red-600">
                  <FormattedMessage id={"please-enter-a-valid-url"}/>
                </p>}
                <div style={{display: "flex"}}>
                  <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    inlineSize: 'min-content',
                    whiteSpace: 'nowrap'
                  }}>
                    <p>
                      <FormattedMessage id={"mirror-url"}/>
                    </p>
                  </div>
                  <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
                    <TextInput
                      onChange={handleURLChange}
                      value={mirrorURL}
                      placeholder={placeholderUrl}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div style={{display: "flex"}}>
                  <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    inlineSize: 'min-content',
                    whiteSpace: 'nowrap'
                  }}>
                    <Tooltip content={<FormattedMessage id={"a-higher-value-gives-the-mirror-more-validity"}/>}>
                      <p>
                        <FormattedMessage id={"mirror-coin-value"}/>
                      </p>
                    </Tooltip>
                  </div>
                  <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
                    <TextInput
                      onChange={handleCoinValueChange}
                      value={mirrorCoinValue}
                      type={'number'}
                      placeholder={deployOptions?.defaultMirrorCoinAmount || 0}
                    />
                  </div>
                </div>
              </div>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id={"important"}/>
                {': '}
                <FormattedMessage id={"unchanged-fields-will-default-to-currently-displayed-values"}/>.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id="this-action-will-incur-a-non-refundable-fee-of"/>
                {" " + 0.01 + " "}
                <FormattedMessage id="xch-in-addition-to-standard-chia-blockchain-fees"/>
                {', '}
                <FormattedMessage id={"and"}/>
                {' '}
                <FormattedMessage id={"create-a-mirror-coin-with-the-specified-value"}/>
                {'.'}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={accept}>
              <FormattedMessage id="add-store-mirror"/>
              {(addMirrorMutationLoading || getWalletBalanceLoading) && <Spinner className={"ml-2"} size={"sm"}/>}
            </Button>
            <Button color="gray" onClick={cancel} disabled={disableAddMirror()}>
              <FormattedMessage id="cancel"/>
            </Button>
          </Modal.Footer>
        </>
      }
      <WalletBalanceInsufficientErrorModal
        showModal={showInsufficientBalanceModal}
        setShowModal={setShowInsufficentBalanceModal}
      />
      <AddMirrorErrorModal
        showModal={showGenericAddMirrorErrorModal}
        setShowModal={setShowGenericAddMirrorErrorModal}/>
    </Modal>
  );
}

export {AddMirrorModal}