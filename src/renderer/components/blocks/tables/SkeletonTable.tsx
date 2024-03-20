import React, { useMemo } from 'react';
import { DataTable } from '@/components';
import ContentLoader from 'react-content-loader';

// SkeletonBar component with no props
const SkeletonBar: React.FC = () => (
  <ContentLoader viewBox="0 0 400 32" width={400} height={32}>
    <rect x="28" y="0" rx="0" ry="0" width="465" height="32" />
  </ContentLoader>
);

// Define interfaces for DataTable column and data item structures
interface Column {
  title: string;
  key: string;
  render: () => JSX.Element;
}

// SkeletonTable component
const SkeletonTable: React.FC = () => {
  const columns: Column[] = useMemo(() => [
    {
      title: ' ',
      key: 'column1',
      render: () => <SkeletonBar />,
    },
    {
      title: ' ',
      key: 'column2',
      render: () => <SkeletonBar />,
    },
    {
      title: ' ',
      key: 'column3',
      render: () => <SkeletonBar />,
    },
  ], []);

  return (
    <div className="relative" style={{ height: 'calc(100% - 162px)' }}>
      <DataTable
        columns={columns}
        data={[
          {
            column1: 'value1',
            column2: 'value2',
            column3: 'value3',
          },
          {
            column1: 'value1',
            column2: 'value2',
            column3: 'value3',
          },
          {
            column1: 'value1',
            column2: 'value2',
            column3: 'value3',
          },
        ]}
        isLoading={false}
      />
    </div>
  );
};

export { SkeletonTable };