import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIcon, CloseIcon } from '..';
import { CreateUnitLabelsForm } from '.';
import { ComponentRepeater } from '..';
import { getLabels } from '../../store/actions/climateWarehouseActions';

function UnitLabelsRepeater({ labelsState, newLabelsState, useToolTip }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabels());
  }, []);

  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        useToolTip={useToolTip}
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
        component={<CreateUnitLabelsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default UnitLabelsRepeater;
