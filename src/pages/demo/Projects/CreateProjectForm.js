import React from 'react';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
} from '../../../components';
import { Body } from './../../../components/typography';

const CreateProjectForm = () => {
  return (
    <div style={{ width: '320px' }}>
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ marginBottom: '8px' }}>
          <Body color={'#262626'}>Input Label</Body>
        </div>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Input placeholder"
          state={InputStateEnum.default}
        />
      </div>
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ marginBottom: '8px' }}>
          <Body color={'#262626'}>Input Label</Body>
        </div>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Input placeholder"
          state={InputStateEnum.default}
        />
      </div>
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ marginBottom: '8px' }}>
          <Body color={'#262626'}>Input Label</Body>
        </div>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Input placeholder"
          state={InputStateEnum.default}
        />
      </div>
    </div>
  );
};

export { CreateProjectForm };
