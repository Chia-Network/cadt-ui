import React from 'react';
import { Button } from '@/components';
import { HiOutlineX } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { useRejectImportedOfferFileMutation } from '@/api';

interface Props {}

const RejectProjectTransferFileButton: React.FC<Props> = () => {
  const [triggerRejectOfferFile, { isLoading }] = useRejectImportedOfferFileMutation();

  return (
    <>
      <Button onClick={() => triggerRejectOfferFile()} disabled={isLoading} isProcessing={isLoading}>
        <HiOutlineX className="h-5 w-5 mr-1" />
        <FormattedMessage id="reject-transfer-offer" />
      </Button>
    </>
  );
};

export { RejectProjectTransferFileButton };
