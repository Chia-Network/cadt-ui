import React, { useCallback, useEffect, useMemo } from 'react';
import { useGetOrganizationsListQuery, useGetProjectsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';
import {
  Button,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  OrgUidBadge,
  ProjectModal,
  ProjectsListTable,
  SearchBox,
  SkeletonTable,
  SyncIndicator,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetOrganizationsMapQuery } from '@/api/cadt/v1/organizations';
import { Organization } from '@/schemas/Organization.schema';
import { useNavigate } from 'react-router-dom';

const MyProjectsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const [projectDetailsFragment, projectDetailsModalActive, setProjectModalActive] = useWildCardUrlHash('project-');
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });
  const {
    data: projectsData,
    isLoading: projectsLoading,
    isFetching: projectsFetching,
    error: projectsError,
  } = useGetProjectsQuery({ page: Number(currentPage), orgUid, search, order });

  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();

  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  useEffect(() => {
    if (myOrganization) {
      setOrgUid(myOrganization.orgUid);
    }
  }, [myOrganization, myOrganization?.orgUid, organizationsListData, setOrgUid]);

  useEffect(() => {
    if (!myOrganization && !organizationsListLoading) {
      navigate('/');
    }
  }, [myOrganization, navigate, organizationsListLoading]);

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleSearchChange = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (!myOrganization || organizationsListLoading) {
    return <ComponentCenteredSpinner />;
  }

  if (projectsLoading) {
    return <SkeletonTable />;
  }

  if (projectsError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {projectsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30">
        <div>
          <Button disabled={projectsFetching || projectsLoading}>
            <FormattedMessage id="create-project" />
          </Button>
        </div>
        <SearchBox defaultValue={search} onChange={handleSearchChange} />
        {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid].registryId} />}
        <SyncIndicator detailed={true} orgUid={orgUid} />
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
      {projectDetailsModalActive && (
        <ProjectModal
          onClose={() => setProjectModalActive(false)}
          warehouseProjectId={projectDetailsFragment.replace('project-', '')}
        />
      )}
    </>
  );
};

export { MyProjectsListPage };
