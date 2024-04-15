import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc }from 'lodash'
import { DataTable, PageCounter, Pagination } from '@/components';
import { Unit } from '@/schemas/Unit.schema';

interface TableProps {
  data: Unit[];
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  onRowClick?: (row: any) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const UnitsListTable: React.FC<TableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  setOrder,
  onRowClick,
  order,
  totalPages,
  totalCount,
}) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'unit-owner'} />,
        key: 'unitOwner',
        render: (row: Unit) => <span className="font-bold">{row.unitOwner || '-'}</span>,
      },
      {
        title: <FormattedMessage id={'country-jurisdiction-of-owner'} />,
        key: 'countryJurisdictionOfOwner',
      },
      {
        title: <FormattedMessage id={'serial-number-block'} />,
        key: 'serialNumberBlock',
      },
      {
        title: <FormattedMessage id={'unit-count'} />,
        key: 'unitCount',
      },
      {
        title: <FormattedMessage id={'vintage-year'} />,
        key: 'vintageYear',
      },
      {
        title: <FormattedMessage id={'unit-type'} />,
        key: 'unitType',
      },
      {
        title: <FormattedMessage id={'marketplace'} />,
        key: 'marketplace',
      },
      {
        title: <FormattedMessage id={'unit-tags'} />,
        key: 'unitTags',
      },
      {
        title: <FormattedMessage id={'unit-status'} />,
        key: 'unitStatus',
      },
      {
        title: <FormattedMessage id={'corresponding-adjustment-declaration'} />,
        key: 'correspondingAdjustmentDeclaration',
      },
      {
        title: <FormattedMessage id={'corresponding-adjustment-status'} />,
        key: 'correspondingAdjustmentStatus',
      },
    ],
    [],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        onChangeOrder={setOrder}
        onRowClick={onRowClick}
        order={order}
        primaryKey="warehouseUnitId"
        isLoading={isLoading}
        footer={
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
        }
      />
    </div>
  );
};

export { UnitsListTable };
