import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCommitImportedOfferFileMutation } from '@/api';

interface Props {
  onClose: () => void;
}

const ConfirmTransferProjectModal: React.FC<Props> = ({ onClose }) => {
  const [triggerCommitTransfer, { isLoading, error }] = useCommitImportedOfferFileMutation();
  const handleConfirm = async () => {
    await triggerCommitTransfer();

    onClose();
  };

  const handleClickClose = async () => {
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="confirm-delete" />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <p>
            <FormattedMessage id="accepting-this-offer-will-write-the-associated-changes-transferring-ownership-of-the-project" />
            .
          </p>
          <p>
            <FormattedMessage id="the-transfer-cannot-be-revoked-once-committed" />.
          </p>
          {error && (
            <p className="text-red-600">
              <FormattedMessage id="failed-to-accept-offer" />!
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirm} isProcessing={isLoading} disabled={isLoading}>
          <FormattedMessage id="accept-and-commit" />
        </Button>
        <Button color="gray" onClick={handleClickClose} disabled={isLoading}>
          <FormattedMessage id="cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmTransferProjectModal };
