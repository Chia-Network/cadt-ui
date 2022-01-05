import React from 'react';
import styled from 'styled-components';
import { Switch } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const SwitchContainer = styled('div')`
  background: ${props => (props.selected ? '#e0f4fe' : 'transparent')};
  width: 100%;
  color: ${props => (props.selected ? '#003a8c' : '#ffffff')};
  font-family: ${props => props.theme.typography.primary.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

function ToggleSwitch({ onChange }) {
  return (
    <SwitchContainer>
      <div>
        <FormattedMessage id="warehouse" />
      </div>
      <Switch onChange={onChange} />
      <div>
        <FormattedMessage id="registry" />
      </div>
    </SwitchContainer>
  );
}

export default ToggleSwitch;
