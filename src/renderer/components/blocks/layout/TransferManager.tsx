import {
  Button,
  CancelProjectOfferButton,
  CommitImportedProjectTransferButton,
  ComponentCenteredSpinner,
  DiffViewer,
  ImportTransferFileButton,
  ProjectOfferFileDownloadButton,
  StagingDiff,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import React, { useCallback, useMemo } from 'react';
import { useGetImportedOfferQuery, useRejectImportedOfferFileMutation } from '@/api';
import { HiOutlineX } from 'react-icons/hi';

interface TransferManagerProps {
  stagedTransferData: any;
}

const TransferManager: React.FC<TransferManagerProps> = ({ stagedTransferData }) => {
  const { data: importedOfferData, isLoading: importedOfferLoading } = useGetImportedOfferQuery();
  const [triggerRejectOfferFile, { isLoading: rejectOfferLoading }] = useRejectImportedOfferFileMutation();

  const processedImportedOfferData: any = useMemo(() => {
    const original: any = importedOfferData?.changes?.taker?.[0]?.value ? importedOfferData.changes.taker[0].value : {};
    const change: any[] = [
      importedOfferData?.changes?.maker?.[0]?.value ? importedOfferData.changes.maker[0].value : {},
    ];

    return {
      action: 'TRANSFER',
      diff: {
        original,
        change,
      },
    };
  }, [importedOfferData]);

  const handleRejectOffer = useCallback(async () => {
    await triggerRejectOfferFile();
    // required until cadt /offer/accept is fixed to not return 400 when no offer present. forces store refresh
    window.location.reload();
  }, [triggerRejectOfferFile]);

  if (importedOfferLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <div className="h-full">
      {stagedTransferData?.uuid ? (
        <>
          <div className="flex space-x-2 pb-2 pt-1">
            <ProjectOfferFileDownloadButton disabled={!stagedTransferData} />
            <CancelProjectOfferButton disabled={!stagedTransferData} />
          </div>
          <div className="overflow-y-auto outline outline-gray-300 rounded">
            <div style={{ height: 'calc(100vh - 295px)' }}>
              <StagingDiff stagingUuid={stagedTransferData.uuid} />
            </div>
          </div>
        </>
      ) : (
        <>
          {importedOfferData?.changes ? (
            <>
              <div className="flex space-x-2 pb-3">
                <CommitImportedProjectTransferButton />
                <Button onClick={handleRejectOffer} disabled={rejectOfferLoading} isProcessing={rejectOfferLoading}>
                  <HiOutlineX className="h-5 w-5 mr-1" />
                  <FormattedMessage id="reject-transfer-offer" />
                </Button>
              </div>
              <div className="overflow-y-auto outline outline-gray-300 rounded">
                <div style={{ height: 'calc(100vh - 295px)' }}>
                  <div className="h-screen">
                    <DiffViewer data={processedImportedOfferData} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid justify-items-center">
              <p className="pb-5">
                <FormattedMessage id="no-pending-transfers" />
              </p>
              <ImportTransferFileButton />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { TransferManager };
