import React, { useCallback } from 'react';
import { useGetUnitsQuery } from '@/api';
import { useQueryParamState } from '@/hooks';
import { debounce } from 'lodash';
import {
  OrganizationSelector,
  IndeterminateProgressOverlay,
  SkeletonTable,
  SearchBox,
  UnitsListTable,
} from '@/components';
import {FormattedMessage} from "react-intl";

const UnitsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);

  const {
    data: unitsData,
    isLoading: unitsLoading,
    isFetching: unitsFetching,
    error: unitsError,
  } = useGetUnitsQuery({ page: Number(currentPage), orgUid, search });

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleOrganizationSelected = useCallback(
    (organization: any) => {
      setOrgUid(organization?.orgUid);
    },
    [setOrgUid],
  );

  const handleSearchChange = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (unitsLoading) {
    return <SkeletonTable />;
  }

  if (unitsError) {
    return <FormattedMessage id={"unable-to-load-contents"}/>;
  }

  if (!unitsData){
    return <FormattedMessage id={"no-records-found"}/>;
  }

  return (
    <>
      {unitsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30">
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
        <OrganizationSelector onSelect={handleOrganizationSelected} defaultOrgUid={orgUid} />
      </div>

      {unitsLoading ? (
        <SkeletonTable />
      ) : (
        <UnitsListTable
          data={unitsData?.data || []}
          isLoading={unitsLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          totalPages={unitsData.pageCount}
          totalCount={unitsData.pageCount * 10}
        />
      )}
    </>
  );
};

export { UnitsList };
