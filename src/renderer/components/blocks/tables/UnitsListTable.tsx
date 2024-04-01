import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc }from 'lodash'
import { DataTable, PageCounter, Pagination } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  totalPages: number;
  totalCount: number;
}

const UnitsListTable: React.FC<TableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  totalPages,
  totalCount,
}) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'unit-owner'} />,
        key: 'unitOwner',
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
