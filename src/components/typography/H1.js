import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = withTheme(styled('h1')`
  color: ${props => props.color || '#000000'};
  font-size: 3.375rem;
  font-family: ${props => props.theme.typography.primary};
  font-style: normal;
  font-weight: 800;
  line-height: 150%;
  letter-spacing: -0.0625rem;
`);

const H1 = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { H1 };
