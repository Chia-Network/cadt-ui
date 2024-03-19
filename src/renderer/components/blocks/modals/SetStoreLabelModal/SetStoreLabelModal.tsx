import {Modal} from "flowbite-react";
import React from "react";
import {FormattedMessage} from "react-intl";
import {SetStoreLabel} from "@/components";

interface SetStoreLabelModalProps {
  storeId: string;
  onClose: () => void;
}

const SetStoreLabelModal: React.FC<SetStoreLabelModalProps> =
  ({storeId, onClose }) => {

  return (
    <Modal show={true} onClose={onClose} size="3xl">
      <Modal.Header>
        <FormattedMessage id="set-store-label"/>
      </Modal.Header>
      <Modal.Body>
        <SetStoreLabel storeId={storeId}/>
      </Modal.Body>
    </Modal>
  );
}

export {SetStoreLabelModal}
