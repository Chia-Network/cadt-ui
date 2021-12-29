import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { getUnits } from '../../store/actions/climateWarehouseActions';

import {
  DataTable,
  AddIcon,
  SearchInput,
  SelectSizeEnum,
  SelectTypeEnum,
  Select,
  PrimaryButton,
  CreateUnitsForm,
  Modal
} from '../../components';

const StyleContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px 0px;
`;

const Units = withRouter(() => {
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);
   const [confirmNetworkError, setConfirmNetworkError] = useState(false);
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const storeLoading = useSelector(store => store.app.showProgressOverlay);
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

  useEffect(() => dispatch(getUnits({ useMockedResponse: false })), []);

  if (!climateWarehouseStore.units || !climateWarehouseStore.units.length) {
    if (!confirmNetworkError && !storeLoading) {
     return <Modal
           type="error"
           onOk={() => setConfirmNetworkError(true)}
           showButtons
           title="Network Error"
           body={
             'There is a connection error. The Climate Warehouse is inaccessible'
           }
         />
     }
     
     return null;
  }

  return (
    <>
      <StyleContainer>
        <div style={{ maxWidth: '25.1875rem' }}>
          <SearchInput size="large" outline />
        </div>
        <div
          style={{
            display: 'flex',
            width: '50%',
          }}>
          
            <Select
              size={SelectSizeEnum.large}
              type={SelectTypeEnum.basic}
              options={selectOptions}
              placeholder="Filters"
              width="93px"
            />
         
        </div>
        <PrimaryButton
          label="Create"
          size="large"
          icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
          onClick={() => setCreate(true)}
        />
      </StyleContainer>
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
    </>
  );
});

export { Units };
