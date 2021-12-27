import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  DataTable,
  AddIcon,
  SearchInput,
  Tag,
  PrimaryButton,
  StagingDataTable,
  Tab,
  Tabs,
  TabPanel,
} from '../../components';

import {
  getProjects,
  getStagingData,
  deleteStagingData,
  commitStagingData,
} from '../../store/actions/climateWarehouseActions';

const headings = [
  'warehouseProjectId',
  'currentRegistry',
  'registryOfOrigin',
  'originProjectId',
  'program',
  'projectId',
];

const Projects = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getProjects({ useMockedResponse: false }));
    dispatch(getStagingData({ useMockedResponse: false }));
  }, []);

  if (
    !climateWarehouseStore.projects ||
    !climateWarehouseStore.projects.length
  ) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '30px 0px',
        }}>
        <SearchInput outline />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            width: '20%',
          }}>
          <Tag body="Unit Text" closeable />
          <Tag body="Unit Text" closeable />
          <Tag body="Unit Text" closeable />
        </div>
        {tabValue === 0 && (
          <PrimaryButton
            label="Create"
            size="large"
            icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
            onClick={() => history.push('/projects/add')}
          />
        )}
        {tabValue === 1 && (
          <PrimaryButton
            label="Commit staging"
            size="large"
            onClick={() => dispatch(commitStagingData())}
          />
        )}
      </div>
      <div>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example">
          <Tab label="Commited" />
          <Tab label="Staging" />
          <Tab label="Pending" />
        </Tabs>
        <div>
          <TabPanel value={tabValue} index={0}>
            {climateWarehouseStore.projects && (
              <DataTable
                headings={Object.keys(climateWarehouseStore.projects[0])}
                data={climateWarehouseStore.projects}
              />
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {climateWarehouseStore.stagingData && (
              <StagingDataTable
                headings={headings}
                data={climateWarehouseStore.stagingData.projects.staging}
                deleteStagingData={uuid => dispatch(deleteStagingData(uuid))}
              />
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {climateWarehouseStore.stagingData && (
              <StagingDataTable
                headings={headings}
                data={climateWarehouseStore.stagingData.projects.pending}
              />
            )}
          </TabPanel>
        </div>
      </div>
    </>
  );
});

export { Projects };
