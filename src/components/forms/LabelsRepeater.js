import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIcon, CloseIcon } from '..';
import { CreateLabelsForm } from './CreateLabelsForm';
import { ComponentRepeater } from '..';
import { getLabels } from '../../store/actions/climateWarehouseActions';

function LabelsRepeater({ labelsState, newLabelsState }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabels());
  }, []);

  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={labelsState}
        updateValues={newLabelsState}
        initialValue={{
          label: '',
          labelType: '',
          creditingPeriodStartDate: '',
          creditingPeriodEndDate: '',
          validityPeriodStartDate: '',
          validityPeriodEndDate: '',
          unitQuantity: 0,
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
