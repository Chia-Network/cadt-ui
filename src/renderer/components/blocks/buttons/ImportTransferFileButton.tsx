import React, { useRef, useState } from 'react';
import { useUploadOfferFileMutation } from '@/api';
import { Button } from '@/components';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { AiOutlineUpload } from 'react-icons/ai';

interface XlsUploadDownloadButtonsProps {}

const ImportTransferFileButton: React.FC<XlsUploadDownloadButtonsProps> = () => {
  const [triggerUploadOfferFile, { isLoading }] = useUploadOfferFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadFailedAlert, setShowUploadFailedAlert] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const offerFile: File | undefined = event.target.files?.[0];

    if (offerFile) {
      const uploadResult: any = await triggerUploadOfferFile({ offerFile });
      if (uploadResult?.data?.error || uploadResult?.error) {
        setShowUploadFailedAlert(true);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={isLoading} isProcessing={isLoading}>
        <AiOutlineUpload className="h-5 w-5 mr-1" />
        <FormattedMessage id="import-transfer-file" />
      </Button>
      {showUploadFailedAlert && (
        <div className="fixed w-1/4">
          <Alert color="red" onDismiss={() => setShowUploadFailedAlert(false)}>
            <FormattedMessage id="upload-failed" />!
          </Alert>
        </div>
      )}
    </>
  );
};

export { ImportTransferFileButton };
