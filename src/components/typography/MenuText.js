import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = withTheme(styled('p')`
  color: ${props =>
    props.color || '#000000'};
  font-size: 1.125rem;
  font-family: ${props => props.theme.typography.primary};
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem;
  text-transform: capitalize;
  letter-spacing: -0.439024px;
`);

const MenuText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { MenuText };
