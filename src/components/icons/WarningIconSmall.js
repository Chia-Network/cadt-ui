import React from 'react';
import { withTheme } from 'styled-components';


const WarningIconSmall = withTheme(({ width, height, theme }) => {
  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM6.5 3.625C6.5 3.55625 6.55625 3.5 6.625 3.5H7.375C7.44375 3.5 7.5 3.55625 7.5 3.625V7.875C7.5 7.94375 7.44375 8 7.375 8H6.625C6.55625 8 6.5 7.94375 6.5 7.875V3.625ZM7 10.5C6.80374 10.496 6.61687 10.4152 6.47948 10.275C6.3421 10.1348 6.26515 9.9463 6.26515 9.75C6.26515 9.5537 6.3421 9.36522 6.47948 9.225C6.61687 9.08478 6.80374 9.00401 7 9C7.19626 9.00401 7.38313 9.08478 7.52052 9.225C7.6579 9.36522 7.73485 9.5537 7.73485 9.75C7.73485 9.9463 7.6579 10.1348 7.52052 10.275C7.38313 10.4152 7.19626 10.496 7 10.5Z"
          fill={theme.colors.default.status.warning.primary}
        />
      </svg>
    </>
  );
});

export { WarningIconSmall };
