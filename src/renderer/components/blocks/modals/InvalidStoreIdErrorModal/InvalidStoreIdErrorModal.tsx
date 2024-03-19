import React, {useCallback} from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface InvalidStoreIdErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose?: () => void;
}

const InvalidStoreIdErrorModal: React.FC<InvalidStoreIdErrorModalProps> = (
  { showModal, setShowModal, onClose = () => {} }: InvalidStoreIdErrorModalProps) => {

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [setShowModal, onClose]);

  return (
    <Modal show={showModal} onClose={handleClose}>
      <Modal.Header>
        <FormattedMessage id="error"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="invalid-store-id"/>
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { InvalidStoreIdErrorModal };