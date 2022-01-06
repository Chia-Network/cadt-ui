import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import constants from '../../constants';

import {
  getStagingData,
  deleteStagingData,
  commitStagingData,
  getPaginatedData,
} from '../../store/actions/climateWarehouseActions';

import {
  H3,
  APIDataTable,
  AddIcon,
  SearchInput,
  SelectSizeEnum,
  SelectTypeEnum,
  Select,
  PrimaryButton,
  CreateUnitsForm,
  DownloadIcon,
  Tab,
  Tabs,
  TabPanel,
  StagingDataTable,
} from '../../components';

const headings = [
  'id',
  'unitStatus',
  'unitType',
  'unitCount',
  'buyer',
  'registry',
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

  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSearch = useMemo(
    () =>
      _.debounce(
        event =>
          dispatch(
            getPaginatedData({
              type: 'units',
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
        type: 'units',
        page: 1,
        resultsLimit: constants.MAX_TABLE_SIZE,
      }),
    );
    dispatch(getStagingData({ useMockedResponse: false }));
  }, [dispatch]);

  if (!climateWarehouseStore.units) {
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
            climateWarehouseStore.stagingData.units.staging.length > 0 && (
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
              climateWarehouseStore.stagingData.units.staging.length
            })`}
          />
          <Tab
            label={`Pending (${
              climateWarehouseStore.stagingData &&
              climateWarehouseStore.stagingData.units.pending.length
            })`}
          />
        </Tabs>
        <DownloadIcon />
      </StyledSubHeaderContainer>
      <StyledBodyContainer>
        <TabPanel value={tabValue} index={0}>
          {climateWarehouseStore.units &&
            climateWarehouseStore.units.length === 0 && (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-units-created" />
                  <StyledCreateOneNowContainer onClick={() => setCreate(true)}>
                    <FormattedMessage id="create-one-now" />
                  </StyledCreateOneNowContainer>
                </H3>
              </NoDataMessageContainer>
            )}
          {climateWarehouseStore.units &&
            climateWarehouseStore.units.length > 0 && (
              <>
                <APIDataTable
                  headings={Object.keys(climateWarehouseStore.units[0])}
                  data={climateWarehouseStore.units}
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
  );
});

export { Units };
