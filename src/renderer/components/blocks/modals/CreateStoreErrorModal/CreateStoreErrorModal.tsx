import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface CreateStoreErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  errorMessage?: string;
}

const CreateStoreErrorModal: React.FC<CreateStoreErrorModalProps> = (
  { showModal, setShowModal, errorMessage}: CreateStoreErrorModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="unable-to-create-new-store"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="error-occurred-while-creating-store"/>
              {' '}
              {
                errorMessage || <FormattedMessage id="ensure-chia-services-are-running-and-accessible"/>
              }
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { CreateStoreErrorModal };