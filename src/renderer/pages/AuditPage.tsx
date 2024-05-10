import React, { useCallback } from 'react';
import { useGetAuditQuery, useGetOrganizationsMapQuery } from '@/api';
import { useQueryParamState } from '@/hooks';
import { debounce, DebouncedFunc } from 'lodash';
import {
  AuditsTable,
  IndeterminateProgressOverlay,
  OrganizationSelector,
  OrgUidBadge,
  SearchBox,
  SkeletonTable,
  SyncIndicator,
} from '@/components';
import { FormattedMessage } from 'react-intl';

const AuditPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });
  const {
    data: auditData,
    isLoading: auditLoading,
    isFetching: auditFetching,
    error: auditError,
  } = useGetAuditQuery({ page: Number(currentPage), orgUid, search, order }, { skip: !orgUid });

  const handlePageChange: DebouncedFunc<any> = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleOrganizationSelected = useCallback(
    (organization: any) => {
      setOrgUid(organization?.orgUid);
      setCurrentPage('1');
    },
    [setOrgUid, setCurrentPage],
  );

  const handleSearchChange: DebouncedFunc<any> = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  const handleSetOrder = useCallback(() => {
    const currentDirection = order;

    // Cycle through 'ASC', 'DESC', and no order ('')
    switch (currentDirection) {
      case 'ASC':
        setOrder(`DESC`);
        break;
      case 'DESC':
        setOrder('');
        break;
      default:
        setOrder(`ASC`);
        break;
    }
  }, [order, setOrder]);

  if (!orgUid) {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-6 px-1 py-2.5 ml-2.5 items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl z-40">
            <OrganizationSelector onSelect={handleOrganizationSelected} defaultOrgUid={orgUid} />
          </div>
        </div>
        <div className="flex h-screen justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="text-lg text-white font-medium p-4 bg-gray-900 rounded-md shadow-lg">
            <FormattedMessage id="please-select-an-organization-to-view-audit-data" />
          </div>
        </div>
      </>
    );
  }

  if (auditLoading) {
    return <SkeletonTable />;
  }

  if (auditError) {
    return <FormattedMessage id="unable-to-load-contents" />;
  }

  if (!auditData) {
    return <FormattedMessage id="no-records-found" />;
  }

  return (
    <>
      {auditFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30 items-center">
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
        <OrganizationSelector onSelect={handleOrganizationSelected} defaultOrgUid={orgUid} />
        <SyncIndicator detailed={true} orgUid={orgUid} />
        {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid].registryId} />}
      </div>
      <>
        {auditLoading ? (
          <SkeletonTable />
        ) : (
          <AuditsTable
            data={auditData?.data || []}
            isLoading={auditLoading}
            currentPage={Number(currentPage)}
            onPageChange={handlePageChange}
            setOrder={handleSetOrder}
            order={order && `onchainConfirmationTimeStamp:${order}`}
            totalPages={auditData.pageCount}
            totalCount={auditData.pageCount < 10 ? auditData.data.length : auditData.pageCount * 10}
          />
        )}
      </>
    </>
  );
};

export { AuditPage };
