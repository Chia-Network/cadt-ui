import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataTable, PageCounter, Pagination } from '@/components';
import { DebouncedFunc } from 'lodash';
import { Unit } from '@/schemas/Unit.schema';

interface TableProps {
  data: Unit[];
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  totalPages: number;
  onRowClick?: (row: any) => void;
  totalCount: number;
}

const CompactUnitsTable: React.FC<TableProps> = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
  totalCount,
  onRowClick,
}) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'serial-number-block'} />,
        key: 'serialNumberBlock',
      },
      {
        title: <FormattedMessage id={'unit-count'} />,
        key: 'unitCount',
      },
      {
        title: <FormattedMessage id={'unit-owner'} />,
        key: 'unitOwner',
        render: (row: Unit) => <span className="font-bold">{row.unitOwner || '-'}</span>,
      },
    ],
    [],
  );

  const shouldRenderPagination = useMemo(() => totalPages > 1 && Boolean(data), [totalPages, data]);

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        primaryKey="warehouseUnitId"
        isLoading={false}
        compact={true}
        footer={
          <div>
            {shouldRenderPagination ? (
              <>
                <PageCounter currentPage={currentPage} totalCount={totalCount} />
                <Pagination
                  currentPage={currentPage}
                  layout="pagination"
                  onPageChange={onPageChange}
                  showIcons={true}
                  totalPages={totalPages || 1}
                />
              </>
            ) : null}
          </div>
        }
      />
    </div>
  );
};

export { CompactUnitsTable };
