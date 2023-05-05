import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { ToolTip, ToolTipPlacement } from '../../components';

const Text = styled('p')`
  color: ${props => props.color || props.theme.colors.default.primary};
  font-size: 0.875rem;
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TableCellText = withTheme(({ children, tooltip, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <ToolTip body={tooltip || children} placement={ToolTipPlacement.Top}>
      <Text
        color={color}
        selectedTheme={appStore.theme}
        tooltip={tooltip || children}
      >
        {children}
      </Text>
    </ToolTip>
  );
});

export { TableCellText };
