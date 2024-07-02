import {
  CancelProjectOfferButton,
  CommitImportedProjectTransferButton,
  ComponentCenteredSpinner,
  DiffViewer,
  ImportTransferFileButton,
  ProjectOfferFileDownloadButton,
  RejectProjectTransferFileButton,
  StagingDiff,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useGetImportedOfferQuery } from '@/api';

interface TransferManagerProps {
  stagedTransferData: any;
}

const TransferManager: React.FC<TransferManagerProps> = ({ stagedTransferData }) => {
  const { data: importedOfferData, isLoading: importedOfferLoading } = useGetImportedOfferQuery();

  if (importedOfferLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <>
      {stagedTransferData?.uuid ? (
        <>
          <div className="flex space-x-2">
            <ProjectOfferFileDownloadButton disabled={!stagedTransferData} />
            <CancelProjectOfferButton disabled={!stagedTransferData} />
          </div>
          <div style={{ height: 'calc(100vh - 240px)' }}>
            <StagingDiff stagingUuid={stagedTransferData.uuid} />
          </div>
        </>
      ) : (
        <>
          {importedOfferData?.changes ? (
            <>
              <div className="flex space-x-2">
                <CommitImportedProjectTransferButton />
                <RejectProjectTransferFileButton />
              </div>
              <div style={{ height: 'calc(100vh - 240px)' }}>
                <DiffViewer data={importedOfferData.changes} />
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
    </>
  );
};

export { TransferManager };
