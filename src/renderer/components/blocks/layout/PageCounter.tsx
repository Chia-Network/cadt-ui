import React from 'react';

// Define an interface for the component's props
interface PageCounterProps {
  currentPage: number;
  totalCount: number;
}

const PageCounter: React.FC<PageCounterProps> = ({ currentPage, totalCount }) => {
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      Show{' '}
      <span className="font-semibold">
        {(currentPage - 1) * 10 + 1} -{' '}
        {Math.min((currentPage - 1) * 10 + 10, totalCount)}
      </span>{' '}
      of{' '}
      <span className="font-semibold">
        {totalCount}
      </span>
    </div>
  );
};

export { PageCounter };
