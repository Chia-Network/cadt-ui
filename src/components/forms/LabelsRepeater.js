import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateLabelsForm } from './CreateLabelsForm';
import { ComponentRepeater } from '..';

function LabelsRepeater({
  labelsState,
  newLabelsState,
  labelRef,
  labelValidRef,
}) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={labelsState}
        updateValues={newLabelsState}
        initialValue={{
          label: '',
          labelType: '',
          creditingPeriodStartDate: '12/12/2020',
          creditingPeriodEndDate: '12/20/2020',
          validityPeriodStartDate: '12/15/2020',
          validityPeriodEndDate: '12/20/2020',
          unitQuantity: 0,
          labelLink: '',
        }}
        component={
          <CreateLabelsForm labelRef={labelRef} labelValidRef={labelValidRef} />
        }
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default LabelsRepeater;
