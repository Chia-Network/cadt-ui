import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';

const ProjectTransferOfferFileDownload: React.FC = () => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showDownLoadFailedAlert, setShowDownloadFailedAlert] = useState<boolean>(false);

  useEffect(() => {
    if (showDownLoadFailedAlert) {
      setDownloadLoading(false);
    }
  }, [showDownLoadFailedAlert]);

  const handleDownloadedData = async (data: Blob) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects-data.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleClickDownload = async () => {
    setDownloadLoading(true);
    try {
      const url = new URL('http://localhost:31310/v1/projects');
      url.searchParams.append('xls', 'true');

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
      <Button onClick={handleClickDownload} isProcessing={downloadLoading}>
        <AiOutlineDeliveredProcedure className="h-5 w-5 mr-1" />
        <FormattedMessage id="download-offer-file" />
      </Button>
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

export { ProjectTransferOfferFileDownload };
