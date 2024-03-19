import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface WalletNotSyncedErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const WalletNotSyncedErrorModal: React.FC<WalletNotSyncedErrorModalProps> = (
  { showModal, setShowModal }: WalletNotSyncedErrorModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="unable-to-create-new-store"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="your-chia-wallet-is-not-synced"/>
              {' '}
              <FormattedMessage id="please-try-again-later"/>
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { WalletNotSyncedErrorModal };