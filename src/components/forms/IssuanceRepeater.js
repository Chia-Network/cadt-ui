import _ from 'lodash';
import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateIssuanceForm } from './CreateIssuanceForm';
import { ComponentRepeater } from '..';

function IssuanceRepeater({ issuanceState, newIssuanceState, max = 30 }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={max}
        values={_.isEmpty(issuanceState) ? [] : issuanceState}
        updateValues={newIssuanceState}
        initialValue={{
          startDate: '',
          endDate: '',
          verificationApproach: '',
          verificationDate: '',
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
