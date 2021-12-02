import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../../../components';
import { Card } from '../../../components';
import { getProjectLocations } from '../../../store/actions/climateWarehouseActions';

const Locations = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector( store => store.climateWarehouse);

  useEffect(() => dispatch(getProjectLocations({ useMockedResponse: true })), []);

  return (
    <>
      <Card>
        <div>Locations</div>
        {climateWarehouseStore.projectLocations && (
          <DataTable
            headings={['in_country_region', 'host_country']}
            data={climateWarehouseStore.projectLocations}
          />
        )}
      </Card>
    </>
  );
};

export { Locations };
