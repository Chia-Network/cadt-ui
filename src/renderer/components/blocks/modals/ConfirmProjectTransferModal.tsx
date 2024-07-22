import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCommitImportedOfferFileMutation } from '@/api';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  onError: (errorMessage?: string) => void;
}

const ConfirmTransferProjectModal: React.FC<Props> = ({ onClose, onSuccess, onError }) => {
  const [triggerCommitTransfer, { isLoading }] = useCommitImportedOfferFileMutation();

  const handleConfirm = async () => {
    const result: any = await triggerCommitTransfer();
    if (result?.error?.data?.error) {
      onError(result.error.data.error);
    } else if (result?.error) {
      onError();
    } else {
      onSuccess();
    }
    onClose();
  };

  const handleClickClose = async () => {
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="confirm-project-transfer" />
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirm} isProcessing={isLoading} disabled={isLoading}>
          <FormattedMessage id="accept-and-commit-transfer" />
        </Button>
        <Button color="gray" onClick={handleClickClose} disabled={isLoading}>
          <FormattedMessage id="cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmTransferProjectModal };
