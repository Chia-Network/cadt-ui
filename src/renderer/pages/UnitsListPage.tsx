import React, { useCallback } from 'react';
import { useGetUnitsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState } from '@/hooks';
import { debounce, DebouncedFunc } from 'lodash';
import {
  IndeterminateProgressOverlay,
  OrganizationSelector,
  OrgUidBadge,
  SearchBox,
  SkeletonTable,
  SyncIndicator,
  UnitsListTable,
} from '@/components';
import { FormattedMessage } from 'react-intl';

const UnitsListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  const {
    data: unitsData,
    isLoading: unitsLoading,
    isFetching: unitsFetching,
    error: unitsError,
  } = useGetUnitsQuery({ page: Number(currentPage), orgUid, search, order });

  const handlePageChange: DebouncedFunc<any> = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleOrganizationSelected = useCallback(
    (organization: any) => {
      setOrgUid(organization?.orgUid);
    },
    [setOrgUid],
  );

  const handleSearchChange: DebouncedFunc<any> = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
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
      {unitsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30 items-center">
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
        <OrganizationSelector
          onSelect={handleOrganizationSelected}
          defaultOrgUid={orgUid}
          noSelectionLabel="All Organizations"
        />
        {orgUid && <OrgUidBadge orgUid={orgUid} registryId={'1234'} />}
        <SyncIndicator detailed={true} orgUid={orgUid} />
      </div>

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
    </>
  );
};

export { UnitsListPage };
