import React, { useState } from 'react';
import { Button } from '@/components';
import { HiOutlineCheck } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { ConfirmTransferProjectModal } from '@/components/blocks/modals/ConfirmProjectTransferModal';

interface Props {
  disabled?: boolean;
}

const CommitImportedProjectTransferButton: React.FC<Props> = ({ disabled }) => {
  const [showConfirmTransferModal, setShowConfirmTransferModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowConfirmTransferModal(true)} disabled={disabled}>
        <HiOutlineCheck className="h-5 w-5 mr-1" />
        <FormattedMessage id="accept-and-commit-transfer" />
      </Button>
      {showConfirmTransferModal && <ConfirmTransferProjectModal onClose={() => setShowConfirmTransferModal(false)} />}
    </>
  );
};

export { CommitImportedProjectTransferButton };
