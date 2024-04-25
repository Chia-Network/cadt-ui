import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface StagedUnitSuccessModalProps {
  showModal: boolean;
  onClose: () => void;
}

const StagedUnitSuccessModal: React.FC<StagedUnitSuccessModalProps> = (
  { showModal = true, onClose }: StagedUnitSuccessModalProps) => {

  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="unit-successfully-staged"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Your unit has been successfully staged, and is waiting your review before it is commited to the blockchain.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { StagedUnitSuccessModal };