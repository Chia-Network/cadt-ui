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

const ToolTip = withTheme(
  ({ children, body, placement }) => {
    return (
      <Tooltip
        title={body}
        placement={placement}
        componentsProps={{
          popper: {
            sx: {
              [`& .${tooltipClasses.arrow}`]: {
                color: '#262626',
              },
              [`& .${tooltipClasses.tooltip}`]: {
                maxWidth: '12.5rem',
                backgroundColor: '#262626',
                padding: '0.375rem 0.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.3125rem',
                fontWeight: '400',
                fontStyle: 'normal',
                borderRadius: '0.125rem',
              },
            },
          },
        }}
        arrow>
        <span>{children}</span>
      </Tooltip>
    );
  },
);

export { ToolTipPlacement, ToolTip };
