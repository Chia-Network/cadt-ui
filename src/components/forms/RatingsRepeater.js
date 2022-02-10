import React from 'react';
import { AddIcon, CloseIcon, ComponentRepeater, CreateRatingsForm } from '..';

function RatingsRepeater({ ratingsState, setRatingsState }) {
  return (
    <div style={{ padding: '20px 30px' }}>
      <ComponentRepeater
        maxRepetitions={100}
        values={ratingsState}
        updateValues={setRatingsState}
        initialValue={{
          id: '',
          ratingType: '',
          ratingRangeHighest: '',
          ratingRangeLowest: '',
          rating: '',
          ratingLink: '',
        }}
        component={<CreateRatingsForm />}
        addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
        removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
      />
    </div>
  );
}

export { RatingsRepeater };
