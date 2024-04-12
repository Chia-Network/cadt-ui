import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetOrganizationsListQuery, useGetOrganizationsMapQuery, useGetUnitsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState } from '@/hooks';
import { debounce, DebouncedFunc } from 'lodash';
import {
  Button,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  OrgUidBadge,
  SearchBox,
  SkeletonTable,
  SyncIndicator,
  Tabs,
  UnitsListTable,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Organization } from '@/schemas/Organization.schema';

enum TabTypes {
  COMMITTED,
  STAGING,
  PENDING,
  FAILED,
  TRANSFERS,
}

const MyUnitsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.COMMITTED);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });
  const {
    data: unitsData,
    isLoading: unitsLoading,
    isFetching: unitsFetching,
    error: unitsError,
  } = useGetUnitsQuery({ page: Number(currentPage), orgUid, search, order });

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

  const handlePageChange: DebouncedFunc<any> = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleSearchChange: DebouncedFunc<any> = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (!myOrganization || organizationsListLoading) {
    return <ComponentCenteredSpinner />;
  }

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
    <div className="m-2">
      {unitsFetching && <IndeterminateProgressOverlay />}
      <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center">
        <Button disabled={organizationsListLoading}>
          <FormattedMessage id="create-unit" />
        </Button>
        {activeTab === TabTypes.COMMITTED && <SearchBox defaultValue={search} onChange={handleSearchChange} />}
        {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid].registryId} />}
        <SyncIndicator detailed={true} orgUid={orgUid} />
      </div>

      <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
        <Tabs.Item title={<FormattedMessage id="committed" />}>
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
        </Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="staging" />}>todo staging</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="pending" />}>todo pending</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="failed" />}>todo failed</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="transfers" />}>todo transfers</Tabs.Item>
      </Tabs>
    </div>
  );
};

export { MyUnitsListPage };
