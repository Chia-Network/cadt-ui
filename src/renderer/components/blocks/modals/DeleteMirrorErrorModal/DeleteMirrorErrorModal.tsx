import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface DeleteMirrorErrorModalProps {
  onClose: () => void;
}

const DeleteMirrorErrorModal: React.FC<DeleteMirrorErrorModalProps> = (
  { onClose }: DeleteMirrorErrorModalProps) => {

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="error"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="an-error-occurred-while-deleting-the-mirror"/>
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { DeleteMirrorErrorModal };