import React, { useEffect } from 'react';
import { Card, DataTable } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { projectsResponseStub } from '../../../mocks';
import { getProjects } from '../../../store/actions/climateWarehouseActions';

const Projects = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(
    store => store.climateWarehouse
  );

  useEffect(() => dispatch(getProjects({ useMockedResponse: true })), []);
  return (
    <>
       <Card>
        <div>Projects</div>
        {climateWarehouseStore.projects && (
          <DataTable
            headings={Object.keys(projectsResponseStub[0])}
            data={climateWarehouseStore.projects}
          />
        )}
      </Card>
    </>
  );
};

export { Projects };
