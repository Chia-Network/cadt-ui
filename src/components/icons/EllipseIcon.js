import React from 'react';
import { withTheme } from 'styled-components';

const EllipseIcon = withTheme(({ width, height, fill }) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 5 5"
      fill={fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={fill || 'currentColor'} />
    </svg>
  );
});

export { EllipseIcon };
