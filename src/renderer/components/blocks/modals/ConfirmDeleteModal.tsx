import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteProjectMutation, useDeleteUnitMutation } from '@/api';

interface ConfirmDeleteModalProps {
  type: 'project' | 'unit';
  warehouseId: string;
  onClose: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  type,
  warehouseId,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [triggerDeleteProject] = useDeleteProjectMutation();
  const [triggerDeleteUnit] = useDeleteUnitMutation();
  const handleConfirm = async () => {
    if (type === 'project') {
      triggerDeleteProject({ warehouseProjectId: warehouseId });
    } else {
      triggerDeleteUnit({ warehouseUnitId: warehouseId });
    }
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
          <FormattedMessage id="this-action-cannot-be-undone" />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClickClose}>
          <FormattedMessage id="cancel" />
        </Button>
        <Button onClick={handleConfirm}>
          <FormattedMessage id="delete" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDeleteModal };
