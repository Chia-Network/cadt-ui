import React from 'react';
import { invalidateStagingApiTag, useCancelActiveOfferMutation } from '@/api';
import { useDispatch } from 'react-redux';
import { stagedProjectsTag } from '@/api/cadt/v1';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';

interface Props {
  onClose: () => void;
}

const ConfirmCancelOfferModal: React.FC<Props> = ({ onClose }) => {
  const [triggerCancelOffer, { isLoading, error }] = useCancelActiveOfferMutation();
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    await triggerCancelOffer();
    dispatch(invalidateStagingApiTag([stagedProjectsTag]));

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
            <FormattedMessage id="cancelling-this-offer-will-invalidate-the-corresponding-offer-file" />.
          </p>
          <p>
            <FormattedMessage id="this-action-cannot-be-undone" />.
          </p>
          {error && (
            <p className="text-red-600">
              <FormattedMessage id="failed-to-cancel-offer" />!
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirm} isProcessing={isLoading} disabled={isLoading}>
          <FormattedMessage id="confirm-cancel-offer" />
        </Button>
        <Button color="gray" onClick={handleClickClose} disabled={isLoading}>
          <FormattedMessage id="do-not-cancel-offer" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmCancelOfferModal };
