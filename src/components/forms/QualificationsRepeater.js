import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateQualificationsForm } from './CreateQualificationsForm';
import { ComponentRepeater } from '..';

function QualificationsRepeater({qualificationsState, newQualificationsState}) {
    return (
      <div style={{ padding: '20px 30px' }}>
        <ComponentRepeater
          maxRepetitions={100}
          values={qualificationsState}
          updateValues={newQualificationsState}
          initialValue={{
            label: '',
            creditingPeriodStartDate: '',
            creditingPeriodEndDate: '',
            validityStartDate: '',
            validityEndDate: '',
            unityQuantity: '',
            qualificationLink: '',
          }}
          component={<CreateQualificationsForm />}
          addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
          removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
        />
      </div>
    );
}

export default QualificationsRepeater
