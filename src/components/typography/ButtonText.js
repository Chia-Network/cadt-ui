import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = styled('h4')`
  color: ${props => props.color || props.theme.colors.default.onSurface};
  font-size: 1rem;
  font-family: ${props => props.theme.typography.primary.regular};
  line-height: 1.375rem;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
`;

const ButtonText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { ButtonText };
