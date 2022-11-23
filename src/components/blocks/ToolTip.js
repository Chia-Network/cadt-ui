import React from 'react';
import { withTheme } from 'styled-components';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const ToolTipPlacement = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  TopLeft: 'top-start',
  TopRight: 'top-end',
  BottomLeft: 'bottom-start',
  BottomRight: 'bottom-end',
  LeftTop: 'left-start',
  LeftBottom: 'left-end',
  RightTop: 'right-start',
  RightBottom: 'right-end',
};

const ToolTip = withTheme(({ children, body, placement, theme }) => {
  return (
    <Tooltip
      title={body}
      placement={placement}
      componentsProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.arrow}`]: {
              color: theme.colors.default.primary,
            },
            [`& .${tooltipClasses.tooltip}`]: {
              maxWidth: '12.5rem',
              backgroundColor: theme.colors.default.primary,
              padding: '0.375rem 0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.3125rem',
              fontWeight: '400',
              fontStyle: 'normal',
              borderRadius: '0.125rem',
              boxShadow:
                '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
              filter: 'drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08))',
            },
          },
        },
      }}
      arrow
    >
      <span>{children}</span>
    </Tooltip>
  );
});

export { ToolTipPlacement, ToolTip };
