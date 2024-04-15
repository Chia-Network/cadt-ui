import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetOrganizationsListQuery, useGetOrganizationsMapQuery } from '@/api';
import { useQueryParamState } from '@/hooks';
import { debounce, DebouncedFunc } from 'lodash';
import {
  Button,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  OrgUidBadge,
  SearchBox,
  SyncIndicator,
  Tabs,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Organization } from '@/schemas/Organization.schema';
import { MyCommittedUnitsTab } from '@/components/blocks/tabs/MyCommittedUnitsTab';

enum TabTypes {
  COMMITTED,
  STAGING,
  PENDING,
  FAILED,
  TRANSFERS,
}

const MyUnitsPage: React.FC = () => {
  const navigate = useNavigate();
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.COMMITTED);
  const [committedDataLoading, setCommittedDataLoading] = useState<boolean>(false);
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });

  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();

  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  const contentsLoading = useMemo<boolean>(() => {
    return committedDataLoading;
  }, [committedDataLoading]);

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

  const handleSearchChange: DebouncedFunc<any> = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (!myOrganization || organizationsListLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <div className="m-2">
      {contentsLoading && <IndeterminateProgressOverlay />}
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
          <MyCommittedUnitsTab orgUid={orgUid} search={search} setIsLoading={setCommittedDataLoading} />
        </Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="staging" />}>todo staging</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="pending" />}>todo pending</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="failed" />}>todo failed</Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="transfers" />}>todo transfers</Tabs.Item>
      </Tabs>
    </div>
  );
};

export { MyUnitsPage };
