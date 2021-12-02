import React, { useEffect } from 'react';
import { Card, DataTable } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { vintagesResponseStub } from '../../../mocks';
import { getVintages } from '../../../store/actions/climateWarehouseActions';

const Vintages = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(() => dispatch(getVintages({ useMockedResponse: true })), []);

  return (
    <>
      <Card>
        <div>Vintages</div>
        {climateWarehouseStore.vintages && (
          <DataTable
            headings={Object.keys(vintagesResponseStub[0])}
            data={climateWarehouseStore.vintages}
          />
        )}
      </Card>
    </>
  );
};

export { Vintages };
