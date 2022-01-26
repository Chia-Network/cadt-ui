import React from 'react';
import { ToolTip, ToolTipPlacement } from '.';

const ToolTipContainer = ({ children, tooltip }) => {
  return (
    <ToolTip body={tooltip} placement={ToolTipPlacement.Top}>
      {children}
    </ToolTip>
  );
};

export { ToolTipContainer };
