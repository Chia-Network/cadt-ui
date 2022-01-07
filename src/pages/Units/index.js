import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
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
  const appStore = useSelector(store => store.app);
  const intl = useIntl();
  let history = useHistory();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);

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
        dispatch(
          getPaginatedData({
            type: 'units',
            page: 1,
            resultsLimit: constants.MAX_TABLE_SIZE,
            searchQuery: event.target.value,
          }),
        );
      }, 300),
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
  }, [dispatch, tabValue]);

  const filteredColumnsTableData = useMemo(() => {
    if (!climateWarehouseStore.units) {
      return null;
    }

    return climateWarehouseStore.units
      .filter(project => {
        if (
          appStore.mode === constants.MODE.WAREHOUSE ||
          (appStore.mode === constants.MODE.REGISTRY &&
            project.orgUid === climateWarehouseStore.organizations.me.orgUid)
        ) {
          return true;
        }
      })
      .map(project =>
        _.pick(project, [
          'orgUid',
          'uuid',
          'buyer',
          'registry',
          'unitType',
          'unitCount',
          'unitStatus',
          'unitStatusDate',
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
            placeholder={intl.formatMessage({ id: 'filters' })}
            width="93px"
          />
        </StyledFiltersContainer>
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
                onClick={() => dispatch(commitStagingData())}
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
  );
});

export { Units };
