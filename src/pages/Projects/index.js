import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import constants from '../../constants';

import {
  APIDataTable,
  AddIcon,
  SearchInput,
  PrimaryButton,
  StagingDataTable,
  Tab,
  Tabs,
  TabPanel,
  DownloadIcon,
  Select,
  SelectSizeEnum,
  SelectTypeEnum,
  CreateProjectForm,
  H3,
} from '../../components';

import {
  getStagingData,
  deleteStagingData,
  commitStagingData,
  getPaginatedData,
} from '../../store/actions/climateWarehouseActions';

const headings = [
  'warehouseProjectId',
  'currentRegistry',
  'registryOfOrigin',
  'originProjectId',
  'program',
  'projectId',
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

const Projects = withRouter(() => {
  const [create, setCreate] = useState(false);
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSearch = useMemo(
    () =>
      _.debounce(
        event =>
          dispatch(
            getPaginatedData({
              type: 'projects',
              page: 1,
              resultsLimit: constants.MAX_TABLE_SIZE,
              searchQuery: event.target.value,
            }),
          ),
        300,
      ),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  useEffect(() => {
    dispatch(
      getPaginatedData({
        type: 'projects',
        page: 1,
        resultsLimit: constants.MAX_TABLE_SIZE,
      }),
    );
    dispatch(getStagingData({ useMockedResponse: false }));
  }, [dispatch]);

  if (!climateWarehouseStore.projects) {
    return null;
  }

  return (
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
        <StyledFiltersContainer>
          <Select
            size={SelectSizeEnum.large}
            type={SelectTypeEnum.basic}
            options={[{ label: 'Filter 1', value: 'f1' }]}
            placeholder="Filters"
            width="93px"
          />
        </StyledFiltersContainer>
        <StyledButtonContainer>
          {tabValue === 0 && (
            <PrimaryButton
              label="Create"
              size="large"
              icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
              onClick={() => setCreate(true)}
            />
          )}
          {tabValue === 1 &&
            climateWarehouseStore.stagingData.projects.staging.length > 0 && (
              <PrimaryButton
                label="Commit"
                size="large"
                onClick={() => dispatch(commitStagingData())}
              />
            )}
        </StyledButtonContainer>
      </StyledHeaderContainer>
      <StyledSubHeaderContainer>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Commited" />
          <Tab
            label={`Staging (${
              climateWarehouseStore.stagingData &&
              climateWarehouseStore.stagingData.projects.staging.length
            })`}
          />
          <Tab
            label={`Pending (${
              climateWarehouseStore.stagingData &&
              climateWarehouseStore.stagingData.projects.pending.length
            })`}
          />
        </Tabs>
        <DownloadIcon />
      </StyledSubHeaderContainer>
      <StyledBodyContainer>
        <TabPanel value={tabValue} index={0}>
          {climateWarehouseStore.projects &&
            climateWarehouseStore.projects.length === 0 && (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-projects-created" />
                  <StyledCreateOneNowContainer onClick={() => setCreate(true)}>
                    <FormattedMessage id="create-one-now" />
                  </StyledCreateOneNowContainer>
                </H3>
              </NoDataMessageContainer>
            )}
          {climateWarehouseStore.projects &&
            climateWarehouseStore.projects.length > 0 && (
              <APIDataTable
                headings={Object.keys(climateWarehouseStore.projects[0])}
                data={climateWarehouseStore.projects}
                actions="Projects"
              />
            )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {climateWarehouseStore.stagingData &&
            climateWarehouseStore.stagingData.projects.staging.length === 0 && (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-staged" />
                </H3>
              </NoDataMessageContainer>
            )}
          {climateWarehouseStore.stagingData && (
            <StagingDataTable
              headings={headings}
              data={climateWarehouseStore.stagingData.projects.staging}
              deleteStagingData={uuid => dispatch(deleteStagingData(uuid))}
            />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {climateWarehouseStore.stagingData &&
            climateWarehouseStore.stagingData.projects.pending.length === 0 && (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-pending" />
                </H3>
              </NoDataMessageContainer>
            )}
          {climateWarehouseStore.stagingData && (
            <StagingDataTable
              headings={headings}
              data={climateWarehouseStore.stagingData.projects.pending}
            />
          )}
        </TabPanel>
      </StyledBodyContainer>
      {create && <CreateProjectForm onClose={() => setCreate(false)} />}
    </StyledSectionContainer>
  );
});

export { Projects };
