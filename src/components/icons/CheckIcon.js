import React from 'react';
import { withTheme } from 'styled-components';


const CheckIcon = withTheme(({ width, height, theme }) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8118 0.710938H14.4466C14.2552 0.710938 14.0736 0.798828 13.9564 0.949219L5.90364 11.1504L2.04231 6.25781C1.9839 6.18365 1.90944 6.12368 1.82454 6.08241C1.73963 6.04114 1.64648 6.01965 1.55207 6.01953H0.186839C0.05598 6.01953 -0.0162857 6.16992 0.0637925 6.27148L5.4134 13.0488C5.6634 13.3652 6.14387 13.3652 6.39582 13.0488L15.9349 0.960938C16.015 0.861328 15.9427 0.710938 15.8118 0.710938Z"
        fill={theme.colors.default.primary}
      />
    </svg>
  );
});

export { CheckIcon };
