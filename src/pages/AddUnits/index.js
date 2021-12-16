import React from 'react';
import { CreateUnitsForm } from '../../components';

const AddUnits = () => {
  return (
    <div
      style={{
        margin: '30px',
        padding: '30px',
        border: 'solid lightgray 1px',
        overflow: 'auto',
        height: 'calc(100% - 120px)',
      }}>
      <CreateUnitsForm />
    </div>
  );
};

export { AddUnits };