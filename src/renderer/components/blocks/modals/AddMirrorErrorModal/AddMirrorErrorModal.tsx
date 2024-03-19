import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface AddMirrorErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  errorMessage?: string;
}

const AddMirrorErrorModal: React.FC<AddMirrorErrorModalProps> = (
  { showModal, setShowModal, errorMessage}: AddMirrorErrorModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="unable-to-add-mirror"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {
              errorMessage || <FormattedMessage id="an-error-occurred-while-adding-the-mirror"/>
            }
          </p>
          <div className="space-y-1">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id={'confirm-entered-store-id-is-correct-and-references-a-valid-store'}/>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="ensure-chia-services-are-running-and-accessible"/>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export {AddMirrorErrorModal};