import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateRelatedProjectsForm } from '.';
import { ComponentRepeater } from '..';

function RelatedProjectsRepeater({
  relatedProjectsState,
  setRelatedProjectsState,
}) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={relatedProjectsState}
        updateValues={setRelatedProjectsState}
        initialValue={{
          relationshipType: '',
          registry: '',
        }}
        component={<CreateRelatedProjectsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default RelatedProjectsRepeater;
