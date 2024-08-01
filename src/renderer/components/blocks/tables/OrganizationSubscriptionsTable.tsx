import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc } from 'lodash';
import { DataTable } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  currentPage?: number;
  onPageChange?: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  order?: string;
  totalPages?: number;
  totalCount?: number;
}

const OrganizationSubscriptionsTable: React.FC<TableProps> = ({ data, isLoading, setOrder, order }) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'current-registry'} />,
        key: 'currentRegistry',
      },
      {
        title: <FormattedMessage id={'project-id'} />,
        key: 'projectId',
      },
    ],
    [],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        onChangeOrder={setOrder}
        order={order}
        data={data}
        primaryKey="warehouseProjectId"
        isLoading={isLoading}
      />
    </div>
  );
};

export { OrganizationSubscriptionsTable };
