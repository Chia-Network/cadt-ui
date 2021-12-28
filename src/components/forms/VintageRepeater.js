import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateVintageForm } from './CreateVintageForm';
import { ComponentRepeater } from '..';

function VintageRepeater({vintageState, newVintageState}) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={1}
        values={vintageState}
        updateValues={newVintageState}
        initialValue={{
          vintageStartDate: '',
          vintageEndDate: '',
          verificationApproach: '',
          verificationDate: '',
          verificationBody: '',
        }}
        component={<CreateVintageForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default VintageRepeater;
