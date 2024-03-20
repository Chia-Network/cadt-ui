import _ from 'lodash';
import { useMemo } from 'react';
import { Caption2, Caption1 } from '@/components';
import { FormattedMessage } from 'react-intl';

const DataTable = (({ columns, primaryKey = 'id', data, isLoading = false, onRowClick = _.noop}) => {
  const columnMap = useMemo(() => {
    return columns.reduce((map, curr) => {
      map[curr.key] = curr;
      return map;
    }, {});
  }, [columns]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 relative w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className={`sticky px-6 py-3 bg-gray`}
                key={column.key}
                style={{
                  width: column.width,
                  top: -1,
                  textAlign: 'left',
                }}
              >
                <Caption2
                  style={{ textTransform: 'uppercase' }}
                  onClick={column.onClick ? column.onClick : _.noop}
                >
                  {column.renderHeader
                    ? column.renderHeader(column)
                    : column.title}
                </Caption2>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.length > 0 &&
            data.map((row, index) => (
              <tr key={row[primaryKey]} id={row[primaryKey]} onClick={() => onRowClick(row)}>
                {columns.map((column) => {
                  const key = column.key;
                  return (
                    <td
                      key={`${columnMap[key].key}-${row[key]}-${row[primaryKey]}`}
                      id={`${columnMap[key].key}-${row[key]}-${row[primaryKey]}`}
                      style={{
                        width: columnMap[key].width,
                        padding: columnMap[key].padding
                          ? `${columnMap[key].padding} !important`
                          : '30px 30px 30px 20px',
                        ...columnMap[key].style,
                      }}
                      className={
                        index === 0
                          ? 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'
                          : 'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      }
                    >
                      <Caption1>
                        {columnMap[key].render
                          ? columnMap[key].render(row)
                          : row[key]}
                      </Caption1>
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>

      {data?.length === 0 && (
        <div
          style={{
            padding: 15,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FormattedMessage id="no-records-found" />
        </div>
      )}
    </>
  );
});

export { DataTable };
