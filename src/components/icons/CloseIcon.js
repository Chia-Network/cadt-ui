import React from 'react';
import { withTheme } from 'styled-components';
import { IconColorsWrapper } from './IconColorsWrapper';

const CloseIcon = withTheme(({ width, height, fill }) => {
  return (
    <IconColorsWrapper type="red">
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 8 8"
        fill={fill || 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.60713 4L7.6833 0.333203C7.73486 0.272266 7.6915 0.179688 7.61181 0.179688H6.67666C6.62158 0.179688 6.56884 0.204297 6.53252 0.246484L3.99541 3.27109L1.4583 0.246484C1.42314 0.204297 1.37041 0.179688 1.31416 0.179688H0.379C0.299313 0.179688 0.255953 0.272266 0.307516 0.333203L3.38369 4L0.307516 7.6668C0.295965 7.68038 0.288555 7.69699 0.286165 7.71466C0.283775 7.73233 0.286505 7.75031 0.294031 7.76648C0.301558 7.78264 0.313565 7.79631 0.328626 7.80585C0.343687 7.81539 0.361171 7.82041 0.379 7.82031H1.31416C1.36923 7.82031 1.42197 7.7957 1.4583 7.75352L3.99541 4.72891L6.53252 7.75352C6.56767 7.7957 6.62041 7.82031 6.67666 7.82031H7.61181C7.6915 7.82031 7.73486 7.72774 7.6833 7.6668L4.60713 4Z"
          fill={fill || 'currentColor'}
        />
      </svg>
    </IconColorsWrapper>
  );
});

export { CloseIcon };
