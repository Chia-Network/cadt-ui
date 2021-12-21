import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { ToolTip, ToolTipPlacement } from '../../components';

const Text = styled('p')`
  color: ${props => props.color || '#000000'};
  font-size: 0.875rem;
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TableCellText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <ToolTip body={children} placement={ToolTipPlacement.Top}>
      <Text color={color} selectedTheme={appStore.theme} tooltip={children}>
        {children}
      </Text>
    </ToolTip>
  );
});

export { TableCellText };
