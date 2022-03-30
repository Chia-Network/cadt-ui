import React from 'react';
import { withTheme } from 'styled-components';

const CopyIcon = withTheme(({ width, height, fill, onClick }) => {
  return (
    <svg
      onClick={onClick}
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 1.5H6.9375C6.83437 1.5 6.75 1.58437 6.75 1.6875V3C6.75 3.10313 6.83437 3.1875 6.9375 3.1875H18.5625V19.3125C18.5625 19.4156 18.6469 19.5 18.75 19.5H20.0625C20.1656 19.5 20.25 19.4156 20.25 19.3125V2.25C20.25 1.83516 19.9148 1.5 19.5 1.5ZM16.5 4.5H4.5C4.08516 4.5 3.75 4.83516 3.75 5.25V17.6883C3.75 17.8875 3.82969 18.0773 3.97031 18.218L8.03203 22.2797C8.08359 22.3312 8.14219 22.3734 8.20547 22.4086V22.4531H8.30391C8.38594 22.4836 8.47266 22.5 8.56172 22.5H16.5C16.9148 22.5 17.25 22.1648 17.25 21.75V5.25C17.25 4.83516 16.9148 4.5 16.5 4.5ZM8.95312 21H8.94844L5.4375 17.4891V17.4844H8.95312V21Z"
        fill={fill || 'currentColor'}
      />
    </svg>
  );
});

export { CopyIcon };
