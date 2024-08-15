import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { DataTable } from '@/components';
import { RootState } from '@/store';

const SkeletonBar: React.FC = () => {
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  // Define background and foreground colors based on the isDarkTheme state
  const backgroundColor = isDarkTheme ? '#2B2B2B' : '#f0f0f0';
  const foregroundColor = isDarkTheme ? '#3A3A3A' : '#e0e0e0';

  return (
    <ContentLoader
      viewBox="0 0 400 32"
      width={400}
      height={32}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect x="28" y="0" rx="0" ry="0" width="265" height="32" />
    </ContentLoader>
  );
};

interface Column {
  title: string;
  key: string;
  render: () => JSX.Element;
}

const SkeletonTable: React.FC = () => {
  const columns: Column[] = useMemo(
    () => [
      { title: ' ', key: 'column1', render: () => <SkeletonBar /> },
      { title: ' ', key: 'column2', render: () => <SkeletonBar /> },
      { title: ' ', key: 'column3', render: () => <SkeletonBar /> },
      { title: ' ', key: 'column4', render: () => <SkeletonBar /> },
    ],
    [],
  );

  const data = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        column1: '',
        column2: '',
        column3: '',
        column4: '',
      })),
    [],
  );

  return (
    <div className="relative" style={{ height: 'calc(100% - 162px)' }}>
      <DataTable columns={columns} data={data} isLoading={false} />
    </div>
  );
};

export { SkeletonTable, SkeletonBar };
