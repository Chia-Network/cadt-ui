import React from 'react';
import { IconColorsWrapper } from './IconColorsWrapper';

const EditIcon = ({ width, height, fill, ...props }) => {
  return (
    <IconColorsWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill={fill || 'currentColor'}
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
        ></path>
      </svg>
    </IconColorsWrapper>
  );
};

export { EditIcon };
