import { FormattedMessage } from 'react-intl';
import { ProjectModal, SkeletonTable, UnitsListTable } from '@/components';
import React, { useCallback, useEffect } from 'react';
import { useGetUnitsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';

interface PageTabProps {
  orgUid: string;
  search: string;
  setIsLoading: (isLoading: boolean) => void;
}

const MyCommittedUnitsTab: React.FC<PageTabProps> = ({ orgUid, search, setIsLoading }: PageTabProps) => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  //todo: rename this fragment to reflect units and replace the projects modal with the units modal !!!!
  const [projectDetailsFragment, projectDetailsModalActive, setProjectModalActive] = useWildCardUrlHash('project-');
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
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          setOrder={handleSetOrder}
          order={order}
          totalPages={unitsData.pageCount}
          totalCount={unitsData.pageCount * 10}
        />
      )}
      {projectDetailsModalActive && (
        <ProjectModal
          onClose={() => setProjectModalActive(false)}
          warehouseProjectId={projectDetailsFragment.replace('project-', '')}
        />
      )}
    </>
  );
};

export { MyCommittedUnitsTab };
