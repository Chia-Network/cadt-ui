import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateCoBenefitsForm } from '.';
import { ComponentRepeater } from '..';

function CoBenefitsRepeater({ coBenefitsState, setNewCoBenefitsState }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={coBenefitsState}
        updateValues={setNewCoBenefitsState}
        initialValue={{
          cobenefit: ''
        }}
        component={<CreateCoBenefitsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default CoBenefitsRepeater;
