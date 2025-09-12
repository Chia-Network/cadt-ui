import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteStagedItemMutation } from '@/api/cadt/v1/staging';

interface ConfirmDeleteModalProps {
  uuid: string;
  onClose: () => void;
}

const ConfirmDeleteStagedItemModal: React.FC<ConfirmDeleteModalProps> = ({
  uuid,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [triggerDeleteStagedItem, { isLoading: stagedItemDeletionLoading }] = useDeleteStagedItemMutation();
  const handleConfirm = async () => {
    await triggerDeleteStagedItem({ uuid });
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
        <p>
          <FormattedMessage id="deleting-a-staged-item-is-a-permanent-action" />.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClickClose} disabled={stagedItemDeletionLoading}>
          <FormattedMessage id="cancel" />
        </Button>
        <Button
          color="red"
          onClick={handleConfirm}
          isProcessing={stagedItemDeletionLoading}
          disabled={stagedItemDeletionLoading}
        >
          <FormattedMessage id="delete" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDeleteStagedItemModal };
