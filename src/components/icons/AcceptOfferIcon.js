import React from 'react';

const AcceptOfferIcon = ({ width = 16, height = 16, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="currentColor">
        <path d="M32.707 22.707a1 1 0 0 0-1.414-1.414L24 28.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L24 31.414l8.707-8.707Z"></path>
        <path
          fillRule="evenodd"
          d="M38 15v21a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h11l10 10Zm-10 1a1 1 0 0 1-1-1V7H17a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V16h-8Zm1-7.172L34.172 14H29V8.828Z"
          clipRule="evenodd"
        ></path>
        <path d="M12 11v27a3 3 0 0 0 3 3h19v2H15a5 5 0 0 1-5-5V11h2Z"></path>
      </g>
    </svg>
  );
};

export { AcceptOfferIcon };
