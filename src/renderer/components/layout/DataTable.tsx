import { noop } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '@/components';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import React from 'react';

export interface Column {
  key: string;
  title: string | JSX.Element;
  ignoreChildEvents?: boolean;
  ignoreOrderChange?: boolean;
  render?: (row: any) => JSX.Element;
  renderHeader?: (column: any) => JSX.Element;
  width?: string;
  padding?: string;
  style?: React.CSSProperties;
}

interface DataTableProps {
  columns: Column[];
  primaryKey?: string;
  data: any[];
  isLoading?: boolean;
  onRowClick?: (row: any) => void;
  onChangeOrder?: (column: string) => void;
  order?: string;
  footer?: JSX.Element | null;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  primaryKey = 'id',
  data,
  isLoading = false,
  onRowClick = noop,
  onChangeOrder,
  order,
  footer = null,
}) => {
  if (isLoading) {
    return null;
  }

  return (
    <div className="dark:bg-gray-800 h-full w-full">
      {/* Mobile view */}
      <div className="block md:hidden mx-auto w-full">
        {data?.length > 0 &&
          data.map((row) => (
            <div key={row[primaryKey]} className="mb-4 p-4 border border-gray-200 rounded dark:bg-gray-700">
              {columns.map((column) => (
                <div
                  key={`${column.key}-${row[primaryKey]}`}
                  className="py-2"
                  onClick={(event: any) => {
                    if (!column.ignoreChildEvents || event.target === event.currentTarget) {
                      onRowClick(row);
                    }
                  }}
                >
                  <div className="font-bold text-left text-gray-900 dark:text-gray-100">
                    {column.renderHeader ? column.renderHeader(column) : column.title}
                  </div>
                  <div className="text-left text-gray-600 dark:text-white">
                    {column.render ? (
                      column.render(row)
                    ) : (
                      <div className="truncate" style={{ maxWidth: '300px' }}>
                        {row[column.key]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Desktop view */}
      {footer && data.length ? (
        <div id="footer" className="bg-gray-100 dark:bg-gray-700 w-full p-4 text-left fixed bottom-0 z-50">
          {footer}
        </div>
      ) : null}
      <div className="flex-grow custom-scrollbar" style={{ height: data.length > 0 ? 'calc(100vh - 240px)' : 'auto' }}>
        <SimpleBar style={{ height: '100%', width: '100%' }} autoHide={false} forceVisible="x">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 custom-scrollbar">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                {columns.map((column) => {
                  const isActive = order?.startsWith(column.key);
                  return (
                    <th
                      key={column.key}
                      style={{ cursor: onChangeOrder ? 'pointer' : 'default' }}
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isActive
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                      onClick={() => !column.ignoreOrderChange && onChangeOrder && onChangeOrder(column.key)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.renderHeader ? column.renderHeader(column) : column.title}</span>
                        {order?.includes(column.key) && (
                          <div style={{ width: '24px', height: '24px', display: 'inline-block' }}>
                            {order.includes('ASC') && <AiOutlineSortAscending className="w-6 h-6" />}
                            {order.includes('DESC') && <AiOutlineSortDescending className="w-6 h-6" />}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.length > 0 &&
                data.map((row, index) => (
                  <tr
                    key={row[primaryKey]}
                    style={{ cursor: onRowClick == noop ? 'default' : 'pointer' }}
                    className={
                      index % 2 === 0
                        ? 'bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  >
                    {columns.map((column) => (
                      <td
                        key={`${column.key}-${row[primaryKey]}`}
                        className="px-6 py-4 whitespace-normal"
                        onClick={(event: any) => {
                          if (!column.ignoreChildEvents || event.target === event.currentTarget) {
                            onRowClick(row);
                          }
                        }}
                      >
                        <div className="text-gray-600 dark:text-white">
                          <div className="truncate" style={{ maxWidth: '300px' }}>
                            {column.render ? (
                              column.render(row)
                            ) : (
                              <Tooltip content={row[column.key]}>{row[column.key]}</Tooltip>
                            )}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </SimpleBar>
      </div>

      {data?.length === 0 && (
        <div className="p-4 w-full flex justify-center">
          <FormattedMessage id="no-records-found" />
        </div>
      )}
    </div>
  );
};

export { DataTable };
