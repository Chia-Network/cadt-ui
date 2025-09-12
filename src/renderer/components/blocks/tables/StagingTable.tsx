import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Badge, DataTable, StagedItemActions } from '@/components';
import dayjs from 'dayjs';

interface TableProps {
  data: any[];
  type: 'staged' | 'pending' | 'failed';
  isLoading: boolean;
  setOrder: (sort: string) => void;
  onRowClick: (row: any) => void;
  order: string;
}

const StagingTable: React.FC<TableProps> = ({ data, type, isLoading, onRowClick, setOrder, order }: TableProps) => {
  const columns = useMemo(
    () => [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        render: (row: any) => <StagedItemActions type={type} stagedItem={row} />,
      },
      {
        title: <FormattedMessage id={'table'} />,
        key: 'table',
        render: (row: any) => <span className="font-bold">{row?.table || '-'}</span>,
      },
      {
        title: <FormattedMessage id={'action'} />,
        key: 'action',
        render: (row: any) => {
          if (row.action === 'INSERT') {
            return <Badge color="success">{row.action}</Badge>;
          }
          if (row.action === 'UPDATE') {
            return <Badge color="warning">{row.action}</Badge>;
          }
          if (row.action === 'DELETE') {
            return <Badge color="red">{row.action}</Badge>;
          }
          return <Badge color="dark">{'--'}</Badge>;
        },
      },
      {
        title: <FormattedMessage id={'uuid'} />,
        key: 'uuid',
        render: (row: any) => <h5 className="text-sm font-bold tracking-tight text-gray-900">{row.uuid}</h5>,
      },
      {
        title: <FormattedMessage id={'date-created'} />,
        key: 'createdAt',
        render: (row: any) => {
          return <>{dayjs(new Date(row.createdAt)).format('MMMM D, YYYY h:mm:ss A')}</>;
        },
      },
      {
        title: <FormattedMessage id={'date-last-updated'} />,
        key: 'updatedAt',
        render: (row: any) => {
          return <>{dayjs(new Date(row.updatedAt)).format('MMMM D, YYYY h:mm:ss A')}</>;
        },
      },
    ],
    [type],
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
