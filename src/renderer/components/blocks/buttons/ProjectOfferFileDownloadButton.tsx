import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  disabled?: boolean;
}

const ProjectOfferFileDownloadButton: React.FC<Props> = ({ disabled }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showDownLoadFailedAlert, setShowDownloadFailedAlert] = useState<boolean>(false);
  const appStore = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (showDownLoadFailedAlert) {
      setDownloadLoading(false);
    }
  }, [showDownLoadFailedAlert]);

  const handleDownloadedData = async (data: Blob) => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transfer-offer.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleClickDownload = async () => {
    setDownloadLoading(true);
    try {
      const url = new URL(`${appStore.apiHost}/v1/offer`);
      const headers = {
        Accept: '*/*',
      };

      if (appStore?.apiKey) {
        headers['X-Api-Key'] = appStore.apiKey;
      }

      const downloadResponse: Response = await fetch(url, {
        mode: 'cors',
        headers,
      });

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
      <Button onClick={handleClickDownload} isProcessing={downloadLoading} disabled={downloadLoading || disabled}>
        <AiOutlineDeliveredProcedure className="h-5 w-5 mr-1" />
        <FormattedMessage id="download-offer-file" />
      </Button>
      {showDownLoadFailedAlert && (
        <div className="fixed w-1/4 right-5">
          <Alert color="failure" onDismiss={() => setShowDownloadFailedAlert(false)}>
            <FormattedMessage id="download-failed" />!
          </Alert>
        </div>
      )}
    </>
  );
};

export { ProjectOfferFileDownloadButton };
