import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc } from 'lodash';
import { DataTable, PageCounter, Pagination, UnitsModal } from '@/components';
import { Issuance } from '@/schemas/Issuance.schema';

interface IssuancesTableProps {
  data: Issuance[];
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  totalPages: number;
  totalCount: number;
  onRowClick?: (row: any) => void;
}

const IssuancesTable: React.FC<IssuancesTableProps> = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
  totalCount,
  onRowClick,
}) => {
  const [selectedIssuanceId, setSelectedIssuanceId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'start-date'} />,
        key: 'startDate',
        render: (row: Issuance) => {
          const date = row.startDate ? new Date(row.startDate).toLocaleDateString() : '-';
          return <span>{date}</span>;
        },
      },
      {
        title: <FormattedMessage id={'end-date'} />,
        key: 'endDate',
        render: (row: Issuance) => {
          const date = row.endDate ? new Date(row.endDate).toLocaleDateString() : '-';
          return <span>{date}</span>;
        },
      },
      {
        title: <FormattedMessage id={'verification-approach'} />,
        key: 'verificationApproach',
        render: (row: Issuance) => <span>{row.verificationApproach || '-'}</span>,
      },
      {
        title: <FormattedMessage id={'verification-body'} />,
        key: 'verificationBody',
        render: (row: Issuance) => (
          <span className="text-sm text-gray-900 break-words">{row.verificationBody || '-'}</span>
        ),
      },
      {
        title: <FormattedMessage id={'verification-report-date'} />,
        key: 'verificationReportDate',
        render: (row: Issuance) => {
          const date = row.verificationReportDate ? new Date(row.verificationReportDate).toLocaleDateString() : '-';
          return <span>{date}</span>;
        },
      },
      {
        title: 'ID',
        key: 'id',
        render: (row: Issuance) => {
          const shortId = row.id ? row.id.substring(0, 8) : '-';
          const isCopied = copiedId === row.id;
          const handleClick = async () => {
            if (row.id) {
              try {
                await navigator.clipboard.writeText(row.id);
                setCopiedId(row.id);
                setTimeout(() => {
                  setCopiedId(null);
                }, 2000);
              } catch (err) {
                console.error('Failed to copy to clipboard:', err);
              }
            }
          };
          return (
            <span
              className={`font-mono text-sm cursor-pointer transition-colors ${
                isCopied ? 'text-green-600 font-semibold bg-green-100 px-2 py-1 rounded' : 'hover:text-blue-600'
              }`}
              title={`${row.id || '-'} (Click to copy)`}
              onClick={handleClick}
            >
              {isCopied ? '✓ Copied!' : shortId}
            </span>
          );
        },
      },
      {
        title: <FormattedMessage id={'units'} />,
        key: 'units',
        render: (row: Issuance) => (
          <button
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={(e) => {
              e.preventDefault();
              setSelectedIssuanceId(row.id || null);
            }}
          >
            View Units
          </button>
        ),
      },
    ],
    [copiedId],
  );

  const shouldRenderPagination = useMemo(() => totalPages > 1 && Boolean(data), [totalPages, data]);

  return (
    <>
      <div className="relative">
        <DataTable
          columns={columns}
          data={data}
          onRowClick={onRowClick}
          primaryKey="id"
          isLoading={false}
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

      {selectedIssuanceId && <UnitsModal issuanceId={selectedIssuanceId} onClose={() => setSelectedIssuanceId(null)} />}
    </>
  );
};

export { IssuancesTable };
