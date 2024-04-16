import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataTable } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  setOrder: (sort: string) => void;
  onRowClick: (row: any) => void;
  order: string;
}

const StagingTable: React.FC<TableProps> = ({ data, isLoading, onRowClick, setOrder, order }) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'table'} />,
        key: 'table',
      },
      {
        title: <FormattedMessage id={'action'} />,
        key: 'action',
      },
      {
        title: <FormattedMessage id={'uuid'} />,
        key: 'uuid',
      },
      {
        title: <FormattedMessage id={'date-created'} />,
        key: 'createdAt',
      },
      {
        title: <FormattedMessage id={'date-last-updated'} />,
        key: 'updatedAt',
      },
    ],
    [],
  );

  return (
    <>
      <div className="relative">
        <DataTable
          columns={columns}
          onChangeOrder={setOrder}
          onRowClick={onRowClick}
          order={order}
          data={data}
          primaryKey="uuid"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export { StagingTable };
