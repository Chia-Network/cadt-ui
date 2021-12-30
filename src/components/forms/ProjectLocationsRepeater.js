import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateProjectLocationsForm } from './CreateProjectLocationsForm';
import { ComponentRepeater } from '..';

function ProjectLocationsRepeater({
  projectLocationsState,
  setProjectLocationsState,
}) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={projectLocationsState}
        updateValues={setProjectLocationsState}
        initialValue={{
            countryRegion: '',
            country: '',
        }}
        component={<CreateProjectLocationsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default ProjectLocationsRepeater;
