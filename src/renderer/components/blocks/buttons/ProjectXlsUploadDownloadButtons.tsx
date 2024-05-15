import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';
import { Button } from '@/components';
import { useDownloadProjectsXlsImmediateMutation, useUploadProjectsXlsMutation } from '@/api';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useQueryParamState } from '@/hooks';

interface XlsUploadDownloadButtonsProps {
  downloadOnly?: boolean;
}

const ProjectXlsUploadDownloadButtons: React.FC<XlsUploadDownloadButtonsProps> = ({
  downloadOnly,
}: XlsUploadDownloadButtonsProps) => {
  // upload hooks and state
  const [triggerUploadProjectXls] = useUploadProjectsXlsMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadFailedAlert, setShowUploadFailedAlert] = useState<boolean>(false);

  // download hooks and state
  const [triggerDownloadProjectsXls, { isLoading: downloadProjectsLoading, error: downloadProjectsError }] =
    useDownloadProjectsXlsImmediateMutation();
  const [showDownLoadFailedAlert, setShowDownloadFailedAlert] = useState<boolean>(false);
  const [orgUid] = useQueryParamState('orgUid', undefined);
  const [search] = useQueryParamState('search', undefined);
  const [order] = useQueryParamState('order', undefined);

  useEffect(() => {
    if (downloadProjectsError) {
      setShowDownloadFailedAlert(true);
    }
  }, [downloadProjectsError]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const xlsx: File | undefined = event.target.files?.[0];

    if (xlsx) {
      const uploadResult: any = await triggerUploadProjectXls({ xlsx });
      if (uploadResult?.data?.error || uploadResult?.error) {
        setShowUploadFailedAlert(true);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async (data: any) => {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
    try {
      const result = await triggerDownloadProjectsXls({
        orgUid,
        search,
        order,
      }).unwrap();
      handleDownload(result);
    } catch (error) {
      setShowDownloadFailedAlert(true);
    }
  };

  return (
    <>
      {downloadOnly ? (
        <Button color="gray" onClick={handleClickDownload} isProcessing={downloadProjectsLoading}>
          <AiOutlineDownload className="h-5 w-5" />
        </Button>
      ) : (
        <>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <Button.Group>
            <Button color="gray" onClick={handleClickDownload} isProcessing={downloadProjectsLoading}>
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

export { ProjectXlsUploadDownloadButtons };
