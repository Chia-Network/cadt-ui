import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = styled('h3')`
  color: ${props => props.color || props.theme.colors.default.primary};
  font-size: 1.5rem;
  font-family: ${props => props.theme.typography.primary.bold};
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.00938em;
`;

const H3 = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { H3 };
