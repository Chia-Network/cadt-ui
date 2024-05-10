import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc } from 'lodash';
import { DataTable, PageCounter, Pagination, AuditModal, Badge } from '@/components';
import { formatToDataTimeFromSeconds } from '@/utils/transforms';
import { useWildCardUrlHash } from '@/hooks';

interface TableProps {
  data: any[];
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const AuditsTable: React.FC<TableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  const [auditFragment, auditModalActive, setAuditModalActive] = useWildCardUrlHash('view-audit');

  const handleRowClick = (row: any) => {
    console.log(row);
    setAuditModalActive(true, row.id);
  };

  console.log(auditFragment)

  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'table'} />,
        key: 'table',
      },
      {
        title: <FormattedMessage id={'timestamp'} />,
        key: 'onchainConfirmationTimeStamp',
        render: (row: any) => {
          return <>{formatToDataTimeFromSeconds(row.onchainConfirmationTimeStamp)}</>;
        },
      },
      {
        title: <FormattedMessage id={'type'} />,
        key: 'type',
        render: (row: any) => {
          return <Badge style={{display: 'flex', justifyContent: 'center'}} color={row.type === 'INSERT' ? 'success' : 'failure'}>{row.type}</Badge>;
        }
      },
      {
        title: <FormattedMessage id={'root-hash'} />,
        key: 'rootHash',
      },
      {
        title: <FormattedMessage id={'author'} />,
        key: 'author',
      },
      {
        title: <FormattedMessage id={'comment'} />,
        key: 'comment',
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
          onRowClick={handleRowClick}
          order={order}
          data={data}
          primaryKey="id"
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
        {auditModalActive && (
          <AuditModal
            auditData={data?.find((record) => record.id == auditFragment.replace('view-audit-', ''))}
            onClose={() => setAuditModalActive(false)}
          />
        )}
      </div>
    </>
  );
};

export { AuditsTable };
