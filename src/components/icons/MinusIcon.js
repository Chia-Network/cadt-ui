import React from 'react';
import { withTheme } from 'styled-components';

const MinusIcon = withTheme(({ width, height, theme }) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.3125 10.25H6.6875C6.58437 10.25 6.5 10.3344 6.5 10.4375V11.5625C6.5 11.6656 6.58437 11.75 6.6875 11.75H15.3125C15.4156 11.75 15.5 11.6656 15.5 11.5625V10.4375C15.5 10.3344 15.4156 10.25 15.3125 10.25Z"
        fill={theme.colors.default.onText}
      />
      <path
        d="M11 0.5C5.20156 0.5 0.5 5.20156 0.5 11C0.5 16.7984 5.20156 21.5 11 21.5C16.7984 21.5 21.5 16.7984 21.5 11C21.5 5.20156 16.7984 0.5 11 0.5ZM11 19.7188C6.18594 19.7188 2.28125 15.8141 2.28125 11C2.28125 6.18594 6.18594 2.28125 11 2.28125C15.8141 2.28125 19.7188 6.18594 19.7188 11C19.7188 15.8141 15.8141 19.7188 11 19.7188Z"
        fill={theme.colors.default.onText}
      />
    </svg>
  );
});

export { MinusIcon };
