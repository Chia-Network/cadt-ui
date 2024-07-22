import React, { useState } from 'react';
import { Button, CommitTransferErrorModal, CommitTransferSuccessModal } from '@/components';
import { HiOutlineCheck } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { ConfirmTransferProjectModal } from '@/components/blocks/modals/ConfirmProjectTransferModal';

interface Props {
  disabled?: boolean;
}

const CommitImportedProjectTransferButton: React.FC<Props> = ({ disabled }) => {
  const [showConfirmTransferModal, setShowConfirmTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const handleCommitTransferError = (message?: string) => {
    setShowErrorModal({ show: true, message: message ? message : '' });
  };

  return (
    <>
      <Button onClick={() => setShowConfirmTransferModal(true)} disabled={disabled}>
        <HiOutlineCheck className="h-5 w-5 mr-1" />
        <FormattedMessage id="accept-and-commit-transfer" />
      </Button>
      {showConfirmTransferModal && (
        <ConfirmTransferProjectModal
          onSuccess={() => setShowSuccessModal(true)}
          onError={handleCommitTransferError}
          onClose={() => setShowConfirmTransferModal(false)}
        />
      )}
      {showErrorModal.show && (
        <CommitTransferErrorModal
          errorMessage={showErrorModal.message}
          onClose={() => setShowErrorModal({ show: false, message: '' })}
        />
      )}
      {showSuccessModal && <CommitTransferSuccessModal onClose={() => setShowSuccessModal(false)} />}
    </>
  );
};

export { CommitImportedProjectTransferButton };
