import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Button, ConfirmDeleteStagedItemModal, Tooltip, UpsertProjectModal, UpsertUnitModal } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { FormattedMessage } from 'react-intl';

interface ActionsProps {
  stagedItem: any;
}

const StagedItemActions: React.FC<ActionsProps> = ({ stagedItem }: ActionsProps) => {
  const [, editProjectModalActive, setEditProjectModalActive] = useWildCardUrlHash('edit-project');
  const [, editUnitModalActive, setEditUnitModalActive] = useWildCardUrlHash('edit-unit');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleClickEdit = () => {
    if (stagedItem?.table === 'Projects') {
      setEditProjectModalActive(true); //todo: need a way to get staged data into form without using warehouseId
    } else {
      setEditUnitModalActive(true); //todo: need a way to get staged data into form without using warehouseId
    }
  };

  return (
    <>
      <Tooltip
        style="light"
        trigger="click"
        placement="right"
        content={
          <>
            {stagedItem?.action === 'DELETE' ? (
              <Button onClick={handleClickDelete} outline>
                <FormattedMessage id="delete" />
              </Button>
            ) : (
              <Button.Group>
                <Button onClick={handleClickEdit} outline>
                  <FormattedMessage id="edit" />
                </Button>
                <Button onClick={handleClickDelete} outline>
                  <FormattedMessage id="delete" />
                </Button>
              </Button.Group>
            )}
          </>
        }
      >
        <HiDotsVertical size="25" />
      </Tooltip>
      {editProjectModalActive && <UpsertProjectModal onClose={() => setEditProjectModalActive(false)} />}
      {editUnitModalActive && <UpsertUnitModal onClose={() => setEditUnitModalActive(false)} />}
      {showDeleteModal && stagedItem?.uuid && (
        <ConfirmDeleteStagedItemModal uuid={stagedItem.uuid} onClose={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};

export { StagedItemActions };
