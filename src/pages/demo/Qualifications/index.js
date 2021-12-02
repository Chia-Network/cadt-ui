import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../../../components';
import { Card } from '../../../components';
import { qualificationsResponseStub } from '../../../mocks';
import { getQualifications } from '../../../store/actions/climateWarehouseActions';

const Qualifications = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(() => dispatch(getQualifications({ useMockedResponse: true })), []);

  return (
    <>
      <Card>
        <div>Qualifications</div>
        {climateWarehouseStore.qualifications && (
          <DataTable
            headings={Object.keys(qualificationsResponseStub[0])}
            data={climateWarehouseStore.qualifications}
          />
        )}
      </Card>
    </>
  );
};

export { Qualifications };
