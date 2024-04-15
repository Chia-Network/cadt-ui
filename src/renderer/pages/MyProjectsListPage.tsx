import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Tabs,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetOrganizationsMapQuery } from '@/api/cadt/v1/organizations';
import { Organization } from '@/schemas/Organization.schema';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/routes/route-constants';

enum TabTypes {
  COMMITTED,
  STAGING,
  PENDING,
  FAILED,
  TRANSFERS,
}

const MyProjectsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.COMMITTED);
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
    if (orgUid !== myOrganization?.orgUid) {
      console.log('query param orgUid', orgUid, 'myOrg Uid', myOrganization?.orgUid);
      navigate(ROUTES.PROJECTS_LIST);
    }
  }, [myOrganization?.orgUid, navigate, orgUid]);

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
    <div className="m-2">
      {projectsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center">
        <Button disabled={projectsFetching || projectsLoading}>
          <FormattedMessage id="create-project" />
        </Button>
        {activeTab === TabTypes.COMMITTED && <SearchBox defaultValue={search} onChange={handleSearchChange} />}
        {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid].registryId} />}
        <SyncIndicator detailed={true} orgUid={orgUid} />
      </div>

      <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
        <Tabs.Item title={<FormattedMessage id="committed" />}>
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
        </Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="staging" />}>todo staging</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="pending" />}>todo pending</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="failed" />}>todo failed</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="transfers" />}>todo transfers</Tabs.Item>
      </Tabs>
    </div>
  );
};

export { MyProjectsListPage };
