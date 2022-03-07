import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIcon, CloseIcon } from '..';
import { CreateIssuanceForm } from './CreateIssuanceForm';
import { ComponentRepeater } from '..';
import { getIssuances } from '../../store/actions/climateWarehouseActions';

function IssuanceRepeater({ issuanceState, newIssuanceState, max = 30 }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIssuances());
  }, []);

  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={max}
        values={issuanceState}
        updateValues={newIssuanceState}
        initialValue={{
          startDate: '',
          endDate: '',
          verificationApproach: '',
          verificationReportDate: '',
          verificationBody: '',
        }}
        component={<CreateIssuanceForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default IssuanceRepeater;
