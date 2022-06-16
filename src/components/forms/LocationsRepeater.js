import React from 'react';
import { AddIcon, CloseIcon } from '..';
import { CreateLocationsForm } from './CreateLocationsForm';
import { ComponentRepeater } from '..';

function LocationsRepeater({ locationsState, setLocationsState, useToolTip }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        useToolTip={useToolTip}
        maxRepetitions={100}
        values={locationsState}
        updateValues={setLocationsState}
        initialValue={{
          country: '',
          inCountryRegion: '',
          geographicIdentifier: '',
        }}
        component={<CreateLocationsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export default LocationsRepeater;
