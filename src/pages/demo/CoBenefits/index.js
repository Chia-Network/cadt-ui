import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, DataTable } from '../../../components';
import { getCoBenefits } from '../../../store/actions/climateWarehouseActions';

const CoBenefits = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(
    store => store.climateWarehouse
  );

  useEffect(() => dispatch(getCoBenefits({ useMockedResponse: true })), []);

  return (
    <>
      <Card>
        <div>Co-Benefits</div>
        {climateWarehouseStore.coBenefits && (
          <DataTable
            headings={['Co-Benefit']}
            data={climateWarehouseStore.coBenefits}
          />
        )}
      </Card>
    </>
  );
};

export { CoBenefits };
