import React from 'react';
import { withTheme } from 'styled-components';

const Divider = withTheme(({ fill, theme }) => {
  return (
    <svg
      viewBox="0 0 520 1"
      fill={`${fill}`}
      xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="1" fill={theme.colors.default.onDivider} />
    </svg>
  );
});

export { Divider };
