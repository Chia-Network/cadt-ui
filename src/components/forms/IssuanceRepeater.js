import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateIssuanceForm } from './CreateIssuanceForm';
import { ComponentRepeater } from '..';

function IssuanceRepeater({ issuanceState, newIssuanceState, max = 30, issuanceRef }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={max}
        values={issuanceState}
        updateValues={newIssuanceState}
        initialValue={{
          startDate: '1/11/2000',
          endDate: '1/11/2000',
          verificationApproach: '',
          verificationReportDate: '1/11/2000',
          verificationBody: '',
        }}
        component={<CreateIssuanceForm issuanceRef={issuanceRef} />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default IssuanceRepeater;
