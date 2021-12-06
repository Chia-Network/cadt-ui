import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = withTheme(styled('h4')`
  color: ${props => props.color || '#00000'};
  font-size: 1.3125rem;
  font-family: ${props => props.theme.typography.primary.semiBold};
  font-weight: 600;
  line-height: 1.9688rem;
  font-style: normal;
  letter-spacing: -0.0275rem;
`);

const H4 = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { H4 };
