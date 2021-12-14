import React from 'react';
import { withTheme } from 'styled-components';

const ArrowDownIcon = withTheme(({ width, height }) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.7188 0.00012207H15.961C15.8415 0.00012207 15.729 0.058716 15.6586 0.15481L9.00005 9.33294L2.34146 0.15481C2.27115 0.058716 2.15865 0.00012207 2.03912 0.00012207H0.281303C0.128959 0.00012207 0.0398965 0.17356 0.128959 0.297779L8.39302 11.6907C8.69302 12.1032 9.30708 12.1032 9.60474 11.6907L17.8688 0.297779C17.9602 0.17356 17.8711 0.00012207 17.7188 0.00012207Z"
        fill="currentColor"
      />
    </svg>
  );
});

export { ArrowDownIcon };
