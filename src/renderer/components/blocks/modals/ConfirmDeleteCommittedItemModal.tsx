import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteProjectMutation, useDeleteUnitMutation } from '@/api';
import { invalidateStagingApiTag } from '@/api/cadt/v1/staging/';
import { stagedProjectsTag, stagedUnitsTag } from '@/api/cadt/v1';
import { useDispatch } from 'react-redux';

interface ConfirmDeleteModalProps {
  type: 'project' | 'unit';
  warehouseId: string;
  onClose: () => void;
}

const ConfirmDeleteCommittedItemModal: React.FC<ConfirmDeleteModalProps> = ({
  type,
  warehouseId,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [triggerDeleteProject, { isLoading: projectDeletionLoading }] = useDeleteProjectMutation();
  const [triggerDeleteUnit, { isLoading: unitDeletionLoading }] = useDeleteUnitMutation();
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    if (type === 'project') {
      await triggerDeleteProject({ warehouseProjectId: warehouseId });
      dispatch(invalidateStagingApiTag([stagedProjectsTag]));
    } else {
      await triggerDeleteUnit({ warehouseUnitId: warehouseId });
      dispatch(invalidateStagingApiTag([stagedUnitsTag]));
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
        <div className="space-y-2">
          <p>
            <FormattedMessage id="deleting-this-item-will-add-a-corresponding-delete-entry-to-the-staging-table" />.
          </p>
          <p>
            <FormattedMessage id="no-items-will-be-deleted-until-staged-changes-are-committed" />.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClickClose} disabled={projectDeletionLoading || unitDeletionLoading}>
          <FormattedMessage id="cancel" />
        </Button>
        <Button
          onClick={handleConfirm}
          isProcessing={projectDeletionLoading || unitDeletionLoading}
          disabled={projectDeletionLoading || unitDeletionLoading}
        >
          <FormattedMessage id="delete" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDeleteCommittedItemModal };
