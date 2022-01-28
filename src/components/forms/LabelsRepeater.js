import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateLabelsForm } from './CreateLabelsForm';
import { ComponentRepeater } from '..';

function LabelsRepeater({ labelsState, newLabelsState }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={labelsState}
        updateValues={newLabelsState}
        initialValue={{
          label: '',
          creditingPeriodStartDate: '',
          creditingPeriodEndDate: '',
          validityPeriodStartDate: '',
          validityPeriodEndDate: '',
          unitQuantity: '',
          labelLink: '',
        }}
        component={<CreateLabelsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default LabelsRepeater;
