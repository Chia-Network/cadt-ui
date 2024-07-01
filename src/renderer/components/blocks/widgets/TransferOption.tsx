import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Button, Tooltip } from '@/components';
import { FormattedMessage } from 'react-intl';

interface ProjectAndUnitActionsProps {
  warehouseId: string;
  openTransferModal: (warehouseId: string) => void;
}

const TransferOption: React.FC<ProjectAndUnitActionsProps> = ({
  warehouseId,
  openTransferModal,
}: ProjectAndUnitActionsProps) => {
  const handleClickTransfer = () => {
    openTransferModal(warehouseId);
  };

  return (
    <>
      <Tooltip
        style="light"
        trigger="click"
        placement="right"
        content={
          <Button onClick={handleClickTransfer} outline>
            <FormattedMessage id="transfer" />
          </Button>
        }
      >
        <HiDotsVertical size="25" />
      </Tooltip>
    </>
  );
};

export { TransferOption };
