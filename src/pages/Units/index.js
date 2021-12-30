import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import {
  getUnits,
  getStagingData,
  deleteStagingData,
  commitStagingData,
} from '../../store/actions/climateWarehouseActions';

import {
  DataTable,
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

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  padding: 30px 24px 14px 16px;
`;

const StyledSubHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 27.23px;
`;

const selectOptions = [
  { label: 'Portugal', value: 'PT' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'France', value: 'FR' },
  { label: 'Philippines', value: 'PH' },
  { label: 'Thailand', value: 'TH' },
  { label: 'Bosnia and Herzegovina', value: 'BA' },
  { label: 'Mexico', value: 'MX' },
  { label: 'United States', value: 'US' },
  { label: 'Finland', value: 'FI' },
  { label: 'Azerbaijan', value: 'AZ' },
  { label: 'Canada', value: 'CA' },
  { label: 'Panama', value: 'PA' },
  { label: 'Slovenia', value: 'SI' },
  { label: 'China', value: 'CN' },
  { label: 'Poland', value: 'PL' },
  { label: 'Colombia', value: 'CO' },
];

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
        e =>
          dispatch(
            getUnits({
              useMockedResponse: false,
              searchQuery: e.target.value,
            }),
          ),
        300,
      ),
    [],
  );

  useEffect(() => {
    dispatch(getUnits({ useMockedResponse: false }));
    dispatch(getStagingData({ useMockedResponse: false }));
  }, []);

  if (!climateWarehouseStore.units || !climateWarehouseStore.units.length) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StyledHeaderContainer>
        <div style={{ maxWidth: '25.1875rem' }}>
          <SearchInput
            size="large"
            onChange={onSearch}
            disabled={tabValue !== 0}
            outline
          />
        </div>
        <div style={{ margin: '0rem 1.2813rem' }}>
          <Select
            size={SelectSizeEnum.large}
            type={SelectTypeEnum.basic}
            options={selectOptions}
            placeholder="Filters"
            width="93px"
          />
        </div>
        <div style={{ marginLeft: 'auto' }}>
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
        </div>
      </StyledHeaderContainer>
      <StyledSubHeaderContainer>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example">
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
      <div style={{ flexGrow: '1' }}>
        <TabPanel value={tabValue} index={0} style={{ height: '100%' }}>
          {climateWarehouseStore.units && (
            <>
              <DataTable
                headings={Object.keys(climateWarehouseStore.units[0])}
                data={climateWarehouseStore.units}
                actions="Units"
              />
            </>
          )}
          {create && <CreateUnitsForm onClose={() => setCreate(false)} />}
        </TabPanel>
        <TabPanel value={tabValue} index={1} style={{ height: '100%' }}>
          {climateWarehouseStore.stagingData && (
            <StagingDataTable
              headings={headings}
              data={climateWarehouseStore.stagingData.units.staging}
              deleteStagingData={uuid => dispatch(deleteStagingData(uuid))}
            />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={2} style={{ height: '100%' }}>
          {climateWarehouseStore.stagingData && (
            <StagingDataTable
              headings={headings}
              data={climateWarehouseStore.stagingData.units.pending}
            />
          )}
        </TabPanel>
      </div>
    </div>
  );
});

export { Units };
