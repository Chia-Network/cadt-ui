import React from 'react';
import {
  AddIcon,
  CloseIcon,
  ComponentRepeater,
  CreateEstimationsForm,
} from '..';

function EstimationsRepeater({ estimationsState, setEstimationsState }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={estimationsState}
        updateValues={setEstimationsState}
        initialValue={{
          creditingPeriodStart: '',
          creditingPeriodEnd: '',
          unitCount: 0,
        }}
        component={<CreateEstimationsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export { EstimationsRepeater };
