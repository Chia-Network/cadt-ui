import React, { useState } from 'react';
import { Button } from '@/components';
import { HiOutlineTrash } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { ConfirmCancelOfferModal } from '@/components/blocks/modals/ConfirmCancelOfferModal';

interface Props {
  disabled?: boolean;
}

const CancelProjectOfferButton: React.FC<Props> = ({ disabled }) => {
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowConfirmCancelModal(true)} disabled={disabled}>
        <HiOutlineTrash className="h-5 w-5 mr-1" />
        <FormattedMessage id="cancel-offer" />
      </Button>
      {showConfirmCancelModal && <ConfirmCancelOfferModal onClose={() => setShowConfirmCancelModal(false)} />}
    </>
  );
};

export { CancelProjectOfferButton };
