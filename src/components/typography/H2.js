import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = styled('h2')`
  color: ${props => props.color || props.theme.colors.default.primary};
  font-size: 2rem;
  font-family: ${props => props.theme.typography.primary.bold};
  font-weight: bold;
  line-height: 3rem;
  letter-spacing: -0.0625rem;
`;

const H2 = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { H2 };
