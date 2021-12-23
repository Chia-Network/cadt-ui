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
} from '../../components';

import {
  getProjects,
  getStagingData,
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
  const [status] = useState('staging');

  useEffect(() => {
    dispatch(getProjects({ useMockedResponse: false }));
    dispatch(getStagingData({ useMockedResponse: false }));
  }, []);

  useEffect(() => {
    console.log(climateWarehouseStore.stagingData);
  }, [climateWarehouseStore.stagingData]);

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
        <PrimaryButton
          label="Create"
          size="large"
          icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
          onClick={() => history.push('/projects/add')}
        />
      </div>
      {status === 'commited' && climateWarehouseStore.projects && (
        <DataTable
          headings={Object.keys(climateWarehouseStore.projects[0])}
          data={climateWarehouseStore.projects}
        />
      )}
      {status === 'staging' && climateWarehouseStore.stagingData && (
        <StagingDataTable
          headings={headings}
          data={climateWarehouseStore.stagingData.projects.staging}
        />
      )}
    </>
  );
});

export { Projects };