import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface CreateStoreSuccessModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const CreatStoreSuccessModal: React.FC<CreateStoreSuccessModalProps> = (
  {showModal, setShowModal}: CreateStoreSuccessModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="success"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="successfully-created-new-store"/>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { CreatStoreSuccessModal }