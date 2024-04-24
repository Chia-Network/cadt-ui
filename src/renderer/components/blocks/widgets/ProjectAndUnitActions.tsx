import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Button, ConfirmDeleteCommittedItemModal, Tooltip } from '@/components';
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
  const [, , setEditProjectModalActive] = useWildCardUrlHash('edit-project');
  const [, , setEditUnitModalActive] = useWildCardUrlHash('edit-unit');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleClickEdit = () => {
    if (type === 'project') {
      setEditProjectModalActive(true, warehouseId);
    } else {
      setEditUnitModalActive(true, warehouseId);
    }
  };

  return (
    <>
      <Tooltip
        style="light"
        trigger="click"
        placement="right"
        content={
          <Button.Group>
            <Button onClick={handleClickEdit} outline>
              <FormattedMessage id="edit" />
            </Button>
            <Button onClick={handleClickDelete} outline>
              <FormattedMessage id="delete" />
            </Button>
          </Button.Group>
        }
      >
        <HiDotsVertical size="25" />
      </Tooltip>
      {showDeleteModal && (
        <ConfirmDeleteCommittedItemModal
          type={type}
          warehouseId={warehouseId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export { ProjectAndUnitActions };
