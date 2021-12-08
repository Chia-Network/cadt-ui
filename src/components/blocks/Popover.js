import React from 'react';
import styled, { withTheme } from 'styled-components';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const PopoverPlacement = {
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

const StyledPopoverTitle = styled('div')`
  margin: 0;
  padding: 0.3125rem 1rem 0.3125rem 1rem;
  line-height: 1.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-style: normal;
`;

const StyledPopoverContent = styled('div')`
  margin: 0;
  padding: 0.75rem 1rem 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 400;
  font-style: normal;
`;

const StyledPopoverDivider = styled('div')`
  border-bottom: 1px solid #F0F0F0;
`;

const Popover = withTheme(({ children, body, placement, title }) => {
  const popoverContent = (
    <React.Fragment>
      <StyledPopoverTitle>{title}</StyledPopoverTitle>
      <StyledPopoverDivider />
      <StyledPopoverContent>{body}</StyledPopoverContent>
    </React.Fragment>
  );

  return (
    <Tooltip
      title={popoverContent}
      placement={placement}
      componentsProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.arrow}`]: {
              color: 'white',
            },
            [`& .${tooltipClasses.tooltip}`]: {
              maxWidth: '12.5rem',
              backgroundColor: 'white',
              color: '#262626',
              padding: '0',
              borderRadius: '0.125rem',
              boxShadow:
                '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
              filter: 'drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08))',
            },
          },
        },
      }}
      arrow>
      <div>
        <span>{children}</span>
      </div>
    </Tooltip>
  );
});

export { PopoverPlacement, Popover };
