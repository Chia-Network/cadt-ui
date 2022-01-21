import _ from 'lodash';
import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateVintageForm } from './CreateVintageForm';
import { ComponentRepeater } from '..';

function VintageRepeater({ vintageState, newVintageState, max = 30, unitId }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={max}
        values={_.isEmpty(vintageState) ? [] : vintageState}
        updateValues={newVintageState}
        initialValue={{
          startDate: '',
          endDate: '',
          verificationApproach: '',
          verificationDate: '',
          verificationBody: '',
          warehouseProjectId: '',
          unitId: '',
        }}
        component={<CreateVintageForm unitId={unitId} />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default VintageRepeater;
