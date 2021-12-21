import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = styled('h1')`
  color: ${props => props.color || '#1890FF'};
  font-size: 14px;
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  line-height: 22px;
  font-weight: normal;
  cursor: pointer;
`;

const TableCellLinkText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { TableCellLinkText };
