import React, { useEffect } from 'react';
import { Card, DataTable } from '../../../components';
import { getRelatedProjects } from '../../../store/actions/climateWarehouseActions';
import { useSelector, useDispatch } from 'react-redux';
import { relatedProjectsResponseStub } from '../../../mocks';

const RelatedProjects = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(
    () => dispatch(getRelatedProjects({ useMockedResponse: true })),
    [],
  );
  return (
    <>
      <Card>
        <div>Related Project</div>
        {climateWarehouseStore.relatedProjects && (
          <DataTable
            headings={Object.keys(relatedProjectsResponseStub[0])}
            data={climateWarehouseStore.relatedProjects}
          />
        )}
      </Card>
    </>
  );
};

export { RelatedProjects };
