import { FormattedMessage } from 'react-intl';
import { SkeletonTable, UnitModal, UnitsListTable } from '@/components';
import React, { useCallback, useEffect } from 'react';
import { useGetUnitsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';

interface PageTabProps {
  orgUid: string;
  search: string;
  order: string;
  setOrder: (order: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const CommittedUnitsTab: React.FC<PageTabProps> = ({ orgUid, search, order, setOrder, setIsLoading }: PageTabProps) => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const [unitDetailsFragment, unitDetailsModalActive, setUnitsModalActive] = useWildCardUrlHash('unit');
  const {
    data: unitsData,
    isLoading: unitsLoading,
    error: unitsError,
  } = useGetUnitsQuery({ page: Number(currentPage), orgUid, search, order });

  useEffect(() => {
    setIsLoading(unitsLoading);
  }, [unitsLoading, setIsLoading]);

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  if (unitsLoading) {
    return <SkeletonTable />;
  }

  if (unitsError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!unitsData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {unitsLoading ? (
        <SkeletonTable />
      ) : (
        <UnitsListTable
          data={unitsData?.data || []}
          isLoading={unitsLoading}
          isEditable={true}
          currentPage={Number(currentPage)}
          onRowClick={(row) => setUnitsModalActive(true, row.warehouseUnitId)}
          onPageChange={handlePageChange}
          setOrder={handleSetOrder}
          order={order}
          totalPages={unitsData.pageCount}
          totalCount={unitsData.pageCount < 10 ? unitsData.data.length : unitsData.pageCount * 10}
        />
      )}
      {unitDetailsModalActive && (
        <UnitModal
          onClose={() => setUnitsModalActive(false)}
          warehouseUnitId={unitDetailsFragment.replace('unit-', '')}
        />
      )}
    </>
  );
};

export { CommittedUnitsTab };
