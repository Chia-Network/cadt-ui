import {Button, Modal, Spinner} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import React, {useEffect, useState} from "react";
import {useDeleteMirrorMutation, useGetMirrorsQuery} from "@/api/ipc/datalayer";
import {GetMirrorsParams} from "chia-datalayer";
import {useDispatch, useSelector} from "react-redux";
import {DeleteMirrorErrorModal} from "@/components";
import {deleteStoreMirror} from "@/store/slices/app";

interface ConfirmDeleteMirrorModalProps {
  storeId: string,
  onClose: () => void;
}

const ConfirmDeleteMirrorModal: React.FC<ConfirmDeleteMirrorModalProps> = ({storeId, onClose}) => {

  const dispatch = useDispatch();
  const storeMirrors = useSelector((state: any) => state.app.storeMirrors);
  const userOptions = useSelector((state: any) => state.userOptions);
  const deployOptions = userOptions.deployOptions;
  const params: GetMirrorsParams = {id: storeId};
  const {
    data: getMirrorsData,
    isLoading: getMirrorsLoading,
    error: getMirrorsError
  } = useGetMirrorsQuery(params);
  const [triggerDeleteMirror, {
    data: deleteMirrorData,
    error: deleteMirrorError
  }] = useDeleteMirrorMutation();
  const [displayDeleteActionLoading, setDisplayActionLoading] = useState<boolean>(false);
  const [userConfirmedDeleteMirror, setUserConfirmedDeleteMirror] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  useEffect(() => {
    if (userConfirmedDeleteMirror && !deleteMirrorData?.success && !deleteMirrorError && !getMirrorsError){
      setDisplayActionLoading(true);
    }else{
      setDisplayActionLoading(false);
    }
  }, [deleteMirrorData, deleteMirrorError, getMirrorsError, userConfirmedDeleteMirror]);

  useEffect(() => {
    if (getMirrorsData?.success && !getMirrorsLoading && userConfirmedDeleteMirror) {
      try {
        if (!getMirrorsData.mirrors.some((mirrorCoin) => {
          if (mirrorCoin.ours && mirrorCoin.urls.includes(storeMirrors[storeId])){
            triggerDeleteMirror({coin_id: mirrorCoin.coin_id, fee: deployOptions.defaultFee});
          } else {
            // url does not exist as mirror
            setShowErrorModal(true);
            setDisplayActionLoading(false);
            onClose();
          }
        })) /* body of above if */ {
          dispatch(deleteStoreMirror({storeId}));
          setDisplayActionLoading(false);
          onClose();
        }
      }catch (error){
        setShowErrorModal(true);
        setDisplayActionLoading(false);
      }
    }
  }, [
    deployOptions.defaultFee, dispatch, getMirrorsData, getMirrorsLoading,
    onClose, storeId, storeMirrors, triggerDeleteMirror, userConfirmedDeleteMirror
  ]);

  useEffect(() => {
    if (deleteMirrorData?.success) {
      dispatch(deleteStoreMirror(storeId));
      setDisplayActionLoading(false);
      onClose();
    } else if (deleteMirrorError) {
      setShowErrorModal(true);
      setDisplayActionLoading(false);
    }
  }, [deleteMirrorData, deleteMirrorError, dispatch, onClose, storeId]);

  const accept = () => {
    setUserConfirmedDeleteMirror(true);
  }

  const cancel = () => {
    if (!displayDeleteActionLoading){
      onClose();
    }
  }

  return (
    <>
      <Modal show={true} dismissible={false} onClose={cancel} size={'3xl'}>
        <Modal.Header>
          <FormattedMessage id="delete-store-mirror"/>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id={'store-id'}/>: {storeId}
            </p>
            <div className="space-y-2">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id="are-you-sure-you-want-to-delete-this-mirror"/>?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={accept} disabled={displayDeleteActionLoading}>
            <FormattedMessage id="yes-delete-mirror"/>
            {displayDeleteActionLoading && <Spinner className={"ml-2"} size={"sm"}/>}
          </Button>
          <Button color="gray" onClick={cancel} disabled={displayDeleteActionLoading}>
            <FormattedMessage id="cancel"/>
          </Button>
        </Modal.Footer>
      </Modal>
      {showErrorModal && <DeleteMirrorErrorModal onClose={() => setShowErrorModal(false)}/>}
    </>
  );
}

export {ConfirmDeleteMirrorModal};