import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = withTheme(styled('h4')`
  color: ${props => props.color || '#00000'};
  font-size: 1rem;
  font-family: ${props => props.theme.typography.primary};
  font-weight: 700;
  line-height: 1.375rem;
  font-style: normal;
  text-transform: capitalize;
`);

const ButtonText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { ButtonText };
