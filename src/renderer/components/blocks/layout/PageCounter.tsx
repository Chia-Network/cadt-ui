import React from 'react';
import { Caption1 } from '@/components';

// Define an interface for the component's props
interface PageCounterProps {
  currentPage: number;
  totalCount: number;
}

const PageCounter: React.FC<PageCounterProps> = ({ currentPage, totalCount }) => {
  return (
    <Caption1>
      Show{' '}
      <span className="font-bold">
        {(currentPage - 1) * 10 + 1} -{' '}
        {Math.min((currentPage - 1) * 10 + 10, totalCount)}
      </span>{' '}
      of{' '}
      <span className="font-bold">
        {totalCount}
      </span>
    </Caption1>
  );
};

export { PageCounter };
