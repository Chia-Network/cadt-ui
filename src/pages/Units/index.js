import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUnits } from '../../store/actions/climateWarehouseActions';

import {
  DataTable,
  AddIcon,
  SearchInput,
  Tag,
  PrimaryButton,
} from '../../components';

const Units = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(() => dispatch(getUnits({ useMockedResponse: false })), []);

  if (!climateWarehouseStore.units || !climateWarehouseStore.units.length) {
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
          onClick={() => history.push('/units/add')}
        />
      </div>
      {climateWarehouseStore.units && (
        <DataTable
          headings={Object.keys(climateWarehouseStore.units[0])}
          data={climateWarehouseStore.units}
        />
      )}
    </>
  );
});

export { Units };
