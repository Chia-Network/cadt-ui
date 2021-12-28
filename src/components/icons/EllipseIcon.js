import React from 'react';
import { withTheme } from 'styled-components';

const EllipseIcon = withTheme(({ width, height }) => {
  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="2.5" cy="2.5" r="2.5" fill="#1890FF" />
      </svg>
    </>
  );
});

export { EllipseIcon };
