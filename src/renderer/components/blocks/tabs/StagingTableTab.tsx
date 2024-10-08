import { FormattedMessage } from 'react-intl';
import { SkeletonTable, StagingTable } from '@/components';
import React from 'react';
import { useColumnOrderHandler, useQueryParamState } from '@/hooks';

interface PageTabProps {
  type: 'staged' | 'pending' | 'failed';
  stagingData: any[];
  showLoading: boolean;
  setStagingDiffModalActive: (active: boolean, StagingUuid: string) => void;
}

const StagingTableTab: React.FC<PageTabProps> = ({
  stagingData,
  showLoading,
  type,
  setStagingDiffModalActive,
}: PageTabProps) => {
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  if (showLoading) {
    return <SkeletonTable />;
  }

  if (!stagingData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {showLoading ? (
        <SkeletonTable />
      ) : (
        <StagingTable
          data={stagingData}
          type={type}
          isLoading={showLoading}
          setOrder={handleSetOrder}
          order={order}
          onRowClick={(row) => setStagingDiffModalActive(true, row.uuid)}
        />
      )}
    </>
  );
};

export { StagingTableTab };
