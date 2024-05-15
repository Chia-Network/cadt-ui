import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetOrganizationsListQuery } from '@/api';
import { useQueryParamState, useUrlHash, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';
import {
  Button,
  CommitStagedItemsModal,
  CommittedUnitsTab,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  OrgUidBadge,
  ProjectXlsUploadDownloadButtons,
  SearchBox,
  StagedUnitSuccessModal,
  StagingDiffModal,
  StagingTableTab,
  SyncIndicator,
  Tabs,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetOrganizationsMapQuery } from '@/api/cadt/v1/organizations';
import { Organization } from '@/schemas/Organization.schema';
import { useNavigate } from 'react-router-dom';
import { useGetStagedUnitsQuery } from '@/api/cadt/v1/staging';

enum TabTypes {
  COMMITTED,
  STAGING,
  PENDING,
  FAILED,
  TRANSFERS,
}

interface ProcessedStagingData {
  staged: any[];
  pending: any[];
  failed: any[];
}

const MyUnitsPage: React.FC = () => {
  const navigate = useNavigate();
  const [stagingDiffFragment, stagingDiffModalActive, setStagingDiffModalActive] = useWildCardUrlHash('staging');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [, setCreateUnitModalActive] = useUrlHash('create-unit');
  const [commitModalActive, setCommitModalActive] = useUrlHash('commit-staged-items');
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.COMMITTED);
  const [committedDataLoading, setCommittedDataLoading] = useState<boolean>(false);
  const [unitStagedSuccess, setUnitStagedSuccess] = useUrlHash('success-stage-unit');
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });
  const { data: unprocessedStagedUnits, isLoading: stagingDataLoading } = useGetStagedUnitsQuery();
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();

  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  const processedStagingData: ProcessedStagingData = useMemo<ProcessedStagingData>(() => {
    const data: ProcessedStagingData = { staged: [], pending: [], failed: [] };
    if (unprocessedStagedUnits?.forEach) {
      unprocessedStagedUnits.forEach((stagedUnit: any) => {
        if (stagedUnit?.table === 'Units') {
          if (!stagedUnit.commited && !stagedUnit.failedCommit && !stagedUnit.isTransfer) {
            data.staged.push(stagedUnit);
          } else if (stagedUnit.commited && !stagedUnit.failedCommit && !stagedUnit.isTransfer) {
            data.pending.push(stagedUnit);
          } else if (!stagedUnit.commited && stagedUnit.failedCommit && !stagedUnit.isTransfer) {
            data.failed.push(stagedUnit);
          }
        }
      });
    }
    return data;
  }, [unprocessedStagedUnits]);

  const contentsLoading = useMemo<boolean>(() => {
    return committedDataLoading || stagingDataLoading;
  }, [committedDataLoading, stagingDataLoading]);

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

  const handleSearchChange = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (!myOrganization || organizationsListLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <>
      <div className="m-2">
        {contentsLoading && <IndeterminateProgressOverlay />}
        <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center">
          {activeTab === TabTypes.COMMITTED && (
            <>
              <Button disabled={contentsLoading} onClick={() => setCreateUnitModalActive(true)}>
                <FormattedMessage id="create-unit" />
              </Button>
              <SearchBox defaultValue={search} onChange={handleSearchChange} />
            </>
          )}
          {activeTab === TabTypes.STAGING && (
            <>
              <Button
                disabled={contentsLoading || !processedStagingData.staged.length}
                onClick={() => setCommitModalActive(true)}
              >
                <FormattedMessage id="commit" />
              </Button>
            </>
          )}
          {myOrganization && <ProjectXlsUploadDownloadButtons orgUid={myOrganization.orgUid} type="unit" />}
          <SyncIndicator detailed={true} orgUid={orgUid} />
          {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid].registryId} />}
        </div>

        <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
          <Tabs.Item title={<FormattedMessage id="committed" />}>
            {activeTab === TabTypes.COMMITTED && (
              <CommittedUnitsTab orgUid={orgUid} search={search} setIsLoading={setCommittedDataLoading} />
            )}
          </Tabs.Item>
          <Tabs.Item
            title={
              <p>
                <FormattedMessage id="staging" />
                {' (' + String(processedStagingData.staged.length + ') ')}
              </p>
            }
          >
            {activeTab === TabTypes.STAGING && (
              <StagingTableTab
                type="staged"
                stagingData={processedStagingData.staged}
                showLoading={stagingDataLoading}
              />
            )}
          </Tabs.Item>
          <Tabs.Item
            title={
              <p>
                <FormattedMessage id="pending" />
                {' (' + String(processedStagingData.pending.length + ') ')}
              </p>
            }
          >
            {activeTab === TabTypes.PENDING && (
              <StagingTableTab
                type="pending"
                stagingData={processedStagingData.pending}
                showLoading={stagingDataLoading}
              />
            )}
          </Tabs.Item>
          <Tabs.Item
            title={
              <p>
                <FormattedMessage id="failed" />
                {' (' + String(processedStagingData.failed.length + ') ')}
              </p>
            }
          >
            {activeTab === TabTypes.FAILED && (
              <StagingTableTab
                type="failed"
                stagingData={processedStagingData.failed}
                showLoading={stagingDataLoading}
              />
            )}
          </Tabs.Item>
          <Tabs.Item title={<FormattedMessage id="transfers" />}>todo transfers</Tabs.Item>
        </Tabs>
      </div>
      {commitModalActive && processedStagingData.staged.length && (
        <CommitStagedItemsModal type="unit" onClose={() => setCommitModalActive(false)} />
      )}

      {unitStagedSuccess && <StagedUnitSuccessModal showModal={true} onClose={() => setUnitStagedSuccess(false)} />}
      {stagingDiffModalActive && (
        <StagingDiffModal
          onClose={() => setStagingDiffModalActive(false)}
          stagingUuid={stagingDiffFragment.replace('staging-', '')}
        />
      )}
    </>
  );
};

export { MyUnitsPage };
