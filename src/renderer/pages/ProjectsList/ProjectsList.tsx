import React, { useCallback } from 'react';
import { useGetProjectsQuery } from '@/api';
import { useQueryParamState, useColumnOrderHandler } from '@/hooks';
import { debounce } from 'lodash';
import {
  OrganizationSelector,
  IndeterminateProgressOverlay,
  SkeletonTable,
  ProjectsListTable,
  SearchBox,
  SyncIndicator,
  OrgUidBadge
} from '@/components';
import {FormattedMessage} from "react-intl";

const ProjectsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  const {
    data: projectsData,
    isLoading: projectsLoading,
    isFetching: projectsFetching,
    error: projectsError,
  } = useGetProjectsQuery({ page: Number(currentPage), orgUid, search, order });

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

  if (projectsLoading) {
    return <SkeletonTable />;
  }

  if (projectsError) {
    return <FormattedMessage id={"unable-to-load-contents"}/>;
  }

  if (!projectsData){
    return <FormattedMessage id={"no-records-found"}/>;
  }

  return (
    <>
      {projectsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col lg:flex-row gap-6 pl-1 my-2.5 relative z-30">
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
        <OrganizationSelector onSelect={handleOrganizationSelected} defaultOrgUid={orgUid} />
        <SyncIndicator detailed={true} orgUid={orgUid} />
        <OrgUidBadge orgUid={orgUid} />
      </div>

      {projectsLoading ? (
        <SkeletonTable />
      ) : (
        <ProjectsListTable
          data={projectsData?.data || []}
          isLoading={projectsLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          setOrder={handleSetOrder}
          order={order}
          totalPages={projectsData.pageCount}
          totalCount={projectsData.pageCount * 10}
        />
      )}
    </>
  );
};

export { ProjectsList };
