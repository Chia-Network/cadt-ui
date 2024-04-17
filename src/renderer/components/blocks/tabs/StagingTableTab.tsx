import { FormattedMessage } from 'react-intl';
import { SkeletonTable, StagingDiffModal, StagingTable } from '@/components';
import React from 'react';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';

interface PageTabProps {
  stagingData: any[];
  showLoading: boolean;
}

const StagingTableTab: React.FC<PageTabProps> = ({ stagingData, showLoading }: PageTabProps) => {
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const [stagingDiffFragment, stagingDiffModalActive, setStagingDiffModalActive] = useWildCardUrlHash('staging');

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
          isLoading={showLoading}
          setOrder={handleSetOrder}
          order={order}
          onRowClick={(row) => setStagingDiffModalActive(true, row.uuid)}
        />
      )}
      {stagingDiffModalActive && (
        <StagingDiffModal
          onClose={() => setStagingDiffModalActive(false)}
          stagingUuid={stagingDiffFragment.replace('staging-', '')}
        />
      )}
    </>
  );
};

export { StagingTableTab };
