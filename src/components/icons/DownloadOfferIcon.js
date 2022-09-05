import React from 'react';

const DownloadOfferIcon = ({ width = 16, height = 16, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}px`}
      height={`${height}px`}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14 2H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8l-6-6m-2 17l-4-4h2.5v-3h3v3H16l-4 4m1-10V3.5L18.5 9H13Z"
      ></path>
    </svg>
  );
};

export { DownloadOfferIcon };
