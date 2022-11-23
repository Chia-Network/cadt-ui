import React from 'react';
import { withTheme } from 'styled-components';
import { IconColorsWrapper } from './IconColorsWrapper';

const AddIcon = withTheme(({ width, height, fill }) => {
  return (
    <IconColorsWrapper>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.64844 0.78125H5.35156C5.41406 0.78125 5.44531 0.8125 5.44531 0.875V9.125C5.44531 9.1875 5.41406 9.21875 5.35156 9.21875H4.64844C4.58594 9.21875 4.55469 9.1875 4.55469 9.125V0.875C4.55469 0.8125 4.58594 0.78125 4.64844 0.78125Z"
          fill={fill || 'currentColor'}
        />
        <path
          d="M1.0625 4.55469H8.9375C9 4.55469 9.03125 4.58594 9.03125 4.64844V5.35156C9.03125 5.41406 9 5.44531 8.9375 5.44531H1.0625C1 5.44531 0.96875 5.41406 0.96875 5.35156V4.64844C0.96875 4.58594 1 4.55469 1.0625 4.55469Z"
          fill={fill || 'currentColor'}
        />
      </svg>
    </IconColorsWrapper>
  );
});

export { AddIcon };
