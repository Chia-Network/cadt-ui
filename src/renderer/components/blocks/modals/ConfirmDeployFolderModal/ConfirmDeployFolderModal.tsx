import React from "react";
import { Modal, Button } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ConfirmDeployFolderProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  folderSizeMb: number;
  fee: number;
  onDeployFolder: () => void;
}

const ConfirmDeployFolderModal: React.FC<ConfirmDeployFolderProps> = (
  {showModal, setShowModal, folderSizeMb, fee, onDeployFolder}: ConfirmDeployFolderProps) => {

  const accept = () => {
    setShowModal(false);
    onDeployFolder();
  }

  const cancel = () => {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} dismissible={false} onClose={cancel}>
      <Modal.Header >
        <FormattedMessage id="important"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="this-action-will-incur-a-non-refundable-fee-of"/>
              {" " + fee + " "}
              <FormattedMessage id="xch-in-addition-to-standard-chia-blockchain-fees"/>
              {'.'}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {folderSizeMb.toFixed(2) + " MB "} <FormattedMessage id="of-data-will-be-deployed"/>
            </p>
          </div>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="do-you-want-to-proceed-with-folder-deploy?"/>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="yes-deploy-folder"/>
        </Button>
        <Button color="gray" onClick={cancel}>
          <FormattedMessage id="no-cancel-folder-deploy"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmDeployFolderModal }