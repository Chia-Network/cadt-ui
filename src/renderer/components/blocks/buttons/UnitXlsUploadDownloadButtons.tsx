import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';
import { Button } from '@/components';
import { useUploadUnitsXlsMutation } from '@/api';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';

interface XlsUploadDownloadButtonsProps {
  orgUid: string;
  order: string;
  search: string;
  downloadOnly?: boolean;
}

const UnitXlsUploadDownloadButtons: React.FC<XlsUploadDownloadButtonsProps> = ({
  downloadOnly,
  search,
  order,
  orgUid,
}: XlsUploadDownloadButtonsProps) => {
  // upload hooks and state
  const [triggerUploadUnitXls] = useUploadUnitsXlsMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadFailedAlert, setShowUploadFailedAlert] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // download hooks and state
  const [showDownLoadFailedAlert, setShowDownloadFailedAlert] = useState<boolean>(false);

  useEffect(() => {
    if (showDownLoadFailedAlert) {
      setDownloadLoading(false);
    }
  }, [showDownLoadFailedAlert]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const xlsx: File | undefined = event.target.files?.[0];

    if (xlsx) {
      const uploadResult: any = await triggerUploadUnitXls({ xlsx });
      if (uploadResult?.data?.error || uploadResult?.error) {
        setShowUploadFailedAlert(true);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadedData = async (data: Blob) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'units-data.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleClickDownload = async () => {
    setDownloadLoading(true);
    try {
      const url = new URL('http://localhost:31310/v1/units');
      url.searchParams.append('xls', 'true');
      console.log('**** units', orgUid);
      orgUid && url.searchParams.append('orgUid', orgUid);
      search && url.searchParams.append('search', search);
      order && url.searchParams.append('order', order);

      const downloadResponse: Response = await fetch(url);
      if (!downloadResponse?.ok) {
        setShowDownloadFailedAlert(true);
        return;
      }

      const blob: Blob = await downloadResponse.blob();
      if (!blob) {
        setShowDownloadFailedAlert(true);
        return;
      }

      await handleDownloadedData(blob);
      setDownloadLoading(false);
    } catch (error) {
      setShowDownloadFailedAlert(true);
    }
  };

  return (
    <>
      {downloadOnly ? (
        <Button color="gray" onClick={handleClickDownload} isProcessing={downloadLoading}>
          <AiOutlineDownload className="h-5 w-5" />
        </Button>
      ) : (
        <>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <Button.Group>
            <Button color="gray" onClick={handleClickDownload} isProcessing={downloadLoading}>
              <AiOutlineDownload className="h-5 w-5" />
            </Button>
            <Button color="gray" onClick={handleUpload}>
              <AiOutlineUpload className="h-5 w-5" />
            </Button>
          </Button.Group>
        </>
      )}

      {showUploadFailedAlert && (
        <div className="fixed w-1/4">
          <Alert color="failure" onDismiss={() => setShowUploadFailedAlert(false)}>
            <FormattedMessage id="upload-failed" />!
          </Alert>
        </div>
      )}
      {showDownLoadFailedAlert && (
        <div className="fixed w-1/4">
          <Alert color="failure" onDismiss={() => setShowDownloadFailedAlert(false)}>
            <FormattedMessage id="download-failed" />!
          </Alert>
        </div>
      )}
    </>
  );
};

export { UnitXlsUploadDownloadButtons };
