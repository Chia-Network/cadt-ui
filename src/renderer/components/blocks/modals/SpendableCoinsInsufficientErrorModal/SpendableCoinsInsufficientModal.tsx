import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface SpendableCoindsInsufficientModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const SpendableCoinsInsufficientErrorModal: React.FC<SpendableCoindsInsufficientModalProps> = (
  { showModal, setShowModal }: SpendableCoindsInsufficientModalProps) => {

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="insufficient-spendable-coins"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="you-must-have-at-least-1-spendable-coin-in-your-wallet-for-this-action"/>
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { SpendableCoinsInsufficientErrorModal };