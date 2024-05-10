import React, { useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';
import { Button } from '@/components';
import {
  useDownloadProjectsXlsImmediateMutation,
  useDownloadUnitsXlsImmediateMutation,
  useUploadProjectsXlsMutation,
  useUploadUnitsXlsMutation,
} from '@/api';
import { Alert } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';

interface XlsUploadDownloadButtonsProps {
  type: 'project' | 'unit';
  orgUid: string;
}

const XlsUploadDownloadButtons: React.FC<XlsUploadDownloadButtonsProps> = ({
  type,
  orgUid,
}: XlsUploadDownloadButtonsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [triggerUploadProjectXls] = useUploadProjectsXlsMutation();
  const [triggerDownloadProjectXls] = useDownloadProjectsXlsImmediateMutation();
  const [triggerUploadUnitXls] = useUploadUnitsXlsMutation();
  const [triggerDownloadUnitsXls] = useDownloadUnitsXlsImmediateMutation();
  const [showFailedAlert, setShowFailedAlert] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const xlsx: File | undefined = event.target.files?.[0];

    if (xlsx && type === 'project') {
      const uploadResult: any = await triggerUploadProjectXls({ xlsx });
      if (uploadResult?.data?.error || uploadResult?.error) {
        setShowFailedAlert(true);
      }
    } else if (xlsx) {
      const uploadResult: any = await triggerUploadUnitXls({ xlsx });
      if (uploadResult?.data?.error || uploadResult?.error) {
        setShowFailedAlert(true);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async () => {
    const xlsxData: any =
      type === 'project' ? await triggerDownloadProjectXls({ orgUid }) : await triggerDownloadUnitsXls({ orgUid });
    console.log(xlsxData);

    if (!xlsxData?.data?.error && !xlsxData?.error) {
      const url = xlsxData;
      const link = document.createElement('a');
      link.href = url;
      link.download = type === 'project' ? 'projects.xlsx' : 'units.xlsx';
      link.click();
      link.remove();
    }
  };

  return (
    <>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <Button.Group>
        <Button color="gray" onClick={handleDownload}>
          <AiOutlineDownload className="h-5 w-5" />
        </Button>
        <Button color="gray" onClick={handleUpload}>
          <AiOutlineUpload className="h-5 w-5" />
        </Button>
      </Button.Group>
      {showFailedAlert && (
        <div className="fixed w-1/4">
          <Alert color="failure" onDismiss={() => setShowFailedAlert(false)}>
            <FormattedMessage id="upload-failed" />!
          </Alert>
        </div>
      )}
    </>
  );
};

export { XlsUploadDownloadButtons };
