import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface StagedProjectSuccessModalProps {
  showModal: boolean;
  onClose: () => void;
}

const StagedProjectSuccessModal: React.FC<StagedProjectSuccessModalProps> = (
  { showModal = true, onClose }: StagedProjectSuccessModalProps) => {

  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="project-successfully-staged"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Your project has been successfully staged, and is waiting your review before it is commited to the blockchain.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { StagedProjectSuccessModal };