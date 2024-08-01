import {
  Button,
  CancelProjectOfferButton,
  CommitImportedProjectTransferButton,
  ComponentCenteredSpinner,
  DiffViewer,
  ImportTransferFileButton,
  ProjectOfferFileDownloadButton,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import React, { useCallback, useMemo } from 'react';
import { useRejectImportedOfferFileMutation } from '@/api';
import { HiOutlineX } from 'react-icons/hi';
import { Unit } from '@/schemas/Unit.schema';
import { Project } from '@/schemas/Project.schema';

const diffHeight: string = 'calc(100vh - 295px)';

interface UnitDiff {
  action: string;
  table: 'Units';
  diff: { original: Unit; change: Unit[] };
}

interface ProcessedImportedOffer {
  project: {
    action: string;
    table: 'Projects';
    diff: { original: Project; change: Project[] };
  };
  units: UnitDiff[];
}

interface TransferManagerProps {
  stagedTransferData: any;
  importedTransferOfferData: any;
  isLoading: boolean;
}

const TransferManager: React.FC<TransferManagerProps> = ({
  stagedTransferData,
  importedTransferOfferData,
  isLoading,
}) => {
  const [triggerRejectOfferFile, { isLoading: rejectOfferLoading }] = useRejectImportedOfferFileMutation();

  const processedImportedOfferData = useMemo<ProcessedImportedOffer>((): ProcessedImportedOffer => {
    const original: any = importedTransferOfferData?.changes?.taker?.[0]?.value
      ? importedTransferOfferData.changes.taker[0].value
      : {};
    const change: any = importedTransferOfferData?.changes?.maker?.[0]?.value
      ? importedTransferOfferData.changes.maker[0].value
      : {};

    const units: UnitDiff[] = [];

    importedTransferOfferData?.changes?.taker?.forEach((takerItem: any, index: number) => {
      if (importedTransferOfferData?.changes?.maker?.length && index < importedTransferOfferData.changes.maker.length) {
        const makerItem: any = importedTransferOfferData?.changes?.maker?.[index];

        if (takerItem?.table === 'unit' && makerItem?.table === 'unit' && takerItem?.value && makerItem?.value) {
          const diff: UnitDiff = {
            action: 'TRANSFER',
            table: 'Units',
            diff: { original: takerItem.value, change: [makerItem.value] },
          };
          units.push(diff);
        }
      }
    });

    return {
      project: {
        action: 'TRANSFER',
        table: 'Projects',
        diff: {
          original,
          change: [change],
        },
      },
      units,
    };
  }, [importedTransferOfferData]);

  const handleRejectOffer = useCallback(async () => {
    await triggerRejectOfferFile();
    // required until cadt /offer/accept is fixed to not return 400 when no offer present. forces store refresh
    window.location.reload();
  }, [triggerRejectOfferFile]);

  if (isLoading) {
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
            <div style={{ height: diffHeight }}>
              <div className="h-screen">
                <DiffViewer data={{ ...stagedTransferData, action: 'TRANSFER' }} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {importedTransferOfferData?.changes ? (
            <>
              <div className="flex space-x-2 pb-3">
                <CommitImportedProjectTransferButton />
                <Button onClick={handleRejectOffer} disabled={rejectOfferLoading} isProcessing={rejectOfferLoading}>
                  <HiOutlineX className="h-5 w-5 mr-1" />
                  <FormattedMessage id="reject-transfer-offer" />
                </Button>
              </div>
              <div className="overflow-y-auto outline outline-gray-300 rounded">
                <div style={{ height: diffHeight }}>
                  <div className="h-screen">
                    <DiffViewer data={processedImportedOfferData.project} />
                    {processedImportedOfferData.units.map((unit: UnitDiff) => (
                      <DiffViewer data={unit} key={unit.diff.original.warehouseUnitId} />
                    ))}
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
