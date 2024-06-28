import React, { useState } from 'react';
import { Button } from '@/components';
import { HiOutlineTrash } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useCancelActiveOfferMutation } from '@/api';

const ProjectTransferOfferCancel: React.FC = () => {
  const [triggerCancelOffer, { isLoading, error }] = useCancelActiveOfferMutation();
  const [showCancelFailedAlert, setShowCancelFailedAlert] = useState<boolean>(false);

  if (error) {
    setShowCancelFailedAlert(true);
  }

  return (
    <>
      <Button onClick={() => triggerCancelOffer} isProcessing={isLoading}>
        <HiOutlineTrash className="h-5 w-5 mr-1" />
        <FormattedMessage id="cancel-offer" />
      </Button>

      {showCancelFailedAlert && (
        <div className="fixed w-1/4">
          <Alert color="failure" onDismiss={() => setShowCancelFailedAlert(false)}>
            <FormattedMessage id="failed-to-cancel-offer" />!
          </Alert>
        </div>
      )}
    </>
  );
};

export { ProjectTransferOfferCancel };
