import _ from 'lodash';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { jsonToCsv } from '../../utils/csvUtils';
import constants from '../../constants';

import {
  getStagingData,
  deleteStagingData,
  commitStagingData,
  getPaginatedData,
} from '../../store/actions/climateWarehouseActions';

import { setGlobalErrorMessage } from '../../store/actions/app';

import {
  H3,
  APIDataTable,
  AddIcon,
  SearchInput,
  SelectSizeEnum,
  SelectTypeEnum,
  PrimaryButton,
  CreateUnitsForm,
  DownloadIcon,
  Tab,
  Tabs,
  TabPanel,
  StagingDataTable,
  NotificationCard,
  Alert,
  SelectOrganizations,
} from '../../components';

const headings = [
  'countryJurisdictionOfOwner',
  'inCountryJurisdictionOfOwner',
  'serialNumberBlock',
  'unitIdentifier',
  'unitType',
  'intendedBuyerOrgUid',
  'marketplace',
  'tags',
  'unitStatus',
  'unitTransactionType',
  'unitStatusReason',
  'tokenIssuanceHash',
  'marketplaceIdentifier',
  'unitsIssuanceLocation',
  'unitRegistryLink',
  'unitMarketplaceLink',
  'cooresponingAdjustmentDeclaration',
  'correspondingAdjustmentStatus',
];

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  padding: 30px 24px 14px 16px;
`;

const StyledSearchContainer = styled('div')`
  max-width: 25.1875rem;
`;

const StyledFiltersContainer = styled('div')`
  margin: 0rem 1.2813rem;
`;

const StyledButtonContainer = styled('div')`
  margin-left: auto;
`;

const StyledSubHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 27.23px;
`;

const StyledBodyContainer = styled('div')`
  flex-grow: 1;
`;

const StyledCreateOneNowContainer = styled('div')`
  margin-left: 0.3125rem;
  display: inline-block;
  cursor: pointer;
  color: #1890ff;
`;

const NoDataMessageContainer = styled('div')`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Units = withRouter(() => {
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);
  const appStore = useSelector(store => store.app);
  const intl = useIntl();
  let history = useHistory();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const commitButtonPressed = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        if (event.target.value !== '') {
          history.replace({ search: `search=${event.target.value}` });
        } else {
          history.replace({ search: null });
        }
        setSearchQuery(event.target.value);
      }, 300),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  useEffect(() => {
    if (appStore.errorMessage) {
      setCreate(false);
    }
  }, [appStore.errorMessage]);

  useEffect(() => {
    const options = {
      type: 'units',
      page: 1,
      resultsLimit: constants.MAX_TABLE_SIZE,
    };
    if (searchQuery) {
      options.searchQuery = searchQuery;
    }
    if (selectedOrganization && selectedOrganization !== 'all') {
      options.orgUid = selectedOrganization;
    }
    dispatch(getPaginatedData(options));
    dispatch(getStagingData({ useMockedResponse: false }));
  }, [dispatch, tabValue, searchQuery, selectedOrganization]);

  const filteredColumnsTableData = useMemo(() => {
    if (!climateWarehouseStore.units) {
      return null;
    }

    return climateWarehouseStore.units.map(project =>
      _.pick(project, [
        'warehouseUnitId',
        'countryJurisdictionOfOwner',
        'inCountryJurisdictionOfOwner',
        'serialNumberBlock',
        'unitIdentifier',
        'unitType',
        'intendedBuyerOrgUid',
        'marketplace',
        'tags',
        'unitStatus',
        'unitTransactionType',
        'unitStatusReason',
        'tokenIssuanceHash',
        'marketplaceIdentifier',
        'unitsIssuanceLocation',
        'unitRegistryLink',
        'unitMarketplaceLink',
        'correspondingAdjustmentDeclaration',
        'correspondingAdjustmentStatus',
        'unitCount',
      ]),
    );
  }, [climateWarehouseStore.units, appStore.mode]);

  if (!filteredColumnsTableData) {
    return null;
  }

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([jsonToCsv(climateWarehouseStore.units)], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'climateWarehouse.csv';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onCommit = () => {
    dispatch(commitStagingData());
    commitButtonPressed.current = true;
    setTabValue(2);
  };

  const onOrganizationSelect = selectedOption => {
    const orgUid = selectedOption[0].orgUid;
    setSelectedOrganization(orgUid);
    history.replace({ search: `orgUid=${orgUid}` });
  };

  return (
    <>
      <StyledSectionContainer>
        <StyledHeaderContainer>
          <StyledSearchContainer>
            <SearchInput
              size="large"
              onChange={onSearch}
              disabled={tabValue !== 0}
              outline
            />
          </StyledSearchContainer>
          { tabValue === 0 && 
            <StyledFiltersContainer>
              <SelectOrganizations
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                placeholder={intl.formatMessage({ id: 'filters' })}
                width="200px"
                onChange={onOrganizationSelect}
              />
            </StyledFiltersContainer>
          }
          <StyledButtonContainer>
            {tabValue === 0 && (
              <PrimaryButton
                label={intl.formatMessage({ id: 'create' })}
                size="large"
                icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
                onClick={() => setCreate(true)}
              />
            )}
            {tabValue === 1 &&
              climateWarehouseStore.stagingData.units.staging.length > 0 && (
                <PrimaryButton
                  label={intl.formatMessage({ id: 'commit' })}
                  size="large"
                  onClick={onCommit}
                />
              )}
          </StyledButtonContainer>
        </StyledHeaderContainer>
        <StyledSubHeaderContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={intl.formatMessage({ id: 'committed' })} />
            <Tab
              label={`${intl.formatMessage({ id: 'staging' })} (${
                climateWarehouseStore.stagingData &&
                climateWarehouseStore.stagingData.units.staging.length
              })`}
            />
            <Tab
              label={`${intl.formatMessage({ id: 'pending' })} (${
                climateWarehouseStore.stagingData &&
                climateWarehouseStore.stagingData.units.pending.length
              })`}
            />
          </Tabs>
          <div onClick={downloadTxtFile}>
            <DownloadIcon />
          </div>
        </StyledSubHeaderContainer>
        <StyledBodyContainer>
          <TabPanel value={tabValue} index={0}>
            {climateWarehouseStore.units &&
              climateWarehouseStore.units.length === 0 && (
                <NoDataMessageContainer>
                  <H3>
                    {!searchQuery && (
                      <>
                        <FormattedMessage id="no-projects-created" />
                        <StyledCreateOneNowContainer
                          onClick={() => setCreate(true)}
                        >
                          <FormattedMessage id="create-one-now" />
                        </StyledCreateOneNowContainer>
                      </>
                    )}
                    {searchQuery && <FormattedMessage id="no-search-results" />}
                  </H3>
                </NoDataMessageContainer>
              )}
            {climateWarehouseStore.units &&
              climateWarehouseStore.units.length > 0 && (
                <>
                  <APIDataTable
                    headings={Object.keys(filteredColumnsTableData[0])}
                    data={filteredColumnsTableData}
                    actions="Units"
                  />
                </>
              )}
            {create && <CreateUnitsForm onClose={() => setCreate(false)} />}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {climateWarehouseStore.stagingData &&
              climateWarehouseStore.stagingData.units.staging.length === 0 && (
                <NoDataMessageContainer>
                  <H3>
                    <FormattedMessage id="no-staged" />
                  </H3>
                </NoDataMessageContainer>
              )}
            {climateWarehouseStore.stagingData && (
              <StagingDataTable
                headings={headings}
                data={climateWarehouseStore.stagingData.units.staging}
                deleteStagingData={uuid => dispatch(deleteStagingData(uuid))}
              />
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {climateWarehouseStore.stagingData &&
              climateWarehouseStore.stagingData.units.pending.length === 0 && (
                <NoDataMessageContainer>
                  <H3>
                    <FormattedMessage id="no-pending" />
                  </H3>
                </NoDataMessageContainer>
              )}
            {climateWarehouseStore.stagingData && (
              <StagingDataTable
                headings={headings}
                data={climateWarehouseStore.stagingData.units.pending}
              />
            )}
          </TabPanel>
        </StyledBodyContainer>
      </StyledSectionContainer>
      {appStore.errorMessage && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'something-went-wrong' })}
            alertBody={intl.formatMessage({
              id: 'unit-not-created',
            })}
            showIcon
            closeable
            onClose={() => dispatch(setGlobalErrorMessage(null))}
          />
        </NotificationCard>
      )}
      {commitButtonPressed &&
        commitButtonPressed.current &&
        !appStore.errorMessage && (
          <NotificationCard>
            <Alert
              type="success"
              banner={false}
              alertTitle={intl.formatMessage({ id: 'committed' })}
              alertBody={intl.formatMessage({
                id: 'transactions-committed',
              })}
              showIcon
              closeable
            />
          </NotificationCard>
        )}
    </>
  );
});

export { Units };
