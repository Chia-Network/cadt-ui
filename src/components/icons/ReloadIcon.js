import React from 'react';
import { withTheme } from 'styled-components';

const ReloadIcon = withTheme(({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={`${width}px`}
      height={`${height}px`}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 15 15"
    >
      <path
        fill={fill || 'currentColor'}
        fillRule="evenodd"
        d="M7.5 1A6.5 6.5 0 0 0 1 7.5H0a7.5 7.5 0 0 1 13-5.1V0h1v4h-4V3h2.19A6.48 6.48 0 0 0 7.5 1Zm0 13A6.5 6.5 0 0 0 14 7.5h1a7.5 7.5 0 0 1-13 5.099V15H1v-4h4v1H2.81a6.48 6.48 0 0 0 4.69 2Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
});

export { ReloadIcon };
