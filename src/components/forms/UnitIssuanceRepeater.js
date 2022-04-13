import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateUnitIssuanceForm } from './CreateUnitIssuanceForm';
import { ComponentRepeater } from '..';

function UnitIssuanceRepeater({ issuanceState, newIssuanceState, max = 30 }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={max}
        minRepetitions={1}
        values={issuanceState}
        updateValues={newIssuanceState}
        initialValue={{
          startDate: '',
          endDate: '',
          verificationApproach: '',
          verificationReportDate: '',
          verificationBody: '',
        }}
        component={<CreateUnitIssuanceForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default UnitIssuanceRepeater;
