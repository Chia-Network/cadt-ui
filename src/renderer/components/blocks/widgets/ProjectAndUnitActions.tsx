import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Button, ConfirmDeleteModal, Tooltip, UpsertProjectModal } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { FormattedMessage } from 'react-intl';

interface ProjectAndUnitActionsProps {
  type: 'project' | 'unit';
  warehouseId: string;
}

const ProjectAndUnitActions: React.FC<ProjectAndUnitActionsProps> = ({
  type,
  warehouseId,
}: ProjectAndUnitActionsProps) => {
  const [, editProjectModalActive, setEditProjectModalActive] = useWildCardUrlHash('edit-project');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleClickEdit = () => {
    setEditProjectModalActive(true, warehouseId);
  };

  return (
    <>
      <Tooltip
        style="light"
        placement="right"
        content={
          <Button.Group>
            <Button onClick={handleClickEdit}>
              <FormattedMessage id="edit" />
            </Button>
            <Button color="gray" onClick={handleClickDelete}>
              <FormattedMessage id="delete" />
            </Button>
          </Button.Group>
        }
      >
        <Button size="sm" pill outline>
          <HiDotsVertical />
        </Button>
      </Tooltip>
      {editProjectModalActive && <UpsertProjectModal onClose={() => setEditProjectModalActive(false)} />}
      {showDeleteModal && (
        <ConfirmDeleteModal type={type} warehouseId={warehouseId} onClose={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};

export { ProjectAndUnitActions };
