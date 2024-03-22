import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

interface Column {
  key: string;
  title: string | JSX.Element;
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
  footer?: JSX.Element | null;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  primaryKey = 'id',
  data,
  isLoading = false,
  onRowClick = () => {},
  footer = null
}) => {

  if (isLoading) {
    return null;
  }

  return (
    <div className="dark:bg-gray-800">
      {/* Mobile view */}
      <div className="block md:hidden mx-auto w-full">
        {data?.length > 0 && data.map((row) => (
          <div key={row[primaryKey]} onClick={() => onRowClick(row)} className="mb-4 p-4 border border-gray-200 rounded dark:bg-gray-700">
            {columns.map((column) => (
              <div key={`${column.key}-${row[primaryKey]}`} className="py-2">
                <div className="font-bold text-left text-gray-900 dark:text-gray-100">
                  {column.renderHeader ? column.renderHeader(column) : column.title}
                </div>
                <div className="text-left text-gray-600 dark:text-white">
                  {column.render ? column.render(row) : (
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
      <div className="hidden md:flex md:flex-col" style={{ height: 'calc(100vh - 150px)', width: 'calc(100vw - 260px)' }}>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {column.renderHeader ? column.renderHeader(column) : column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.length > 0 && data.map((row, index) => (
                <tr key={row[primaryKey]} onClick={() => onRowClick(row)} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}>
                  {columns.map((column) => (
                    <td key={`${column.key}-${row[primaryKey]}`} className="px-6 py-4 whitespace-normal">
                      <div className="text-gray-600 dark:text-white">
                        {column.render ? column.render(row) : (
                          <div className="truncate" style={{ maxWidth: '300px' }}>
                            {row[column.key]}
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footer && data.length && (
          <div className="mt-auto bg-gray-50 dark:bg-gray-700 w-full p-4 text-left">
            {footer}
          </div>
        )}
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
