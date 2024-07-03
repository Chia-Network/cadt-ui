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
    </div>
  );
};

export { TransferManager };
