import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface AddSubscriptionErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  errorMessage?: string;
}

const AddSubscriptionErrorModal: React.FC<AddSubscriptionErrorModalProps> = (
  { showModal, setShowModal, errorMessage}: AddSubscriptionErrorModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="unable-to-add-subscription"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {
              errorMessage || <FormattedMessage id="error-occurred-while-adding-subscription"/>
            }
          </p>
          <div className="space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id={'confirm-entered-store-id-is-correct-and-references-a-valid-store'}/>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="ensure-chia-services-are-running-and-accessible"/>
            </p>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export {AddSubscriptionErrorModal};