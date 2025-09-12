import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataTable } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  order: string;
  setOrder: (sort: string) => void;
}

const GlossaryTable: React.FC<TableProps> = ({ data, isLoading, order, setOrder }) => {
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'term'} />,
        key: 'term',
        width: '25%',
        style: { minWidth: '200px', maxWidth: '300px' },
        render: (row: any) => {
          return (
            <div className="text-gray-600 dark:text-white whitespace-normal break-words font-medium">{row.term}</div>
          );
        },
      },
      {
        title: <FormattedMessage id={'description'} />,
        key: 'description',
        width: '75%',
        style: { minWidth: '400px' },
        render: (row: any) => {
          return (
            <div className="text-gray-600 dark:text-white">
              {row.description.map((item, index) => (
                <div key={`${item.header}-${index}`} className="mb-4 last:mb-0 text-left">
                  <div className="font-bold items-start">{item.header}</div>
                  <div className="items-start whitespace-normal break-words">{item.definition}</div>
                </div>
              ))}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        primaryKey="term"
        isLoading={isLoading}
        order={order}
        onChangeOrder={setOrder}
      />
    </div>
  );
};

export { GlossaryTable };
