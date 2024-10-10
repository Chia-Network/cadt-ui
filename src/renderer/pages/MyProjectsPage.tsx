import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetImportedOfferQuery, useGetOrganizationsListQuery } from '@/api';
import { useQueryParamState, useUrlHash, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';
import {
  Button,
  CommitStagedItemsModal,
  CommittedProjectsTab,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  OrgUidBadge,
  ProjectXlsUploadDownloadButtons,
  SearchBox,
  StagedProjectSuccessModal,
  StagingDiffModal,
  StagingTableTab,
  SyncIndicator,
  Tabs,
  TransferManager,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetOrganizationsMapQuery } from '@/api/cadt/v1/organizations';
import { Organization } from '@/schemas/Organization.schema';
import { useNavigate } from 'react-router-dom';
import { useGetStagedProjectsQuery } from '@/api/cadt/v1/staging';

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
  transfer: any;
}

const MyProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [stagingDiffFragment, stagingDiffModalActive, setStagingDiffModalActive] = useWildCardUrlHash('staging');
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const [projectStagedSuccess, setProjectStagedSuccess] = useUrlHash('success-stage-project');
  const [commitModalActive, setCommitModalActive] = useUrlHash('commit-staged-items');
  const [, setCreateProjectModalActive] = useUrlHash('create-project');
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.COMMITTED);
  const [committedDataLoading, setCommittedDataLoading] = useState<boolean>(false);
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });
  const { data: unprocessedStagedProjects, isLoading: stagingDataLoading } = useGetStagedProjectsQuery();
  const { data: importedTransferOfferData, isLoading: importedTransferOfferLoading } = useGetImportedOfferQuery();
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();
  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  const processedStagingData: ProcessedStagingData = useMemo<ProcessedStagingData>(() => {
    const data: ProcessedStagingData = { staged: [], pending: [], failed: [], transfer: undefined };
    if (unprocessedStagedProjects?.forEach) {
      unprocessedStagedProjects.forEach((stagedProject: any) => {
        if (stagedProject?.table === 'Projects') {
          if (!stagedProject.commited && !stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.staged.push(stagedProject);
          } else if (stagedProject.commited && !stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.pending.push(stagedProject);
          } else if (!stagedProject.commited && stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.failed.push(stagedProject);
          } else if (stagedProject.commited && stagedProject.isTransfer) {
            data.transfer = stagedProject;
          }
        }
      });
    }
    return data;
  }, [unprocessedStagedProjects]);

  const contentsLoading = useMemo<boolean>(() => {
    return committedDataLoading || stagingDataLoading || importedTransferOfferLoading;
  }, [committedDataLoading, importedTransferOfferLoading, stagingDataLoading]);

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
      <div className="pt-2 pl-2 pr-2 h-full">
        {contentsLoading && <IndeterminateProgressOverlay />}
        <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center h-auto">
          {activeTab === TabTypes.COMMITTED && (
            <>
              <Button disabled={contentsLoading} onClick={() => setCreateProjectModalActive(true)}>
                <FormattedMessage id="create-project" />
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

          {myOrganization && <ProjectXlsUploadDownloadButtons orgUid={orgUid} order={order} search={search} />}
          <SyncIndicator detailed={true} orgUid={orgUid} />
          {orgUid && <OrgUidBadge orgUid={orgUid} registryId={organizationsMap?.[orgUid]?.registryId} />}
        </div>
        <div className="h-13">
          <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
            <Tabs.Item title={<FormattedMessage id="committed" />} />
            <Tabs.Item
              title={
                <p>
                  <FormattedMessage id="staging" />
                  {' (' + String(processedStagingData.staged.length + ') ')}
                </p>
              }
            />
            <Tabs.Item
              title={
                <p>
                  <FormattedMessage id="pending" />
                  {' (' + String(processedStagingData.pending.length + ') ')}
                </p>
              }
            />
            <Tabs.Item
              title={
                <p>
                  <FormattedMessage id="failed" />
                  {' (' + String(processedStagingData.failed.length + ') ')}
                </p>
              }
            />
            <Tabs.Item
              title={
                <p>
                  <FormattedMessage id="transfer" />
                  {(processedStagingData.transfer || importedTransferOfferData?.changes) && ' (!) '}
                </p>
              }
            />
          </Tabs>
        </div>
        <div id="tabs content">
          {activeTab === TabTypes.COMMITTED && (
            <CommittedProjectsTab
              orgUid={orgUid}
              search={search}
              order={order}
              setOrder={setOrder}
              setIsLoading={setCommittedDataLoading}
            />
          )}
          {activeTab === TabTypes.STAGING && (
            <StagingTableTab
              type="staged"
              stagingData={processedStagingData.staged}
              showLoading={stagingDataLoading}
              setStagingDiffModalActive={setStagingDiffModalActive}
            />
          )}
          {activeTab === TabTypes.PENDING && (
            <StagingTableTab
              type="pending"
              stagingData={processedStagingData.pending}
              showLoading={stagingDataLoading}
              setStagingDiffModalActive={setStagingDiffModalActive}
            />
          )}
          {activeTab === TabTypes.FAILED && (
            <StagingTableTab
              type="failed"
              stagingData={processedStagingData.failed}
              showLoading={stagingDataLoading}
              setStagingDiffModalActive={setStagingDiffModalActive}
            />
          )}
          {activeTab === TabTypes.TRANSFERS && (
            <TransferManager
              stagedTransferData={processedStagingData.transfer}
              importedTransferOfferData={importedTransferOfferData}
              isLoading={stagingDataLoading || importedTransferOfferLoading}
            />
          )}
        </div>
      </div>
      {commitModalActive && processedStagingData.staged.length && (
        <CommitStagedItemsModal type="project" onClose={() => setCommitModalActive(false)} />
      )}
      {projectStagedSuccess && (
        <StagedProjectSuccessModal showModal={true} onClose={() => setProjectStagedSuccess(false)} />
      )}
      {stagingDiffModalActive && (
        <StagingDiffModal
          onClose={() => setStagingDiffModalActive(false)}
          stagingUuid={stagingDiffFragment.replace('staging-', '')}
        />
      )}
    </>
  );
};

export { MyProjectsPage };
